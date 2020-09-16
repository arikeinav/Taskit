import React, { Component } from 'react'
import { connect } from 'react-redux'

export class BoardHeader extends Component {
    render() {
        return (
            <div className="board-header">
                {/* <p>{board.title}</p> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // board = state.boardReducer.currBoard
    }
}
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(BoardHeader)
