import {useState, useEffect} from 'react';



const goddata = {private: {areas: {}, data: {default: undefined}, instances: {}, counter: 0}};




const  useGodData = (dat, priv = 'default') =>{

    const [counter, setCounter] = useState(-1);
    const [id] = useState(Date.now().toString(36) + Math.random().toString(36).substring(2));

    if(typeof goddata.private.instances[priv] === 'undefined' ){
        goddata.private.instances[priv] = [];
    }
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


        if(typeof dat !== 'undefined' && !(typeof goddata.private.areas[priv] !== 'undefined' && goddata.private.areas[priv] === true)) {

            goddata.private.data[priv] = dat;
            goddata.private.areas[priv] = true;

        } else if(typeof goddata.private.data[priv] === 'undefined'){
            goddata.private.data[priv] = undefined;
            goddata.private.areas[priv] = false;
        }
    }

    const cleanUp = () =>{
        let len = goddata.private.instances[priv].length;
        for(let i = 0; i < len; i++){
            if(goddata.private.instances[priv][i]['id'] === id){
                goddata.private.instances[priv].splice(i, 1);
                break;
            }
        }
    }

    const updateRefresh = () =>{
        let len = goddata.private.instances[priv].length;
        let found = false;
        for(let i = 0; i < len; i++){
            if(goddata.private.instances[priv][i]['id'] === id){
                goddata.private.instances[priv][i]['id'] = id;
                goddata.private.instances[priv][i]['fn'] = refresh;
                found = true;
                break;
            }
        }
        if(!found) {
            goddata.private.instances[priv].push({id: id, fn: refresh});
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
        goddata.private.areas[priv] = true;
        updateAll();
    }



    const updateAll = () =>{

        goddata.private.instances[priv] = goddata.private.instances[priv].filter((val)=>{
            if(typeof val['fn'] === 'function'){
                return true;
            }
            return false;
        });
        goddata.private.instances[priv].map((val)=>{
            if(typeof val['fn'] === 'function'){
                val['fn']();
                return true;
            }
            return false;
        })
    }

    updateRefresh();

    return [goddata.private.data[priv], update, updateAll];
}


export default useGodData;