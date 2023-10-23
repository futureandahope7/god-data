import React, {useState, useEffect} from 'react';

class TreeLeaf  {
    previous = null;
    next = {};
    done = false;
    id = 'default';
    constructor(){

    }
}

const goddata = {private: {areas: {}, data: {default: undefined}, instances: {}, rootNode: null, privateDataRefresh: {}, privateDataKnownAs: {}, privateRoughTree: {}, privateDataTree:{}, counter: 0, isNew: false, privateDataActualLast: 'default', privateDataAsync: {}, privateDataId: ['default'],  privateDataLastId:['default'], privateDataLast: 'default'}};

export const GodPrivateData = ({children}) => {

    //const [knowsAs, setKnownAs] = useState({});

    const [id, setId] = useState(Date.now().toString(36) + Math.random().toString(36).substring(2));
    const [counter, setCounter] = useState(0);
    const refresh = () =>{
        setCounter(counter + 1);
    }

    useEffect(()=>{

        if (typeof goddata.private.privateDataKnownAs[id] !== 'undefined') {

        } else {
            goddata.private.privateDataKnownAs[id] = {};
        }
        goddata.private.privateDataKnownAs[id][id + '_' + goddata.private.privateDataLast] = goddata.private.privateDataLast;


        goddata.private.privateDataRefresh[id] = refresh;

    });


    return React.createElement(React.Fragment, {}, React.createElement(GodDataHead, {id: id, lastId: goddata.private.privateDataLast, refresh: refresh}), children, React.createElement(GodEndPrivateData, {parentId: id, lastId: goddata.private.privateDataLast}));
}

const GodDataHead = ({id,lastId, refresh}) => {

    goddata.private.privateDataLast = lastId;

    if(goddata.private.rootNode === id){
        goddata.private.privateDataLast = 'default';
        goddata.private.privateDataLastId = ['default'];
        goddata.private.privateDataId = ['default'];

    }




    if(typeof goddata.private.privateDataTree[id] === 'undefined'){

        goddata.private.privateRoughTree[id] = new TreeLeaf();
        goddata.private.privateRoughTree[id].id = id;

        goddata.private.privateDataTree[id] = {counter: 0};



    }

    if(goddata.private.privateDataLast !== 'default' || goddata.private.rootNode  === null || goddata.private.rootNode === id) {
        if(goddata.private.privateDataLast !== id){
            goddata.private.privateDataTree[id]['parent'] = goddata.private.privateDataLast;
            let prev = goddata.private.privateRoughTree[goddata.private.privateDataLast];
            if (prev) {

                prev.next[id] = goddata.private.privateRoughTree[id];
                goddata.private.privateRoughTree[id].previous = prev;
            }
        }

    } else {
        goddata.private.privateDataTree[id]['parent'] = false;
    }


    goddata.private.privateRoughTree[id].done = false;
    goddata.private.privateDataTree[id]['fn'] = refresh;
    goddata.private.privateDataTree[id]['counter']++;
    if(goddata.private.privateDataTree[id]['counter'] > 1000){
        goddata.private.privateDataTree[id]['counter'] = 0;
    }

    const recursiveDelete = (item) =>{

        delete goddata.private.privateDataTree[item];
        if(typeof goddata.private.privateRoughTree[item] !== 'undefined' && typeof goddata.private.privateRoughTree[item].next !== 'undefined') {
            Object.keys(goddata.private.privateRoughTree[item].next).map((i) => {
                recursiveDelete(i.id)
            });
        }
        delete goddata.private.privateRoughTree[item];
    }

    useEffect(()=>{
        return ()=>{
            recursiveDelete(id);
        }
    }, []);

    if(goddata.private.rootNode === null){
        goddata.private.rootNode = id;
    }

    if(goddata.private.rootNode === id){

    }


    goddata.private.privateDataLastId.push(goddata.private.privateDataLast);
    goddata.private.privateDataId.push(id);
    goddata.private.privateDataLast = id;
    goddata.private.privateDataActualLast = id;


    return React.createElement(React.Fragment, {});

}

const GodEndPrivateData = ({parentId, lastId}) => {




    goddata.private.privateDataId.pop();

    if(goddata.private.privateDataId.length === 0){

        goddata.private.privateDataId = ['default'];
    }
    goddata.private.privateDataLast = goddata.private.privateDataLastId.pop();

    goddata.private.privateDataActualLast = goddata.private.privateDataLast;

    if(goddata.private.privateDataLastId.length === 0){
        goddata.private.privateDataLastId = ['default'];
    }
    goddata.private.privateDataLast = lastId;
    goddata.private.privateRoughTree[parentId].done = true;




    return React.createElement(React.Fragment, {});
}

