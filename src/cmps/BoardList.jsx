import React from 'react'
import BoardPreview from './BoardPreview.jsx'

export  function BoardList(boards, onRemove) {
    return (
        <div>
           { boards.map(board => <BoardPreview onRemove={onRemove} board={ board } key={ board._id } />)}
        </div>
    )
}
