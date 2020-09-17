import React from 'react'

export class AddText extends React.Component {

    state = {
        text: ''
    }
    handleValueChange = (ev) => {
        const text = ev.target.value;
        this.setState({ text })
    }
    render() {
        const groupId = this.props.groupId;
        console.log("AddText -> render -> group", groupId)
        return (
            <div>
                <form onSubmit={() => this.props.onAdd(this.props.type, this.state.text)}>
                    <textarea placeholder="Group name"
                        type="text"
                        onChange={this.handleValueChange}
                        value={this.state.text}
                    />
                    <div className="flex">
                        <button className="btn" onClick={() => this.props.onAdd( this.props.type ,this.state.text, groupId)}>Add Group</button>
                        <button className="btn">X</button>
                    </div>
                </form>

            </div>
        )
    }
}
