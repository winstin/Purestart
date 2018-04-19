export const GET_MESSAGE = "GET_MESSAGE"
export const SAVE_MESSAGE = "SAVE_MESSAGE"
export const UPDATE_MESSAGE = "UPDATE_MESSAGE"
import {api} from "./AY_API"
export function getMessage(callback){
    return (dispatch,getState)=>{
        getLogisticsList(dispatch,getState,callback);
    }
}

export function saveMessage(type,checked){
    return (dispatch,getState)=>{
        let args;
        let message = getState().LogisticsMatch.message;
        let setAll = getState().LogisticsMatch.setAll;
        let isupdate = getState().LogisticsMatch.isupdate;
        if(checked=="开启"||checked=="停用"){
            message[type].usevalue = checked=="开启"?"停用":"开启";
            args = {
                "usevalue":JSON.stringify(message[type])
            };
        }else{
            if(type=="trade_signed_logistics"){
                setAll[type]=checked;
            }else if(type=="address_anomaly_order"){
                setAll[type]=checked;
            }else if(type=="address_anomaly_order_logistics"){
                setAll[type]=checked;
            }else if(type=="ismore_logistics"){
                setAll[type]=checked;
            }else{
                setAll[type]=checked?1:0;
            }
            args = {
                "logisticsMatch":JSON.stringify(setAll)
            };
        }
        api("ebs.setting.saveset",args,function(info){
            dispatch({
                type:UPDATE_MESSAGE,
                message:message,
                setAll:setAll,
                isupdate:isupdate?false:true
            });
        });
    }
}

export function savelogistics(){
    return (dispatch,getState)=>{
        getState().MatchCheck.hascheck = 0;
        let listCheckArr = getState().LogisticsMatch.listCheckArr;
        let message = getState().LogisticsMatch.message;//wuliuArr:"中通快递",usevalue:"开启"
        let arg = [];
        for(let i in listCheckArr){
            let str = '';
            let shen = listCheckArr[i];
            for(let j in shen){
                let shi = shen[j];
                for(let k in shi){
                    str += j+","+shi[k]+";";
                }
            }
            let wuliuArr = message[i].wuliuArr;
            str = str.substr(0,str.length-1);
            arg.push({"wuliuArr":wuliuArr,"str":str});
        }
        let args = {
            "listCheckArr":JSON.stringify(arg)
        };
        api("ebs.setting.saveset",args,function(info){
            getLogisticsList(dispatch,getState);
        });

    }
}

export function savetemplateLMaction(expressmoneyz,messageexpress){
    return (dispatch,getState)=>{
        let args = {
            "expressmoneyz":JSON.stringify(expressmoneyz),
            "messageexpress":JSON.stringify(messageexpress)
        };
        api("ebs.setting.saveset",args,function(info){
            console.log(info);
        });
    }
}

function getLogisticsList(dispatch,getState,callback){
    // let messageexpress = [{"place":"江浙沪","weight":"1.0","money":"12.00","addweight":"1.0","addmoney":"8.00"}];
    let message = [];
    let listCheckArr = [];
    let isupdate = getState().LogisticsMatch.isupdate;
    api("ebs.setting.getcheckset","",function(info){
        api("ebs.setting.getlogistics","",function(res){
            let logistics = res.logistics;
            let logistics_detail = res.logistics_detail;
            for(let i in logistics){
                let str = '';
                let placeArr = logistics[i]["placeArr"].split(";");
                listCheckArr[i] = [];
                for(let s in placeArr){
                    let strArr = placeArr[s].split(",");
                    if(!listCheckArr[i][strArr[0]]){
                        listCheckArr[i][strArr[0]] = [];
                    }
                    if(listCheckArr[i][strArr[0]].indexOf(strArr[1]) == -1){
                        listCheckArr[i][strArr[0]].push(strArr[1]);
                    }
                }
                for(let k in listCheckArr[i]){
                    str += k + ":";
                    str += listCheckArr[i][k].join(",");
                    str += ";";
                }
                message.push({
                    "id":i,
                    "placeArr":str,
                    "wuliuArr":logistics[i]["wuliuArr"],
                    "usevalue":logistics[i]["isUse"],
                    "place":'',
                    "feetime":logistics[i]["feetime"],
                    "weight":logistics[i]["weight"],
                    "money":logistics[i]["money"],
                    "addweight":logistics[i]["addweight"],
                    "addmoney":logistics[i]["addmoney"]
                });
            }
            if(callback){
                callback(info.all);
            }
            dispatch({
                type:GET_MESSAGE,
                message:message,
                setAll:info.all,
                listCheckArr:listCheckArr,
                logistics_detail:logistics_detail,
                isupdate:isupdate?false:true
            });
        });
    });
}
