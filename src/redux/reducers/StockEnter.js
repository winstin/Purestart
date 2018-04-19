import { CHECKED_STOCK_ENTER, BATCH_MODI_OPEN, BATCH_MODI_CLOSE, STOCK_PRICE_AND_DEFECT } from '../actions/StockEnter'

const initState ={
    'stockCheckedValue':[],
    'visiblemodi':false
}
export default function StockEnter(state = initState, action){
    switch (action.type) {
        case CHECKED_STOCK_ENTER:
            return {
                ...state,
                "stockCheckedValue":action.stockCheckedValue
            };
            break;
        case STOCK_PRICE_AND_DEFECT:
            return {
                ...state
            };
            break;
        case BATCH_MODI_OPEN:
            return {
                ...state,
                "visiblemodi":action.visiblemodi
            };
            break;
        case BATCH_MODI_CLOSE:
            return {
                ...state,
                "visiblemodi":action.visiblemodi
            };
            break;
        default:
            return state;
    }
}
