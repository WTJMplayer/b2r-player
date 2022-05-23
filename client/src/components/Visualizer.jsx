import React, { useCallback, useEffect, useRef, useState } from 'react'
const Visualizer = ({frameAdv, bufferLength, dataArray }) => {
  const canvasRef = useRef(null)
  


  const draw = useCallback(
    (context) => {
      
      context.fillStyle = 'rgb(0, 0, 0)'
      context.fillRect(0, 0, context.canvas.width, context.canvas.height)
      var barWidth = (context.canvas.width / bufferLength) * 2.5
      var barHeight
      var x = 0
      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray.current[i] / 2.5
        context.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
        context.fillRect(x, -barHeight / 2.5, barWidth, barHeight)
        x += barWidth + 1
      }
    },
    [bufferLength, dataArray],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const canvasCtx = canvas.getContext('2d')
    draw(canvasCtx)
     
  }, [draw, frameAdv])

  return (
    <canvas
      ref={canvasRef}
      className="audio-visualizer"
      width={window.innerWidth}
      height="45"
      style={{ position: 'absolute', top: '0', left: '0', opacity: '0.25' }}
    ></canvas>
  )
}

export default Visualizer
