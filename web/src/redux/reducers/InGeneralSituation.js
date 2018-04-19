import * as ActionTypes from '../actions/InGeneralSituation'

const initialState = {
    'value':'0',
    'autoSwitchState':false,
    'orderData':{"areaon":"off","areasum":"0","baby":"off","babysum":"0","cloud":"off","cloudsum":"0","conon":"off","consum":"0","denfenon":"off","phone":null,"closetime":"2017-02-10 15:41:47","optime":"2017-02-10 15:42:01","sendsms":"off","smsnum":"0","wangwang":"off","whitesum":"0"}
}

export default function InGeneralSituation(state = initialState, action){
    switch (action.type) {
        case ActionTypes.GET_GENERAL_LIST:
            return Object.assign({},state,{
                orderData:action.orderData,
                autoSwitchState:action.autoSwitchState
            });
            break;
        case ActionTypes.CHANGE_INTERCEPTOR_SWITCH_STATE:
            console.log("----------reduces==========")
            console.log(action)
            return Object.assign({},state,{
                'autoSwitchState':action.autoSwitchState
            });
            break;

        default:
            return state;
    }
}
