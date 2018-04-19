export const GET_RECEIVER_LIST = "GET_RECEIVER_LIST";

import {api,ajax} from "./AY_API";

/**
 * condition
 * search_value 搜索值
 * filter_value 过滤值
 * sort_value 排序值
 * page_num 页码
 */
export function getReceiverlist(condition){
    return (dispatch)=>{
        let page=condition.page_num;
        ajax("/iytrade2/gettype",{type:'con',pageno:page},"POST",function(e){
        	console.log("--------拦截的数据-------")
            console.log(condition)
            console.log(e);
             dispatch({
                type:GET_RECEIVER_LIST,
                orderData:e.res,
                total:e.total,
                sum:e.sum,
                page:page

            });
        });
    };
}
