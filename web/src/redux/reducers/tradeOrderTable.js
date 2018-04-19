import * as ActionTypes from '../actions/tradeOrderTable'

const initialState = {
    orderData:[],
    selectCondition:{},
    ItemsSelectedArr:[],
    total:0,
    dialogVisableName:'', // 弹出框 名
    stores:[],
    modifyId:""
}

export default function tradeOrderTable(state = initialState, action){
    switch (action.type) {
        case ActionTypes.GET_ORDER_DATA:
            return {
                ...state,
                'orderData':action.orderData,
                'selectCondition':action.selectCondition,
                'ItemsSelectedArr':action.ItemsSelectedArr,
                'total':action.total,
                'stores':action.stores
            };
            break;
        case "ItemsSelectedArr":
            return {
                'orderData':state.orderData,
                'selectCondition':state.selectCondition,
                'ItemsSelectedArr':action.ItemsSelectedArr,
                'total':state.total,
                'stores':state.stores
            };
            break;

        case ActionTypes.OPEN_DIALOG:{
            return {
                ...state,
                dialogVisableName:action.dialogName
            }
        }
        case ActionTypes.CLOSE_DIALOG:{
            return {
                ...state,
                dialogVisableName: ""
            }
        }

        case ActionTypes.ADD_MODIFYID:{
            return {
                ...state,
                modifyId: action.id
            }
        }
        //批量修改
        case ActionTypes.BATCH_MODIFY_DSD:{
            const {ids,data} = action.data;
            const keys = Object.keys(data)
            const newOrderData = [...state.orderData];
            for (let i = 0; i < newOrderData.length; i++) {
                if (ids.indexOf(String(newOrderData[i].tao_tid)) != -1 ) {
                    for (let j = 0; j < keys.length; j++) {
                        let key = keys[j];
                        newOrderData[i][key] = data[key];
                    }
                }
            }
            return {
                ...state,
                orderData: newOrderData,
                ItemsSelectedArr:state.ItemsSelectedArr.map(()=>false)
            }
        }
        case "add_error":{
            const ids_arr = action.ids.split(',');
            const orderData = state.orderData.filter(order=> ids_arr.indexOf(String(order.tao_tid)) == '-1');
            const ItemsSelectedArr = state.ItemsSelectedArr.filter(bool=>bool == false);

            return {
                ...state,
                orderData,
                ItemsSelectedArr
            }
        }
        default:
            return state;
    }
}
