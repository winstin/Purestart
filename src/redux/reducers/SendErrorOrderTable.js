/**
 @author Mothpro
**/
import { SENDERROR_GET_ORDER_DATA, SENDERROR_ITEMS_CHECK_ARR, SENDERROR_ISLOADING } from '../actions/SendErrorOrderTable'

//初始化状态
const initialState = {
    'orderTotal':0,//数据总数
    'isLoading':true,//是否渲染加载动画
    'orderData':[],//数据集合
    'selectCondition':{},//查找条件集合
    'ItemsSelected_arr':[]//勾选状态集合
}
export default function tradeOrderTable(state = initialState, action){
    switch (action.type) {
        case SENDERROR_GET_ORDER_DATA://获取数据
                return {
                    'orderTotal':action.orderTotal,
                    'isLoading':action.isLoading,
                    'orderData':action.orderData,
                    'selectCondition':action.selectCondition,
                    'ItemsSelected_arr':action.ItemsSelected_arr
                };
            break;
        case SENDERROR_ITEMS_CHECK_ARR://订单列表选中
            return Object.assign({}, state, {'ItemsSelected_arr': action.ItemsSelected_arr });
            break;
        case SENDERROR_ISLOADING://表格显示加载东华
            return Object.assign({}, state, {'isLoading': true });
            break;
        default:
            return state;
    }
}
