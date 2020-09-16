import React from 'react'
import BoardPreview from './BoardPreview';


export function BoardList({boards}) {
    console.log(boards);
    return <div className="board-list grid">
           { boards.map(board => <BoardPreview  board={ board } key={ board._id } />)}
        </div>
}
