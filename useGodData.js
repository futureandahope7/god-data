import React, {useState, useEffect, useId} from 'react';



const goddata = {private: {data: {}, instances:[], counter: 0}};




const  useGodData = (dat) =>{

    const [counter, setCounter] = useState(-1);
    const id = useId();
    const thisObject = this;
    const refresh = () =>{
        if(counter > 1000){
            goddata.private.counter = 0;
            setCounter(0);

        } else {
            goddata.private.counter++;
            setCounter((goddata.private.counter));
        }
    }

    if(counter === -1){
        goddata.private.instances.push({id: id, fn: refresh});
        if(typeof dat !== 'undefined' && ((typeof dat === "object" && dat !== null) || Array.isArray(dat))) {
            goddata.private.data = dat;

        }
    }

    const cleanUp = () =>{
        let len = goddata.private.instances.length;
        for(let i = 0; i < len; i++){
            if(goddata.private.instances[i]['id'] === id){
                goddata.private.instances.splice(i, 1);
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
        if((typeof goddata.private.data === "object" && goddata.private.data !== null) || Array.isArray(goddata.private.data)){
           ok = true;
        }
        if(!ok){

            goddata.private.data = {};
        }
        goddata.private.data[key] = value;

        updateAll();
    }

    const updateAll = () =>{
        goddata.private.instances = goddata.private.instances.filter((val)=>{
            if(typeof val['fn'] === 'function'){
                return true;
            }
            return false;
        })
        goddata.private.instances.map((val)=>{
            if(typeof val['fn'] === 'function'){
                val['fn']();
            }
        })
    }

    const getUserKey = (key) => {
        if(goddata.private.data !== null && typeof goddata.private.data[key] !== 'undefined'){
            return goddata.private.data[key];
        } else {
            return '';
        }
    }

    return [goddata.private.data, update, getUserKey, add];
}


export default useGodData;