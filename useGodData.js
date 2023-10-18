import React, {useState, useEffect, useId} from 'react';



const goddata = {private: {data: {default: {}}, instances:[], counter: 0}};




const  useGodData = (dat, priv = 'default') =>{

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
        let area = 'default';
        if(typeof priv === 'string'){
            area = priv;
        }
        if(typeof dat !== 'undefined') {

            goddata.private.data[area] = dat;

        } else {
            goddata.private.data[area] = {};
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
        
        refresh();
        updateAll();
        return () => {
           cleanUp();
        }
    }, []);

    const update = (data) =>{
        goddata.private.data[priv] = data;
        updateAll();
    }

    const add = (key, value) =>{
        let ok = false;
        if((typeof goddata.private.data[priv] === "object" && goddata.private.data[priv] !== null) || Array.isArray(goddata.private.data[priv])){
           ok = true;
        }
        if(!ok){

            goddata.private.data[priv] = {};
        }
        goddata.private.data[priv][key] = value;

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
        if(goddata.private.data[priv] !== null && typeof goddata.private.data[priv][key] !== 'undefined'){
            return goddata.private.data[priv][key];
        } else {
            return undefined;
        }
    }

    const deleteKey = (key) => {
        if(goddata.private.data[priv] !== null && typeof goddata.private.data[priv][key] !== 'undefined'){

            if(Array.isArray(goddata.private.data[priv])){
                goddata.private.data[priv].splice(key, 1);
            } else {
                delete goddata.private.data[priv][key];
            }
            updateAll();
            return true;

        } else {
            return false;
        }
    }
    return [goddata.private.data[priv], update, getUserKey, add, deleteKey];
}


export default useGodData;