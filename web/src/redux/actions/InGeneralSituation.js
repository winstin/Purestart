export const GET_GENERAL_LIST = "GET_GENERAL_LIST";
export const CHANGE_INTERCEPTOR_SWITCH_STATE = "CHANGE_INTERCEPTOR_SWITCH_STATE"
import {api,ajax} from "./AY_API";

/**
 * condition
 * search_value 搜索值
 * filter_value 过滤值
 * sort_value 排序值
 * page_num 页码
 */
export function getGeneralList(condition){
    return (dispatch)=>{
        ajax("/iytrade2/defenload",{},"",function(e){
        	console.log("--------拦截概况的数据-------")
            console.log(e);
            let autoSwitchState;

            if (e.areaon== 'on'){
                e.areaon= true;
            }else{
                e.areaon= false;
            }

            if(e.baby == 'on'){
                e.baby = true;
            }else{
                e.baby = false;
            }

            if(e.black == 'on'){
                e.black =true;
           }else{
                e.black =false;
           }

           if(e.cloud == 'on'){
               e.cloud =true;
           }else{
               e.cloud =false;
           }

           if(e.conon == 'on'){
               e.conon =true;
           }else{
               e.conon =false;
           }

           if(e.denfenon == 'on'){
               e.denfenon =true;
           }else{
               e.denfenon =false;
           }

           if(e.sendsms == 'on'){
               e.sendsms =true;
           }else{
               e.sendsms =false;
           }

           if(e.wangwang == 'on'){
               e.wangwang =true;
           }else{
               e.wangwang =false;
           }
           
          autoSwitchState=['areaon','baby','black','cloud','conon','denfenon','sendsms','wangwang']
            console.log(e)
             dispatch({
                type:GET_GENERAL_LIST,
                orderData:e,
                autoSwitchState:autoSwitchState
            });
        });
    };
}

export function changeInterceptorSwitchState(value){
    console.log("-----------开关00000000000000")
    console.log(value)
    if (!value) {   // TODO:: 关-》开
      
    }else{  // TODO:: 开-》关

    }
    if (true) { //TODO::操作成功
        return (dispatch)=>{
            dispatch({
                type:CHANGE_INTERCEPTOR_SWITCH_STATE,
                autoSwitchState:!value
            })
        }
    }else{
        //TODO:: 操作失败
        return;
    }

}