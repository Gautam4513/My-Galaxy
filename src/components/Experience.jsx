import { OrbitControls } from '@react-three/drei'
import React from 'react'
import RotatingBox from './RotatingBox'
import Stars from './Stars'

const Experience = ({hover}) => {
  return (
    <>
      {/* <RotatingBox /> */}
      <Stars hover={hover}/>

      <OrbitControls />
    </>
  )
}

export default Experience
