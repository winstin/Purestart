import { Batch_Weigh_Oper, Counter_Weigh_NUM,  WAIT_WEIGH_OPEN, WAIT_WEIGH_CLOSE} from '../actions/batchWeighOper'

const initState ={
    'Batch_Weigh_Oper':[],//待称重的列表
    'num':0,//当前称重的订单序号
    'visible':false //是否显示弹窗
}
export default function batchWeighOper(state = initState, action){
    switch (action.type) {
        case Batch_Weigh_Oper:
            return {
                "Batch_Weigh_Oper":action.Batch_Weigh_Oper,
                "num":action.num
            };
            break;
        case Counter_Weigh_NUM:
            return Object.assign({},state,{
                "num":action.num
            })
            break;
        case WAIT_WEIGH_CLOSE://关闭Diglog
                return Object.assign({},state,{
                    'visible':action.visible
                });
            break;
        case WAIT_WEIGH_OPEN://打开Diglog
                return Object.assign({},state,{
                    'visible':action.visible
                });
            break;
        default:
            return state;
    }
}
