import { useEffect, useRef } from "react";

const ScratchItem = ({ id, image, onScratched }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = 150;
        canvas.height = 150;

        drawOverlay(ctx);

        const handleClick = () => {
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseup', handleMouseUp);
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            scratch(ctx, x, y);
        };

        const handleMouseUp = () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
        };

        canvas.addEventListener('mousedown', handleClick);

        return () => {
            canvas.removeEventListener('mousedown', handleClick);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const drawOverlay = (ctx) => {
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };

    const scratch = (ctx, x, y) => {
        const radius = 20;
        const lineWidth = 40;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineCap = 'round';
        ctx.lineWidth = lineWidth;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        onScratched();
    };

    return (
        <div className="scratch-item">
            <canvas className="scratch-item__overlay" ref={canvasRef} id={`canvas-${id}`}></canvas>
            <img src={image} alt="Scratch item" width={150} height={150} />
        </div>
    );
};

export default ScratchItem;
