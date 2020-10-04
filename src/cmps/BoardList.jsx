import React from 'react'
import BoardPreview from './BoardPreview';



export function BoardList({ boards, onAddBoard, isTemplate }) {
  return <div>

    <div dir="rtl" className="board-list grid">
      {boards.map(board => { 
        if(board.isTemplate === isTemplate) return <BoardPreview board={board} key={board._id} />})}
 
  {!isTemplate && <div onClick={onAddBoard} style={{ backgroundColor: "none", cursor: "pointer" }} className="board-preview grid ">
        <h3 style={{ paddingTop: '10px' }}>Create new board</h3 >
      </div>}
    </div>
  </div>
}
