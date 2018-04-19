/**
 @author Mothpro
**/
import React, { Component, PropTypes } from 'react'
import Balloon from 'qnui/lib/balloon';
import FlagIcon from '../../../components/FlagIcon';
import _ from 'lodash';
export default  class Data {
    constructor(){
        return this.getData();
    }
    printStateCell(value){//打印状态Cell
        return (<font style={{color:"#299743"}}>{
            _.isEmpty(value)?'待打印':value
        }</font>);
    }
    sellerFlagmemoCell(value){//备注与旗帜Cell
        let Dom = _.isEmpty(value.seller_memo)?(
            <FlagIcon type={value.seller_flag}/>
        ):(<Balloon closable={false} trigger={<span className="btrigger_80"><FlagIcon type={value.seller_flag}/> {value.seller_memo}</span>} triggerType="hover">
                    {value.seller_memo}
                </Balloon>)
        return Dom;
    }
    buyerMessageCell(value){//买家留言Cell
        return (<Balloon closable={false} trigger={<span className="btrigger">{value}</span>} triggerType="hover">
                    {value}
                </Balloon>);
    }
    logisticsNameCell(value){//物流公司Cell
        let Dom = _.isEmpty(value)?'未匹配':value;
        return Dom;
    }
    logisticsidCell(value){//物流单号Cell
        let Dom = _.isEmpty(value)?'':value;
        return Dom;
    }
    buyerNickCell(value){//买家idCell
        return value;
    }
    receiverNameCell(value){//收件人姓名Cell
        return value;
    }
    receiverMobileCell(value){//收件人姓名Cell
        return value;
    }
    receiverAddressCell(value){//收货人地址Cell
        return (<Balloon closable={false} trigger={<span className="btrigger">{value}</span>} triggerType="hover">
                    {value}
                </Balloon>);
    }
    payMentCell(value){//实付Cell
        return (<font style={{color:"#F5730E"}}>¥{value}</font>);
    }
    storeIdCell(value){//店铺Cell
        return value;
    }
    discountCell(value){//优惠Cell
        return (<font style={{color:"#F5730E"}}>¥{value}</font>);
    }
    postFeeCell(value){//邮费Cell
        return (<font style={{color:"#F5730E"}}>¥{value}</font>);
    }
    logisticsCostCell(value){//快递成本Cell
        return (<font style={{color:"#F5730E"}}>¥{value}</font>);
    }
    taoTidCell(value){//订单号Cell
        return value;
    }
    createdCell(value){//下单时间Cell
        return value;
    }
    payTimeCell(value){//付款时间Cell
        return value;
    }

    getData(){
        let filters = [{label: '包含1',value: 6},{label: '包含2',value: 2},
        {label: '包含3',value: 3,children:[{label: '张宏志',value: '张宏志'},{label: '旗子0',value: 0},{label: '旗子1',value: 1},{label: '旗子2',value: 2}]}];
        return [
            {
                'title': '失败原因',
                'value': 'print_status',
                'cell': this.printStateCell,
                'checked': true,
                'sortable': false,
                'filterMode': "multiple",
                'width': 250
            },
            {
                'title': '备注',
                'value': 'seller_flagmemo',
                'cell': this.sellerFlagmemoCell,
                'checked': true,
                'sortable': false,
                'filters': filters,
                'filterMode': "multiple",
                'width': 90
            },
            {
                'title': '留言',
                'value': 'buyer_message',
                'cell': this.buyerMessageCell,
                'checked': true,
                'sortable': false,
                'filters': filters,
                'filterMode': "multiple",
                'width': 150
            },
            {
                'title': '物流公司',
                'value': 'logistics_name',
                'cell': this.logisticsNameCell,
                'checked': true,
                'sortable': false,
                'filters': filters,
                'filterMode': "multiple",
                'width': 120
            },
            {
                'title': '物流单号',
                'value': 'logistics_id',
                'cell': this.logisticsidCell,
                'checked': true,
                'sortable': false,
                'filterMode': "multiple",
                'width': 120
            },
            {
                'title': '买家ID',
                'value': 'buyer_nick',
                'cell': this.buyerNickCell,
                'checked': true,
                'sortable': false,
                'filterMode': null,
                'width': 140
            },
            {
                'title': '收件人',
                'value': 'receiver_name',
                'cell': this.receiverNameCell,
                'checked': true,
                'sortable': false,
                'filterMode': "multiple",
                'width': 80
            },
            {
                'title': '收件电话',
                'value': 'receiver_mobile',
                'cell': this.receiverMobileCell,
                'checked': true,
                'sortable': false,
                'filterMode': "multiple",
                'width': 110
            },
            {
                'title': '收件地址',
                'value': 'address',
                'cell': this.receiverAddressCell,
                'checked': true,
                'sortable': false,
                'filterMode': "multiple",
                'width': 250
            },
            {
                'title': '实付',
                'value': 'payment',
                'cell': this.payMentCell,
                'checked': true,
                'sortable': false,
                'filterMode': 'multiple',
                'width': 95
            },
            {
                'title': '店铺',
                'value': 'store_id',
                'cell': this.storeIdCell,
                'checked': true,
                'sortable': false,
                'filterMode': "multiple",
                'width': 110
            },
            {
                'title': '优惠',
                'value': 'discount',
                'cell': this.discountCell,
                'checked': true,
                'sortable': false,
                'filterMode': 'multiple',
                'width': 80
            },
            {
                'title': '邮费',
                'value': 'post_fee',
                'cell': this.postFeeCell,
                'checked': true,
                'sortable': false,
                'filterMode': 'multiple',
                'width': 80
            },
            {
                'title': '快递成本',
                'value': 'logisticsCost',
                'cell': this.logisticsCostCell,
                'checked': true,
                'sortable': false,
                'filterMode': 'multiple',
                'width': 80
            },
            {
                'title': '订单号',
                'value': 'tao_tid',
                'cell': this.taoTidCell,
                'checked': true,
                'sortable': false,
                'filterMode': "multiple",
                'width': 180
            },
            {
                'title': '下单时间',
                'value': 'created',
                'cell': this.createdCell,
                'checked': true,
                'sortable': true,
                'filterMode': 'multiple',
                'width': 150
            },
            {
                'title': '发货时间',
                'value': 'pay_time',
                'cell': this.payTimeCell,
                'checked': true,
                'sortable': true,
                'filterMode': 'multiple',
                'width': 150
            }
        ]
    }
}
