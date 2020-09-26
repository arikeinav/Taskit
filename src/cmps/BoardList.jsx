import React from 'react'
import BoardPreview from './BoardPreview';



export function BoardList({ boards, onAddBoard }) {
  return <div>
    <h1>Your Boards:</h1>
  <div className="board-list grid">
    {boards.map(board => <BoardPreview board={board} key={board._id} />)}
    <div  onClick={onAddBoard} style={{backgroundColor:"yellow"}} className="board-preview  grid ">
   <h3>Create new board</h3 > 
      
    </div>
    </div>
  </div>
}
