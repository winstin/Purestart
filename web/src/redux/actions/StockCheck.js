export const STOCK_CHANGE_PAGE = "STOCK_CHANGE_PAGE"
export const STOCK_CHECK_OPEN = "STOCK_CHECK_OPEN"
export const STOCK_CHECK_CLOSE = "STOCK_CHECK_CLOSE"
export const STOCK_TAB_KEY = "STOCK_TAB_KEY"
export const TAB_AND_PAGE = "TAB_AND_PAGE"
export const START_AND_END_TIME = "START_AND_END_TIME"

export function changePage(pageid){
    return (dispatch)=>{
        dispatch({
            type:STOCK_CHANGE_PAGE,
            isactive:pageid
        })
    }
}
//点击扫码详情后的页面跳转事件，跳转到操作日志
export function tabChage(activeKey){
    return (dispatch)=>{
        dispatch({
            type:STOCK_TAB_KEY,
            activeKey:activeKey
        })
    }
}

export function tabAndPageChage(pageid, activeKey){
    return (dispatch)=>{
        dispatch({
            type:TAB_AND_PAGE,
            isactive:pageid,
            activeKey:activeKey
        })
    }
}

export function startAndEndTime(start, end){
    return (dispatch)=>{
        dispatch({
            type:START_AND_END_TIME,
            start_time:start,
            end_time:end
        })
    }
}

export function onOpen(){
    return (dispatch)=>{
        dispatch({
            type:STOCK_CHECK_OPEN,
            visible:true
        });
    };
}

export function onClose(){
    return (dispatch)=>{
        dispatch({
            type:STOCK_CHECK_CLOSE,
            visible:false
        });
    };
}
