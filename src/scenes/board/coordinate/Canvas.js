import React, { useEffect } from 'react';
import { useDraw } from './draw';

const Canvas = ({width, height, mood, strength, setCoordinates}) => {
    const {canvasRef, startDrawing, finishDrawing, draw, drawVectors} = useDraw(mood, strength, setCoordinates, width, height);

    useEffect(() => {
        draw();
    }, [draw]);

    return <canvas 
                ref={canvasRef} 
                width={width} 
                height={height} 
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={drawVectors}
            />;
};

export default Canvas;