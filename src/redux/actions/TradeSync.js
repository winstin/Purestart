export const GET_SHOPS = "GET_SHOPS"
export const CHANGE_SHOPS = "CHANGE_SHOPS"
import {api} from "./AY_API"

export function getShops(){
    return (dispatch)=>{
        api("ebs.setting.getbindshops","",function(e){
            dispatch({
                isLoading:false,
                type:GET_SHOPS,
                shops:e
            });
        });
    }
}
export function changeShops(item){
    return (dispatch,getState)=>{
        let shops = getState().TradeSync.shops;
        let ischange = getState().TradeSync.ischange;
        shops[item].checked = shops[item].checked ? false:true;
        let args = {
            "shops":JSON.stringify(shops)
        };
        api("ebs.setting.saveset",args,function(e){
            dispatch({
                type:CHANGE_SHOPS,
                shops:shops,
                ischange:ischange?false:true
            });
        });
    }
}
