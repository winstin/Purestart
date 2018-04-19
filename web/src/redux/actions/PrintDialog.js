/**
 @author Mothpro
**/
export const WAITPRINT_OPEN = "WAITPRINT_OPEN"
export const WAITPRINT_CLOSE = "WAITPRINT_CLOSE"
export const WAITPRINT_CHANGE = "WAITPRINT_CHANGE"


export function onClose(){
    return (dispatch,getState)=>{
        dispatch({type:WAITPRINT_CLOSE,visible:false});
    };
}

export function onOpen(){
    return (dispatch,getState)=>{
        dispatch({type:WAITPRINT_OPEN,visible:true});
    };
}
export function onSelect(value){
    return (dispatch,getState)=>{
        dispatch({type:WAITPRINT_CHANGE,'pageSize':value});
    };
}
