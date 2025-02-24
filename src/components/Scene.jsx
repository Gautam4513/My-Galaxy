import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react'
import Experience from './Experience'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'

const Scene = () => {
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);
  return (
    <div id="canvas">
      <Canvas>
        <Experience />
          <EffectComposer>
          {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
          {/* <Bloom luminanceThreshold={10} luminanceSmoothing={0} height={10} /> */}
          {/* <Noise opacity={0.02} /> */}
          {/* <Vignette eskil={true} offset={0.5} darkness={5.5} /> */}
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default Scene
