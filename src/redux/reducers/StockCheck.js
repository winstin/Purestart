import { STOCK_CHANGE_PAGE, STOCK_CHECK_OPEN, STOCK_CHECK_CLOSE, STOCK_TAB_KEY,TAB_AND_PAGE, START_AND_END_TIME } from '../actions/StockCheck'

//初始化状态
const initialState = {
    'isactive':'stockchecklist',
    'visible':false,
    'activeKey': '1',
    'start_time':'',
    'end_time':''
}

export default function StockCheck(state = initialState, action){
    switch (action.type) {
        case STOCK_CHANGE_PAGE:
            return {
                ...state,
                isactive:action.isactive
            };
            break;
        case STOCK_TAB_KEY:
            return {
                ...state,
                activeKey:action.activeKey
            };
            break;
        case TAB_AND_PAGE:
            return {
                ...state,
                isactive:action.isactive,
                activeKey:action.activeKey
            };
            break;
        case START_AND_END_TIME:
            return {
                ...state,
                start_time:action.start_time,
                end_time:action.end_time
            };
            break;
        case STOCK_CHECK_OPEN://打开Diglog
            return Object.assign({},state,{
                'visible':action.visible
            });
            break;
        case STOCK_CHECK_CLOSE://关闭Diglog
            return Object.assign({},state,{
                'visible':action.visible
            });
            break;
        default:
            return state;
    }
}
