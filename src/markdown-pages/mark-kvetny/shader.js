import React, { useEffect, useRef } from 'react';
import mergeRefs from 'react-merge-refs';

let GLSLCanvas;

try {
  GLSLCanvas = require('glslCanvas').default;
} catch {}

export const Shader = ({
  fragShader,
  vertShader,
  uniforms,
  forwardedRef = null,
  ...rest
}) => {
  const canvasRef = useRef(null);
  const sandboxRef = useRef(null);

  useEffect(() => {
    sandboxRef.current = new GLSLCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    sandboxRef.current.load(fragShader, vertShader);
    sandboxRef.current.refreshUniforms();
    sandboxRef.current.setUniforms(uniforms);
  }, [fragShader, vertShader]);

  useEffect(() => {
    sandboxRef.current.setUniforms(uniforms);
  }, [uniforms]);

  return <canvas {...rest} ref={mergeRefs([canvasRef, forwardedRef])} />;
};
