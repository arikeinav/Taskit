
import httpService from './httpService';
import storageService from './asyncStorageService'
// const boards = require('../data.json').board
// const users = require('../data.json').user

export const boardService = {
  query,
  loadBoard,
  removeBoard,
  update,
  getCardById,
  create,
  makeId
};

function query(filterBy) {
  return httpService.get(`board`);
}
function loadBoard(boardId) {
  return httpService.get(`board/${boardId}`)
}
function update(board) {
  return httpService.put(`board/${board._id}`, board);
}
function removeBoard(boardId) {
  return httpService.delete(`board/${boardId}`);
}
function create(txt, imgUrl) {
  const board = _createBoard(txt, imgUrl)
  return httpService.post(`board`, board);
}
function _createBoard(txt, imgUrl) {
  return {
    title: txt,
    style: { bgImg: imgUrl },
    groups: [{
      id: 'g' + makeId(),
      title: "New List",
      cards: [
        {
          id: 'c' + makeId(),
          title: "New Card",
          description: "Add your description...",
        }
      ]
    }
    ]
  }
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