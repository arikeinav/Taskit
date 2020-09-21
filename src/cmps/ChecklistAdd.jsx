import React, { Component } from 'react'
import { boardService } from '../services/boardService.js'

export default class ChecklistAdd extends Component {

    state = {
        checklists: [
             {
                id: '',
                title: '',
                todos: []
            }
        ]
    }

componentDidUpdate(prevProps, prevState) {
    console.log(this.state.checklists);
}

    handleChange = (ev) => {
        const title = ev.target.value
        const checklists = JSON.parse(JSON.stringify(this.state.checklists))
        checklists[0].title = title
        this.setState(checklists)
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const id = boardService.makeId()
        this.setState(prevState => ({
            checklist: {
                ...prevState.checklist,
                id,
            }
        }), () => { this.props.saveChecklist(this.state.checklist) })

    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} action="">
                    <label htmlFor="">New Checklist Title:</label>
                    <input onChange={this.handleChange} type="text" />
                    <button className="btn">Add</button>
                </form>
            </div>
        )
    }
}
