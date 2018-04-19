export const CHECKED_STOCK_ENTER = "CHECKED_STOCK_ENTER"
export const BATCH_MODI_OPEN = "BATCH_MODI_OPEN"
export const BATCH_MODI_CLOSE = "BATCH_MODI_CLOSE"
export const STOCK_PRICE_AND_DEFECT = "STOCK_PRICE_AND_DEFECT"

//库存管理列表的勾选在进货入库界面展示
export function checkedStockEnter(stockCheckedValue){
    return (
        {
            type: "CHECKED_STOCK_ENTER",
            stockCheckedValue: stockCheckedValue
        }
    );
}

//修改当前入库的成本价成本update入库的成本和实际库存
export function StockPriceAndDefect(price, num){
    return (dispatch,getState)=>{
        const condition = {
            cost_price: price,
            defect_num: num
        };
        api("ebs.item.updatepriceAnddefect", condition, function(e){
            if(e.code==200){
                let orderData = getState().StockEnter.stockCheckedValue;
                for(let i in orderData){
                    orderData[i].cost_price = cost_price;
                }
                dispatch({
                    type: STOCK_PRICE_AND_DEFECT
                });
            }
        })
    }
}

//点击“批量修改”打开弹窗
export function onOpenModi(){
    return (dispatch,getState)=>{
        dispatch({
            type:BATCH_MODI_OPEN,
            visiblemodi:true
        });
    };
}

// 点击弹框的取消等操作关闭弹窗
export function onCloseModi(){
    return (dispatch,getState)=>{
        dispatch({
            type:BATCH_MODI_CLOSE,
            visiblemodi:false
        });
    };
}
