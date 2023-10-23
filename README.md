# god-data
A hook to share global data between components.

## Package Purpose

The purpose of this package is to share data between React components without having to pass around properties or other like methods. Every time you update one of the hooks it updates all uses of the hook. It essentially shares a global variable between components. It is like a useState variable that is global. You can store any type of data in the variable. You can create multiple global variables by adding a second parameter to the hook, using what we call linked data sets, you can create a large number of these self-updating variables.



For instructions on how to use and install refer to our [god-data Wiki Page](https://github.com/futureandahope7/god-data/wiki)



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

     return <><AComponent /><Bcomponent /></>;

    }
```


Main above will return <><>Allan 46</><></></>