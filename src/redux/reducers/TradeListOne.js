import { GET_TRADE_LIST } from '../actions/TradeListOne'

//初始化状态
const initialState = {
    'dataSource':[]
}

export default function TradeListOne(state = initialState, action){
    switch (action.type) {
        case GET_TRADE_LIST:
            console.debug("2______TWO_______走了reducer")
            console.log(action);
            return Object.assign({},state,{
                'dataSource':action.dataSource
            });
            break;
        default:
            return state;
    }
}
