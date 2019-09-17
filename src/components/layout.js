import React from 'react';
import './layout.css'
import baseSize from '../components/baseSize';
function Layout({children}){
  baseSize()
  return <>
    {children}
  </>
}

export default Layout