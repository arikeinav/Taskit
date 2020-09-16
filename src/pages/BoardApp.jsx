import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BoardList } from '../cmps/BoardList'
import { loadBoards } from '../store/actions/boardActions'

class _BoardApp extends Component {


    componentDidMount() {
        this.props.loadBoards()
        console.log('boards', this.props.boards);
    }


    render() {
        const {boards} = this.props
        return (
            <div className="board-app">
                <h1>Most popular templates</h1>
                <BoardList boards={boards} />
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    console.log('state:',state);
    return { boards: state.boardReducer.boards }
}

const mapDispatchToProps = {
    loadBoards
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)


