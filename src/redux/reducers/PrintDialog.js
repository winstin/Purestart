/**
 @author Mothpro
**/
import { WAITPRINT_OPEN, WAITPRINT_CLOSE, WAITPRINT_CHANGE } from '../actions/PrintDialog'

//初始化状态
const initialState = {
    'visible':false,
    'pageSize':20,
}
export default function PrintDialog(state = initialState, action){
    switch (action.type) {
        case WAITPRINT_CLOSE://关闭Diglog
                return Object.assign({},state,{
                    'visible':action.visible
                });
            break;
        case WAITPRINT_OPEN://打开Diglog
                return Object.assign({},state,{
                    'visible':action.visible
                });
                break;
        case WAITPRINT_CHANGE:
                return Object.assign({},state,{
                    'pageSize':action.pageSize
                });
                break;
        default:
            return state;
    }
}
