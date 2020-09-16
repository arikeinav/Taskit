import React, { Component } from 'react'
import { connect } from 'react-redux'


import { loadBoard, updateBoard, removeGroup, addGroup, removeCard, addCard } from '../store/actions/boardActions'
import { BoardHeader } from '../cmps/BoardHeader'
import { CardList } from '../cmps/CardList'
import { CardDetails } from '../cmps/CardDetails'


export class _BoardDetails extends Component {

    state = {
        isDetailsShown: false
    }

    componentDidMount() {
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId)
    }
    changeIsDetailsShown = (val) => {
        this.setState({ isDetailsShown: val})
    }


    render() {
        const { board } = this.props
        if (board === null) return <div>Loading...</div>
        return (
            <div className="board-details ">
                <BoardHeader board={board} />
                <div className="groups-container flex">
                    {board.groups.map(group => <CardList group={group} key={group.id} changeIsDetailsShown={this.changeIsDetailsShown}/>)}
                    <button className="add-group">Add Group</button>
                </div>
                {this.state.isDetailsShown && <CardDetails cardId={this.state.isDetailsShown}/>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    board: state.boardReducer.currBoard

})
const mapDispatchToProps = {
    loadBoard,
    updateBoard,
    removeGroup,
    addGroup,
    removeCard,
    addCard
}
export const BoardDetails = connect(mapStateToProps, mapDispatchToProps)(_BoardDetails)
