export const GET_INTERCEPT_RECORD_LIST = "GET_INTERCEPT_RECORD_LIST";

import {api,ajax} from "./AY_API";

/**
 * condition
 * search_value 搜索值
 * filter_value 过滤值
 * sort_value 排序值
 * page_num 页码
 */
export function interceptRecordlist(condition){
    return (dispatch)=>{
        let page=condition.pageno;
        console.log(condition)
        console.log(page)
        ajax("/iytrade2/getblacklist",{page_no:page},"POST",function(e){
        	console.log("--------拦截记录的数据-------")
            console.log(e);
            console.log(page)
             dispatch({
                type:GET_INTERCEPT_RECORD_LIST,
                orderData:e.res,
                total:e.total,
                page:page,
            });
        });
    };
}