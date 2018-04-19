export const GOODS_MATCH_LOADING = "GOODS_MATCH_LOADING"
export const GOODS_MATCH_CLOSE = "GOODS_MATCH_CLOSE"
import {api} from "./AY_API"

export function goodsMatch(){
    return (dispatch)=>{
        setTimeout(function(){
            dispatch({
                isLoading:false,
                visible:true,
                type:GOODS_MATCH_LOADING,
            });
        },2000);
    }
}

export function onClose(){
    return (dispatch)=>{
        dispatch({
            visible:false,
            type:GOODS_MATCH_CLOSE,
        });
    }
}
