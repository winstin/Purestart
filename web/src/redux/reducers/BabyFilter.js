import * as ActionTypes from '../actions/BabyFilter'

const initialState = {
    orderData:[],
    orderWhiteData:[],
    total:0,
    sum:0,
    page_no:1,
    page:1,
}

export default function BabyFilter(state = initialState, action){
    console.log("----------reduces==========")
    switch (action.type) {

        case ActionTypes.GET_BABY_FILTER_LIST:
            return Object.assign({},state,{
                'orderData':action.orderData,
                'total':action.total,
                'page_no':action.page,
            });
            break;

        case ActionTypes.GET_WHITE_FILTER_LIST:
        console.log(action)
            return Object.assign({},state,{
                'orderWhiteData':action.orderWhiteData,
                'totalWhite':action.totalWhite,
                'page':action.page,
            })
            break;

        default:
            return state;
    }
}
