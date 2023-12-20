precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform float u_waveNum;
uniform sampler2D u_captureTex;

float pi = 3.14159265358979;

void main(void) {
    vec2 uv = vTexCoord;

    uv.y += sin(uv.x*u_waveNum+u_time)*0.1;

    gl_FragColor = texture2D(u_captureTex, uv);
}