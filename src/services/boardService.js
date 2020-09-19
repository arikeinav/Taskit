
import httpService from './httpService';
const boards = require('../data.json').board

export const boardService = {
  query,
  loadBoard,
  removeBoard,
  save,
  getCardById,
  makeId
};

function loadBoard(boardId) {
  const board = boards.find(board => board._id === boardId)
  return board
  //   return httpService.get(`board/${boardId}`)
}



async function save(board) {
  return board
  // if (board._id) {
  //   return httpService.put(`board/${board._id}`, board);
  // }
  // else {
  //   const addedBoard = httpService.post(`board`, board);
  //   return addedBoard
  // }
}
function query(filterBy) {

  // var queryStr =''
  // if (filterBy)  queryStr = `?name=${filterBy.name}&type=${filterBy.type}&inStock=${filterBy.inStock}`;
  // return httpService.get(`board${queryStr|| ''}`);
  return boards
}

function removeBoard(boardId) {
  return httpService.delete(`board/${boardId}`);
}









function getCardById(board, groupId, cardId) {
  const group = board.groups.find(group => group.id === groupId)
  return group.cards.find(card => card.id === cardId)
}

function makeId(length = 5) {
  var txt = '';
  var possible = '0123456789abcdefgABCDEFG';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}