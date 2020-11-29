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

  const float dampening = 0.97;
  const float speed = 0.05;

  float getHeight(vec2 p){
    vec2 offset = vec2(1.0 / u_resolution.x, 0.0);
    float a = texture2D(u_prevTex, p + offset.xy).r;
    float b = texture2D(u_prevTex, p - offset.xy).r;
    float c = texture2D(u_prevTex, p + offset.yx).r;
    float d = texture2D(u_prevTex, p - offset.yx).r;

    float s = 0.0;

    if (u_mouse.z > 0.0) {
      s = smoothstep(4.5,.004,length(u_mouse.xy - gl_FragCoord.xy));
    } else {
      float t = u_frame * speed;
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
