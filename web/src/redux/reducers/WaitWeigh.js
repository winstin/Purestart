import { CHANGE_PAGW } from '../actions/WaitWeigh'

//初始化状态
const initialState = {
    'isactive':'orderlist'
}

export default function WaitWeigh(state = initialState, action){
    switch (action.type) {
        case CHANGE_PAGW:
            return {
                isactive:action.isactive
            };
            break;

        default:
            return state;
    }
}
