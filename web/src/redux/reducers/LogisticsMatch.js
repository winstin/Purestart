import { GET_MESSAGE,SAVE_MESSAGE,UPDATE_MESSAGE } from '../actions/LogisticsMatch'

//初始化状态
const initialState = {
    'listCheckArr':[],
    'message':[],
    'setAll':[],
    'logistics_detail':[],
    "isupdate" :false
}

export default function LogisticsMatch(state = initialState, action){
    switch (action.type) {
        case GET_MESSAGE:
            return {
                message:action.message,
                setAll:action.setAll,
                listCheckArr:action.listCheckArr,
                logistics_detail:action.logistics_detail,
                isupdate :action.isupdate
            };
            break;
        case SAVE_MESSAGE:
            return Object.assign({},state,{
                setAll:action.setAll,
                isupdate :action.isupdate
            });
            break;
        case UPDATE_MESSAGE:
            return Object.assign({},state,{
                setAll:action.setAll,
                message:action.message,
                isupdate :action.isupdate
            });
            break;
        default:
            return state;
    }
}
