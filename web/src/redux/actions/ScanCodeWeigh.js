import {api} from "./AY_API"
export const SCAN_CODE_WEIGH = "SCAN_CODE_WEIGH"

export function scanCodeWeigh(taoTid){
    return (dispatch) => {
        const condition = {
            ebs_status: 3,
            tao_tid: taoTid
        };
        api("ebs.orders.orderdetail", condition, function(e){
            dispatch({
                type: SCAN_CODE_WEIGH,
                singleOrderData: e
            });
        })
    }
}
