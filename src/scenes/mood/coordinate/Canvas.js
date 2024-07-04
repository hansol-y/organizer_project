import React, { useEffect } from 'react';
import { useDraw } from './draw';

const Canvas = ({vectors, width, height}) => {
    const {canvasRef, draw} = useDraw();
    console.log(canvasRef);

    useEffect(() => {
        draw(vectors);
    }, [draw, vectors]);

    return <canvas ref={canvasRef} width={width} height={height} />;
};
// TODO: Debugging
export default Canvas;