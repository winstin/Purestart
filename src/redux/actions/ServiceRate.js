/**
 @author wp
**/
export const INITDATA = "INITDATA";
export const GETDATA = "GETDATA";


import {ajax} from "./AY_API"

export function getInitData(){
    return (dispatch)=>{
        ajax("/agentrate/list","","GET",function(e){
            console.log("GoodsListTable：", e);
            dispatch({
                type:INITDATA,
                dataSource: e
            });
        });
    }
}


export function getData(pageno){
    return (dispatch)=>{
        dispatch({
            type: GETDATA,
            pageno: pageno
        });
    }
}


export function SearchData(appId,appName){
    return (dispatch)=>{
        ajax("/agentrate/list",{
            appId:appId,
            appName:appName
        },"GET",function(e){
            console.log("GoodsListTable：", e);
            dispatch({
                type:INITDATA,
                dataSource: e
            });
        });
    }
}
