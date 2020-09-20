import { boardService } from "../../services/boardService";

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

// export function removeGroup(board, groupId) {
//   console.log('removeGroup')
//   return async (dispatch) => {
//     board = await boardService.removeGroup(board._id, groupId)
//     dispatch({ type: "UPDATE_BOARD", board });

//   };
// }

// export function addGroup(board, group) {
//   console.log('addGroup')
//   return async (dispatch) => {
//     board = await boardService.addGroup(board._id, group)
//     dispatch({ type: "UPDATE_BOARD", board });

//   };
// }
// export function removeCard(board, groupId, cardId) {
//   console.log('removeCard')
//   return async (dispatch) => {
//     board = await boardService.removeCard(board._id, groupId, cardId)
//     dispatch({ type: "UPDATE_BOARD", board });
//   };
// }

// export function addCard(board, groupId, card) {
//   console.log('addCard')

//   return async (dispatch) => {
//     board = await boardService.addCard(board._id, groupId, card)
//     dispatch({ type: "UPDATE_BOARD", board });
//   };
// }

// export function updateCard(board, groupId, card) {
//   console.log('updateCard')

//   return async (dispatch) => {
//     board = await boardService.updateCard(board._id, groupId, card)
//     dispatch({ type: "UPDATE_BOARD", board });
//   };
// }

// export function addImgToCard(board, groupId, card, imgUrl) {
//   return async (dispatch) => {
//     board = await boardService.addImgToCard(board._id, groupId, card, imgUrl)
//     dispatch({ type: "UPDATE_IMG_TO_CARD", board });
//   };
// }