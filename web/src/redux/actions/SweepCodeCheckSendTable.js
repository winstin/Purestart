/**
 @author Mothpro
**/
export const SWEEP_GET_ORDER_DATA = "SWEEP_GET_ORDER_DATA"
import {api} from "./AY_API"

export function checkedOnChange(ItemsSelected_arr){
    return (
        {
            type:"WAIT_ItemsSelected_arr",
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
 * ebs_status 订单全链路状态（电商套件自定义状态：0:待审核，1:异常单，2：待打印，3：待发货,4:已发货，5：已成功，6：已关闭，7：退款）
 */
export function getOrderData(condition){
    condition.ebs_status = 3;//查询待发货的订单
    return (dispatch,getState)=>{
            let isLoading = getState().SweepCodeCheckSendTable.isLoading;
            //加载动画
            isLoading?'':dispatch({'type':'WAIT_loading'});
            api("ebs.orderData.list",condition,function(e){
                console.log("WaitPrintOrderTable：",e);
                //遍历数据源，修改数据结构并返回勾选集合
                let ItemsSelected_arr = e.result.map((c)=>{
                    c.seller_flagmemo = {};
                    c.seller_flagmemo.seller_flag = c.seller_flag;
                    c.seller_flagmemo.seller_memo = c.seller_memo;
                    c.payment = c.payment.toFixed(2);
                    if(!c.discount){//优惠
                        c.discount = 0.00;
                    }
                    c.discount = c.discount.toFixed(2);
                    c.post_fee = c.post_fee.toFixed(2);
                    if(!c.logisticsCost){
                        c.logisticsCost = 0.00;
                    }
                    c.logisticsCost = c.logisticsCost.toFixed(2);
                    c.address = `${c.receiver_city} ${c.receiver_district} ${c.receiver_address}`
                    return false;
                });

                    dispatch({
                        orderTotal:e.total,
                        isLoading:false,
                        type:SWEEP_GET_ORDER_DATA,
                        orderData:e.result,
                        selectCondition:condition,
                        ItemsSelected_arr:ItemsSelected_arr
                    });
            });
    };
}

/*
把json格式解析为参数参数字符串
*/
function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}
