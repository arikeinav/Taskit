import React from 'react'
import BoardPreview from './BoardPreview';



export function BoardList({ boards, onAddBoard }) {
  return <div>
   
  <div dir="rtl" className="board-list grid">
    {boards.map(board => <BoardPreview board={board} key={board._id} />)}
    <div  onClick={onAddBoard} style={{backgroundColor:"none", cursor: "pointer"}} className="board-preview grid ">
   <h3 style={{paddingTop:'23px'}}>Create new board</h3 > 
    </div>
    </div>
  </div>
}
