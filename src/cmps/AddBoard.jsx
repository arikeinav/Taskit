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
                    <input className="board-name-input" placeholder=" Enter Board name"
                        type="text"
                        onChange={this.handleValueChange}
                        value={this.state.text}
                    />
                    <div><AddImg isForBoard={this.props.isForBoard} onAddimg={this.onAddimg} /></div>
                    <div className="flex">
                        <button className="btn" style={{marginTop:'10px'}} >Add Board</button>
                        {this.state.imgUrl && <img className="img-preview" src={this.state.imgUrl} alt="Loading" />}
                    </div>

                </form>

            </div>
        )
    }
}