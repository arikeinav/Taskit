import { boardService } from "../../services/boardService";
import socketService from "../../services/socketService";

export function loadBoards() {
  return async (dispatch) => {
    try {
      const boards = await boardService.query()
      dispatch({ type: "SET_BOARDS", boards });
    } catch (err) {
      console.log(`ERROR: while loading boards`)
    }
  };
}
export function loadBoard(boardId) {
  return async (dispatch) => {
    try {
      const board = await boardService.loadBoard(boardId)
      dispatch({ type: "SET_BOARD", board });
    } catch (err) {
      console.log(`ERROR: while loadding board`)
    }
  };
}
export function removeBoard(id) {
  return async (dispatch) => {
    try {
      await boardService.removeBoard(id)
      dispatch({ type: "REMOVE_BOARD", id });
    } catch (err) {
      console.log(`ERROR: while remove board`)
    }
  };
}
export function addBoard(txt, imgUrl) {
  return async (dispatch) => {
    try {
      const board = await boardService.create(txt, imgUrl)
      dispatch({ type: "ADD_BOARD", board });
    } catch (err) {
      console.log(`ERROR: while adding board`)
    }
  };
}
export function updateBoard(board) { //I'm updating the board
  return async (dispatch) => {
    dispatch({ type: "UPDATE_BOARD", board });
    try {
      await boardService.update(board)
      socketService.emit('update board', board);
    } catch (err) {
      console.log(`ERROR: while update board`)
    }
  };
}
export function updateBoardFromSocket(board) { //Someone else updated the board
  return (dispatch) => {
    dispatch({ type: "UPDATE_BOARD", board });
  };
}


// export function addActivity(board, ActivityType, changeIn) {
//   console.log('add activity');
//   board = boardService.addActivity(board, ActivityType, changeIn)
//   // updateBoard(board)

// }