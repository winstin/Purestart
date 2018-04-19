import * as ActionTypes from '../actions/WangBlacklist'

const initialState = {
    orderData:[],
    selectCondition:{},
    total:0,
    sum:0,
    page:1
}

export default function WangBlacklist(state = initialState, action){
    console.log("----------reduces==========")
    console.log(action)
    switch (action.type) {
        case ActionTypes.GET_WANG_BLACK_LIST:
            return Object.assign({},state,{
                'orderData':action.orderData,
                'total':action.total,
                'sum':action.sum,
                'page':action.page,
                'selectCondition':action.selectCondition
            });
            break;
        
        default:
            return state;
    }
}
