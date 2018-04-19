export const GET_TYPPES = "GET_TYPPES"
export const CHANGE_TYPES = "CHANGE_TYPES"
import {api} from "./AY_API"

export function getTypes(){
    return (dispatch)=>{
        api("ebs.setting.getcheckset","",function(e){
            dispatch({
                type:GET_TYPPES,
                types:e.types
            });
        });

    }
}
export function changeTypes(item_i,ele_i){
    return (dispatch,getState)=>{
        let types = getState().CheckOrders.types;
        types[item_i]["options"][ele_i].checked = types[item_i]["options"][ele_i].checked ? false:true;
        let args = {
            "types":JSON.stringify(types)
        };
        api("ebs.setting.saveset",args,function(e){
            console.log(e);
        });
    }
}
