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
        console.log('FLOATING = refresh Private DAta', id)
        setCounter(counter + 1);
    }

    useEffect(()=>{

        if (typeof goddata.private.privateDataKnownAs[id] !== 'undefined') {

        } else {
            goddata.private.privateDataKnownAs[id] = {};
        }
        goddata.private.privateDataKnownAs[id][id + '_' + goddata.private.privateDataLast] = goddata.private.privateDataLast;


        goddata.private.privateDataRefresh[id] = refresh;


        /*
        if(typeof goddata.private.privateDataKnownAs[goddata.private.privateDataLast] === 'undefined' && (typeof goddata.private.privateDataKnownAs[goddata.private.privateDataLast] !== 'undefined' && typeof goddata.private.privateDataKnownAs[goddata.private.privateDataLast][id+goddata.private.privateDataLast] === 'undefined')) {

            let temp = {...knowsAs};
            temp[goddata.private.privateDataLast] = refresh;

            for (let i in temp) {
                if (temp.hasOwnProperty(i)) {
                    temp[i] = refresh;
                    if (typeof goddata.private.privateDataKnownAs[i] !== 'undefined') {

                    } else {
                        goddata.private.privateDataKnownAs[i] = {};
                    }
                    goddata.private.privateDataKnownAs[i][id + i] = refresh;
                }
            }

            setKnownAs(temp);
        }
        */

    });

    console.log('FLOATING = Private DAta do', id)

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

    console.log('TESTITOUT HERE', goddata.private.privateDataLast, id, goddata)

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

    console.log('IN IN GOD DATA STROE (last ID start of IN IN) ---------------', goddata.private.privateDataLast, )

    goddata.private.privateDataLastId.push(goddata.private.privateDataLast);
    console.log('IN IN GOD DATA STROE IN  (array of last id) ',goddata.private.privateDataLastId);
    goddata.private.privateDataId.push(id);
    goddata.private.privateDataLast = id;
    goddata.private.privateDataActualLast = id;

    console.log('IN IN GOD DATA STROE (id out) ---------------------', goddata.private.privateDataLast)

    return React.createElement(React.Fragment, {});

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
    console.log('TESTITOUT HERE OUT OUT ====', goddata.private.privateDataLast, parentId, goddata)



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
    const [siblings, setSiblings] = useState();

    const syncIssue = (pd !== goddata.private.privateDataLast) ? goddata.private.privateDataLast : false;
    const lastId = goddata.private.privateDataLast;
    const bad = (pd === 'default' || (typeof goddata.private.privateRoughTree[pd] !== 'undefined' && typeof goddata.private.privateRoughTree[pd].next !== 'undefined' && (Object.keys(goddata.private.privateRoughTree[pd].next).map(()=>{ return true}).length > 0) || (goddata.private.privateRoughTree[pd].done && goddata.private.rootNode !== pd)));
  console.log('TESTITOUT bad', bad, goddata.private.privateRoughTree[pd], id)


    console.log('FLOATING = id:', id, 'doo', doo, 'floating:', floating, 'pd', pd, 'last', goddata.private.privateDataLast, 'tempVal', tempVal, 'refreshParents', refreshParents, 'syncIssue', syncIssue, 'bad', bad);


    const searchBack = (privateID, level) => {

        if(floating){
            console.log(id, "FLOATING = searchBack")
        }



      console.log('back is', goddata.private.privateRoughTree[privateID])
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

        if(floating){
            console.log(id, "FLOATING = refrsh")
        }

        if(counter > 1000){
            goddata.private.counter = 0;
            setCounter(0);

        } else {
            goddata.private.counter++;
            setCounter(Math.ceil(goddata.private.counter));
        }
    }

    useEffect(()=>{

            console.log(id, "FLOATING create object (ignore)", )

        //on creating node children exist, this is a clear sign that we could be floating or adding in a new record
        if(bad){
            console.log('TESTITOUT BAD BAD BAD init');
            setFloating(true);
            setDoo(false);
            setRefreshParents(true);
        } else {
            console.log('TESTITOUT GOOD GOOD GOO int');
            setFloating(false);
            setDoo(true);
        }
    },[]);

    useEffect(()=>{

        if(floating){
            console.log(id, "FLOATING = useEffect [each]", goddata.private.data[pd][priv])
        }

        if(floating && (syncIssue !== false)){
            console.log('FLOATING = ', pd , 'RESTORED TO:  ', syncIssue)
            setFloating(false);
            setPd(syncIssue);
            setDoo(true);

        }




    });

    useEffect(()=>{

        if(floating){
            console.log(id, "FLOATING = useEffect [refreshParents]")
        }

        if(refreshParents){
            console.log('FLOATING = THE ARRAY known as', goddata.private.privateDataKnownAs, 'using ', pd)
            if(typeof goddata.private.privateDataKnownAs[pd] !== 'undefined'){
                //goddata.private.privateDataKnownAs[i][id+i]
                console.log('FLOATING = log', goddata.private.privateDataKnownAs[pd]);

                for(let i in goddata.private.privateDataKnownAs[pd]){
                    if(goddata.private.privateDataKnownAs[pd].hasOwnProperty(i)){
                        if(typeof goddata.private.privateDataRefresh[goddata.private.privateDataKnownAs[pd][i]] === 'function') {
                            goddata.private.privateDataRefresh[goddata.private.privateDataKnownAs[pd][i]]();
                        }
                    }
                }
            }

            /*const ids = searchBack(pd, 0);
            console.log('TESTITOUT teh big bad ids', ids ,pd, id);
            console.log(id, "FLOATING = data from refresh", ids );
            for(let i = 0; i < ids.length; i++){
                goddata.private.privateDataTree[ids[i]]['fn']();
            }
            console.log('FLOATING = data tree', goddata.private.privateDataTree, goddata.private.privateRoughTree)
            if(ids.indexOf(lastId) === -1 && typeof goddata.private.privateDataTree[lastId] !== 'undefined'){
                goddata.private.privateDataTree[lastId]['fn']();
            }
            setRefreshParents(false);
            setDoingRefresh(true); */


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

        if(floating){
            console.log(id, "FLOATING = cleanUP")
        }

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

        if(floating){
            console.log(id, "FLOATING = updateRefresh")
        }

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

        if(floating){
            console.log(id, "FLOATING = useEffcet - cleanUp, []")
        }

        return () => {
            cleanUp();
        }
    }, []);

    useEffect(()=>{

        if(floating){
            console.log(id, "FLOATING = useEffect [doo]")
        }

        if(doo){
            console.log('set to do', goddata);
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
        if(floating){
            console.log(id, "FLOATING = update")
        }
        console.log('created', goddata)
        goddata.private.data[pd][priv] = data;
        goddata.private.areas[pd][priv] = true;
        updateAll();
    }

    const updateAll = () => {

        if(floating){
            console.log(id, "FLOATING = updateAll")
        }

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
        if(floating){
            console.log(id, "FLOATING = return [undefined]")
        }
        return [undefined, (val)=>{
            setTempVal(val);
            console.log('not created', goddata);
            }, updateAll];
    }

    updateRefresh();

    if(floating){
        console.log(id, "FLOATING = return [data]")
    }

    return [goddata.private.data[pd][priv], update, updateAll];
}


export default useGodData;