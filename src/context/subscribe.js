import {useState,useEffect} from 'react';

//store 默认值
export const store={
    a:'hello',
    b:'asdfw',
};
//订阅索引 k:[f]
const subObj={}

function filterFromKeys(obj,keys){
    let res={}
    for(var i in keys){
        const key=keys[i];
        res[key]=obj[key]
    }
    return res
}


//订阅
export function useStore(keys=[]){
    const [v,setV] = useState(filterFromKeys(store,keys))
    useEffect(()=>{
         // 针对key进行订阅
        for(let i in keys){
            const key=keys[i];
            //往subObj 记录
            if(subObj[key]){
                subObj[key].push(setV)
            }else{
                subObj[key]=[setV]
            }
        }
        return()=>{

        }
    },keys)
    
    const handler={
        set(target,key,value,proxy){
            subObj[key].map(fun=>{
                fun({...v,[key]:value})
            })
            return Reflect.set(target, key, value, proxy); 
        }
    }
    let res=new Proxy(store,handler);
    return res
}

