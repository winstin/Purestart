import { GET_SHOPS, CHANGE_SHOPS } from '../actions/TradeSync'

//初始化状态
const initialState = {
    'shops':[],//店铺数据
    'isLoading':true,//是否需要加载
    'ischange':true
}

export default function TradeSync(state = initialState, action){
    switch (action.type) {
        case GET_SHOPS:
            return {
                shops:action.shops,
                isLoading:action.isLoading
            };
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
