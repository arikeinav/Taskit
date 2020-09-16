import React from 'react'
import {Link} from 'react-router-dom'

export default function BoardPreview({board}) {


    return (
       <div><Link to={`/board/${board._id}`}>
       <div style={{backgroundColor:`${board.style.bgColor}`}} className="board-preview grid">
          <h3>{board.title}</h3> 
        </div>
        </Link></div>
    )
}
