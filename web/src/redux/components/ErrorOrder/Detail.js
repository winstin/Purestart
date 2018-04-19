import React from 'react';
import Tab from 'qnui/lib/tab'
import Notice from 'qnui/lib/notice'
import Checkbox from 'qnui/lib/checkbox'
import Table from 'qnui/lib/table'
import Icon from 'qnui/lib/icon'
import Button from 'qnui/lib/button'
import Balloon from 'qnui/lib/balloon';

import FlagIcon from '../../../components/FlagIcon'
import {api} from '../../actions/AY_API'

const TabPane = Tab.TabPane;

class Detail extends React.Component {
    state = {dataSource:[]};

    render() {
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

        return (
            <Tab defaultActiveKey={"1"}  onTabClick={(key)=>{
                if (key == 4) {
                    api("ebs.tradeOrder.operation",{tao_tid:orderDetail.tao_tid},function(e){
                        const dataSource = e.data.map(item=>{
                            return {
                                time: item.oper_time,
                                user: item.oper_nick,
                                operation: item.oper_info
                            }
                        })

                        this.setState({dataSource});
                    }.bind(this));
                }
            }}
                >
                <TabPane tab="异常原因" key="1">
                    <div className="order-details-div"><span>改：</span><span>修改过地址或规格的订单</span></div>
                    <div className="order-details-div"><span>负：</span><span>利润为负的订单</span></div>
                    <div className="order-details-div"><span>缺：</span><span>商品缺货的订单</span></div>
                    <div className="order-details-div"><span>匹：</span><span>没有匹配到商品的订单</span></div>
                    <div className="order-details-div"><span>合：</span><span>已合并的订单</span></div>
                    <div className="order-details-div"><span>物：</span><span>物流不到的订单</span></div>
                    <div className="order-details-div"><span>备：</span><span>有客服备注的订单</span></div>
                    <div className="order-details-div"><span>赠：</span><span>有多条赠品规则的订单</span></div>
                </TabPane>
                <TabPane tab="订单信息" key="2">
                    <div className="order-details-div"><span>订单编号：</span><span>{orderDetail.tao_tid}</span><i className="order-icon-copy"></i></div>
                    <div className="order-details-div"><span>实付金额：</span><span>{orderDetail.payment}(含运费{orderDetail.post_fee}元)</span></div>
                    <div className="order-details-div"><span>商品数量：</span><span>{total_num}</span></div>
                    <div className="order-details-div"><span>所属店铺：</span>{orderDetail.store_id}</div>
                    <div className="order-details-div"><span>买家旺旺：</span>{orderDetail.buyer_nick}<img src="http://q.aiyongbao.com/gx1688/image/wwzx.png"/></div>
                    <div className="order-details-div"><span>发票抬头：</span>{orderDetail.invoice_name}<img src="image/edit.png"/></div>
                    <div className="order-details-div"><span>收件信息：</span>{orderDetail.receiver_name+","+orderDetail.receiver_mobile+","+orderDetail.receiver_address}<img src="image/edit.png"/></div>
                </TabPane>
                <TabPane tab="商品信息" key="3">
                    <div className="order-details-table">
                        <Table dataSource={child_order_data}>
                            <Table.Column title="异常" dataIndex=""/>
                            <Table.Column title="商品标题" width={300} dataIndex="title" cell={(value)=>{
                                return (<Balloon closable={false} trigger={<Button style={{width:"268px"}} className="btrigger">{value}</Button>} triggerType="hover">
                                            {value}
                                        </Balloon>);
                            }}/>
                            <Table.Column title="商品简称" dataIndex="time"/>
                            <Table.Column title="商品规格" dataIndex=""/>
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
                    <Table dataSource={this.state.dataSource} hasHeader={true}>
                        <Table.Column title="时间" width={150} value="time" dataIndex="time" cell={(value,index,record)=>"2017-1-5 20:51:55"}/>
                        <Table.Column title="操作人" width={200} dataIndex="user"  />
                        <Table.Column title="操作" dataIndex="operation"/>
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

}

export default Detail;
