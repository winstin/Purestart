/**
 @author Mothpro
**/
import { GET_PRINTSET } from '../actions/PrintDialog'

//初始化状态
const initialState = {
    'printset':[],
    'isupdate':false,
}
export default function PrintDialog(state = initialState, action){
    switch (action.type) {
        case GET_PRINTSET:
                return Object.assign({},state,{
                    'printset':action.printset,
                    'isupdate':action.isupdate
                });
            break;
        default:
            return state;
    }
}
