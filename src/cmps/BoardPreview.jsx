import React from "react";
import { Link } from "react-router-dom";

export default function BoardPreview({ board }) {
  return (
    <div>
     
      <Link to={`/board/${board._id}`}>
        <div
          style={
            (board.style && board.style.bgImg)
              ? {
                backgroundImage: `url(${board.style && board.style.bgImg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }
              : {
                backgroundColor: `${board.style.bgColor ? board.style.bgColor : "green"
                  }`,
              }
          }
          className="board-preview flex align-center"
        >
          <h3 style={{backgroundColor: 'rgb(1 139 152 / 15%)',
    height: '25px', width: '100%'}}>{board.title}</h3>


        </div>
      </Link>
      
    </div>
  );
}
