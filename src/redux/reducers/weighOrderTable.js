import { WEIGHT_GET_ORDER_DATA, UPDATE_WEIGH } from '../actions/weighOrderTable'

let initState = {
    'orderData':[],
    'selectCondition':{},
    'ItemsSelected_arr':[],
    'total':0,
    'stores':[]
}

export default function weighOrderTable(state = initState, action){
    switch (action.type) {
        case WEIGHT_GET_ORDER_DATA:
            return {
                'orderData':action.orderData,
                'selectCondition':action.selectCondition,
                'ItemsSelected_arr':action.ItemsSelected_arr,
                'total':action.total,
                'stores':action.stores
            };
            break;
        case "ItemsSelected_arr":
            return Object.assign({},state,{
                'ItemsSelected_arr':action.ItemsSelected_arr
            })
            break;
        case UPDATE_WEIGH:
            return state;
            break;
        default:
            return state;
    }
}
