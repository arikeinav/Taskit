import React, { Component } from "react";
import { connect } from "react-redux";
import StickyBox from "react-sticky-box";


import { loadBoard, updateBoard, updateBoardFromSocket } from "../store/actions/boardActions";
import { BoardHeader } from "../cmps/BoardHeader";
import { CardList } from "../cmps/CardList";
import { CardDetails } from "../cmps/CardDetails";
import { DragDropContext } from "react-beautiful-dnd";
import { AddText } from "../cmps/AddText";
import { boardService } from "../services/boardService";
import socketService from '../services/socketService';




export class _BoardDetails extends Component {
  state = {
    isDetailsShown: false,
    isAddGroup: false,
    board: null,
  };

  componentDidMount() {
    const { boardId } = this.props.match.params;
    this.props.loadBoard(boardId);
    socketService.setup();
    socketService.emit('connect to board', boardId);
    socketService.on('send updated board', this.props.updateBoardFromSocket);
  }

  componentWillUnmount() {
    socketService.terminate();
  }

  updateState = (key, val) => {
    this.setState({ [key]: val });
  };
  onEditGroup = () => {
    this.setState({ isAddGroup: true });
  };

  onAdd = (type, text, groupId) => {
    const newboard = { ...this.props.board };
    const groupIdx = newboard.groups.findIndex((group) => group.id === groupId);
    if (type === "Group") {
      this.setState({ isAddGroup: false });
      const group = { id: "g" + boardService.makeId(), title: text, cards: [] };
      newboard.groups.push(group);
      this.props.updateBoard(newboard);
    } else if (type === "Card") {
      const card = { id: "c" + boardService.makeId(), title: text };
      newboard.groups[groupIdx].cards.push(card);
      this.props.updateBoard(newboard);
    }
  };

  updateState = (key, val) => {
    this.setState({ [key]: val })
  }
  onEditGroup = () => {
    this.setState({ isAddGroup: true })
  }
  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    const columns = this.props.board.groups// groups are called columns in this func
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = columns.find(start => start.id === source.droppableId);//finding the group from which a drag was started
    const finish = columns.find(finish => finish.id === destination.droppableId);//finding the group from which a drag was ended

    if (start === finish) {//in-group movements of cards
      const newTaskIds = Array.from(start.cards);
      const shiftedTask = newTaskIds.find(task => task.id === draggableId)//i added this code-line since the tutorial lacked it

      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, shiftedTask)//and this 'shiftedTask' var as well 


      const newColumn = {
        ...start,
        cards: newTaskIds,
      }

      const newGroups = Array.from(columns);


      const groupIdx = columns.findIndex(group => group.id === newColumn.id)

      //ok so now i have to repeat the same procedure as in line 69-70 
      newGroups.splice(groupIdx, 1, newColumn)

      const newState = {
        ...this.props.board,
        groups: newGroups
      }
      this.props.updateBoard(newState)//smth here is passed wrong, and causes an @@Object Object@@
      return;
    }
    // inter-groups-movement of cards:
    const startTaskIds = Array.from(start.cards); //array-copy of the cards at the start-column
    const shiftedTask = startTaskIds.find(task => task.id === draggableId)//(my-code) targeting the card i wish to DND and putting it as a var
    startTaskIds.splice(source.index, 1);//cutting one card out at the start-column
    const newStart = {
      ...start,
      cards: startTaskIds
    } // creating a start column variable that is spread and also updated with cards (one card less..)


    const finishtaskIds = Array.from(finish.cards);
    finishtaskIds.splice(destination.index, 0, shiftedTask)
    const newFinish = {
      ...finish,
      cards: finishtaskIds
    }

    const newGroups = Array.from(columns);
    //here i need to prepare the final stage where i take the groups array, and make it updated. then i could send it to the newState.
    const startGroupIdx = newGroups.findIndex(group => group.id === newStart.id)
    const finishGroupIdx = newGroups.findIndex(group => group.id === newFinish.id)

    newGroups.splice(startGroupIdx, 1, newStart)
    newGroups.splice(finishGroupIdx, 1, newFinish)

    const newState = {
      ...this.props.board,
      groups: newGroups
    }
    // console.log('newstate after INTER-GROUPS movement is:', newState);
    this.props.updateBoard(newState)//smth here is passed wrong, and causes an @@Object Object@@
    return;
  }
  onRemoveGroup = (groupId) => {
    var newboard = { ...this.props.board };
    newboard.groups = newboard.groups.filter((group) => group.id !== groupId);
    this.props.updateBoard(newboard);
  };
  onRemoveCard = (cardId) => {
    var newboard = JSON.parse(JSON.stringify(this.props.board));
    const groupIdx = newboard.groups.findIndex(
      (group) => group.id === this.state.isDetailsShown.groupId
    );
    const newCards = Array.from(newboard.groups[groupIdx].cards);
    const cardIdx = newCards.findIndex((card) => card.id === cardId);
    newCards.splice(cardIdx, 1);
    newboard.groups[groupIdx].cards = newCards;
    this.props.updateBoard(newboard);
  };

  render() {
    const { board } = this.props
    if (board === null) return <div>Loading...</div>
    return (
      <div className="board-details " style={{ backgroundImage: `url(${board.style.bgImg ? board.style.bgImg : ''})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", minHeight: "90vh", backgroundColor: `${board.style.bgColor ? board.style.bgColor : ''}` }} >

        <BoardHeader board={board} />


        <DragDropContext onDragEnd={this.onDragEnd}>
          <StickyBox className="groups-container flex">

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                overflowY: "hidden",
                whiteSpace: "nowrap",
                listStyleType: "none",
                paddingRight: "20px",
                flexWrap: "nowrap",
                height: "86vh",
                justifyItems: "center"
              }}
            >
              {board.groups.map(group => <CardList onAdd={this.onAdd} group={group} key={group.id} updateState={this.updateState} onRemoveGroup={this.onRemoveGroup} />)}
              {this.state.isAddGroup ?
                <AddText onAdd={this.onAdd} type="Group" groupId={null} />
                :
                <button className="add-group btn" onClick={() => this.onEditGroup()}>Add List</button>
              }
            </div>
          </StickyBox>
        </DragDropContext>

        {this.state.isDetailsShown.cardId &&
          <CardDetails updateState={this.updateState} onRemoveCard={this.onRemoveCard} cardId={this.state.isDetailsShown.cardId} groupId={this.state.isDetailsShown.groupId} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    board: state.boardReducer.currBoard,
  };
};
const mapDispatchToProps = {
  loadBoard,
  updateBoard,
  updateBoardFromSocket
};
export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
