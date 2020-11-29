import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  createProgram,
  createTexture,
  setupVertexAttribs,
  createFramebuffer,
} from './utils';
import { water_vs, water_fs } from './shaders/water';
import { out_vs, out_fs } from './shaders/out';

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

  function draw(gl, shuffle, frameCount, mouse, program) {
    let a = shuffle % 3;
    let b = (shuffle + 1) % 3;
    let c = (shuffle + 2) % 3;

    gl.useProgram(program.ripple.prog);
    gl.bindFramebuffer(gl.FRAMEBUFFER, program.framebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      program.textures[c],
      0
    );

    gl.viewport(0, 0, program.ripple.w, program.ripple.h);

    gl.uniform1i(program.u.prevTex, 0);
    gl.uniform1i(program.u.currentTex, 1);
    gl.activeTexture(gl.TEXTURE0 + 0);
    gl.bindTexture(gl.TEXTURE_2D, program.textures[a]);
    gl.activeTexture(gl.TEXTURE0 + 1);
    gl.bindTexture(gl.TEXTURE_2D, program.textures[b]);

    gl.uniform1f(program.u.frame, frameCount);
    gl.uniform2f(program.u.resolution, program.ripple.w, program.ripple.h);
    gl.uniform3f(program.u.mouse, mouse.x, mouse.y, mouse.z);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    gl.useProgram(program.output.prog);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, program.output.w, program.output.h);
    gl.uniform2f(program.u.resolutionOut, program.output.w, program.output.h);
    gl.uniform1i(program.u.heightMap, 0);
    //gl.uniform1i(program.u.background, 1);
    gl.activeTexture(gl.TEXTURE0 + 0);
    gl.bindTexture(gl.TEXTURE_2D, program.textures[b]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    //const context = canvas.getContext('2d');
    const gl = canvas.getContext('webgl');
    // retina support
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //context.scale(2, 2);

    let shuffle = 0;
    let frameCount = 0;
    let animationFrameId;

    const SCALE = 10;
    const RES = {
      x: Math.floor(canvas.width / SCALE),
      y: Math.floor(canvas.height / SCALE),
    };

    const rippleProg = createProgram(gl, water_vs, water_fs);
    const outputProg = createProgram(gl, out_vs, out_fs);

    const black = new Uint8Array(RES.x * RES.y * 4).fill(128);
    const tex_A = createTexture(gl, RES.x, RES.y, black);
    const tex_B = createTexture(gl, RES.x, RES.y, black);
    const tex_C = createTexture(gl, RES.x, RES.y);
    const fbo = createFramebuffer(gl, tex_C);

    let mouse = {
      x: 0,
      y: 0,
      z: 0,
    };
    let canDraw = false;

    let timeout;
    canvas.addEventListener('mousemove', (e) => {
      clearTimeout(timeout);
      canDraw = true;
      const rect = canvas.getBoundingClientRect();
      mouse = {
        x: (e.clientX - rect.left) / SCALE,
        y: (rect.height - (e.clientY - rect.top) - 1) / SCALE,
        z: 1,
      };
      timeout = setTimeout(function () {
        mouse.z = 0;
      }, 500);
    });

    const program = {
      ripple: {
        prog: rippleProg,
        w: RES.x,
        h: RES.y,
      },
      output: {
        prog: outputProg,
        w: canvas.width,
        h: canvas.height,
      },
      textures: [tex_A, tex_B, tex_C],
      framebuffer: fbo,
      u: {
        prevTex: gl.getUniformLocation(rippleProg, 'u_prevTex'),
        currentTex: gl.getUniformLocation(rippleProg, 'u_currentTex'),
        resolution: gl.getUniformLocation(rippleProg, 'u_resolution'),
        mouse: gl.getUniformLocation(rippleProg, 'u_mouse'),
        frame: gl.getUniformLocation(rippleProg, 'u_frame'),

        resolutionOut: gl.getUniformLocation(outputProg, 'u_resolution'),
        heightMap: gl.getUniformLocation(outputProg, 'u_heightMap'),
        background: gl.getUniformLocation(outputProg, 'u_background'),
      },
    };

    setupVertexAttribs(gl, program.ripple.prog);
    setupVertexAttribs(gl, program.output.prog);

    const render = () => {
      if (canDraw) {
        draw(gl, shuffle, frameCount, mouse, program);
        shuffle += 2;
        frameCount++;
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
