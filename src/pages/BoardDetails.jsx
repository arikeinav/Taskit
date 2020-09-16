import React, { Component } from 'react'
import { connect } from 'react-redux'


// import { GroupList } from '../cmps/GroupList'
import { loadBoard } from '../store/actions/boardActions'
import { BoardHeader } from '../cmps/BoardHeader'

export class BoardDetails extends Component {



    async componentDidMount() {
        const { boardId } = this.props.match.params
        console.log("BoardDetails -> componentDidMount -> boardId", boardId)
        // const board = await boardService.getById(boardId)
    }

    render() {
        const { board } = this.props
        console.log("BoardDetails -> render -> board", board)
        return (
            <div className="board-details">
                <BoardHeader />
                {/* <BoardHeader board={board}/> */}
                {/* <GroupList group={group} /> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    board: state.boardReducer.currBoard

})

const mapDispatchToProps = {
    loadBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardDetails)
