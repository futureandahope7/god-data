import React, {useState, useEffect, useId} from 'react';



const useGodData = {private: {data: {}, instances:[], counter: 0}};




const  useGodData= (dat) =>{

    const [counter, setCounter] = useState(-1);
    const id = useId();
    const thisObject = this;
    const refresh = () =>{
        if(counter > 1000){
            useGodData.private.counter = 0;
            setCounter(0);

        } else {
            useGodData.private.counter++;
            setCounter((useGodData.private.counter));
        }
    }

    if(counter === -1){
        useGodData.private.instances.push({id: id, fn: refresh});
        if(typeof dat !== 'undefined' && ((typeof dat === "object" && dat !== null) || Array.isArray(dat))) {
            useGodData.private.data = dat;

        }
    }

    const cleanUp = () =>{
        let len = useGodData.private.instances.length;
        for(let i = 0; i < len; i++){
            if(useGodData.private.instances[i]['id'] === id){
                useGodData.private.instances.splice(i, 1);
                break;
            }
        }
    }

    useEffect(()=>{

        updateAll();
        return () => {
           cleanUp();
        }
    }, []);

    const update = (data) =>{
        useGodData.private.data = data;
        updateAll();
    }

    const add = (key, value) =>{
        let ok = false;
        if((typeof useGodData.private.data === "object" && useGodData.private.data !== null) || Array.isArray(useGodData.private.data)){
           ok = true;
        }
        if(!ok){

            useGodData.private.data = {};
        }
        useGodData.private.data[key] = value;

        updateAll();
    }

    const updateAll = () =>{
        useGodData.private.instances = useGodData.private.instances.filter((val)=>{
            if(typeof val['fn'] === 'function'){
                return true;
            }
            return false;
        })
        useGodData.private.instances.map((val)=>{
            if(typeof val['fn'] === 'function'){
                val['fn']();
            }
        })
    }

    const getUserKey = (key) => {
        if(useGodData.private.data !== null && typeof useGodData.private.data[key] !== 'undefined'){
            return useGodData.private.data[key];
        } else {
            return '';
        }
    }

    return [useGodData.private.data, update, getUserKey, add];
}


export default useGodData;