import React,{useEffect} from 'react';

function baseSize(){
    useEffect(()=>{
        function reSize(e){
            var clientW = document.documentElement.clientWidth || document.body.clientWidth;
            document.documentElement.style.fontSize=100*(clientW/375)+'px'
        }
        window.addEventListener('resize',reSize);
        return ()=>{
            window.removeEventListener('resize',reSize);
        }
    },[])
}
export default baseSize