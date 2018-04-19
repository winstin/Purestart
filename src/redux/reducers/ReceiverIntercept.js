import * as ActionTypes from '../actions/ReceiverIntercept'

const initialState = {
    orderData:[],
    total:0,
    sum:0,
    page:1
}

export default function ReceiverIntercept(state = initialState, action){
    console.log("----------reduces==========")
    switch (action.type) {
        case ActionTypes.GET_RECEIVER_LIST:
            return Object.assign({},state,{
                'orderData':action.orderData,
                'total':action.total,
                'sum':action.sum,
                'page':action.page
            });
            break;
        
        default:
            return state;
    }
}
