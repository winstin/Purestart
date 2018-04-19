export const GET_ORDER_DATA = "GET_ORDER_DATA"
export const OPEN_DIALOG = "OPEN_DIALOG"  // 弹出对话框
export const CLOSE_DIALOG = "CLOSE_DIALOG" // 关闭对话框
export const ADD_MODIFYID = "ADD_MODIFYID" // 添加行内操作id
export const DELETE_MODIFYID = "DELETE_MODIFYID" // 去除行内操作id
export const BATCH_MODIFY_DSD = "BATCH_MODIFY_DSD" // 批量修改

import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;

import {api,ajax} from "./AY_API"

export function checkedOnChange(ItemsSelectedArr){
    return (
        {
            type:"ItemsSelectedArr",
            ItemsSelectedArr:ItemsSelectedArr
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
        ajax("iytrade2/getPing",{},"",function(e){
            console.error(e);
        });
        api("ebs.errorData.list",condition,function(e){
            console.warn(e);
            let ItemsSelectedArr = e.result.map(()=>false);
            dispatch({
                type:GET_ORDER_DATA,
                orderData:e.result,
                selectCondition:condition,
                ItemsSelectedArr:ItemsSelectedArr,
                total:e.total,
                stores:e.stores
            });
        });
    };
}

// 打开dialog
export function openDialog(dialogName) {
    return {
        type: OPEN_DIALOG,
        dialogName
    }
}

// 关闭dialog
export function closeDialog() {
    return {
        type: CLOSE_DIALOG
    }
}

// 添加行内操作id
export function addModifyId(id) {
    return {
        type: ADD_MODIFYID,
        id
    }
}

// 删除行内操作id
export function deleteModifyId(id) {
    return {
        type: DELETE_MODIFYID,
        id
    }
}

/**
 * 批量操作
 * @param  {Object} obj [修改的参数和选中的tao_tid]
 * @return {Function}     [action 用于改变state]
 */
export function batchModify(obj){
    return (dispatch)=>{
        api("ebs.errorOrders.modify",obj,function(e){
            console.log(e);
            if (e.result == "success") {
                Toast.success('修改成功');
                dispatch({
                    type:BATCH_MODIFY_DSD,
                    data:e
                });
            }else {
                Toast.success('修改失败');
            }
        });
    };
}

/**
 * 添加异常
 * @param  {Object} obj [修改的参数和选中的tao_tid]
 * @return {Function}     [action 用于改变state]
 */
export function addError(obj){
    return (dispatch)=>{
        api("ebs.error.add",obj,function(e){
            console.log(e);
            if (e.result == "success") {
                Toast.success('修改成功');
                dispatch({
                    type:'add_error',
                    ids: e.ids
                });
            }else {
                Toast.success('修改失败');
            }
        });
    };
}
