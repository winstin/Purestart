import { CHANGE_CREATEMATCH, CHANGE_SHOPS, GET_MESSAGE } from '../actions/MatchTable'

//初始化状态
const initialState = {
    'createMatch':false,
    'shops':[],
    'ischange':false
}

export default function MatchTable(state = initialState, action){
    switch (action.type) {
        case CHANGE_CREATEMATCH:
            return Object.assign({},state,{
                createMatch:action.createMatch
            });
            break;
        case CHANGE_SHOPS:
            return Object.assign({},state,{
                shops:action.shops,
                ischange:action.ischange
            });
            break;
        default:
            return state;
    }
}
