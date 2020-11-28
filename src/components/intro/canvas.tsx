import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
`;

const Canvas = () => {
  const canvasRef = useRef(null);

  function draw(ctx, frameCount, mouse) {
    ctx.fillStyle = 'rgba(0, 0, 200, 0)';
    ctx.strokeStyle = 'white';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 50, 0, 2 * Math.PI);
    ctx.fill();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let frameCount = 0;
    let animationFrameId;

    let mouse = {
      x: 0,
      y: 0,
    };
    let canDraw = false;

    // retina support
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.scale(2, 2);

    // get mouse position
    canvas.addEventListener('mousemove', (e) => {
      canDraw = true;
      const rect = canvas.getBoundingClientRect();
      mouse = {
        x: e.clientX * 0.5 - rect.left,
        y: e.clientY * 0.5 - rect.top,
      };
    });

    const render = () => {
      frameCount++;
      if (canDraw) {
        draw(context, frameCount, mouse);
      }
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <StyledCanvas ref={canvasRef}></StyledCanvas>;
};

export default Canvas;
