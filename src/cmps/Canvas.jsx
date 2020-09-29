import React, { useRef, useEffect, useState } from 'react';
import { cloudinaryService } from '../services/cloudinaryService'
import { CirclePicker } from "react-color";

function Canvas({updateState,card}) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor]=useState(null)


  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 300
    canvas.height = 300;
    const context = canvas.getContext("2d")
    const img = new Image()
    img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
    img.crossOrigin = 'Anonymous'
    img.src =card.imgUrl
    context.lineCap = "round"
    context.strokeStyle = color
    context.lineWidth = 3
    contextRef.current = context;
    
    
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const startDrawing = (ev,{nativeEvent}) => {
    ev.preventDefault()
    contextRef.current.strokeStyle = color
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = (ev) => {
    ev.preventDefault()
   contextRef.current.closePath()
   setIsDrawing(false)
  }

  const closeCanvas =()=>{
    updateState('isCanvas', false)
  }
  
 const addCanvasToCard = async () => { 
const canvas = canvasRef.current
card.imgUrl = canvas.toDataURL()
closeCanvas()
var file=cloudinaryService.dataURLtoFile(card.imgUrl, 'canvas.png')
const imgUrl = await cloudinaryService.uploadCanvasImg(file)
card.imgUrl=imgUrl
    return card
}

const changeStrokeStyle =(color)=>{
    console.log(color.hex,color)
    setColor(color.hex)
}


  const draw = (ev,{nativeEvent}) => {
    ev.preventDefault()
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }


  return (
    <div className="modal-wrapper" onClick={closeCanvas} >
    <div className="canvas-modal-content flex column justify-center space-evenly "  
      onClick={(ev) => ev.stopPropagation()}
    ><canvas style={{marginBottom:'10px'}}
    onMouseDown={startDrawing}
    onMouseUp={finishDrawing}
    onMouseMove={draw}
    onTouchStart={startDrawing} onTouchEnd={finishDrawing} onTouchMove={draw} 
    ref={canvasRef}
  />
   <CirclePicker className="self-center"
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
  <button className="btn" onClick={addCanvasToCard}>save canvas</button>
    </div>
  </div>
)
    
  
  }

export default Canvas;