varying vec3 vColor;
varying float vOffset;
uniform float uTime;
void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = distance(vec2(0.5,0.5),uv);
    float opacity = (0.05/d)-0.1;
    opacity += sin((uTime+vOffset))-1.0;
    vec3 white = vec3(1.0,1.0,1.0);
    vec3 finalColor = mix(vColor,white,opacity);
    gl_FragColor = vec4(finalColor,opacity);
}