precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform sampler2D u_captureTex;

float pi = 3.14159265358979;

void main(void) {
    vec2 uv = vTexCoord;

    gl_FragColor = texture2D(u_captureTex, uv);
}