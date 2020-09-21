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
        if(!this.state.text) return;
        (this.props.type === 'Card') && this.props.updateState('isAddCard', false)

        this.props.onAdd(this.props.type, this.state.text, this.props.groupId)
        this.setState({ text: '' })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input placeholder="Group name"
                        type="text"
                        onChange={this.handleValueChange}
                        value={this.state.text}
                    />
                    <div className="flex">
                        <button className="btn" onClick={this.onSubmit}>{this.props.type === 'Card' ? "Add Card" : "Add Group"}</button>
                        <button className="btn">X</button>
                    </div>
                </form>

            </div>
        )
    }
}
