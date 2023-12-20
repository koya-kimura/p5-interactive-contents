precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform float u_distortion;
uniform sampler2D u_captureTex;

float pi = 3.14159265358979;

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

float easeInOutSine(float x){
    return -(cos(pi*x)-1.)/2.;
}

void main(void) {
    vec2 uv = vTexCoord;

    uv-=vec2(.5);
    uv*=(1.-length(uv)*u_distortion)*1.5;
    uv*=.5;
    uv+=vec2(.5);

    vec4 col = texture2D(u_captureTex, uv);

    float gray = (col.r + col.g + col.b)/3.0;

    col.r=gray*.9;
    col.g=gray*.8;
    col.b=gray*.6;

    col.rgb+=random(uv)*.2;

    gl_FragColor = col;
}