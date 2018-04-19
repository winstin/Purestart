export const GET_DISTRICT_LIST = "GET_DISTRICT_LIST";

import {api,ajax} from "./AY_API";

/**
 * condition
 * search_value 搜索值
 * filter_value 过滤值
 * sort_value 排序值
 * page_num 页码
 */
export function getDistrictList(condition){
    let page=condition.pageno;
    return (dispatch)=>{
        ajax("/iytrade2/gettype",{type:'area',pageno:page},"POST",function(e){
        	console.log("--------拦截区域的数据-------")
            console.log(e);
             dispatch({
                type:GET_DISTRICT_LIST,
                orderData:e.res,
                total:e.total,
                sum:e.sum,
                page:page
            });
        });
    };
}