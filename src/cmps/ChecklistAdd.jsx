import React, { Component } from 'react'
import { boardService } from '../services/boardService.js'

export default class ChecklistAdd extends Component {

    state = {
        checklist: {
            id: '',
            title: '',
            todos: []
        }
    }
// componentDidUpdate(prevProps, prevState) {
//     console.log('YOUR STATE:', this.state.checklist);
// }


    handleChange = (ev) => {

        const title = ev.target.value
        this.setState(prevState => ({
            checklist: {
                ...prevState.checklist,
                title
            }
        }))
    }

    onSubmit = (ev) => {
        ev.preventDefault()

        const id = boardService.makeId()
        this.setState(prevState => ({
            checklist: {
                ...prevState.checklist,
                id,
            }
        }), () => { this.props.addNewChecklist(this.state.checklist) })
      
    }
  
    
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} action="">
                    <label htmlFor="">New Checklist Title:</label>
                    <input  onChange={this.handleChange} type="text" />
                    <button className="btn">Add</button>
                </form>
            </div>
        )
    }
}
