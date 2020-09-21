import React from 'react'
import BoardPreview from './BoardPreview';


export function BoardList({boards,onAddBoard}) {
    return <div className="board-list grid">
         
           { boards.map(board => <BoardPreview  board={ board } key={ board._id } />)}
       <div style={{backgroundColor:'gray'}} onClick={onAddBoard}  className="board-preview  grid">
          <h3>Create</h3> 
        </div>
        
        </div>
}
