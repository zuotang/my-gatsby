import React,{useEffect,useState,useRef} from "react"
import baseSize from '../components/baseSize';
import { Canvas,useRender,extend,useThree } from 'react-three-fiber'
import Layout from '../components/layout';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

function Controls(props) {
  const { camera, canvas } = useThree()
  const controls = useRef()
  useRender(() => controls.current && controls.current.update())
  return <orbitControls ref={controls} args={[camera, canvas.parentNode]} {...props} />
}


const Box=()=>{
  const [scale,setScale]=useState(1);
  const [hovered,setHovered]=useState(false);
  const boxRef=useRef();


  useEffect(()=>{
    document.body.style.cursor=hovered?"pointer":"default"
  },[hovered])
  useRender(()=>{
    boxRef.current.rotation.x +=0.01;
    boxRef.current.rotation.y +=0.01;
  })
  return (
    <mesh ref={boxRef} scale={[scale,scale,scale]}   onClick={() => setScale(scale === 1 ? 1.5 : 1)}
    onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)}>
      <boxBufferGeometry args={[2,2,2]} attach="geometry" />
      <meshPhongMaterial attach="material"  color="teal"/>
    </mesh>
  )
}

const IndexPage = () => {
  baseSize()
  return (
    <Layout>
    <Canvas >
    <Controls />
      <pointLight distance={50} intensity={1.5} color="white" />
      <spotLight intensity={0.5} position={[10, 10, 40]} penumbra={1} />
      <Box />
      
    </Canvas>
    </Layout>
)}

export default IndexPage
