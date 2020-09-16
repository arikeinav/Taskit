import { boardService } from "../../services/boardService";

export function loadBoards(filterBy) {
  return async (dispatch) => {
    const boards = await boardService.query(filterBy)
      dispatch({ type: "SET_BOARDS", boards });
   
  };
}
export function loadBoard(boardId) {
  return async (dispatch) => {
    const board = await boardService.getById(boardId)
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