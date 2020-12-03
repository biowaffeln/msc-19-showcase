import React, { useState, useEffect, useRef } from 'react';
import './mandelbrot.css';
import { Shader } from './shader.js';

const getFragShader = (iter) =>
  `
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_zoom;
uniform float u_real;
uniform float u_imag;

vec2 square(vec2 number) {
	return vec2(
		number.x*number.x-number.y*number.y,
		2.*number.x*number.y
	);
}

const float iterations = ${iter}.0;

float mandelbrot(vec2 coord) {
	vec2 z = vec2(0.0, 0.0);
	for( float i = 0.0; i <= iterations; i+= 1.0 ){
		z = square(z) + coord;
		if(length(z)>2.0) return i/iterations;
	}
	return 1.0;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.y;
	st.y -= 0.5;
	st.x -= (0.5 * u_resolution.x / u_resolution.y);
	st /= pow(2., u_zoom);
	st.x += u_real;
	st.y += u_imag;
	vec3 color = vec3(mandelbrot(st))*-1. + 1.; 
	gl_FragColor = vec4(color,1.0);
}
`;

const useDrag = (cb) => {
  const vals = useRef({
    x: null,
    y: null,
    active: false,
  });

  const onMouseDown = (e) => {
    vals.current.active = true;
    vals.current.x = e.nativeEvent.offsetX;
    vals.current.y = e.nativeEvent.offsetY;
    e.currentTarget.style.cursor = 'grabbing';
  };

  const onMouseMove = (e) => {
    if (!vals.current.active) return;
    let { offsetX, offsetY } = e.nativeEvent;
    cb({ dx: offsetX - vals.current.x, dy: offsetY - vals.current.y });
    vals.current.x = offsetX;
    vals.current.y = offsetY;
  };

  const onMouseUp = (e) => {
    vals.current.x = vals.current.y = null;
    vals.current.active = false;
    e.currentTarget.style.cursor = 'grab';
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};

export const Mandelbrot = () => {
  const [zoom, setZoom] = useState(-1.5);
  const [real, setReal] = useState(0);
  const [imag, setImag] = useState(0);
  const [iterations, setIterations] = useState(50);

  const uniforms = {
    u_zoom: zoom,
    u_real: real,
    u_imag: imag,
  };

  const canvasRef = useRef(null);

  const handlers = useDrag(({ dx, dy }) => {
    let factor = 2 ** zoom / 2;
    setReal((r) => r - dx / canvasRef.current.width / factor);
    setImag((r) => r + dy / canvasRef.current.width / factor);
  });

  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return;

    const handler = (e) => {
      e.preventDefault();
      setZoom((z) => z + e.deltaY / 200);
    };

    element.addEventListener('wheel', handler, { passive: false });
    return () => element.removeEventListener('wheel', handler);
  }, [canvasRef.current]);

  return (
    <div className='mandelbrot'>
      <Shader
        className='shader'
        width={1000}
        height={500}
        fragShader={getFragShader(iterations)}
        uniforms={uniforms}
        forwardedRef={canvasRef}
        style={{
          cursor: 'grab',
        }}
        {...handlers}
      />
      <div className='controls'>
        <label>real axis:</label>
        <input
          type='number'
          step='0.01'
          value={uniforms.u_real}
          onChange={(e) => setReal(Number(e.target.value))}
        />
        <label>imaginary axis:</label>
        <input
          type='number'
          step='0.01'
          value={uniforms.u_imag}
          onChange={(e) => setImag(Number(e.target.value))}
        />
        <label>zoom</label>
        <input
          type='number'
          step='0.1'
          value={uniforms.u_zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
        <label>iterations:</label>
        <input
          type='number'
          step='1'
          min='1'
          value={iterations}
          onChange={(e) => setIterations(Number(e.target.value))}
        ></input>
      </div>
    </div>
  );
};
