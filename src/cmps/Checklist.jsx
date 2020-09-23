import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { ChecklistPreview } from './ChecklistPreview'



export class Checklist extends Component {
    state = {
        checklist: {},


    }

    componentDidMount() {
        const checklist = this.props.checklist
        this.setState({ checklist })
    }

    onUpdateChecklist = (checklist) => {
        this.props.saveChecklist(checklist)
    }


    render() {

        const { checklist } = this.props
        return (
            <div>
                { this.props.checklist.title && <ChecklistPreview updateProgress={this.props.updateProgress} removeChecklist={this.props.removeChecklist} onUpdateChecklists={this.onUpdateChecklist} checklist={checklist} key={checklist.id} />}
            </div>
        )
    }
}
