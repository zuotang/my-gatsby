import React from 'react'
import {useStore} from '../context/subscribe'

function A(){
    let store=useStore(['a'])
    return <><button onClick={e=>{
      store.a="test"
    }}>点击</button>{store.a}</>
}
export default A