import React from 'react'
import { AddImg } from './AddImg';

export class AddBoard extends React.Component {

    state = {
        text: '',
        imgUrl: ''
    }
    handleValueChange = (ev) => {
        const text = ev.target.value;
        this.setState({ text })
    }
    onSubmit = (ev) => {
        ev.preventDefault();
        this.props.saveBoard(this.state.text, this.state.imgUrl)
        this.setState({ text: '', imgUrl: '' })
    }

    onAddimg = (imgUrl) => {
        this.setState({ imgUrl: imgUrl })

    }
    render() {

        return (
            <div>
                <form className="add-board-form flex column" onSubmit={this.onSubmit}>
                    <input className="board-name-input" placeholder="Board name"
                        type="text"
                        onChange={this.handleValueChange}
                        value={this.state.text}
                    />
                    <AddImg isForBoard={this.props.isForBoard} onAddimg={this.onAddimg} />
                    <div className="flex">
                        <button className="btn" >Add Board</button>
                        {this.state.imgUrl && <img className="img-board-preview" src={this.state.imgUrl} alt="Loading" />}
                    </div>

                </form>

            </div>
        )
    }
}