import React, {useState, useEffect} from 'react';

class TreeLeaf  {
    previous = null;
    next = {};
    done = false;
    id = 'default';
    constructor(){

    }
}

export const goddata = {private: {areas: {}, data: {default: undefined}, instances: {}, rootNode: null, privateRoughTree: {}, privateDataTree:{}, counter: 0, privateDataActualLast: 'default', privateDataAsync: {}, privateDataId: ['default'],  privateDataLastId:['default'], privateDataLast: 'default'}};

export const GodPrivateDataHelper = () => {
    return useState(goddata.private.privateDataLast)[0];
}

export const GodPrivateData = ({children}) =>{



    const [id, setId] = useState(Date.now().toString(36) + Math.random().toString(36).substring(2));
    const [counter, setCounter] = useState(0);


    const refresh = () =>{
        setCounter(goddata.private.privateDataTree[id]['counter']);
    }


    if(typeof goddata.private.privateDataTree[id] === 'undefined'){

        goddata.private.privateRoughTree[id] = new TreeLeaf();
        goddata.private.privateRoughTree[id].id = id;

        goddata.private.privateDataTree[id] = {counter: 0};

    }

    if(goddata.private.privateDataLast !== 'default' || goddata.private.rootNode  === null) {
        goddata.private.privateDataTree[id]['parent'] = goddata.private.privateDataLast;
        let prev = goddata.private.privateRoughTree[goddata.private.privateDataLast];
        if (prev) {

        prev.next[id] = goddata.private.privateDataTree[id];
        goddata.private.privateRoughTree[id].previous = prev;
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

    useEffect(()=>{
        return ()=>{ delete goddata.private.privateDataTree[id]; }
    }, []);


    /*console.log('last', goddata.private.privateDataLast, 'helper', helper)
    if(goddata.private.privateDataLast === 'default' && helper){
        goddata.private.privateDataLast = helper;
    }*/
    console.log('IN IN GOD DATA STROE (last ID start of IN IN) ---------------', goddata.private.privateDataLast, )

    goddata.private.privateDataLastId.push(goddata.private.privateDataLast);
    console.log('IN IN GOD DATA STROE IN  (array of last id) ',goddata.private.privateDataLastId);
    goddata.private.privateDataId.push(id);
    goddata.private.privateDataLast = id;
    goddata.private.privateDataActualLast = id;

    console.log('IN IN GOD DATA STROE (id out) ---------------------', goddata.private.privateDataLast)

    if(goddata.private.rootNode === null){
        goddata.private.rootNode = id;
    }

    return React.createElement(React.Fragment, {}, children, React.createElement(GodEndPrivateData, {parentId: id, lastId: goddata.private.privateDataLast}));
}

const GodEndPrivateData = ({parentId, lastId}) => {
    goddata.private.privateDataId.pop();

    if(goddata.private.privateDataId.length === 0){

        goddata.private.privateDataId = ['default'];
    }
    console.log('IN IN GOD DATA STROE (last list OUT OUT ) BEFORE POP ===============',goddata.private.privateDataLastId);
    goddata.private.privateDataLast = goddata.private.privateDataLastId.pop();
    goddata.private.privateDataActualLast = goddata.private.privateDataLast;
    console.log('IN IN GOD DATA STROE (last list) AFTER POP ',goddata.private.privateDataLastId);

    if(goddata.private.privateDataLastId.length === 0){
        goddata.private.privateDataLastId = ['default'];
    }
    goddata.private.privateDataLast = lastId;
    goddata.private.privateRoughTree[parentId].done = true;

    console.log('IN IN GOD DATA STROE (restored to) ====================', goddata.private.privateDataLast)


    return React.createElement(React.Fragment, {});
}

const  useGodData = (dat, priv = 'default') =>{

    const [counter, setCounter] = useState(-1);
    const [id] = useState(Date.now().toString(36) + Math.random().toString(36).substring(2));
    const [doo, setDoo] = useState(false);
    const [floating, setFloating] = useState(false);
    const [pd, setPd] = useState(goddata.private.privateDataLast);
    const [tempVal, setTempVal] = useState(undefined);
    const [refreshParents, setRefreshParents] = useState(false);
console.log('god', pd, goddata.private.privateDataLast);
    const syncIssue = (pd !== goddata.private.privateDataLast) ? goddata.private.privateDataLast : false;

    const getTree = () => {
        if(goddata.private.privateDataTree[pd]['parent'] === false){
            goddata.private.privateDataTree[id][fn] = refresh;
        } else {

        }

        goddata.private.privateDataTree[id][counter]++;
    }


    const searchBack = (privateID, level) => {
        let data= [];
        if(typeof goddata.private.privateRoughTree[privateID] === 'undefined' || goddata.private.privateRoughTree[privateID] === null || goddata.private.privateRoughTree[privateID].id === goddata.private.rootNode){
            if(goddata.private.privateRoughTree[privateID] === null || typeof goddata.private.privateRoughTree[privateID] === 'undefined'){
                return [];
            }
            return [goddata.private.privateRoughTree[privateID].id];

        } else {
            data = searchBack(goddata.private.privateRoughTree[privateID].previous.id, level+1);

            return data.concat([goddata.private.privateRoughTree[privateID].previous.id]);
        }

        /*if (goddata.private.privateRoughTree[privateID].previous === null && goddata.private.privateRoughTree[privateID].id !== goddata.private.rootNode) {
            setFloating(true);
            return false;
        } else if(goddata.private.privateRoughTree[privateID].previous === null && goddata.private.privateRoughTree[privateID].id === goddata.private.rootNode){
            setFloating(false);
        }*/






    }

    /*const searchTree = (privateID) =>{
        let found = false;
        goddata.private.privateRoughTree[privateID].next.each((TreeLeaf)=>{

            if(TreeLeaf.id === pd){
                found = true;
            }

            searchTree()
        })
    }*/
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
        if(Object.keys(goddata.private.privateRoughTree[pd].next).map(()=>{ return true}).length > 0 || goddata.private.privateRoughTree[pd].done){
            console.log('BAD BAD BAD init');
            setFloating(true);
            setDoo(false);
        } else {
            console.log('GOOD GOOD GOO int');
            setFloating(false);
            setDoo(true);
        }
    },[]);

    useEffect(()=>{
        if(floating && (syncIssue !== false)){
            console.log('jesus pickup', syncIssue)
            setFloating(false);
            setPd(syncIssue);
            setDoo(true);
            setRefreshParents(true);
        }

        if(typeof tempVal !== 'undefined' && doo){
            update(tempVal);
            setTempVal(undefined);
        }
    })
    //const [pd, setPd] = useState(goddata.private.privateDataLast  );

    useEffect(()=>{
        if(refreshParents){
            const ids = searchBack();
            console.log('teh big bad ids', ids);
            for(let i = 0; i < ids.length; i++){
                goddata.private.privateDataTree[ids[i]]['fn']();
            }
        }
    }, [refreshParents])


    /*if(pd !== goddata.private.privateDataLast && (pd === goddata.private.privateDataActualLast) || (pd !== goddata.private.privateDataActualLast && goddata.private.privateDataLastId.length === 1)){
         goddata.private.privateDataAsync[id] = goddata.private.privateDataLast;
        console.log('Preparing ASYNC pd:', pd, 'LAST: ', goddata.private.privateDataAsync[id], 'ID OF OBJECT', id, 'ACTUAL LAST:', goddata.private.privateDataActualLast)

    }*/


    goddata.private.privateDataLast = pd;

    /*
    useEffect(()=>{


        //this detects async functions and fixes them.

       if(typeof goddata.private.privateDataAsync[id] !== 'undefined'){
           if(pd  !== goddata.private.privateDataAsync[id]){

               console.log('FIXING ASYNC pd:', pd, 'LAST: ', goddata.private.privateDataAsync[id], 'ID OF OBJECT', id, 'ACTUAL LAST:', goddata.private.privateDataActualLast)

               let temp = goddata.private.privateDataAsync[id];

               let len = goddata.private.instances[pd][priv].length;
               for(let i = 0; i < len; i++){
                   if(goddata.private.instances[pd][priv][i]['id'] === id){
                       goddata.private.instances[pd][priv].splice(i, 1);
                       break;
                   }
               }
               if(typeof goddata.private.data[temp] === 'undefined'){
                   goddata.private.data[temp] = {};
               }
               if(typeof goddata.private.areas[temp] === 'undefined'){
                   goddata.private.areas[temp] = {};
               }
               goddata.private.data[temp][priv] = goddata.private.data[pd][priv];
               goddata.private.areas[temp][priv] = goddata.private.areas[pd][priv];
               if(goddata.private.instances[pd][priv].length === 0){
                   delete goddata.private.data[pd][priv];
               }
               delete goddata.private.privateDataAsync[id];
               setPd(goddata.private.privateDataLast);
           }
       }

    }); */

    /*if(typeof goddata.private.privatePDs[id] !== 'undefined'){
        if(goddata.private.privatePDs[id]  !== goddata.private.privateDataLast){
            pd = goddata.private.privatePDs[id];
            let temp = goddata.private.privateDataLast

            let len = goddata.private.instances[pd][priv].length;
            for(let i = 0; i < len; i++){
                if(goddata.private.instances[pd][priv][i]['id'] === id){
                    goddata.private.instances[pd][priv].splice(i, 1);
                    break;
                }
            }
            if(typeof goddata.private.data[temp] === 'undefined'){
                goddata.private.data[temp] = {};
            }
            if(typeof goddata.private.areas[temp] === 'undefined'){
                goddata.private.areas[temp] = {};
            }
            goddata.private.data[temp][priv] = goddata.private.data[pd][priv];
            goddata.private.areas[temp][priv] = goddata.private.areas[pd][priv];
            if(goddata.private.instances[pd][priv].length === 0){
                delete goddata.private.data[pd][priv];
            }

            goddata.private.privatePDs[id] = goddata.private.privateDataLast;
        }
    } else {
        goddata.private.privatePDs[id] = goddata.private.privateDataLast;
    }

    pd = goddata.private.privateDataLast; */






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

           console.log('creating component LAST:', goddata.private.privateDataLast, 'STORED LAST:', pd, 'ID:', id)
           console.log('creating ASYNC pd:', pd, 'LAST: ', goddata.private.privateDataLast, 'ID OF OBJECT', id, 'ACTUAL LAST:', goddata.private.privateDataActualLast)

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
            refresh();
            updateAll();
        }
    }, [doo])



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

    console.log('GOD GLOBAL', goddata.private);

    if(!doo){
        return [undefined, (val)=>{ setTempVal(val); }, updateAll]
    }

    updateRefresh();

    return [goddata.private.data[pd][priv], update, updateAll];
}


export default useGodData;