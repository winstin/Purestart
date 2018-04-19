import * as actionTypes from './RefundAction'

const initialState = {
    dataSource: [],
    params: { // 请求参数
        page_no:1,
        sort: {},
        search_value:''
    },
    dialogShow: {DialogRefund:false, DialogBuyer:false},
}

export default function refundReducer(state=initialState,action) {
    switch (action.type) {
        case actionTypes.GET_REFUND: // 得到售后信息
            return {
                ...state,
                dataSource: action.dataSource,
                total: action.total,
                params: action.params,
                stores: action.stores

            }
        case actionTypes.TOGGLE_DIALOG: {// 切换弹框
            const dialogShow = {
                ...state.dialogShow,
                [action.dialogName]: !state.dialogShow[action.dialogName]
            }
            return {
                ...state,
                dialogShow
            }
        }


        default: return state
    }
}
