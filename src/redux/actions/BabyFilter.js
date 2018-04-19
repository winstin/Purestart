export const GET_BABY_FILTER_LIST = "GET_BABY_FILTER_LIST";
export const GET_WHITE_FILTER_LIST = "GET_WHITE_FILTER_LIST";

import {api,ajax} from "./AY_API";

/**
 * condition
 * page_no 页码
 */
export function getBabyFilterlist(condition){
    
    return (dispatch)=>{
        
        QN.top.invoke({
        cmd:'taobao.items.onsale.get',
        param : {
            fields:'num_iid,pic_url,title',
            page_no:condition.page_num,
            page_size:20,
        },
        method:'post',
        success:function(rsp){
            
             let items=rsp.items_onsale_get_response.items.item;
             let total_results=rsp.items_onsale_get_response.total_results;
             let page=condition.page_num;
             dispatch({
                type:GET_BABY_FILTER_LIST,
                orderData:items,
                total:total_results,
                page_no:page,
            });

            if (typeof rsp ==='string'){rsp = JSON.parse(rsp);}
            var total=rsp.items_onsale_get_response.total_results;
        },
        error:function(msp){
            console.log(msp)
        }
    });
  };
}


export function getWhiteFilterlist(condition){
    console.log("-------------getwhitelist")
    console.log(condition)
    return (dispatch)=>{
        let page=condition.page_num;
        console.log(page)
        ajax("/iyprint2/getwhitelist",{page:page},"POST",function(e){
            console.log("--------白名单的数据-------")
            console.log(e);
             dispatch({
                type:GET_WHITE_FILTER_LIST,
                orderWhiteData:e.res,
                totalWhite:e.total,
                page:page,
            });
        });
    };
}