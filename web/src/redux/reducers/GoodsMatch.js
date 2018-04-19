import { GOODS_MATCH_LOADING, GOODS_MATCH_CLOSE } from '../actions/GoodsMatch'

//初始化状态
const initialState = {
    'isLoading':true,//是否需要加载
    'visible':false
}

export default function GoodsMatch(state = initialState, action){
    switch (action.type) {
        case GOODS_MATCH_LOADING:
            return {
                isLoading:action.isLoading,
                visible:true
            }
            break;
        case GOODS_MATCH_CLOSE:
            return Object.assign({},state,{
                visible:false
            })
        default:
            return state;
    }
}
