export const Batch_Weigh_Oper = "Batch_Weigh_Oper"
export const Counter_Weigh_NUM = "Counter_Weigh_NUM"
export const WAIT_WEIGH_OPEN = "WAIT_WEIGH_OPEN"
export const WAIT_WEIGH_CLOSE = "WAIT_WEIGH_CLOSE"

export function batchWeighOper(Batch_Weigh_Oper){
    return (
        {
            type: "Batch_Weigh_Oper",
            Batch_Weigh_Oper: Batch_Weigh_Oper,
            num:0
        }
    );
}

export function counterWeighNum(){
    return (dispatch,getState)=>{
        let num = getState().batchWeighOper.num;
        dispatch({
            type:Counter_Weigh_NUM,
            num:++num
        })
    }
}

export function onClose(){
    return (dispatch,getState)=>{
        dispatch({
            type:WAIT_WEIGH_CLOSE,
            visible:false
        });
    };
}

export function onOpen(){
    return (dispatch,getState)=>{
        dispatch({
            type:WAIT_WEIGH_OPEN,
            visible:true
        });
    };
}
