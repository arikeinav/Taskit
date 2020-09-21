
// import httpService from './httpService';
import storageService from './asyncStorageService'
// const boards = require('../data.json').board
// const users = require('../data.json').user

export const boardService = {
  query,
  loadBoard,
  removeBoard,
  save,
  getCardById,
  makeId
};

function loadBoard(boardId) {
 
  return storageService.get('board', boardId)
  //   return httpService.get(`board/${boardId}`)
  
}

async function save(board) {
 
   if (board._id)  {
      return storageService.put('board', board)
    }
    // return httpService.put(`board/${board._id}`, board);
  
  else {
    
    
    const addedBoard = storageService.post('board', board);
    return addedBoard
    //   const addedBoard = httpService.post(`board`, board);
    // return addedBoard
  }
}
  
  
 
  

function query(filterBy) {
  // localStorage.setItem('board', JSON.stringify(boards))
  // localStorage.setItem('user', JSON.stringify(users))

 
  

  return storageService.query('board')
  // var queryStr =''
  // if (filterBy)  queryStr = `?name=${filterBy.name}&type=${filterBy.type}&inStock=${filterBy.inStock}`;
  // return httpService.get(`board${queryStr|| ''}`);
}

function removeBoard(boardId) {
  return storageService.remove('board', boardId)

  // return httpService.delete(`board/${boardId}`);
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