import React from "react"
import { Link } from "gatsby"
import baseSize from '../components/baseSize';
import styled from 'styled-components'
const Foot=styled.div`
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  display:flex;
  font-size:0.12rem;
  span{
    margin:1rem;
    font-size:12px
  }
`
const Photo=styled.img`
  width:1rem;
`
const IndexPage = () => {
  baseSize()
  return (
 <div>
     <Photo src="https://www.logosc.cn//uploads/output/2019/08/15/0e3bd3cb4dfc1419eee8e89f541a4efd.jpg?t=1565838329" />
     <Photo src="https://www.logosc.cn//uploads/output/2019/08/14/0c21379f2d07243e59dd2c6bc9f7a217.jpg?t=1565792539" />
     <Photo src="https://www.logosc.cn//uploads/output/2019/08/15/12c902c40458e243c810e60da00e5029.jpg?t=1565833730" />
     <Photo src="https://www.logosc.cn//uploads/output/2019/08/14/12b11c5541ac24e59b9a003ab9958bd3.jpg?t=1565758724" />
   <Foot>
   
     测试wenzi
     <span>测试文字12px</span>
   </Foot>

 </div>
)}

export default IndexPage
