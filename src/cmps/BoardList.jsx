import React from 'react'
import BoardPreview from './BoardPreview';



export function BoardList({ boards, onAddBoard }) {
  return <div className="board-list grid">
{/* <h1>Your Boards</h1> */}
<div className="boards-note">
      <h3>Your Boards:</h3>
    </div>
    {boards.map(board => <BoardPreview board={board} key={board._id} />)}
    <div  onClick={onAddBoard} className="add-note board-preview  grid">
   <h3>Create new board</h3 > 
      
    </div>

  </div>
}
