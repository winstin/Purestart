import * as ActionTypes from '../actions/InBasicSettings'

const initialState = {
    orderData:[],
    checkboxValue:[]
}

export default function InBasicSettings(state = initialState, action){
    switch (action.type) {
        case ActionTypes.GET_BASIC_LIST:
           console.log("-----------action==============")
           console.log(action)
            return Object.assign({},state,{
                orderData:action.orderData,
                checkboxValue:action.checkboxValue
            });
            break;
        default:
            return state;
    }
}