const  useGodData = (dat, priv = 'default') =>{

    if(typeof goddata.private.privateDataLast === 'undefined'){
        goddata.private.privateDataLast = 'default';
    }


    const [counter, setCounter] = useState(-1);
    const [id] = useState(Date.now().toString(36) + Math.random().toString(36).substring(2));
    const [doo, setDoo] = useState(false);
    const [floating, setFloating] = useState(false);
    const [pd, setPd] = useState( goddata.private.privateDataLast);
    const [tempVal, setTempVal] = useState(undefined);
    const [refreshParents, setRefreshParents] = useState(false);
    const [doingRefresh, setDoingRefresh] = useState(false);

    const syncIssue = (pd !== goddata.private.privateDataLast) ? goddata.private.privateDataLast : false;
    const lastId = goddata.private.privateDataLast;
    const bad = (pd === 'default' || (typeof goddata.private.privateRoughTree[pd] !== 'undefined' && typeof goddata.private.privateRoughTree[pd].next !== 'undefined' && (Object.keys(goddata.private.privateRoughTree[pd].next).map(()=>{ return true}).length > 0) || (goddata.private.privateRoughTree[pd].done && goddata.private.rootNode !== pd)));



   // console.log('FLOATING = id:', id, 'doo', doo, 'floating:', floating, 'pd', pd, 'last', goddata.private.privateDataLast, 'tempVal', tempVal, 'refreshParents', refreshParents, 'syncIssue', syncIssue, 'bad', bad);


    const searchBack = (privateID, level) => {

        let data= [];
        if(typeof goddata.private.privateRoughTree[privateID] === 'undefined'){
            return data;
        }
        if(goddata.private.privateRoughTree[privateID].previous === null){
            return [goddata.private.privateRoughTree[privateID].id];
        } else {
            data = searchBack(goddata.private.privateRoughTree[privateID].previous.id, level+1);
        return data.concat([goddata.private.privateRoughTree[privateID].id]);

        }

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

    useEffect(()=>{



        //on creating node children exist, this is a clear sign that we could be floating or adding in a new record
        if(bad){
            setFloating(true);
            setDoo(false);
            setRefreshParents(true);
        } else {
            setFloating(false);
            setDoo(true);
        }
    },[]);

    useEffect(()=>{


        if(floating && (syncIssue !== false)){
            setFloating(false);
            setPd(syncIssue);
            setDoo(true);

        }




    });

    useEffect(()=>{


        if(refreshParents){

            let ids = searchBack(pd, 0);
            if(ids.length > 0) {

                let tempid = ids[0];

                if (typeof goddata.private.privateDataKnownAs[tempid] !== 'undefined') {

                    for (let i in goddata.private.privateDataKnownAs[tempid]) {
                        if (goddata.private.privateDataKnownAs[tempid].hasOwnProperty(i)) {

                            let val = goddata.private.privateDataKnownAs[tempid][i];
                            if(val !== pd) {
                                ids = searchBack(val, 0).concat(ids);
                            }
                        }
                    }
                }


                for (let i = 0; i < ids.length; i++) {
                    goddata.private.privateDataTree[ids[i]]['fn']();
                }
                if (ids.indexOf(lastId) === -1 && typeof goddata.private.privateDataTree[lastId] !== 'undefined') {
                    goddata.private.privateDataTree[lastId]['fn']();
                }
                setRefreshParents(false);
                setDoingRefresh(true);
            }


        }
    }, [refreshParents]);




    goddata.private.privateDataLast = pd;

    if(doo) {

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

   }

    const cleanUp = () =>{


       if(typeof goddata.private.instances[pd] === 'undefined'){
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

    useEffect(()=>{


        if(doo){
            if(typeof tempVal !== 'undefined'){
                update(tempVal);
                setTempVal(undefined);
            } else {
                refresh();
                updateAll();

            }
        }
    }, [doo])

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

    if(!doo){

        return [undefined, (val)=>{
            setTempVal(val);
            }, updateAll];
    }

    updateRefresh();


    return [goddata.private.data[pd][priv], update, updateAll];
}


export default useGodData;