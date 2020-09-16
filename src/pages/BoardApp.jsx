import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BoardList } from '../cmps/BoardList'
import { loadBoards } from '../store/actions/boardActions'

export class BoardApp extends Component {

    componentDidMount() {
        this.props.loadBoards()
    }


    render() {
        return (
            <div className="board-app">
                <h1>Most popular templates</h1>
                <BoardList boards={this.props.boards} />
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    boards: state.boardReducer.boards
})

const mapDispatchToProps = {
    loadBoards
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardApp)


