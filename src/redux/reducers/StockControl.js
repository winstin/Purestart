import { STOCK_ORDER_DATA, UPDATE_STOCK, BATCH_STOCK_OPEN, BATCH_STOCK_CLOSE, ENTER_STOCK_OPEN, ENTER_STOCK_CLOSE, STOCK_CELL_MODIFY } from '../actions/StockControl'

let initState = {
    'orderData':[],
    'selectCondition':{},
    'ItemsSelected_arr':[],
    'total':0,
    'stores':[],
    'visible':false,
    'visibleenter':false,
}

export default function StockControl(state = initState, action){
    switch (action.type) {
        case STOCK_ORDER_DATA:
            return {
                ...state,
                'orderData':action.orderData,
                'selectCondition':action.selectCondition,
                'ItemsSelected_arr':action.ItemsSelected_arr,
                'total':action.total,
                'stores':action.stores
            };
            break;
        case "ItemsSelected_arr":
            return {
                ...state,
                'ItemsSelected_arr':action.ItemsSelected_arr
            }
            break;
        case UPDATE_STOCK: //跟新库存数量

            let ids_arr = action.condition.sku_product_id_arr.split(',')
            let defect_num_arr = action.condition.defect_num_arr.split(',')
            let orderData_new = [...state.orderData];

            for(let i in ids_arr){
                for (let j in orderData_new){
                    if(orderData_new[j].sku_product_id == ids_arr[i]){
                        orderData_new[j].defect_num = defect_num_arr[i];
                    }
                }
            }

            return {
                ...state,
                orderData: orderData_new
            }
            break;
        //行内编辑
        case STOCK_CELL_MODIFY:{
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
        }
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
        case ENTER_STOCK_OPEN://打开Diglog
            return Object.assign({},state,{
                'visibleenter':action.visibleenter
            });
            break;
        case ENTER_STOCK_CLOSE://关闭Diglog
            return Object.assign({},state,{
                'visibleenter':action.visibleenter
            });
            break;
        default:
            return state;
    }
}
