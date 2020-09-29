import React from 'react'

export class AddText extends React.Component {

    state = {
        text: ''
    }
    handleValueChange = (ev) => {
        const text = ev.target.value;
        this.setState({ text })
    }
    onSubmit = (ev) => {
        ev.preventDefault();
        if (!this.state.text) return;
        (this.props.type === 'Card') && this.props.updateState('isAddCard', false)

        this.props.onAdd(this.props.type, this.state.text, this.props.groupId)
        this.setState({ text: '' })
    }
    onRemoveTextEditor = () => {
        let isAddType = (this.props.type==='Card')?'isAddCard':'isAddGroup'
        this.props.updateState (isAddType, false)
        this.setState({ text: '' })
    }

    render() {
        return (
            <div className="adding-div flex column">
                <form onSubmit={this.onSubmit}>
                    
                   
                    <input className="title-input" placeholder={this.props.type === 'Card' ? "Card name" : "List name"}
                        type="text"
                        onChange={this.handleValueChange}
                        value={this.state.text}
                        autoFocus
                    />
                    <div className="flex">
                        <button className="btn" onClick={this.onSubmit}>{this.props.type === 'Card' ? "Add Card" : "Add List"}</button>
                        <button className="btn cancel-add" onClick={this.onRemoveTextEditor}>X</button>
                    </div>
                    
               
                </form>

            </div>
        )
    }
}
