import { useRef, useEffect, useCallback } from 'react';

const ARROW_HEAD_LENGTH = 10;
const COLOR_CODE = {"happy":"#FFD700", "sad":"#1E90FF", "angry":"#FF4500", "calm":"#00CED1", "energetic":"#32CD32"}

export const useDraw = (mood, strength, setCoordinates, width, height) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const isDrawing = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        context.strokeStyle = COLOR_CODE[mood];
        context.lineWidth = strength;

        ctxRef.current = context;
    }, [strength]); 

    const drawArrowHead = (ctx, fromX, fromY, toX, toY, headLength) => {
        const angle = Math.atan2(toY - fromY, toX - fromX);
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    }

    const startDrawing = useCallback(() => {
        console.log("Start drawing vectors...");
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(width / 2, height / 2);
        isDrawing.current = true;
    }, [])

    const finishDrawing = useCallback(( nativeEvent ) => {
        console.log("Finished drawing vectors...");
        ctxRef.current.closePath();
        isDrawing.current = false;

        const { screenX, screenY } = nativeEvent;
        const { left, top } = canvasRef.current.getBoundingClientRect();
        console.log("offsets");
        console.log(screenX, screenY);
        console.log(width, height);
        console.log(nativeEvent);
        const canvasX = screenX - left;
        const canvasY = screenY - top;
        const widthDiv = width / 10;
        const heightDiv = height / 10;
        const x = Math.round((canvasX - width / 2) / widthDiv) >= 5 ? 5 : Math.round((canvasX - width / 2) / widthDiv);
        const y = Math.round((canvasY - height / 2) / heightDiv) >= 5 ? 5 : Math.round((canvasY - height / 2) / heightDiv);

        const ctx = ctxRef.current;

        ctx.lineTo(canvasX, canvasY);
        drawArrowHead(ctx, width / 2, height / 2, canvasX, canvasY, ARROW_HEAD_LENGTH);
        ctx.strokeStyle = COLOR_CODE[mood];

        ctx.stroke();

        setCoordinates([x, y]);
        console.log(x, y);
        console.log(`Final x, y: ${x}, ${y}`);

    }, [])

    const draw = useCallback(() => {
        const ctx = ctxRef.current;
        if (!ctx) return;

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
    }, []);

    const drawVectors = useCallback(( nativeEvent ) => {
        const ctx = ctxRef.current;
        if (!isDrawing.current) return;

        const { offsetX, offsetY } = nativeEvent;
        ctx.lineTo(offsetX, offsetY);
        console.log(offsetX, offsetY);

        drawArrowHead(ctx, width / 2, height / 2, offsetX, offsetY, ARROW_HEAD_LENGTH);
        ctx.strokeStyle = COLOR_CODE[mood];

        ctx.stroke();

    }, []);

    return { canvasRef, startDrawing, finishDrawing, draw, drawVectors };
}