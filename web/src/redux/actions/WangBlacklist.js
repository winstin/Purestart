export const GET_WANG_BLACK_LIST = "GET_WANG_BLACK_LIST";

import {api,ajax} from "./AY_API";

/**
 * condition
 * page_no 页码
 */
export function wangblacklist(condition){
    return (dispatch)=>{
        let pageno=condition.page_sum;
        console.log(pageno)
        ajax("iytrade2/getaddBlack",{page_no: pageno},"POST",function(e){
        	console.log("--------拦截黑名单的数据-------")
            console.log(condition)
            console.log(e);
            console.log(pageno)
             dispatch({
                type:GET_WANG_BLACK_LIST,
                orderData:e.res,
                total:e.total,
                sum:e.sum,
                page:pageno,
                selectCondition:condition
            });
        });
    };
}
