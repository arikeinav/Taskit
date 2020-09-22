import React, { Component } from 'react'
import { connect } from 'react-redux'
import TodoPreview from './TodoPreview'
import { boardService } from '../services/boardService.js'

export class _ChecklistPreview extends Component {

    state = {
        checklist: {},
        isTodoEditShown: '',
        newTodo: {
            title: '',
            id: '',
            isDone: false
        }
    }

    componentDidMount() {
        this.setState({ checklist: this.props.checklist })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state.checklist);

    }

    onRemoveTodo = (todoId) => {
        const todos = this.state.checklist.todos
        // console.log(todos);
        const todoIdx = todos.findIndex(todo => todo.id === todoId)
        todos.splice(todoIdx, 1)
        this.setState(prevState => ({
            checklist: {
                ...prevState.checklist,
                todos
            }
        }))
        this.props.onUpdateChecklists(this.state.checklist)
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

    onSubmit = () => {

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
    updateLocalChecklist = () => {
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

    onUpdateChecklists = () => {
        const checklist = this.state.checklist
        this.props.onUpdateChecklists(checklist)//final stage of updating the checklist, sending it to parent-cmp
    }



    render() {
        const { checklist } = this.props
        return (
            <div className="checklist-preview-div flex column">
                <div className="checklist-prev-header flex space-between">
                    <h3 style={{ textDecoration: 'underline' }}>{checklist.title}</h3>
                    <button className="btn" onClick={() => this.props.removeChecklist()}>Delete Checklist</button>
                </div>
                <h4>Your Todos:</h4>
                {checklist.todos && checklist.todos.map(todo => <TodoPreview key={todo.id} todo={todo} onRemoveTodo={this.onRemoveTodo} />)}
                <button onClick={() => { this.setState({ isTodoEditShown: true }) }} className="btn">Add Todo</button>
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