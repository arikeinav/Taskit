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
    componentDidUpdate(prevProps, prevState) {
        console.log('am i changing??');
    }
    
    changeIsDetailsShown = (val) => {
        this.setState({ isDetailsShown: val})
    }
    onAddGroup = (board) => {
        const group = {title: 'new Grouppppp'}
        this.props.addGroup(board, group)
    }

    render() {
        const { board } = this.props
        if (board === null) return <div>Loading...</div>
        return (
            <div className="board-details ">
                <BoardHeader board={board} />
                <div className="groups-container flex">
                    {board.groups.map(group => <CardList group={group} key={group.id} changeIsDetailsShown={this.changeIsDetailsShown}/>)}
                    <button className="add-group btn" onClick={() => this.onAddGroup(board)}>Add Group</button>
                </div>
                {this.state.isDetailsShown.cardId && 
                <CardDetails cardId={this.state.isDetailsShown.cardId} groupId={this.state.isDetailsShown.groupId} changeIsDetailsShown={this.changeIsDetailsShown}/>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    board: state.boardReducer.currBoard
}}
const mapDispatchToProps = {
    loadBoard,
    updateBoard,
    removeGroup,
    addGroup,
    removeCard,
    addCard
}
export const BoardDetails = connect(mapStateToProps, mapDispatchToProps)(_BoardDetails)
