import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

const RotatingBox = () => {
   const cube = useRef(null)
   
   useFrame(({clock}) => {
      const time = clock.elapsedTime;

      cube.current.rotation.x = time * 0.5;
      cube.current.rotation.y = time * 0.5;
      cube.current.rotation.z = time * 0.5;
   })
   
   return (
      <mesh ref={cube}>
         <boxGeometry />
         <meshNormalMaterial />
      </mesh>
   )
}

export default RotatingBox
