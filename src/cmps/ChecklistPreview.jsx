import React, { Component } from 'react'
import TodoPreview from './TodoPreview'
import { boardService } from '../services/boardService.js'
import { BiListUl } from "react-icons/bi";
import { connect } from 'react-redux';
import EditableLabel from 'react-inline-editing';

export class _ChecklistPreview extends Component {

    state = {
        checklist: {},
        isTodoEditShown: '',
        newTodo: {
            title: '',
            id: '',
            isDone: false
        },
        progressbar: ""
    }

    componentDidMount() {
        this.setState({ checklist: this.props.checklist }, this.calculateProgress())

    }

    onRemoveTodo = (todoId) => {
        this.calculateProgress()
        const todos = this.state.checklist.todos
        const todoIdx = todos.findIndex(todo => todo.id === todoId)
        todos.splice(todoIdx, 1)
        this.setState(prevState => ({
            checklist: {
                ...prevState.checklist,
                todos
            }
        }))
        this.props.onUpdateChecklists(this.state.checklist)
        this.calculateProgress()
    }

    onHandleInput = (ev) => {
        const title = ev.target.value
        this.setState(prevState => ({
            newTodo: {
                ...prevState.newTodo,
                title
            }
        }))
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const id = boardService.makeId()
        const isDone = false;
        this.setState(prevState => ({
            newTodo: {
                ...prevState.newTodo,
                id,
                isDone
            }
        }), () => { this.updateLocalChecklist() })

    }
    updateLocalChecklist = (updTodo) => {
        if (updTodo) {
            const todos = this.state.checklist.todos

            const idx = todos.findIndex(todo => todo.id === updTodo.id)
            todos.splice(idx, 1, updTodo)

            this.setState(prevState => ({
                checklist: {
                    ...prevState.checklist,
                    todos: [
                        ...todos
                    ]
                }
            }), this.onUpdateChecklists)
        } else {
            const todos = this.state.checklist.todos
            todos.push(this.state.newTodo)
            this.setState(prevState => ({
                checklist: {
                    ...prevState.checklist,
                    todos: [
                        ...todos
                    ]
                }
            }), this.onUpdateChecklists)
        }
        this.calculateProgress()
    }

    onUpdateChecklists = () => {
        const checklist = this.state.checklist
        this.props.onUpdateChecklists(checklist)
        this.calculateProgress()
    }

    calculateProgress() {

        if (!this.props.checklist) return this.setState({ progressbar: 0 })
        const todos = this.props.checklist.todos
        if (todos.length > 0) {
            const totalTodos = todos.length
            const isDones = (todos.filter((todo) => todo.isDone === true)).length
            const res = (isDones / totalTodos) * 100
            return this.setState({ progressbar: res.toFixed(2) })
        } return this.setState({ progressbar: 0 })
    }
    handleFocusOut = (title) => {
    let checklist = this.props.checklist   
    let updtTitle= this.props.checklist.title
    updtTitle=title
    checklist.title=updtTitle
    this.props.onUpdateChecklists(checklist)
    }

    render() {
        const { checklist } = this.props
        return (
            <div className="checklist-preview-div flex column">
                <div className="checklist-prev-header flex space-between">
                    <div className="flex align-center"><BiListUl style={{
                        marginRight: '5px', width: '18px',
                        height: '18px'
                    }} />

                        <EditableLabel text={checklist.title}

                            onFocusOut={this.handleFocusOut}
                            inputWidth='200px'
                            inputHeight='34px'
                            cursor='pointer'
                            labelFontSize='1.1rem'
                            inputFontWeight='400'
                            labelClassName='cd-subt' />


                    </div>
                        <button className="btn delete-checklist" onClick={() => this.props.removeChecklist()}>Delete Checklist</button>
                </div>
                <label htmlFor="progress-bar">Todos progress: {this.state.progressbar}%</label>
                <progress style={{ width: '50%' }} id="progress-bar" value={`${this.state.progressbar}`} max="100"></progress>
                <p className="cd-subt" style={{ fontSize: '0.95rem'}}>Your Todos:</p>
                <div className="grey-zone">
                    {checklist.todos && checklist.todos.map(todo => <TodoPreview key={todo.id} todo={todo} updateCheckbox={this.updateLocalChecklist} onRemoveTodo={this.onRemoveTodo} />)}
                    <button style={{
                        display: (this.state.isTodoEditShown) ? "none" : "block",
                        margin: '0', padding: '3px 6px '
                    }} onClick={() => { this.setState({ isTodoEditShown: true }) }} className="btn add-todo-btn">Add Todo</button>
                    {this.state.isTodoEditShown &&

                        <div>
                            <form onSubmit={this.onSubmit} action="">
                                <button onClick={() => this.setState({ isTodoEditShown: false })} className="btn" >X</button>
                                <label htmlFor="todo-title">Todo Title:</label>
                                <input onChange={this.onHandleInput} id="todo-title" type="text" />
                                <button className="btn" >Save</button>
                            </form>
                        </div>}
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardReducer.currBoard
    }
}
const mapDispatchToProps = {

}

export const ChecklistPreview = connect(mapStateToProps, mapDispatchToProps)(_ChecklistPreview)