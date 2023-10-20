# god-data
A hook to share global data between components.

# god-data npm package

The purpose of this package is to share data between React components without having to pass around properties or other like methods. Every time you update one of the hooks it updates all uses of the hook. It essentially shares a global variable between components. It is like a useState variable that is global. You can store any type of data in the variable. You can create multiple global variables by adding a second parameter to the hook, using what we call linked data sets, you can create a large number of these self-updating variables.

***
**Note: Although we do our best to ensure the working functionality of this package, this package is still experimental, it is not recommended to use it in mission-critical applications, like healthcare.**
***





```
    import useGodData, {GodPrivateData} from 'god-data'

    const ComponentA = () => {
        const [data, setData] = useGodData({name: "Robert", type: "person"}, 'living');

        return <>{data['type']}</>
    }

    const ComponentB = () => {
        const [data, setData] = useGodData(undefined, 'living');
        useEffect(()=>{
           setData({name: "Jesus", type: "God" });
        },[]);

        return <>Hi there {data['name']}</>;
    }

    const Main = () => { 

     return <GodPrivateData><ComponentA /><ComponentB /></GodPrivateData>;
   }

```

The Main component above will output <><>God</> <>Hi there Jesus</></>. The components share the references from the hook useGodData(). In this way, we are sharing one data reference between components. No matter where they are in the component tree each instance of useGodData() will share the same data. When one is updated all are.



## Installation

To use this package, use the following command.

`npm install god-data`

Always use the latest version of this package, as older versions are often bug-ridden, and in some cases do not function. 

Below is an example of the functions usage:


```    
    import useGodData, {GodPrivateData} from 'god-data'
    
    const AComponent = () => {
        const [data, setData, updateAll] = useGodData({name: 'Robert', age: 48}, 'a-unique-key-to-link-data');

        

        return <>{typeof data['name'] !== 'undefined' ? data['name] + ' ' + data['age']: ''}</>;
    
    }


    const BComponent = () => {
        const [data, setData, updateAll] = useGodData(undefined, 'a-unique-key-to-link-data');

        useEffect(()=> {
        
            //replace all data in object
            setData({name: 'Allan', age: 46});
        
        }, []);

        return <></>;
    }

    const Main = () => {

     return <GodPrivateData><AComponent /><Bcomponent /></GodPrivateData>;

    }
```


Main above will return <><>Allan 46</><></></>

## Features

### data
Returns the data you have stored. Is the data variable.

### setData
Sets the data in the hook to the data you provide as a parameter. i.e. sets the data variable.


```    
    const [data, setData] = useGodData(undefined, 'books');
    
    useEffect(()=>{
        const mydata = ['bible', 'cooking book', 'workout guide']; 
        setData(mydata);
    }, []);


    return <>{data[0]}</>
```

Will return bible.

### updateAll

Force a refresh of all React components connected to the data variable after a non-updating call.

```
class Test {

    item = {};

    get = (i) =>{
        return this.item[i];
    }

    set = (k, i) =>{
        this.item[k] = i;
    }
}

const Component = ({someprop}) =>

const [data, setData, updateAll] = useGodData(new Test(), 'test');

    useEffect(()=>{
   
       //does not cause state change. Local to object only.
       data.set("name", someprop);

       //push the change to all hooks
       updateAll();
   }, [someprop]);
    
   return <>{data ? data.get("name") : ''}</>
}

```


## Linked Data Sets

A linked data set is similar to a specialized data category, essentially a variable, designated by providing the hook with a second string parameter, which you can think of as a variable name. Its role is twofold: 1) It connects data between hooks that share the same category (variable), and 2) It establishes its own distinct data space, effectively creating a separate variable. You should utilize linked data sets when you anticipate that others will use this component in a project, which is often the default scenario. It's also helpful when you require multiple data storage variables. If you don't specify a linked data set, the system will default to using a global one. It's important to note that both the default and private data sets operate within a single global variable, potentially leading to data conflicts. To prevent such conflicts, you should establish private data areas by using unique keys that are unlikely to be used by others, safeguarding your data from potential clashes with others' information. e.g.

```
const [data, setData] = useGodData({name: "Robert", type: "person"}, 'my_cool_namespace.my_shared_variable_name'); 
```

Some uses below:

```
    //creates a data area called people separate from other data
    const [data, setData] = useGodData({name: "Robert", type: "person"}, 'people'); 
    
    //creates a data area called animals separate from other data but adds nothing to the store initially.
    const [data1, setData1] = useGodData(undefined, 'animals'); 
    
    //creates a data area called plants separate from other data
    const [data2, setData2] = useGodData({name: "Fern", type: "plant"}, 'plants'); 

    //uses the default data area (Not recommended due to data conflict)
    const [data3, setData3] = useGodData({name: "Fern", type: "plant"}); 

```

Unlike Reacts useState, useGodData does not create a new private variable on each call of the function. You must specify which useGodData's are connected by using a unique id.

The following will cause errors. Because both storage locations share the same data variable (linked data set).
```
const [data1, setData1] = useGodData({name: "Fern", type: "plant"});
const [data2, setData2] = useGodData({name: "Cactus", type: "plant"});
```
You really should give each it's data area:
```
const [data1, setData1] = useGodData({name: "Fern", type: "plant"}, 'Ferns');
const [data2, setData2] = useGodData({name: "Cactus", type: "plant"}, 'Cactuses');
```

