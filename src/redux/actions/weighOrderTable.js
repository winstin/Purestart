export const WEIGHT_GET_ORDER_DATA = "WEIGHT_GET_ORDER_DATA"
export const UPDATE_WEIGH = "UPDATE_WEIGH"
import {api} from "./AY_API"

export function checkedOnChange(ItemsSelected_arr){
    return (
        {
            type:"ItemsSelected_arr",
            ItemsSelected_arr:ItemsSelected_arr
        }
    );
}

/**
 * condition
 * search_value 搜索值
 * filter_value 过滤值
 * sort_value 排序值
 * page_num 页码
 */

export function getOrderData(condition){
    return (dispatch)=>{
            condition.ebs_status = 3;
            api("ebs.orderData.list",condition,function(e){
                console.log(e);
                let ItemsSelected_arr = e.result.map(()=>false);
                dispatch({
                    type:WEIGHT_GET_ORDER_DATA,
                    orderData:e.result,
                    selectCondition:condition,
                    ItemsSelected_arr:ItemsSelected_arr,
                    total:e.total,
                    stores:e.stores
                });
            });
    };
}

//跟新重量字段的方法
export function updateWeigh(logisticId, taoTid){
    return (dispatch,getState)=>{
        const condition = {
            tao_tid: taoTid,
            logistics_id: logisticId
        };
        api("ebs.orders.updateweigh", condition, function(e){
            if(e.code==200){
                let orderData = getState().weighOrderTable.orderData;
                for(let i in orderData){
                    if(orderData[i].tao_tid == taoTid){
                        orderData[i].invoice_no = logisticId;
                    }
                }
                dispatch({
                    type: UPDATE_WEIGH
                });
            }
        })

    }
}
