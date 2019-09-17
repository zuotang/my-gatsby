import React,{createContext,useState,useContext} from 'react';

const StoreContext=createContext({store:{},setStore:()=>{}});

function filterFromKeys(obj,keys){
    let res={}
    for(var i in keys){
        const key=keys[i];
        res[key]=obj[key]
    }
    return res
}

export function StoreProvider({children}){
    const [store,setStore]=useState({})
    return <StoreContext.Provider value={{store,setStore}}>
        {children}
    </StoreContext.Provider>
}



export function useStore(keys){
    const {store,setStore} = useContext(StoreContext)
    const handler={
        set(target,key,value,proxy){
            setStore({...store,[key]:value})
            return Reflect.set(target, key, value, proxy); 
        }
    }
    let res=new Proxy(filterFromKeys(store,keys),handler);
    return res
}

export function connect(keys=[]){
    return function (WrappedComponent){
        //优化
        const WrappedMemoComponent=React.memo(WrappedComponent)
        return function(props){
            const {store,setStore} = useContext(StoreContext)
            const handler={
                set(target,key,value,proxy){
                    console.log(target,key,value)
                    setStore({...store,[key]:value})
                    return Reflect.set(target, key, value, proxy); 
                }
            }
            let res=new Proxy(filterFromKeys(store,keys),handler);
            return <WrappedMemoComponent {...props} {...res} />
        }
    }
}