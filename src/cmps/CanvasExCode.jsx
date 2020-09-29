// const startTouchDrawing = ({ nativeEvent }) => {
//   contextRef.current.strokeStyle = color;
//   const { clientX, clientY } = nativeEvent.touches[0];
//   contextRef.current.beginPath();
//   contextRef.current.moveTo(clientX-25, clientY-100);
//   setIsDrawing(true);
// }

// const touchdraw = ({ nativeEvent }) => {

//   if (!isDrawing) {
//     return;
//   }
//   const { clientX, clientY } = nativeEvent.touches[0];
//   contextRef.current.lineTo(clientX-25, clientY-100 );
//   contextRef.current.stroke();
// }