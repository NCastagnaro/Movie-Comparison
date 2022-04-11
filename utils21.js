const debounce = (func, delay = 1000) => {
    let timeoutId;
    //this function is the one that guards how often func
    //can actually be invoked.
    //same as return (arg1,arg2,arg3) 
    return (...args) => {
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
//same as func(arg1,arg2,arg3)
            func.apply(null,args);
        }, delay)
    }
}