
import httpService from './httpService';
const boards = require('../data.json').board

export const boardService = {
  query,
  getById,
  removeBoard,
  save,
};

function getById(boardId) {
    return boards
//   return httpService.get(`board/${boardId}`)
}

async function save(board) {
 
  if (board._id) {
    console.log('board')
    return  httpService.put(`board/${board._id}`, board);
  } 
  else {
 
  const addedBoard  =  httpService.post(`board`, board);
  return  addedBoard
}
}
function query(filterBy) {
  console.log(boards);
  // var queryStr =''
  // if (filterBy)  queryStr = `?name=${filterBy.name}&type=${filterBy.type}&inStock=${filterBy.inStock}`;
  // return httpService.get(`board${queryStr|| ''}`);
  return boards
}

function removeBoard(boardId) {
  return httpService.delete(`board/${boardId}`);
}