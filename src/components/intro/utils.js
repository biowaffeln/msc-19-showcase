export function createProgram(gl, vs, fs) {
  const v_shader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(v_shader, vs);
  gl.compileShader(v_shader);
  const f_shader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(f_shader, fs);
  gl.compileShader(f_shader);

  const program = gl.createProgram();
  gl.attachShader(program, v_shader);
  gl.attachShader(program, f_shader);
  gl.linkProgram(program);

  return program;
}

export function createTexture(gl, w, h, data = null) {
  const t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    w,
    h,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    data
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  return t;
}

export function createTextureFromCanvas(gl, w, h, text) {
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.canvas.width = w;
  ctx.canvas.height = h;

  const lineWidth = 100;
  const count = h / lineWidth;
  const step = lineWidth * 2;

  ctx.fillStyle = '#ddd';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#666';
  ctx.save();
  ctx.rotate(-0.785);
  for (let i = 0; i < count; i++) {
    ctx.fillRect(-w, i * step, w * 3, lineWidth);
  }
  ctx.restore();

  ctx.font = `${Math.floor(h * 0.33)}px sans-serif`;
  ctx.fontWeight = 1000;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.save();
  ctx.scale(1, -1);
  ctx.fillStyle = 'black';
  ctx.fillText(text, w / 2, -h / 2);
  ctx.restore();
  return ctx.canvas;
}

export function createVAO(gl, program, attrs) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  for (const name in attrs) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(attrs[name]),
      gl.STATIC_DRAW
    );
    const location = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
  }

  return vao;
}

export function setupVertexAttribs(gl, program) {
  const pos_attr = gl.getAttribLocation(program, 'a_position');
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1]),
    gl.STATIC_DRAW
  );

  gl.enableVertexAttribArray(pos_attr);
  gl.vertexAttribPointer(pos_attr, 2, gl.FLOAT, false, 0, 0);

  const texcoord_attr = gl.getAttribLocation(program, 'a_texcoord');
  const texcoord_buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoord_buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0]),
    gl.STATIC_DRAW
  );
  gl.enableVertexAttribArray(texcoord_attr);
  gl.vertexAttribPointer(texcoord_attr, 2, gl.FLOAT, false, 0, 0);
}

export function createFramebuffer(gl, tex) {
  const f = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, f);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    tex,
    0
  );
  return f;
}

export const water_vs = `#version 100
  attribute vec4 a_position;
  attribute vec2 a_texcoord;
  varying vec2 v_texcoord;

  void main(){
    gl_Position = a_position;
    v_texcoord = a_texcoord;
  }
`;
export const water_fs = `#version 100
  precision highp float;
  precision highp sampler2D;

  varying vec2 v_texcoord;
  uniform sampler2D u_prevTex;
  uniform sampler2D u_currentTex;
  uniform float u_frame;
  uniform vec2 u_resolution;
  uniform vec3 u_mouse;

  const float dampening = 0.995;

  float getHeight(vec2 p){
    vec2 offset = vec2(1.0 / u_resolution.x, 0.0);
    float a = texture2D(u_prevTex, p + offset.xy).r;
    float b = texture2D(u_prevTex, p - offset.xy).r;
    float c = texture2D(u_prevTex, p + offset.yx).r;
    float d = texture2D(u_prevTex, p - offset.yx).r;

    float s = 0.0;

    if (u_mouse.z > 0.0) {
      s = smoothstep(4.5,0.5,length(u_mouse.xy - gl_FragCoord.xy));
    } else {
      float t = u_frame * 0.09;
      vec2 pos = fract(floor(t)*vec2(0.456665,0.708618))*u_resolution.xy;
      float amp = 1.0 - step(0.05, fract(t));
      s = -amp * smoothstep(2.5, 0.5, length(pos - gl_FragCoord.xy));
    }

    s -= (texture2D(u_currentTex, p).r - 0.5) * 2.0;
    s += (a + b + c + d - 2.0);
    s *= dampening;
    s *= min(1.0,(u_frame));
    return s * 0.5 + 0.5;
  }

  void main(){
    gl_FragColor = vec4(getHeight(v_texcoord), 0.0, 0.0, 1.0);
  }
`;

export const out_vs = `#version 100
  attribute vec4 a_position;
  attribute vec2 a_texcoord;
  varying vec2 v_texcoord;

  void main(){
    gl_Position = a_position;
    v_texcoord = a_texcoord;
  }
`;
export const out_fs = `#version 100
  precision highp float;
  precision highp sampler2D;

  varying vec2 v_texcoord;
  uniform sampler2D u_heightMap;
  uniform sampler2D u_background;
  uniform vec2 u_resolution;

  #define TEXTURE 1

  void main(){

  #if TEXTURE == 0

    vec2 offset = 1.0/u_resolution;
    float a = texture2D(u_heightMap, v_texcoord-offset.yx).x;
    float b = texture2D(u_heightMap, v_texcoord-offset.xy).x;
    float c = texture2D(u_heightMap, v_texcoord+offset.xy).x;
    float d = texture2D(u_heightMap, v_texcoord+offset.yx).x;
    
    vec3 grad = normalize(vec3(c - b, d - a, 1.0));
    vec4 tmp_col = texture2D(u_background, gl_FragCoord.xy/u_resolution + grad.xy*0.35);
    vec3 light = normalize(vec3(0.2, -0.5, 0.7));
    float diffuse = dot(grad, light);
    float spec = pow(max(0.0, -reflect(light, grad).z), 32.0);
    gl_FragColor = mix(tmp_col, vec4(0.7, 0.8, 1.0, 1.0), 0.25)*max(diffuse, 0.0) + spec;

  #elif TEXTURE == 1

		float h = texture2D(u_heightMap, v_texcoord).r;
		float sh = 1.35 - h*2.0;
    vec3 col = vec3(exp(pow(sh-.75,2.)*-10.), exp(pow(sh-.50,2.)*-20.), exp(pow(sh-.25,2.)*-10.));
    gl_FragColor = vec4(col, 1.0);

  #else

		float h = texture2D(u_heightMap, v_texcoord).r;
		float sh = 1.35 - h*2.0;
    vec3 col = vec3(exp(pow(sh-.75,2.)*-10.), exp(pow(sh-.50,2.)*-20.), exp(pow(sh-.25,2.)*-10.));
    float bright = 0.3333 * (col.r + col.g + col.b);
    float b = mix(0.0, 1.0, step(threshold, bright));
    gl_FragColor = vec4(vec3(b), 1.0);
    
  #endif
  }
`;
