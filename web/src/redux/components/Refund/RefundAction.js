import {api} from '../../actions/AY_API'

export const GET_REFUND = 'GET_REFUND'
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'

// 获取 售后单数据
export function getRefund(params) {
    return (dispatch)=>{
        api("ebs.refund.list",params,function (e) {
            console.log(e);
            dispatch({
                type:GET_REFUND,
                params,
                dataSource:e.data,
                total:e.total,
                stores: e.stores
            })
        })
    }
}

// 添加 售后单
export function addRefundOrder(params) {
    return (dispatch)=>{
        api("ebs.refund.add",params,function (e) {
            console.warn(e);
        })
    }
}

// 售后查询
export function searchRefundOrder(params) {
    return (dispatch)=>{
        api("ebs.refund.search",params,function (e) {
            console.warn(e);
            dispatch({
                type:GET_REFUND,
                params,
                dataSource:e.data,
                total:e.total,
                stores: e.stores
            })
        })
    }
}

// 切换弹出框
export function toggleDialog(dialogName) {
    return {
        type: TOGGLE_DIALOG,
        dialogName
    }
}
