import React,{useEffect} from 'react';

function baseSize(){
    useEffect(()=>{
        function reSize(){
            var clientW = document.documentElement.clientWidth || document.body.clientWidth;
            document.documentElement.style.fontSize=12*(clientW/375)+'px'
        }
        reSize()
        window.addEventListener('resize',reSize);
        return ()=>{
            window.removeEventListener('resize',reSize);
        }
    },[])
}
export default baseSize