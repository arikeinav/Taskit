import React, { Component } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import Checkbox from '@material-ui/core/Checkbox';


export default class TodoPreview extends Component {
    state={
        todo:{
            title:'',
            isDone:false
        }
    }
    
    componentDidMount() {
       this.setState({todo:this.props.todo}) 
    }
    
    onInputChange =(ev)=>{
        ev.preventDefault()
        console.log(ev);
    }

    render() {
        const { todo } = this.props
        return (
            <div className="flex">

                <form className="flex align-center space-between hundredPw" action="">
                    <div className="flex align-center" > <Checkbox checked={todo.isDone ? true:false} />
                    {/* <div className="flex align-center" > <input onChange={this.onInputChange} type="checkbox" checked={todo.isDone ? true:false} ></input> */}
                        <p className="todo-title" style={{ marginInlineStart: '4px' }}>{todo.title}</p>
                    </div>
                    <div><button className="btn todo-btn-trash" onClick={()=>{this.props.onRemoveTodo(todo.id)}}><FaTrashAlt/></button>
                    </div>
                </form>
            </div>
        )
    }
}
