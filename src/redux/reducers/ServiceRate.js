/**
 @author wp
**/
import { INITDATA,GETDATA } from '../actions/ServiceRate'

//初始化状态
const initialState = {
    'allData':[],
    'dataSource':[],
    'isLoad':true,
    'total':0
}
export default function PrintDialog(state = initialState, action){
    console.log("初始化状态");
    console.log(action);
    switch (action.type) {
        case INITDATA:
                return Object.assign({},state,{
                    'dataSource':action.dataSource.slice(0,15),
                    'isLoad':false,
                    'allData':action.dataSource,
                    'total':action.dataSource.length,
                });
            break;

        case GETDATA:
                return Object.assign({},state,{
                    'dataSource':state.allData.slice((action.pageno-1)*15,(action.pageno-1)*15+15),
                });
            break;
        default:
            return state;
    }
}
