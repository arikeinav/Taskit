import { boardService } from "../../services/boardService";

export function loadBoards() {
  return async (dispatch) => {
    const boards = await boardService.query()
    console.log('in actions', boards);
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

export function addBoard(board) {
  return async (dispatch) => {
    await boardService.save(board)
    dispatch({ type: "ADD_BOARD", board });

  };
}

export function updateBoard(board) {
  return async (dispatch) => {
    board = await boardService.save(board)
    dispatch({ type: "UPDATE_BOARD", board });

  };
}

export function removeGroup(board, groupId) {
  return async (dispatch) => {
    board = await boardService.removeGroup(board._id, groupId)
    dispatch({ type: "UPDATE_BOARD", board });

  };
}

export function addGroup(board, group) {
  return async (dispatch) => {
    board = await boardService.addGroup(board._id, group)
    dispatch({ type: "UPDATE_BOARD", board });

  };
}
export function removeCard(board, groupId, cardId) {
  return async (dispatch) => {
    board = await boardService.removeCard(board._id, groupId, cardId)
    dispatch({ type: "UPDATE_BOARD", board });
  };
}

export function addCard(board, groupId, card) {
  console.log("addCard -> card", card)
  console.log("addCard -> groupId", groupId)
  console.log("addCard -> board", board)
  return async (dispatch) => {
    board = await boardService.addCard(board._id, groupId, card)
    dispatch({ type: "UPDATE_BOARD", board });
  };
}