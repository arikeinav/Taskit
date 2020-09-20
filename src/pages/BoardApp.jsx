import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BoardList } from '../cmps/BoardList'
import { loadBoards } from '../store/actions/boardActions'

class _BoardApp extends Component {


    componentDidMount() {
        this.props.loadBoards()
    }


    render() {
        const {boards} = this.props
        return (
            <div className="board-app flex">
                <div className="ba-sidebar flex column align-center justify-center ninetyVh twentyPw">
                    sidebar ** sidebar ** sidebar ** sidebar
                </div>
                <div className="ba-boards flex column ninetyVh eightyPw">
                <h1>Most popular templates</h1>
                <BoardList boards={boards} />
                </div>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
  
    return { boards: state.boardReducer.boards }
}

const mapDispatchToProps = {
    loadBoards
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)


