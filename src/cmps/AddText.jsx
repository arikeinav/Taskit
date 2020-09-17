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
        this.props.type === 'Card' && this.props.doneAddCard()
        this.props.onAdd(this.props.type ,this.state.text, this.props.groupId)
        this.setState({ text:'' })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <textarea placeholder="Group name"
                        type="text"
                        onChange={this.handleValueChange}
                        value={this.state.text}
                    />
                    <div className="flex">
                        <button className="btn" onClick={this.onSubmit}>Add Group</button>
                        <button className="btn">X</button>
                    </div>
                </form>

            </div>
        )
    }
}
