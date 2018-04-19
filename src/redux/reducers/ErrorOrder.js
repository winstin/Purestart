import * as ActionTypes from '../actions/ErrorOrder'

const initialState = {
    orderData: [],  //表格数据
    dialogVisableName: "",  // 弹出框名
    ItemsSelectedArr: [], // 选中的情况
    selectCondition:{},
    modifyId: '',
    total:0,
    stores:[]
}

export default function (state = initialState, action){
    switch (action.type) {
        case ActionTypes.GET_ERROR_ORDER_DATA:{
            return {
                ...state,
                ...action.data
            }
        }
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

        case ActionTypes.GET_ERROR_ORDER_DATA:{
            return {
                ...state,
                neworderData: action.responseText
            }
        }

        case ActionTypes.GO_PAGE:{
            return {
                ...state,
                page_no: action.value
            }
        }

        case ActionTypes.ITEM_SELECT:{
            return {
                ...state,
                ItemsSelectedArr: action.ids
            }
        }

        //批量修改
        case ActionTypes.BATCH_MODIFY:{
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

        case ActionTypes.ADD_MODIFYID:{
            return {
                ...state,
                modifyId: action.id
            }
        }

        case 'search':{
            return {
                ...state,
                orderData: action.items
            }
        }

        case 'back_error':{
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
