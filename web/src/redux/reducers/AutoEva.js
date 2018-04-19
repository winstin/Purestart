import { ADDEVA, CHANGE_AUTOEVA_SWITCH_STATE, CHANGE_RADIO_SWITCH_STATE, INIT_AUTOEVA_SETTINGS} from '../actions/AutoEva'

//初始化状态
const initialState = {
    'value':'0',
    'autoSwitchState':false,
    'radioSwitchState':false,
    'dataSource':{"alreadyrate":"0","flag":"0","blackrate":"0","zdblackrate":"0","robday":"1","robhouser":"1","timingday":"1","timinghouser":"1","emailrate":"0","selleremail":null,"closetime":"2017-02-10 15:41:47","opentime":"2017-02-10 15:42:01","blackcloud":"0","smsrate":"0","blackcloudcount":"0","myoff":"false","ratetexts":[{"id":"","sellernick":"","content":"","modifydate":"","isdefaulet":null,"remark":null}]}
}

export default function AutoEva(state = initialState, action){
    switch (action.type) {
        case ADDEVA:
            return Object.assign({},state,{
                'dataSource':action.data
            });
            break;
        case CHANGE_AUTOEVA_SWITCH_STATE:
            console.log(action);
            return Object.assign({},state,{
                'autoSwitchState':action.autoSwitchState
            });
            break;
        case CHANGE_RADIO_SWITCH_STATE:
            return Object.assign({},state,{
                'radioSwitchState':action.radioSwitchState
            });
            break;
        case INIT_AUTOEVA_SETTINGS:
            return {
                'autoSwitchState':action.dataSource.myoff,
                'radioSwitchState':action.dataSource.emailrate,
                'dataSource':action.dataSource
            };
            break;
        default:
            return state;
    }
}
