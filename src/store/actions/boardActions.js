import { boardService } from "../../services/boardService";
import socketService from "../../services/socketService";

export function loadBoards() {
  return async (dispatch) => {
    const boards = await boardService.query()
    dispatch({ type: "SET_BOARDS", boards });

  };
}
export function loadBoard(boardId) {
  return async (dispatch) => {
    const board = await boardService.loadBoard(boardId)
    dispatch({ type: "SET_BOARD", board });
  };
}
export function removeBoard(id) {
  return async (dispatch) => {
    await boardService.removeBoard(id)
    dispatch({ type: "REMOVE_BOARD", id });
  };
}
export function addBoard(txt, imgUrl) {
  return async (dispatch) => {
    const board = await boardService.create(txt, imgUrl)
    dispatch({ type: "ADD_BOARD", board });
  };
}
export function updateBoard(board) {
  socketService.emit('update board', board);
  return async (dispatch) => {
    board = await boardService.update(board)
    dispatch({ type: "UPDATE_BOARD", board });
  };
}
export function updateBoardFromSocket(board) {
  // socketService.broadcastEmit('update board', board); ???
  return async (dispatch) => {
    board = await boardService.update(board)
    dispatch({ type: "UPDATE_BOARD", board });
  };
}
