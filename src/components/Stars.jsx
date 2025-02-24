import React, { useEffect, useRef, useState } from 'react'
import vertex from "../Shaders/Stars/vertex.glsl";
import fragment from "../Shaders/Stars/fragment.glsl";
import * as THREE from "three";
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

const Stars = () => {
    const count = 1000;
    const radius = 1000;
    const [a, setA] = useState(new Float32Array(count * 3));
    // console.log(a);
    const bufferGeometryRef = useRef();
    const position = new Float32Array(count * 3);
    const color = new Float32Array(count * 3);
    const offset = new Float32Array(count);
    const size = new Float32Array(count);
    const randomColor = gsap.utils.random([
        new THREE.Color("red"),
        new THREE.Color("blue"),
        new THREE.Color("pink"),
        new THREE.Color("yellow"),
        new THREE.Color("green"),
        new THREE.Color("orange"),
        new THREE.Color("purple")
    ], true);

    const material = useRef();
    for (let i = 0; i < count; i++) {
        let i3 = i * 3;
        position[i3 + 0] = (Math.random() - 0.5) *radius;
        position[i3 + 1] = (Math.random() - 0.5) * radius;
        position[i3 + 2] = (-Math.random()) * radius;
        const c = randomColor();
        color[i3 + 0] = c.r;
        color[i3 + 1] = c.g;
        color[i3 + 2] = c.b;
        offset[i] = Math.random() * Math.PI;
        size[i] = Math.random();
    }
    let basePositions = position.slice();
    // console.log(basePosition)
    // setA(position);


    useFrame(({ clock }) => {
        const t = clock.elapsedTime;
        const time = Date.now() * 0.001;
        material.current.uniforms.uTime.value = t;
        const positions = bufferGeometryRef.current.attributes.position.array;
        for (let i = 0; i < count; i++) {
            let i3 = i * 3;
            // position[i3+0]=(Math.random()-0.5)*radius;
            // // position[i3+1]=(Math.random()-0.5)*radius;
            positions[i3 + 2] += 10;
            if (positions[i3 + 2] >radius/2) {
                positions[i3 + 2] =-radius+radius/2;

                basePositions[i3] = (Math.random() - 0.5) * radius;

                basePositions[i3 + 1] = (Math.random() - 0.5) * radius;
                positions[i3] = basePositions[i * 3];
                positions[i3 + 1] = basePositions[i * 3 + 1];
            }
            const waveX = Math.sin(time + basePositions[i * 3 + 1] * 0.01 +100* 0.01);
            const waveY = Math.cos(time + basePositions[i * 3] * 0.01 + 100* 0.01);
            positions[i3] = basePositions[i3] + waveX;
            positions[i3 + 1] = basePositions[i3 + 1] + waveY;


        }
        bufferGeometryRef.current.attributes.position.needsUpdate = true;

    })
    useEffect(() => {
        // console.log(bufferGeometryRef.current)
        // console.log(hover.mouseX)
    })
    return (
        <>
            <points>
                <bufferGeometry ref={bufferGeometryRef}>
                    <bufferAttribute attach="attributes-position" args={[position, 3]} />
                    <bufferAttribute attach="attributes-aColor" args={[color, 3]} />
                    <bufferAttribute attach="attributes-aOffset" args={[offset, 1]} />
                    <bufferAttribute attach="attributes-aSize" args={[size, 1]} />
                </bufferGeometry>
                <shaderMaterial
                    ref={material}
                    vertexShader={vertex}
                    fragmentShader={fragment}
                    transparent
                    depthWrite={false}
                    blendAlpha={THREE.MultiplyBlending}
                    uniforms={{
                        uTime: { value: 0 }
                    }}
                />
            </points>

        </>
    )
}

export default Stars