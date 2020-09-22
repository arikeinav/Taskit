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
                  backgroundColor: `${
                    board.style.bgColor ? board.style.bgColor : "green"
                  }`,
                }
          }
          className="board-preview grid"
        ><div className="board-preview-title-div">
        <h3>{board.title}</h3><div className="board-preview-fake-div">
            
            </div>
      </div>
          
        </div>
      </Link>
    </div>
  );
}
