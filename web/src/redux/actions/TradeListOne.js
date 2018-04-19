export const GET_TRADE_LIST = "GET_TRADE_LIST"

export function getTradeList(value){
    return (dispatch)=>{
        var page_size = 20;
        QN.top.invoke({
            cmd: "taobao.trades.sold.get",
            param: {
                fields: "shipping_type,cod_status,orders.oid,orders.outer_iid,orders.outer_sku_id,tid,status,end_time,buyer_nick,trade_from,credit_card_fee,buyer_rate,seller_rate,created,num,payment,pic_path,has_buyer_message,receiver_state,receiver_city,receiver_district,receiver_address,receiver_zip,receiver_name,receiver_mobile,receiver_phone,orders.timeout_action_time,orders.end_time,orders.title,orders.status,orders.price,orders.sku_properties_name,orders.num_iid,orders.refund_id,orders.pic_path,orders.refund_status,orders.num,seller_flag,type,post_fee,is_daixiao,has_yfx,yfx_fee",
                type: 'tmall_i18n,fixed,auction,guarantee_trade,step,independent_simple_trade,independent_shop_trade,auto_delivery,ec,cod,game_equipment,shopex_trade,netcn_trade,external_trade,instant_trade,b2c_cod,hotel_trade,super_market_trade,super_market_cod_trade,taohua,waimai,nopaid,step,eticket',
                page_no: '1',
                page_size: page_size
            },
            method: "post",
            success: function(rsp) {
                console.debug("1______ONE_______得到了订单数据")
                console.log(rsp.trades_sold_get_response);

                dispatch({
                    type:GET_TRADE_LIST,
                    dataSource: rsp.trades_sold_get_response
                });
                // for(var i=1; i<=10; i++){
                //   list.push(<TradeListOne data={data} total={total}></TradeListOne>);
                // }

            },
            error: function(msp) {
                console.log("获取订单失败了");
                console.log(msp);
            }
        });
    }

}
