import { STOCK_CHECK_DATA, GET_BARCODE_DETAIL, UPDATE_SCANCODE_STOCK, CHECK_CELL_MODIFY } from '../actions/StockCheckTable'

let initState = {
    'orderData':[],
    'selectCondition':{},
    'ItemsSelected_arr':[],
    'total':0,
    'stores':[],
    'stockDetailData':[]
}

export default function StockCheckTable(state = initState, action){
    switch (action.type) {
        case STOCK_CHECK_DATA:
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
        case GET_BARCODE_DETAIL:
            return Object.assign({},state,{
                'stockDetailData':action.stockDetailData
            })
            break;
        case UPDATE_SCANCODE_STOCK:
            return state;
            break;
        case CHECK_CELL_MODIFY:
            const {ids,data} = action.data;
            const keys = Object.keys(data)
            const newOrderData = [...state.orderData];
            for (let i = 0; i < newOrderData.length; i++) {
                if (ids.indexOf(String(newOrderData[i].sku_product_id)) != -1 ) {
                    for (let j = 0; j < keys.length; j++) {
                        let key = keys[j];
                        newOrderData[i][key] = data[key];
                    }
                }
            }
            return {
                ...state,
                orderData: newOrderData,
                ItemsSelected_arr:state.ItemsSelected_arr.map(()=>false)
            }
            break;
        default:
            return state;
    }
}
