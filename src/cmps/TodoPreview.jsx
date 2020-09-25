import React, { Component } from 'react'
import { FiDelete } from "react-icons/fi";


export default class TodoPreview extends Component {
    state={
        todo:{
            title:'',
            isDone:'',
            id:''
        }
    }

    componentDidMount() {
        this.setState({ todo: this.props.todo })
    }

    onInputChange = (ev) => {
        ev.preventDefault()
    }

    onCheckboxChange = () => {
        const bool = (this.state.todo.isDone) ? false : true;
        this.setState(prevState => ({
            todo: {
                ...prevState.todo,
                isDone: bool

            }
        }), () => {this.props.updateCheckbox(this.state.todo)})
    }
    render() {
        const { todo } = this.props
        return (
            <div className="flex">

                <form className="flex align-center space-between hundredPw" action="">


                        <p className={`todo-title ${this.state.todo.isDone === true ? "line-through" : "text-dec-none"}`} onClick={() => this.onCheckboxChange()}>{todo.title}</p>
                    {/* <div className="flex align-center space-between"> */}
                       < FiDelete className="todo-btn-delete" onClick={() => { this.props.onRemoveTodo(todo.id) }} />
                    {/* </div> */}

                </form>
            </div>
        )
    }
}
