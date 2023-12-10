"use client"
import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const Canvas = () => {
  const canvasRef = useRef(null);
  const canvas = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    fabric.Image.fromURL(URL.createObjectURL(file), (img) => {
      if (canvas.current) {
        canvas.current.add(img);
      }
    });
  };

  const handleSquareDraw = () => {
    if (canvas.current) {
      const square = new fabric.Rect({
        width: 50,
        height: 50,
        fill: 'blue',
      });
      canvas.current.add(square);
    }
  };

  const handleCircleDraw = () => {
    if (canvas.current) {
      const circle = new fabric.Circle({
        radius: 25,
        fill: 'red',
      });
      canvas.current.add(circle);
    }
  };

  const handlePenDraw = () => {
    if (canvas.current) {
      canvas.current.isDrawingMode = !canvas.current.isDrawingMode;
      canvas.current.freeDrawingBrush.color = 'black';
      canvas.current.freeDrawingBrush.width = 5;
    }
  };

  const handleEraser = () => {
    if (canvas.current) {
      canvas.current.isDrawingMode = !canvas.current.isDrawingMode;
      canvas.current.freeDrawingBrush.color = 'white';
      canvas.current.freeDrawingBrush.width = 20;
    }
  };

  useEffect(() => {
    canvas.current = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
    });

    canvas.current.on('mouse:down', (options) => {
      if (options.target === null) {
        canvas.current.discardActiveObject().renderAll();
      }
    });

    return () => {
      if (canvas.current) {
        canvas.current.dispose();
      }
    };
  }, []);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button className='p-2 m-2 border border-slate-400' onClick={handleSquareDraw}>Draw Square</button>
      <button className='p-2 m-2 border border-slate-400' onClick={handleCircleDraw}>Draw Circle</button>
      <button className='p-2 m-2 border border-slate-400' onClick={handlePenDraw}>Pen</button>
      <button className='p-2 m-2 border border-slate-400' onClick={handleEraser}>Eraser</button>
      <canvas className='border border-slate-500' ref={canvasRef} />
    </div>
  );
};

export default Canvas;