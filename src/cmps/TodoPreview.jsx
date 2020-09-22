import React, { Component } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import Checkbox from '@material-ui/core/Checkbox';


export default class TodoPreview extends Component {
    state={
        todo:{
            title:'',
            isDone:''
        }
    }
    
    componentDidMount() {
       this.setState({todo:this.props.todo}) 
    }
    
    onInputChange =(ev)=>{
        ev.preventDefault()
        // console.log(ev);
    }

    onCheckboxChange =()=>{
        const bool = (this.state.todo.isDone)? false:true;
        this.setState(prevState => ({
            todo: {
                ...prevState.todo,
                isDone:bool
               
            }
        }), console.log(this.state))
    }
    render() {
        const { todo } = this.props
        return (
            <div className="flex">

                <form className="flex align-center space-between hundredPw" action="">
                    
                    <div className="flex align-center">
                        <button className="btn todo-btn-trash" onClick={()=>{this.props.onRemoveTodo(todo.id)}}><FaTrashAlt/></button>
        

                        {/* <span className="checkbox-span" onClick={()=>this.onCheckboxChange()}><input type="checkbox" className="checkbox-mu" defaultChecked={(this.state.todo.isDone)?true:false}/> </span> */}
                        <p className={`todo-title ${this.state.todo.isDone===true ? "line-through":"text-dec-none"}`}  onClick={()=>this.onCheckboxChange()}>{todo.title}</p>
                    </div>
                   
                </form>
            </div>
        )
    }
}
