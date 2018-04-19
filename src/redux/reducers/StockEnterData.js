import { STOCK_ENTER_ORDER_DATA, STOCK_ENTER_MODEL, SAVE_INPUT_VALUE, ENTER_GOODS_ENTER_STOCK, CHOOSE_GOODS_ENTER_STOCK } from '../actions/StockEnterData'

let initState = {
    'stockOrderData':[],
    'selectCondition':{},
    'ItemsSelected_tab_arr1':[],
    'enterStockValue':[],
    'ItemsSelected_tab_arr2':[],
    'chooseStockValue':[],
    'total':0,
    'stores':[],
    'tableid':'itemseletected',
    'title':'进货入库',
    'cross':'table-cross',
    'tableclassname':'controlOrderTable',
    'unionNum':0,
    'unionPrice':0,
    'unionSum':0
}

export default function StockEnterData(state = initState, action){
    switch (action.type) {
        case STOCK_ENTER_ORDER_DATA:
            return {
                ...state,
                'stockOrderData':action.stockOrderData,
                'selectCondition':action.selectCondition,
                'ItemsSelected_tab_arr1':action.ItemsSelected_tab_arr1,
                'ItemsSelected_tab_arr2':action.ItemsSelected_tab_arr2,
                'total':action.total,
                'stores':action.stores
            };
            break;
        case "ItemsSelected_tab_arr1":
            return {
                ...state,
                'ItemsSelected_tab_arr1':action.ItemsSelected_tab_arr1
            }
            break;
        case ENTER_GOODS_ENTER_STOCK:
            return {
                ...state,
                'enterStockValue':action.enterStockValue
            }
            break;
        case "ItemsSelected_tab_arr2":
            return {
                ...state,
                'ItemsSelected_tab_arr2':action.ItemsSelected_tab_arr2
            }
            break;
        case CHOOSE_GOODS_ENTER_STOCK:
            return {
                ...state,
                'chooseStockValue':action.chooseStockValue
            }
            break;
        case SAVE_INPUT_VALUE:
            return {
                ...state,
                "unionNum":action.unionNum,
                "unionPrice":action.unionPrice,
                "unionSum":action.unionSum
            };
            break;
        case STOCK_ENTER_MODEL:
            return {
                ...state,
                tableid:action.tableid,
                title:action.title,
                cross:action.cross,
                tableclassname:action.tableclassname
            }
            break;
        default:
            return state;
    }
}
