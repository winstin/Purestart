export const GET_WANG_FILTER_LIST = "GET_WANG_FILTER_LIST";

import {api,ajax} from "./AY_API";

/**
 * condition
 * search_value 搜索值
 * filter_value 过滤值
 * sort_value 排序值
 * page_num 页码
 */
export function getWangFilterlist(condition){
    let page=condition.page_num;
    return (dispatch)=>{
        ajax("/iytrade2/getaddWhil",{pageno:page},"POST",function(e){
        	console.log("--------拦截旺旺过滤的数据-------")
            console.log(e);
             dispatch({
                type:GET_WANG_FILTER_LIST,
                orderData:e.res,
                total:e.total,
                sum:e.sum,
                page:page
            });
        });
    };
}