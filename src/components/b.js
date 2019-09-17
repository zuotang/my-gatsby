import React from 'react'
import {useStore} from '../context/subscribe'
function B(){
  console.log('渲染b')
  let store=useStore(['b','a'])
    return <><button onClick={e=>{
      store.a="123ddd"
    }}>点击</button> {store.b}</>
}
export default B