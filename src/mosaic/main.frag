precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform sampler2D u_captureTex;

float pi = 3.14159265358979;

vec2 mosaic(vec2 inputTexCoord){
    // 計算した結果を入れる変数
    vec2 outputTexCoord;
    
    // モザイクエフェクトを計算する
    outputTexCoord.x=floor(inputTexCoord.x*100.0)/100.0;
    outputTexCoord.y=floor(inputTexCoord.y*100.0)/100.0;
    
    // 計算した結果を返す
    return outputTexCoord;
}

// 鏡エフェクトの関数
vec2 mirror(vec2 inputTexCoord){
    // 計算した結果を入れる変数
    vec2 outputTexCoord;
    
    // 鏡エフェクトを計算する
    outputTexCoord.x=abs(inputTexCoord.x*2.-1.);
    outputTexCoord.y=abs(inputTexCoord.y*2.-1.);
    
    // 計算した結果を返す
    return outputTexCoord;
}

// 波紋エフェクトの関数
vec2 ripple(vec2 inputTexCoord){
    // 計算した結果を入れる変数
    vec2 outputTexCoord;
    
    // 画像の中心のテクスチャ座標
    vec2 center=vec2(.5,.5);
    
    // 2点の距離を計算する
    float dist=distance(center,inputTexCoord);
    
    // 距離の値を調整する
    dist=dist*dist;
    
    // 計算した距離の値を変化させる
    float phase=dist*150.-u_time*20.;
    
    // 波紋の動きを計算する
    float motion=sin(phase)*.2*max(0.,1.-dist*6.);
    
    // 中心からテクスチャ座標までの長さをそろえる
    vec2 direction=normalize(inputTexCoord-center);
    
    // 波紋の動きを調整する
    direction.x=direction.x*motion;
    direction.y=direction.y*motion;
    
    // 波紋エフェクトを計算する
    outputTexCoord.x=inputTexCoord.x+direction.x;
    outputTexCoord.y=inputTexCoord.y+direction.y;
    
    // 計算した結果を返す
    return outputTexCoord;
}

void main(void) {
    vec2 uv = vTexCoord;

    vec2 mosaicUv = mosaic(uv);

    gl_FragColor = texture2D(u_captureTex, mosaicUv);
}