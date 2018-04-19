/**
 @author ljn
**/
import { GET_GOODS_DATA, SET_GOODS_CODE, GET_ITEMS_CLASS, SHOW_LOG, CLOSE_LOG, PRICE_SHOW, CLOSE_PRICE} from '../actions/GoodsListTable'

//初始化状态
const initialState = {
    'orderTotal':0,//数据总数
    'isLoading':true,//是否渲染加载动画
    'orderData':[],//数据集合
    'selectCondition':{},//查找条件集合
    'ItemsSelected_arr':[],//勾选状态集合
    'isshow':false,//商品详情的日志弹框的显示状态
    'skulogData':"",//所要展示日志的sku数据集合
    'skulogsArr':[],//sku日志集合
    'changePriceShow':false,//改价弹框显示状态
    'skuPriceData':""//所要改价商品的sku数据集合
}
export default function tradeOrderTable(state = initialState, action){
    switch (action.type) {
        case GET_GOODS_DATA://获取数据
                return {
                    'orderTotal':action.orderTotal,
                    'isLoading':action.isLoading,
                    'orderData':action.orderData,
                    'selectCondition':action.selectCondition,
                    'ItemsSelected_arr':action.ItemsSelected_arr,
                    'isshow':action.isshow,
                    'changePriceShow':action.changePriceShow,
                    'skuPriceData':action.skuPriceData
                };
            break;
        case SHOW_LOG://展示sku日志
                return Object.assign({}, state, {
                    'skulogsArr':action.skulogsArr,
                    'skulogData':action.skulogData,
                    'isshow':action.isshow,
                });
                break;
        case CLOSE_LOG://关闭sku日志
                return Object.assign({}, state, {
                      'isshow':action.isshow,
                });
                break;
        case PRICE_SHOW://展示改价弹框
                return Object.assign({}, state, {
                      'changePriceShow':action.changePriceShow,
                      'skuPriceData':action.skuPriceData
                });
                break;
        case CLOSE_PRICE://关闭改价弹框
                return Object.assign({}, state, {
                      'changePriceShow':action.changePriceShow,
                });
                break;
        case "WAIT_ItemsSelected_arr"://订单列表选中
            return Object.assign({}, state, {
                'ItemsSelected_arr': action.ItemsSelected_arr
            });
            break;
        case 'WAIT_loading'://表格显示加载东华
            return Object.assign({}, state, {'isLoading': true });
            break;
        default:
            return state;
    }
}
