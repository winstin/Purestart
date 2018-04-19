export const CHANGE_PAGW = "CHANGE_PAGW"

export function changePage(pageid){
    return (dispatch)=>{
        dispatch({
            type:CHANGE_PAGW,
            isactive:pageid
        })
    }
}
