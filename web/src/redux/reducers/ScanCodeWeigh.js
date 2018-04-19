import { SCAN_CODE_WEIGH } from '../actions/ScanCodeWeigh'

const initState ={
    'singleOrderData':[]//待称重的列表
}

export default function ScanCodeWeigh(state = initState, action){
    switch (action.type) {
        case SCAN_CODE_WEIGH:
            return {
                "singleOrderData":action.singleOrderData,
                "num":action.num
            };
            break;
        default:
            return state;
    }
}
