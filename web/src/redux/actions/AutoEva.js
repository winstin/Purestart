/**
 @author Cbl
**/
export const ADDEVA = "ADDEVA"
export const CHANGE_AUTOEVA_SWITCH_STATE = "CHANGE_AUTOEVA_SWITCH_STATE"
export const CHANGE_RADIO_SWITCH_STATE = "CHANGE_RADIO_SWITCH_STATE"
export const INIT_AUTOEVA_SETTINGS = "INIT_AUTOEVA_SETTINGS"
import {ajax} from "./AY_API"

export function addEva(data){
    return (dispatch)=>{
        dispatch({
            type:ADDEVA,
            data:data
        })
    }
}

export function getInitData(){

    return (dispatch)=>{
        console.log('getInitData');
        ajax("/iytrade2/showzdrate","","POST",function(e){
            console.log("GoodsListTable：", e);
            console.log("GoodsListTable：", e.myoff);
            console.log("GoodsListTable：", e.emailrate);

            console.log("GoodsListTable：", e.flag);
            console.log("GoodsListTable：", e.robday + "   " + e.robhouser);
            console.log("GoodsListTable：", e.timingday + "   " + e.timinghouser);

            console.log("GoodsListTable：", e.blackrate);
            console.log("GoodsListTable：", e.blackcloud + "  " + e.blackcloudcount);
            console.log("GoodsListTable：", e.zdblackrate);

            console.log("GoodsListTable：", e.ratetexts);
            let autoSwitchState,radioSwitchState,filterStyle,evaStyle;
            if (e.myoff == 'on') {
                e.myoff = true;
            }else{
                e.myoff = false;
            }
            if (e.emailrate == '0') {
                e.emailrate = false;
            } else {
                e.emailrate = true;
            }
            dispatch({
                type:INIT_AUTOEVA_SETTINGS,
                dataSource: e
            });
        });
    }
}

export function changeAutoEvaSwitchState(value){
    if (!value) {   // TODO:: 关-》开

    }else{  // TODO:: 开-》关

    }
    if (true) { //TODO::操作成功
        return (dispatch)=>{
            dispatch({
                type:CHANGE_AUTOEVA_SWITCH_STATE,
                autoSwitchState:!value
            })
        }
    }else{
        //TODO:: 操作失败
        return;
    }

}

export function changeRadioSwitchState(value){
    console.log("click    " + value);
    if (!value) {   // TODO:: 关-》开

    }else{  // TODO:: 开-》关

    }
    if (true) { //TODO::操作成功
        return (dispatch)=>{
            dispatch({
                type:CHANGE_RADIO_SWITCH_STATE,
                data:!value
            })
        }
    }else{
        //TODO:: 操作失败
        return;
    }

}
