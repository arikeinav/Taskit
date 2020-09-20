import React, { Component } from 'react'
import { ChecklistPreview } from './ChecklistPreview'


export class Checklist extends Component {
    state = {
        checklists: []
    }

    componentDidMount() {
        const checklists = this.props.checklists
        this.setState({ checklists })
        console.log('CHECKLISTS before SPLICING!',this.state.checklists);
    }

    onUpdateChecklists = (checklist) => {
        console.log('checklist:',checklist);//add the updated checklist from child to this.state.checklists array and then send it to parent cmp via this.props.saveChecklists(checklists)
        console.log('checklists:',this.state.checklists);
        const checklists = this.state.checklists
        const idx = checklists.findIndex(entity => entity.id === checklist.id)
        checklists.splice(idx,1,checklist)
        console.log('THESE ARE THE SPLICED CHECKLISTS!',checklists);
        this.props.saveChecklist(checklists)
    }

    render() {

        const { checklists } = this.props
        return (
            <div>
                {checklists.map((checklist) => <ChecklistPreview onUpdateChecklists={this.onUpdateChecklists} checklist={checklist} key={checklist.id} />)}
            </div>
        )
    }
}
