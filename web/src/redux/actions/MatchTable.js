export const CHANGE_CREATEMATCH = "CHANGE_CREATEMATCH"
export const CHANGE_SHOPS = "CHANGE_SHOPS"
import {api} from "./AY_API"

export function createMatchOpen(isopen){
    return (dispatch)=>{
        dispatch({
            type:CHANGE_CREATEMATCH,
            createMatch:isopen
        })
    }
}

export function changeShops(item){
    return (dispatch,getState)=>{

        let shops = getState().TradeSync.shops;
        let ischange = getState().TradeSync.ischange;
        shops[item].checked = shops[item].checked ? false:true;

        dispatch({
            type:CHANGE_SHOPS,
            shops:shops,
            ischange:ischange?false:true
        })
    }
}
