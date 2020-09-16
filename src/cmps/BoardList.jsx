import React from 'react'
import BoardPreview from './BoardPreview.jsx'

export  function BoardList(boards) {
    console.log(boards);
    return (
        
        <div>
           { boards.map(board => <BoardPreview  board={ board } key={ board._id } />)}
        </div>
    )
}