When using the component be sure to use the same linked data area name for components you wish to share data.

```
const ComponentA = () => {
    const [data1, setData1] = useGodData({name: "Fern", type: "plant"}, 'Ferns');
    const [data2, setData2] = useGodData({name: "Cactus", type: "plant"}, 'Cactuses');

    return <>This plant is a {data1["name"]} and this one a {data2["name"]}</>
}

const ComponentB = () => {
    const [data2, setData2] = useGodData({name: "Cactus", type: "plant"}, 'Cactuses');

    return <>This {data2["type"]} is a {data2["name"]}}</>
}

const ComponentC = () => {
    const [data1, setData1] = useGodData(undefined, 'Ferns');
    useEffect(()=>{  
       let temp = {...data1};
       temp['name'] = 'Eagle Fern'
       setData1(temp);
    }, []);
    return <>This {data1["type"]} is a {data1["name"]}}</>
}

```
## Protecting Your Data
To prevent cross-access of data. i.e people using your linked dataset key, to read and write to your data. You need to wrap your application in the GodPrivateData tag. If you do this it will reduce the likelihood that people will be able through javascript code to modify or access your data.

```
import useGodData, {GodPrivateData} from 'god-data'

const Main = () => {


return <GodPrivateData><AppContainingSubsequentCallsToHook /></GodPrivateData>;

}

const AppContainingSubsequentCallsToHook = () =>{
    const [data, setData] = useGodData([{name: "Robert", type: "person"}], 'futureandahope7.people');
    
    const people = data.map((value)=>{
        return <div>{value['name']}</div>
    });

    return <div><div>Here are some people we know:</div> {people}</div> 
}


```

When you use the GodPrivateData tag set any calls to useGodData within the tags are protected so no one at a higher level can access them using calls to useGodData. This prevents people from using your namespace (linked data set) to access or change your data using this library.

You may also nest these data sets like follows:

```

const Testing = () => {
    return <GodPrivateData>
                <PrivateComponent />
                <GodPrivateData>
                    <PrivateComponent2 />
                    <PrivateComponent3 />
                </GodPrivateData>
                <PrivateComponent />
            </GodPrivateData>

}

```
Each internal GodPrivateData tag becomes its own private dataset, and its children components become private, and will not be shared or read by external instances of useGodData.

## Limitations and Know Issues

### Reference not Updated

The hook useGodData will not always return a new reference, e.g. in the case of an object reference being stored in data, and a updateAll call being used. This can result in watching functions (like useEffect with parameters) failing. The following code will fail to call the function doSomeOperationOnUpdate() even though the data variable will change state. This is because the variable contains an object reference, which we have not changed anywhere in the code. The hook useEffect requires a change in the variable reference because this does not occur, only the object's data has changed, the change is not registered with useEffect. However, the data change is still propagated throughout the application. Other hooks will return the new data, but because they are returning the same reference hooks that require reference change like useEffect will not trigger.

```
class Test {

    item = {};

    get = (i) =>{
        return this.item[i];
    }

    set = (k, i) =>{
        this.item[k] = i;
    }
}

const Component = ({someprop}) =>
    const [data, setData, updateAll] = useGodData(new Test(), 'test');

    useEffect(()=>{
   
       //does not cause state change. Local to object only.
       data.set("name", someprop);

       //push the change to all hooks
       updateAll();
   }, [someprop]);

   useEffect(()=> {
        doSomeOperationOnUpdate();
   }, [data]);

    const doSomeOperationOnUpdate = () => {
        //do work
    }

    return <>{data ? data.get("name") : ''}</>

}
```

To solve this issue move state into the object and test for it.

```
class User {

    item = {firstname: 'Anita', lastname: 'Palmer', birth_date: '1978-06-20', job: 'Farmer' };
   state = 0;

   constructor() {
       this.stateChange();
   }
    get = (i) =>{
        return this.item[i];
       
    }



    set = (k, i) =>{
        this.item[k] = i;
        this.stateChange();
    }

    getString = (i) => {
        let val = this.get(i);
        if(typeof val !== 'undefined'){
            return val.toString();
        }
        return '';
    }

    readData = () =>{
        const thisUser = this
        return new Promise((resolve, reject)=>{
            thisUser.item = {firstname: 'Robert', lastname: 'Palmer', birth_date: '1970-09-12', job: 'Computer Programmer' };
            thisUser.stateChange();
            resolve();
        })
    }

    stateChange = () =>{
        this.state = Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

     getState = () => {
        return this.state;
     }



}

const Component = ({someprop}) =>
    const [data, setData, updateAll] = useGodData(new User(), 'futureandahope7.user');

    useEffect(()=>{
   
       //does not cause state change. Local to object only.
       data.set("name", someprop);

       //push the change to all hooks
       updateAll();
   }, [someprop]);

   useEffect(()=> {
        doSomeOperationOnUpdate();
   }, [data ? data.getState() : 0]);

    const doSomeOperationOnUpdate = () => {
        //do work
    }

    return <>{data ? data.get("name") : ''}</>

}

```


