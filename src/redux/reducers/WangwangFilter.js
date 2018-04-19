import * as ActionTypes from '../actions/WangwangFilter'

const initialState = {
    orderData:[],
    total:0,
    sum:0,
    page:1
}

export default function WangwangFilter(state = initialState, action){
    console.log("----------reduces==========")
    switch (action.type) {
        case ActionTypes.GET_WANG_FILTER_LIST:
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
