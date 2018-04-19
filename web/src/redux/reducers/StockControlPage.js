import { STOCK_CHANGE_PAGE, BATCH_STOCK_OPEN, BATCH_STOCK_CLOSE } from '../actions/StockControlPage'

//初始化状态
const initialState = {
    'isactive':'stocklist',
    'visible':false
}

export default function WaitWeigh(state = initialState, action){
    switch (action.type) {
        case STOCK_CHANGE_PAGE:
            return {
                isactive:action.isactive
            };
            break;
        case BATCH_STOCK_OPEN://打开Diglog
            return Object.assign({},state,{
                'visible':action.visible
            });
            break;
        case BATCH_STOCK_CLOSE://关闭Diglog
            return Object.assign({},state,{
                'visible':action.visible
            });
            break;
        default:
            return state;
    }
}
