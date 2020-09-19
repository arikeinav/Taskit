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
        isAddGroup: false,
    }

    componentDidMount() {
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId)
    }

    componentDidUpdate(prevProps, prevState) {
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
        const { destination, source, draggableId } = result;
        const columns = this.props.board.groups// groups are called columns in this func
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const column = columns.find(column => column.id === source.droppableId);//finding the right group from the groups array
        //works great till here

        // const newTaskIds = [...column.cards];
        const newTaskIds = Array.from(column.cards);
        //problem is somewhere above this line
        const shiftedTask = newTaskIds.find(task => task.id === draggableId)//i added this code-line since the tutorial lacked it

        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, shiftedTask)//and this 'shiftedTask' var as well 


        const newColumn = {
            ...column,
            cards: newTaskIds,
        }

        const newGroups = Array.from(columns);
       

        const groupIdx = columns.findIndex(group => group.id === newColumn.id)

        //ok so now i have to repeat the same procedure as in line 69-70 
        newGroups.splice(groupIdx, 1 ,newColumn)

        const newState = {
            ...this.props.board,
            groups:newGroups
        }
        console.log('currBoard at gState is:',this.props.board);
        console.log('newState is:', newState);
        this.props.updateBoard(newState)//smth here is passed wrong, and causes an @@Object Object@@
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
