import {api} from './AY_API'

export const GET_ERROR_ORDER_DATA = "GET_ERROR_ORDER_DATA"  //获取异常订单
export const OPEN_DIALOG = "OPEN_DIALOG"  // 弹出对话框
export const CLOSE_DIALOG = "CLOSE_DIALOG" // 关闭对话框
export const GO_PAGE = "GO_PAGE" // 页码跳转
export const ITEM_SELECT = "ITEM_SELECT" // 选中订单
export const BATCH_MODIFY = "BATCH_MODIFY" // 批量修改
export const ADD_MODIFYID = "ADD_MODIFYID" // 添加行内操作id


import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;


// 查询数据
export function getOrderData(condition){
    return (dispatch)=>{
        api("ebs.errorData.list",condition,function(e){
            console.info(e);
            let ItemsSelectedArr = e.result.map(()=>false);
            dispatch({
                type:GET_ERROR_ORDER_DATA,
                data:{
                    orderData:e.result,
                    selectCondition:condition,
                    ItemsSelectedArr,
                    total:e.total,
                    stores:e.stores
                }
            });
        });
    };
}

// 恢复异常单
export function backErrorOrders(arg){
    return (dispatch)=>{
        api("ebs.errorOrders.back",arg,function(e){
            if (e.result == "success") {
                Toast.success('恢复成功');
                dispatch({
                    type: 'back_error',
                    ids: e.ids
                })
            }else {
                Toast.success('恢复失败');
            }
        });
    };
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
                    type:BATCH_MODIFY,
                    data:e
                });
            }else {
                Toast.success('修改失败');
            }
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

// 选中item
export function checkItems(ids) {
    return {
        type: ITEM_SELECT,
        ids
    }
}

//  排序   (异步请求)
export function onSort(...arg){
    console.log(arg);
    return {
        type: 'filter',
        // filterKeys
    }
}

// 保存备注修改  (异步请求)
export function saveRemark(json) {
    return {
        type: 'save_remark',
        json
    }
}

// 保存物流修改  (异步请求)
export function saveLogistics(json) {
    return {
        type: 'save_logistics',
        json
    }
}

// 修改异常原因 (异步请求)
export function saveErrorReason(json) {
    return {
        type: 'save_error_reason',
        json
    }
}

// 添加行内操作id
export function addModifyId(id) {
    return {
        type: ADD_MODIFYID,
        id
    }
}
