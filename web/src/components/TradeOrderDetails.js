import React from 'react'
import Tab from 'qnui/lib/tab'
import Icon from 'qnui/lib/icon'
import FlagIcon from './FlagIcon'
import Table from 'qnui/lib/table'
import Button from 'qnui/lib/button'
import Balloon from 'qnui/lib/balloon'
import Dialog from 'qnui/lib/dialog'
import Notice from 'qnui/lib/notice'
import Checkbox from 'qnui/lib/checkbox'
import {api} from '../redux/actions/AY_API'

let TradeOrderDetails = React.createClass({
    getInitialState:function(){
        return {orderDetailsData: []};
    },
    tabOnChange:function(activeKey){/*tab改变回调*/
        if(activeKey == 3){
            let {orderDetail} = this.props;
            let condition = {
                'tao_tid':orderDetail.tao_tid
            };
            api("ebs.order.childDataList",condition,function(e){
                this.setState({orderDetailsData:e.result});
            }.bind(this));
        }
    },
    render:function(){
        let {orderDetail} = this.props;
        let orderDetail_jdp_response = JSON.parse(orderDetail.jdp_response).trade_fullinfo_get_response;
        let total_num = 0;
        let child_order_data = [];
        if(orderDetail_jdp_response != undefined){
            total_num = orderDetail_jdp_response.trade.num;
            child_order_data = orderDetail_jdp_response.trade.orders.order;
        }

        const TabPane = Tab.TabPane;
        const getData = () =>{
            let result = [];
            for(let i = 0; i< 5; i++){
              result.push({
                  title:{
                    name: `Quotation for 1PCS Nano ${3+i}.0 controller compatible`,
                    },
                  id:100306+i,
                  time: 2000 + i
                })
            }
            return result;
        };

        const showValue = (value) => {
            if(value == null){
                value = "-";
            }
            return value;
        };

        return (
            <Tab defaultActiveKey="1" onChange={this.tabOnChange}>
                <TabPane tab="待审原因" key="1">
                    <div className="order-details-div"><Icon size="small" type="arrow-right" style={{color:"orange"}}/><span>备注：</span><span><FlagIcon type={orderDetail.seller_flag}/>{showValue(orderDetail.seller_memo)}</span></div>
                    <div className="order-details-div"><Icon size="small" type="arrow-right" style={{color:"orange"}}/><span>留言：</span><span>{showValue(orderDetail.buyer_message)}</span></div>
                    <div className="order-details-div"><Icon size="small" type="arrow-right" style={{color:"orange"}}/><span>异常：</span><span>{showValue(orderDetail.error_response)}</span></div>
                    <div className="order-details-div"><Icon size="small" type="arrow-right" style={{color:"orange"}}/><span>赠品：</span><span>该订单符合<span></span>赠品规则，请确认赠品<img style={{marginBottom: "-2px"}} src="image/jump.png"/><a href="javascript:void(0);" style={{color: "#ff00ff"}}>点击跳转到赠品信息页面</a></span></div>
                </TabPane>
                <TabPane tab="订单信息" key="2">
                    <div className="order-details-div"><span>订单编号：</span><span>{showValue(orderDetail.tao_tid)}</span><i className="order-icon-copy"></i></div>
                    <div className="order-details-div"><span>实付金额：</span><span>{showValue(orderDetail.payment)}(含运费{showValue(orderDetail.post_fee)}元)</span></div>
                    <div className="order-details-div"><span>商品数量：</span><span>{total_num}</span></div>
                    <div className="order-details-div"><span>所属店铺：</span>{showValue(orderDetail.store_id)}</div>
                    <div className="order-details-div"><span>买家旺旺：</span>{showValue(orderDetail.buyer_nick)}<img src="http://q.aiyongbao.com/gx1688/image/wwzx.png"/></div>
                    <div className="order-details-div"><span>发票抬头：</span>{showValue(orderDetail.invoice_name)}<img src="image/edit.png"/></div>
                    <div className="order-details-div"><span>收件信息：</span>{orderDetail.receiver_name+","+showValue(orderDetail.receiver_mobile)+","+showValue(orderDetail.receiver_phone)+","+orderDetail.receiver_state+","+orderDetail.receiver_city+","+orderDetail.receiver_district+","+orderDetail.receiver_address+","+orderDetail.receiver_zip}<img src="image/edit.png"/></div>
                </TabPane>
                <TabPane tab="商品信息" key="3">
                    <div className="order-details-table">
                        <Table dataSource={this.state.orderDetailsData}>
                            <Table.Column title="异常" dataIndex="error_response"/>
                            <Table.Column title="商品标题" width={300} dataIndex="title" cell={(value)=>{
                                return (<Balloon closable={false} trigger={<Button style={{width:"268px"}} className="btrigger">{value}</Button>} triggerType="hover">
                                            {value}
                                        </Balloon>);
                            }}/>
                            <Table.Column title="商品简称" dataIndex="time"/>
                            <Table.Column title="商品规格" dataIndex="sku_properties_name"/>
                            <Table.Column title="数量" dataIndex="num" />
                            <Table.Column title="实收金额" dataIndex="payment"/>
                            <Table.Column title="操作"  width={200} cell={()=>{
                                return (
                                    <span>
                                        <a className="order-details-table-a">修改属性</a>
                                        <a className="order-details-table-a">更换商品</a>
                                    </span>
                                );
                            }}/>
                        </Table>
                        <Button style={{float:"right",marginTop: "10px"}} type="primary" component="a" href="javascript:void(0);" target="_blank">添加商品</Button>
                    </div>
                </TabPane>
                <TabPane tab="操作记录" key="4">
                <div className="order-details-table">
                    <Table dataSource={getData()} hasHeader={false}>
                        <Table.Column title="时间" width={150} dataIndex="id" cell={()=>"2017-1-5 20:51:55"}/>
                        <Table.Column title="操作人" width={200} dataIndex="id"cell={()=>"【爱用科技：小明】"} />
                        <Table.Column title="操作" dataIndex="title.name"/>
                    </Table>
                </div>
                </TabPane>
                <TabPane tab="赠品信息" key="5">
                    <div className="order-details-div">选择该订单的赠品：</div>
                    <div className="order-details-div"><Checkbox defaultChecked >赠品规则一：</Checkbox></div>
                    <div className="order-details-div"><Checkbox defaultChecked >赠品规则二：</Checkbox></div>
                    <div className="order-details-div"><Checkbox defaultChecked >赠品规则三：</Checkbox></div>
                    <Notice style={{width: "300px",marginTop:"10px"}} title="选择的赠品会自动打印到发货单列表" type="warning"></Notice>
                </TabPane>
            </Tab>
        );
    }
});

export default TradeOrderDetails
