import {useState} from 'react';
//路径处理
export default function useFileRouter(){
    //当前地址
    const [ path, setPath ] = useState('/');
    
    function back() {
		setPath(path.substring(0, path.lastIndexOf('/')));
	}
	function push(p) {
		setPath(p);
    }
    let isBack = !(path === '/' || path === '');
    return {back,push,isBack,path}
}