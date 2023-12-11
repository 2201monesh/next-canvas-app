"use client"
import { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const Canvas = () => {
  const canvasRef = useRef(null);
  const canvas = useRef(null);

  const [penColor, setPenColor] = useState('black');
  const [penWidth, setPenWidth] = useState(5);

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
        selectable: true,
      });
      canvas.current.add(square);
    }
  };

  const handleCircleDraw = () => {
    if (canvas.current) {
      const circle = new fabric.Circle({
        radius: 25,
        fill: 'red',
        selectable: true,
      });
      canvas.current.add(circle);
    }
  };

  const handlePenDraw = () => {
    if (canvas.current) {
      canvas.current.isDrawingMode = !canvas.current.isDrawingMode;
      canvas.current.freeDrawingBrush.color = penColor;
      canvas.current.freeDrawingBrush.width = penWidth;
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
    <div className='m-2 p-5 flex flex-col items-center'>
    <div className='flex items-center'>
      <input className='w-56 rounded bg-slate-400' type="file" accept="image/*" onChange={handleImageUpload} />
      <button className='p-2 m-2 border border-slate-400 rounded bg-sky-600 text-white' onClick={handleSquareDraw}>Draw Square</button>
      <button className='p-2 m-2 border border-slate-400 rounded bg-sky-600 text-white' onClick={handleCircleDraw}>Draw Circle</button>
      <button className='p-2 m-2 border border-slate-400 rounded bg-sky-600 text-white active:bg-sky-900' onClick={handlePenDraw}>Pen</button>
      <button className='p-2 m-2 border border-slate-400 rounded bg-sky-600 text-white' onClick={handleEraser}>Eraser</button>

        <label className='mr-2'>
         <p className=' text-black'>Pen Color:</p>
        <input
          className=''
          type="color"
          value={penColor}
          onChange={(e) => setPenColor(e.target.value)}
        />
      </label>

      <label>
        <p className=' text-black'>Pen Width: </p>
        <input
          className='border border-slate-400 w-12 rounded text-black'
          type="number"
          value={penWidth}
          onChange={(e) => setPenWidth(Number(e.target.value))}
        />
      </label>
    </div>
      
      <canvas className='border border-slate-500' ref={canvasRef} />
    </div>
  );

};

export default Canvas;