export const STOCK_ENTER_ORDER_DATA = "STOCK_ENTER_ORDER_DATA"
export const STOCK_ENTER_MODEL = "STOCK_ENTER_MODEL"
export const SAVE_INPUT_VALUE = "SAVE_INPUT_VALUE"
export const ENTER_GOODS_ENTER_STOCK = "ENTER_GOODS_ENTER_STOCK"
export const CHOOSE_GOODS_ENTER_STOCK = "CHOOSE_GOODS_ENTER_STOCK"
import {api} from "./AY_API"

// 进货入库勾选项
export function checkedOnChangeArr1(ItemsSelected_tab_arr1){
    return (
        {
            type:"ItemsSelected_tab_arr1",
            ItemsSelected_tab_arr1:ItemsSelected_tab_arr1
        }
    );
}

//进货入库列表勾选数组
export function enterStockValueFun(enterStockValue){
    return (
        {
            type: ENTER_GOODS_ENTER_STOCK,
            enterStockValue: enterStockValue
        }
    );
}

//选择商品勾选项
export function checkedOnChangeArr2(ItemsSelected_tab_arr2){
    return (
        {
            type:"ItemsSelected_tab_arr2",
            ItemsSelected_tab_arr2:ItemsSelected_tab_arr2
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

export function getOrderDataTable(condition){
    return (dispatch)=>{
        api("ebs.item.itemlist",condition,function(e){
            let ItemsSelected_tab_arr1 = e.result.map(()=>false);
            let ItemsSelected_tab_arr2 = e.result.map(()=>false);
            dispatch({
                type:STOCK_ENTER_ORDER_DATA,
                stockOrderData:e.result,
                selectCondition:condition,
                ItemsSelected_tab_arr1:ItemsSelected_tab_arr1,
                ItemsSelected_tab_arr2:ItemsSelected_tab_arr2,
                total:e.total,
                stores:e.stores
            });
        });
    };
}

//进货入库后两种页面渲染 tableid 显示表格的ID title 表格的title  cross 表格的叉号
export function stockEnterModel(tableid, title, cross, tableclassname){
    return (dispatch)=>{
        dispatch({
            type:STOCK_ENTER_MODEL,
            tableid:tableid,
            title:title,
            cross:cross,
            tableclassname:tableclassname
        });
    }
}

//保存批量填写的input值
export function saveInputValue(num, price, sum){
    return (dispatch)=>{
        dispatch({
            type:SAVE_INPUT_VALUE,
            unionNum:num,
            unionPrice:price,
            unionSum:sum
        });
    };
}
