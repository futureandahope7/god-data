import React, {useState, useEffect} from 'react';



const goddata = {private: {areas: {}, data: {default: undefined}, instances:[], counter: 0}};




const  useGodData = (dat, priv = 'default') =>{

    const [counter, setCounter] = useState(-1);
    const [id] = useState(Date.now().toString(36) + Math.random().toString(36).substring(2));

    const refresh = () =>{
        if(counter > 1000){
            goddata.private.counter = 0;
            setCounter(0);

        } else {
            goddata.private.counter++;
            setCounter(Math.ceil(goddata.private.counter));
        }
    }

    if(counter === -1){
        goddata.private.instances.push({id: id, fn: refresh});
        let area = 'default';
        if(typeof priv === 'string'){
            area = priv;
        }
        if(typeof dat !== 'undefined' && !(typeof goddata.private.areas[area] !== 'undefined' && goddata.private.areas[area] === true)) {

            goddata.private.data[area] = dat;
            goddata.private.areas[area] = true;

        } else if(typeof goddata.private.data[area] === 'undefined'){
            goddata.private.data[area] = undefined;
            goddata.private.areas[area] = false;
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

    const updateRefresh = () =>{
        let len = goddata.private.instances.length;
        let found = false;
        for(let i = 0; i < len; i++){
            if(goddata.private.instances[i]['id'] === id){
                goddata.private.instances[i]['id'] = id;
                goddata.private.instances[i]['fn'] = refresh;
                found = true;
                break;
            }
        }
        if(!found) {
            goddata.private.instances.push({id: id, fn: refresh});
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



    const updateAll = () =>{
        goddata.private.instances = goddata.private.instances.filter((val)=>{
            if(typeof val['fn'] === 'function'){
                return true;
            }
            return false;
        });
        goddata.private.instances.map((val)=>{
            if(typeof val['fn'] === 'function'){
                val['fn']();
            }
        })
    }

    updateRefresh();


    return [goddata.private.data[priv], update, ()=> { return new Promise((resolve)=> { updateAll(); resolve() }); } ];
}


export default useGodData;