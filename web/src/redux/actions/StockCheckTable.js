export const STOCK_CHECK_DATA = "STOCK_CHECK_DATA"
export const GET_BARCODE_DETAIL = "GET_BARCODE_DETAIL"
export const UPDATE_SCANCODE_STOCK = "UPDATE_SCANCODE_STOCK"
export const CHECK_CELL_MODIFY = "CHECK_CELL_MODIFY"

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
 * search_value 搜索值 filter_value 过滤值 sort_value 排序值 page_num 页码
 */
export function getOrderData(condition){
    return (dispatch)=>{
            api("ebs.item.itemlist",condition,function(e){
                let ItemsSelected_arr = e.result.map(()=>false);
                dispatch({
                    type:STOCK_CHECK_DATA,
                    orderData:e.result,
                    selectCondition:condition,
                    ItemsSelected_arr:ItemsSelected_arr,
                    total:e.total,
                    stores:e.stores
                });
            });
    };
}

/**
* 扫码盘点获取详细数据展示
* sub_barcode 商品条形码
*/
export function getBarcodeDetail(sub_barcode){
    const condition = {
        sub_barcode: sub_barcode
    }
    return (dispatch) => {
        api("ebs.item.stockdetail", condition, function(e){
            dispatch({
                type: GET_BARCODE_DETAIL,
                stockDetailData: e
            });
        })
    }
}

/**
* 点击继续盘点和盘点结束触发的事件
* inputvalue 盘点后的库存
* pic_path,sku_product_id, name, outer_id,prop_name, defect_num, inputvalue
*/
export function changeOnStock(pic_path, sku_product_id, name, outer_id, prop_name, init_defect_num, inputvalue){
    return (dispatch,getState)=>{
        const condition = {
            pic_path:pic_path,
            sku_product_id:sku_product_id,
            name:name,
            outer_id:outer_id,
            prop_name:prop_name,
            init_defect_num:init_defect_num,
            defect_num: inputvalue
        };
        api("ebs.item.scancodestock", condition, function(e){
            if(e.code==200){
                let orderData = getState().StockCheckTable.orderData;
                for(let i in orderData){
                    if(orderData[i].sku_product_id == sku_product_id){
                        orderData[i].defect_num = inputvalue;
                    }
                }
                dispatch({
                    type: UPDATE_SCANCODE_STOCK
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
            console.log(obj);
            if (e.result == "success" && obj.after_defect_num != "") {
                Toast.success('修改成功');
                dispatch({
                    type:CHECK_CELL_MODIFY,
                    data:e
                });
            }else {
                return ;
            }
        });
    };
}
