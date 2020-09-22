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

    componentDidUpdate(prevProps, prevState) {
        // console.log('onUpdate checklist:', this.state.checklist);

    }

    onUpdateChecklist = (checklist) => {
        // console.log('checklist:', checklist);//add the updated checklist from child to this.state.checklists array and then send it to 

        this.props.saveChecklist(checklist)
    }
  

    render() {

        const { checklist } = this.props
        // console.log('checklist', checklist)
        return (
            <div>
                { this.props.checklist.title && <ChecklistPreview removeChecklist={this.props.removeChecklist} onUpdateChecklists={this.onUpdateChecklist} checklist={checklist} key={checklist.id} />}
            </div>
        )
    }
}
