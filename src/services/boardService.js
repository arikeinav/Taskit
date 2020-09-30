import httpService from './httpService';

export const boardService = {
  query,
  loadBoard,
  removeBoard,
  update,
  getCardById,
  create,
  makeId,
  addActivity,
  removeActivities
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
function addActivity(board, ActivityType, changeIn, user) {
  if (!board.activities) {
    board.activities = []
  }
  const activities = board.activities
  activities.unshift({
    id: 'a' + makeId(),
    title: ActivityType,
    createdAt: new Date(),
    propertyTitle: changeIn.title,
    byMember: user
  })
  return board
}
function removeActivities(board) {
  board.activities = []
  return board
}
function makeId(length = 5) {
  var txt = '';
  var possible = '0123456789abcdefgABCDEFG';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}