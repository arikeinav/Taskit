import React, { useRef, useEffect, useState } from "react";
import { cloudinaryService } from "../services/cloudinaryService";
import { CirclePicker } from "react-color";

function Canvas({ updateState, card }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(null);
 

  useEffect( () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 300;
    context.lineCap = "round";
    context.strokeStyle = setColor('black');
    context.lineWidth = 3;
    contextRef.current = drawImg(context,canvas)
    
  },[])

  const startDrawing = ({ nativeEvent }) => {
    contextRef.current.strokeStyle = color;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const closeCanvas = () => {
    updateState("isCanvas", false);
  };

  const addCanvasToCard = async () => {
    const canvas = canvasRef.current;
    card.imgUrl = canvas.toDataURL();
    var file = cloudinaryService.dataURLtoFile(card.imgUrl, "canvas.png");
    card.imgUrl = await cloudinaryService.uploadCanvasImg(file);
    closeCanvas();
    return card;
  };

  const changeStrokeStyle = (color) => {
    setColor(color.hex);
  };

  const drawImg=(context,canvas)=>{
    const img = new Image();
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.crossOrigin = "Anonymous";
    img.src = card.imgUrl;
    return context
  }
  const startTouchDrawing = ({ nativeEvent }) => {
    console.log(nativeEvent);
    
      
    
      
    
    //  nativeEvent.preventDefault()
    contextRef.current.strokeStyle = color;
    const { clientX, clientY } = nativeEvent.touches[0];
    contextRef.current.beginPath();
    contextRef.current.moveTo(clientX-25, clientY-100);
    setIsDrawing(true);
  };
  const touchdraw = ({ nativeEvent }) => {
    console.log(nativeEvent);
    
      
   
    if (!isDrawing) {
      return;
    }
    const { clientX, clientY } = nativeEvent.touches[0];
    contextRef.current.lineTo(clientX-25, clientY-100 );
    contextRef.current.stroke();
  };


 

  return (
    <div className="canvas-wrapper" onClick={closeCanvas}>
      <div
        className="canvas-modal-content flex column justify-center space-evenly "
        onClick={(nativeEvent) => nativeEvent.stopPropagation()}
      >
        <canvas
        
          style={{ marginBottom: "10px" }}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          onTouchStart={startTouchDrawing}
          onTouchEnd={finishDrawing}
          onTouchMove={touchdraw}
          ref={canvasRef}
        />
        <CirclePicker
          className="self-center"
          onChange={changeStrokeStyle}
          colors={[
            "#000000",
            "#0050fb",
            "#ff0000",
            "#00ff2b",
            "#fdff00",
            "#533829",
          ]}
        />
        <button className="btn" onClick={addCanvasToCard}>
          save canvas
        </button>
      </div>
    </div>
  );
}

export default Canvas;
