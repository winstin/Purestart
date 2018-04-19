/**
 @author Mothpro
**/
export const GET_GOODS_DATA = "GET_GOODS_DATA"
export const SET_GOODS_CODE = "SET_GOODS_CODE"
export const GET_ITEMS_CLASS = "GET_ITEMS_CLASS"
export const SHOW_LOG = "SHOW_LOG"
export const CLOSE_LOG = "CLOSE_LOG"
export const PRICE_SHOW = "PRICE_SHOW"
export const CLOSE_PRICE = "CLOSE_PRICE"
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
    return (dispatch,getState)=>{
            let isLoading = getState().GoodsListTable.isLoading;
            //加载动画
            isLoading?'':dispatch({'type':'WAIT_loading'});
            api("ebs.item.getItemsList",condition,function(e){
                console.log("GoodsListTable：",e);
                //遍历数据源，修改数据结构并返回勾选集合
                let ItemsSelected_arr = e.result.map((c)=>{
                    return false;
                });

                dispatch({
                    orderTotal:e.total,
                    isLoading:false,
                    type:GET_GOODS_DATA,
                    orderData:e.result,
                    selectCondition:condition,
                    ItemsSelected_arr:ItemsSelected_arr,
                    isshow:false,
                    changePriceShow:false,
                    skuPriceData:""
                });
            });
    };
}

export function setGoodsCode(condition){
    return (dispatch,getState)=>{
            api("ebs.item.setGoodsBarcode",condition,function(e){
                console.log("GoodsListTable：",e);

                dispatch({
                    result:e,
                    type:SET_GOODS_CODE,
                });
            });
    };
}

export function getItemsClass(condition){//获得商品自选分类
    return (dispatch,getState)=>{
            api("ebs.item.getItemsClass",condition,function(e){
                console.log("getItemsClass",e);

                dispatch({
                    itemsClassData:e,
                    type:GET_ITEMS_CLASS,
                });
            });
    };
}

export function showlog(result){//展示sku日志
    console.log(result);
    return (dispatch,getState)=>{
        let condition = {
            'sku_id': result.ebs_sku_id,
        };
        api("ebs.item.getSkuLogs",condition,function(e){
            console.log("getSkuLogs",e);

            dispatch({
                skulogsArr:e.result,
                skulogData:result,
                isshow:true,
                type:SHOW_LOG
            });
        });
    };
}

export function closelog(){//关闭sku日志
    return (dispatch,getState)=>{
        dispatch({
            isshow:false,
            type:CLOSE_LOG
        });
    };
}

export function changePrice(result){//展示改价弹框
    return (dispatch,getState)=>{
        dispatch({
            skuPriceData:result,
            changePriceShow:true,
            type:PRICE_SHOW
        });
    };
}

export function closePrice(){//关闭改价弹框
    return (dispatch,getState)=>{
        dispatch({
            changePriceShow:false,
            type:CLOSE_PRICE
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
