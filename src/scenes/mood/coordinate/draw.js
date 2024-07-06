import { useRef, useEffect, useCallback } from 'react';

const ARROW_HEAD_LENGTH = 10;
const COLOR_CODE = {"happy":"#FFD700", "sad":"#1E90FF", "angry":"#FF4500", "calm":"#00CED1", "energetic":"#32CD32"}

export const useDraw = () => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        ctxRef.current = canvas.getContext('2d');
    }, []); // empty dependency array -> runs once after the initial render

    const drawArrowHead = (ctx, fromX, fromY, toX, toY, headLength) => {
        const angle = Math.atan2(toY - fromY, toX - fromX);
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    }

    const draw = useCallback((vectors) => {
        const ctx = ctxRef.current;
        if (!ctx) return;

        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // clear the entire canvas
        ctx.clearRect(0, 0, width, height);

        // 1. Draw coordinate first 
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        drawArrowHead(ctx, centerX, height, centerX, 0, ARROW_HEAD_LENGTH);
        drawArrowHead(ctx, centerX, 0, centerX, height, ARROW_HEAD_LENGTH);
        ctx.strokeStyle = "#000000";

        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        drawArrowHead(ctx, 0, centerY, width, centerY, ARROW_HEAD_LENGTH);
        drawArrowHead(ctx, width, centerY, 0, centerY, ARROW_HEAD_LENGTH);
        ctx.strokeStyle = "#000000";

        ctx.stroke();

        // 2. Draw vectors
        vectors.forEach(vector => {
            console.log(vector);
            const x = vector[0];
            const y = vector[1];
            const thickness = vector[2];
            const mood = vector[3];

            const xCoord = (width / 10) * x
            const yCoord = (height / 10) * y
            
            ctx.beginPath();
            ctx.lineWidth = thickness;
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(xCoord, centerY - yCoord);
            drawArrowHead(ctx, centerX, centerY, xCoord, centerY - yCoord, ARROW_HEAD_LENGTH);
            ctx.strokeStyle = COLOR_CODE[mood];

            ctx.stroke();
        })
    }, []);

    return { canvasRef, draw }
}