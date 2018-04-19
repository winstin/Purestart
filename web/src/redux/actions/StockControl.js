export const STOCK_ORDER_DATA = "STOCK_ORDER_DATA"
export const UPDATE_STOCK = "UPDATE_STOCK"
export const BATCH_STOCK_OPEN = "BATCH_STOCK_OPEN"
export const BATCH_STOCK_CLOSE = "BATCH_STOCK_CLOSE"
export const ENTER_STOCK_OPEN = "ENTER_STOCK_OPEN"
export const ENTER_STOCK_CLOSE = "ENTER_STOCK_CLOSE"
export const STOCK_CELL_MODIFY = "STOCK_CELL_MODIFY"
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
            api("ebs.item.itemlist",condition,function(e){
                let ItemsSelected_arr = e.result.map(()=>false);
                dispatch({
                    type:STOCK_ORDER_DATA,
                    orderData:e.result,
                    selectCondition:condition,
                    ItemsSelected_arr:ItemsSelected_arr,
                    total:e.total,
                    stores:e.stores
                });
            });
    };
}

//点击批量修改库存后，改变库存的事件 inputvalue 复选框的value值 defect_num 成本
export function changeOnStock(defect_num, inputvalue){
    return (dispatch,getState)=>{
        let stockCheckedValue = getState().StockEnter.stockCheckedValue;
        let sku_product_id_arr = [];
        let defect_num_arr = [];
        for(let i in stockCheckedValue){
            sku_product_id_arr.push(stockCheckedValue[i].sku_product_id);
            if(inputvalue == "stockUnion"){
                defect_num_arr.push(defect_num);
            }else if(inputvalue == "stockAdd"){
                defect_num_arr.push(stockCheckedValue[i].defect_num + defect_num);
            }else{
                defect_num_arr.push(stockCheckedValue[i].defect_num - defect_num);
            }
        }
        sku_product_id_arr = sku_product_id_arr.join(",");
        defect_num_arr = defect_num_arr.join(",");
        const condition = {
            defect_num_arr: defect_num_arr,
            sku_product_id_arr:sku_product_id_arr
        };
        api("ebs.item.changestock", condition, function(e){
            if(e.code==200){
                dispatch({
                    type: UPDATE_STOCK,
                    condition
                });
            }
        })
    }
}

import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;

 /**
  * 批量操作
  * @param  {Object} obj [修改的参数和选中的sku_product_id]
  * @return {Function}     [action 用于改变state]
  */
 export function batchModify(obj){
     return (dispatch)=>{
         api("ebs.item.stockmodify",obj,function(e){
             console.log(e);
             if (e.result == "success") {
                 Toast.success('修改成功');
                 dispatch({
                     type:STOCK_CELL_MODIFY,
                     data:e
                 });
             }else {
                 Toast.success('修改失败');
             }
         });
     };
}

export function onOpen(){
    return (dispatch)=>{
        dispatch({
            type:BATCH_STOCK_OPEN,
            visible:true
        });
    };
}

export function onClose(){
    return (dispatch)=>{
        dispatch({
            type:BATCH_STOCK_CLOSE,
            visible:false
        });
    };
}

export function onOpenEnter(){
    return (dispatch)=>{
        dispatch({
            type:ENTER_STOCK_OPEN,
            visibleenter:true
        });
    };
}

export function onCloseEnter(){
    return (dispatch)=>{
        dispatch({
            type:ENTER_STOCK_CLOSE,
            visibleenter:false
        });
    };
}
