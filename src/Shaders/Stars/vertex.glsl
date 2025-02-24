attribute vec3 aColor;
attribute float aOffset;
attribute float aSize;
uniform float uTime;
varying float vOffset;
varying vec3 vColor;
void main() {
    vColor=aColor;
    vOffset=aOffset;
    float z = position.z;
   

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position.x,position.y,z ,1.0);
    gl_PointSize= 200.0*aSize;
}