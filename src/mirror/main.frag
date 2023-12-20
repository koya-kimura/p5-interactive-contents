precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform sampler2D u_captureTex;

float pi = 3.14159265358979;

vec2 mosaic(vec2 inputTexCoord){
    vec2 outputTexCoord;

    outputTexCoord.x=floor(inputTexCoord.x*100.0)/100.0;
    outputTexCoord.y=floor(inputTexCoord.y*100.0)/100.0;
    
    return outputTexCoord;
}

vec2 mirror(vec2 inputTexCoord){
    vec2 outputTexCoord;
    
    outputTexCoord.x=abs(inputTexCoord.x*2.-1.);
    outputTexCoord.y=abs(inputTexCoord.y*2.-1.);
    
    return outputTexCoord;
}

vec2 ripple(vec2 inputTexCoord){
    vec2 outputTexCoord;
    
    vec2 center=vec2(.5,.5);
    
    float dist=distance(center,inputTexCoord);
    
    dist=dist*dist;
    
    float phase=dist*150.-u_time*20.;
    
    float motion=sin(phase)*.2*max(0.,1.-dist*6.);
    
    vec2 direction=normalize(inputTexCoord-center);
    
    direction.x=direction.x*motion;
    direction.y=direction.y*motion;
    
    outputTexCoord.x=inputTexCoord.x+direction.x;
    outputTexCoord.y=inputTexCoord.y+direction.y;
    
    return outputTexCoord;
}

void main(void) {
    vec2 uv = vTexCoord;

    vec2 mirrorUv = mirror(uv);

    gl_FragColor = texture2D(u_captureTex, mirrorUv);
}