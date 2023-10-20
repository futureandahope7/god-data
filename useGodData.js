import React, {useState, useEffect} from 'react';



const goddata = {private: {areas: {}, data: {default: undefined}, instances: {}, counter: 0, privateDataId: ['default'],  privateDataLast: 'default'}};


export const GodPrivateData = ({children}) =>{
    const [id, setId] = useState(Date.now().toString(36) + Math.random().toString(36).substring(2));

    goddata.private.privateDataId.push(id);
    goddata.private.privateDataLast = id;

    return React.createElement(React.Fragment, {}, children, React.createElement(GodEndPrivateData, {}));
}

const GodEndPrivateData = () => {
    goddata.private.privateDataId.pop();

    if(goddata.private.privateDataId.length == 0){

        goddata.private.privateDataId = ['default'];
    }
    goddata.private.privateDataLast = goddata.private.privateDataId[goddata.private.privateDataId.length -1];
    return React.createElement(React.Fragment, {});
}

const  useGodData = (dat, priv = 'default') =>{

    const [counter, setCounter] = useState(-1);
    const [id] = useState(Date.now().toString(36) + Math.random().toString(36).substring(2));
    const [pd] = useState(goddata.private.privateDataLast  );
    goddata.private.privateDataLast = pd;

    if(typeof goddata.private.instances[pd] === 'undefined'){

        goddata.private.instances[pd] = {};
    }
    if(typeof goddata.private.data[pd] === 'undefined'){
        goddata.private.data[pd] = {};
    }
    if(typeof goddata.private.areas[pd] === 'undefined'){
        goddata.private.areas[pd] = {};
    }

    if(typeof goddata.private.instances[pd][priv] === 'undefined' ){

        goddata.private.instances[pd][priv] = [];
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

        if(typeof dat !== 'undefined' && !(typeof goddata.private.areas[pd] !== 'undefined' && typeof goddata.private.areas[pd][priv] !== 'undefined' && goddata.private.areas[pd][priv] === true)) {

            goddata.private.data[pd][priv] = dat;
            goddata.private.areas[pd][priv] = true;

        } else if(typeof goddata.private.data[pd] === 'undefined' || typeof goddata.private.data[pd][priv] === 'undefined'){

            goddata.private.data[pd][priv] = undefined;
            goddata.private.areas[pd][priv] = false;
        }
    }

    const cleanUp = () =>{
        let len = goddata.private.instances[pd][priv].length;
        for(let i = 0; i < len; i++){
            if(goddata.private.instances[pd][priv][i]['id'] === id){
                goddata.private.instances[pd][priv].splice(i, 1);
                break;
            }
        }
    }

    const updateRefresh = () =>{
        let len = goddata.private.instances[pd][priv].length;
        let found = false;
        for(let i = 0; i < len; i++){
            if(goddata.private.instances[pd][priv][i]['id'] === id){
                goddata.private.instances[pd][priv][i]['id'] = id;
                goddata.private.instances[pd][priv][i]['fn'] = refresh;
                found = true;
                break;
            }
        }
        if(!found) {
            goddata.private.instances[pd][priv].push({id: id, fn: refresh});
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
        goddata.private.data[pd][priv] = data;
        goddata.private.areas[pd][priv] = true;
        updateAll();
    }



    const updateAll = () =>{

        goddata.private.instances[pd][priv] = goddata.private.instances[pd][priv].filter((val)=>{
            if(typeof val['fn'] === 'function'){
                return true;
            }
            return false;
        });
        goddata.private.instances[pd][priv].map((val)=>{
            if(typeof val['fn'] === 'function'){
                val['fn']();
                return true;
            }
            return false;
        })
    }

    updateRefresh();

    return [goddata.private.data[pd][priv], update, updateAll];
}


export default useGodData;