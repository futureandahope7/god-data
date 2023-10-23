import React, {useState, useEffect} from 'react';

class TreeLeaf  {
    previous = null;
    next = {};
    done = false;
    id = 'default';
    constructor(){

    }
}

const goddata = {private: {areas: {}, data: {default: undefined}, instances: {},  counter: 0, updateCounter: 0}};

export const GodPrivateData = ({children}) => {



    return React.createElement(React.Fragment, {}, React.createElement(GodDataHead, {}), children, React.createElement(GodEndPrivateData, {}));
}

const GodDataHead = ({id,lastId, refresh}) => {


    return React.createElement(React.Fragment, {});

}

const GodEndPrivateData = ({parentId, lastId}) => {

    return React.createElement(React.Fragment, {});
}

const  useGodData = (dat, priv = 'default') =>{



    const [counter, setCounter] = useState(-1);
    const [id] = useState(Date.now().toString(36) + Math.random().toString(36).substring(2));

    const pd = 'default';

     const refresh = () =>{

        if(counter > 1000){
            goddata.private.counter = 0;
            setCounter(0);

        } else {
            goddata.private.counter++;
            setCounter(Math.ceil(goddata.private.counter));
        }
    }



        if (typeof goddata.private.instances[pd] === 'undefined') {

            goddata.private.instances[pd] = {};
        }
        if (typeof goddata.private.data[pd] === 'undefined') {
            goddata.private.data[pd] = {};
        }
        if (typeof goddata.private.areas[pd] === 'undefined') {
            goddata.private.areas[pd] = {};
        }

        if (typeof goddata.private.instances[pd][priv] === 'undefined') {

            goddata.private.instances[pd][priv] = [];
        }

        if (counter === -1) {


            if (typeof dat !== 'undefined' && !(typeof goddata.private.areas[pd] !== 'undefined' && typeof goddata.private.areas[pd][priv] !== 'undefined' && goddata.private.areas[pd][priv] === true)) {

                goddata.private.data[pd][priv] = dat;
                goddata.private.areas[pd][priv] = true;

            } else if (typeof goddata.private.data[pd] === 'undefined' || typeof goddata.private.data[pd][priv] === 'undefined') {

                goddata.private.data[pd][priv] = undefined;
                goddata.private.areas[pd][priv] = false;
            }
        }



    const cleanUp = () =>{


        if(typeof goddata.private.instances[pd] === 'undefined' || typeof goddata.private.instances[pd][priv] === 'undefined'){
            return false;
        }
        let len = goddata.private.instances[pd][priv].length;
        for(let i = 0; i < len; i++){
            if(goddata.private.instances[pd][priv][i]['id'] === id){
                goddata.private.instances[pd][priv].splice(i, 1);
                return true;
            }
        }
        return false;
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

        return () => {
            cleanUp();
        }
    }, []);



    const update = (data) =>{

        goddata.private.data[pd][priv] = data;
        goddata.private.areas[pd][priv] = true;
        updateAll();
    }

    const updateAll = () => {


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