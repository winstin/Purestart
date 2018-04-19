export const GET_PRINTSET = "GET_PRINTSET"
export const SAVE_PRINTSET = "SAVE_PRINTSET"
import {api} from "./AY_API"
export function getPrintSet(callback){
    return (dispatch,getState)=>{
        let isupdate = getState().PrintSet.isupdate;
        api("ebs.setting.getcheckset","",function(info){
            callback(info.all);
            dispatch({
                type:GET_PRINTSET,
                printset:info.all,
                isupdate:isupdate?false:true
            });
        });
    }
}
export function savePrintSet(type,checked){
    return (dispatch,getState)=>{
        let isupdate = getState().PrintSet.isupdate;
        let arr = {
            "type":type,
            "checked":checked
        };
        let args = {
            "printset":JSON.stringify(arr)
        };
        api("ebs.setting.saveset",args,function(info){
            console.log(info);
        });
    }
}
