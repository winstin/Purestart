export const ADD = "ADD"

export function add(value){
    return (dispatch)=>{
        dispatch({
            type:ADD,
            value:Number(value)+1
        })
    }
}
