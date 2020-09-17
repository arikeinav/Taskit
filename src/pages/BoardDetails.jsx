import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoard, updateBoard, removeGroup, addGroup, removeCard, addCard } from '../store/actions/boardActions'
import { BoardHeader } from '../cmps/BoardHeader'
import { CardList } from '../cmps/CardList'
import { CardDetails } from '../cmps/CardDetails'
import { DragDropContext } from 'react-beautiful-dnd'
import { AddText } from '../cmps/AddText'


export class _BoardDetails extends Component {

    state = {
        isDetailsShown: false,
        isAddGroup: false
    }

    componentDidMount() {
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId)

    }

    updateState = (key, val) => {
        this.setState({ [key]: val })
    }
    onEditGroup = () => {
        this.setState({ isAddGroup: true })
    }
    onAdd = (type, text, groupId) => {
        if (type === 'Group') {
            this.setState({ isAddGroup: false })
            const group = { title: text }
            this.props.addGroup(this.props.board, group)
        } else if (type === 'Card') {
            const card = { title: text }
            this.props.addCard(this.props.board, groupId, card)
        }
    }
    onRemoveGroup = (groupId) => {
        this.props.removeGroup(this.props.board, groupId)
    }
    onRemoveCard = (cardId) => {
        this.props.removeCard(this.props.board, this.state.isDetailsShown.groupId, cardId)
    }

    onDragEnd = result => {
        //todo
    }

    render() {
        const { board } = this.props
        if (board === null) return <div>Loading...</div>
        return (
            <div className="board-details ">
                <BoardHeader board={board} />
                {this.state.isDetailsShown.cardId &&
                    <CardDetails cardId={this.state.isDetailsShown.cardId} groupId={this.state.isDetailsShown.groupId} changeIsDetailsShown={this.changeIsDetailsShown} />}
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="groups-container grid">
                        {board.groups.map(group => <CardList onAdd={this.onAdd} group={group} key={group.id} updateState={this.updateState} onRemoveGroup={this.onRemoveGroup} />)}
                        {this.state.isAddGroup ?
                            <AddText onAdd={this.onAdd} type="Group" groupId={null} />
                            :
                            <button className="add-group btn" onClick={() => this.onEditGroup()}>Add Group</button>
                        }
                    </div> </DragDropContext>
                {this.state.isDetailsShown.cardId &&
                    <CardDetails updateState={this.updateState} onRemoveCard={this.onRemoveCard} cardId={this.state.isDetailsShown.cardId} groupId={this.state.isDetailsShown.groupId} />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        board: state.boardReducer.currBoard
    }
}
const mapDispatchToProps = {
    loadBoard,
    updateBoard,
    removeGroup,
    addGroup,
    removeCard,
    addCard
}
export const BoardDetails = connect(mapStateToProps, mapDispatchToProps)(_BoardDetails)
