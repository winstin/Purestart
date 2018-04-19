import { GET_TYPPES } from '../actions/CheckOrders'

//初始化状态
const initialState = {
    'types':[]
}

export default function CheckOrders(state = initialState, action){
    switch (action.type) {
        case GET_TYPPES:
            return {
                types:action.types
            };
            break;
        default:
            return state;
    }
}
