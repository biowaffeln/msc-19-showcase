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

  #define TEXTURE 2

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

  #elif TEXTURE == 2
    
		float h = texture2D(u_heightMap, v_texcoord).r;
		float sh = 1.35 - h*2.0;
    vec3 col = vec3(exp(pow(sh-.75,2.)*-10.), exp(pow(sh-.50,2.)*-20.), exp(pow(sh-.25,2.)*-10.));
    //float bright = 0.2126*col.r + 0.7152*col.g + 0.0722*col.b;
    float bright = 0.3333 * col.r + col.g + col.b;
    vec3 thresh = bright > 0.7 ? vec3(0.0, 0.341, 1.0) : vec3(1.0);
    gl_FragColor = vec4(thresh, 1.0);

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
