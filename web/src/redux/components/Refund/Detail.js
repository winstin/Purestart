import React from 'react';
import TableDetail from './TableDetail'
import {Tab,Table,Button} from 'qnui'
const TabPane = Tab.TabPane;

import {DialogStorage} from './Dialog'

class App extends React.Component {
    state={
        visible:false
    }

    render() {
        return (
            <div style={{height:'100%'}}>
                <fieldset style={{border:'1px solid #52a6fa'}}>
                    <legend style={{marginLeft: 20,padding:12}}>订单信息</legend>
                    <div style={{display:'flex',flexWrap:'wrap',paddingLeft:32,paddingBottom:10}}>
                        <div style={{width:'33%'}}>订单号：7869098234324</div>
                        <div style={{width:'33%'}}>买家旺旺：sdklfjdsf</div>
                        <div style={{width:'33%'}}>所属店铺: 明明明明</div>
                        <div style={{marginTop:20}}>收获信息: sssssssssssssssssssssssssssssssss</div>
                    </div>

                </fieldset>
                <fieldset style={{border:'1px solid #52a6fa'}}>
                    <legend style={{marginLeft: 20,padding:12}}>售后信息</legend>
                    <div style={{display:'flex',flexWrap:'wrap',paddingLeft:32,paddingBottom:10}}>
                        <div style={{width:'33%'}}>售后类型：退货且退款</div>
                        <div style={{width:'33%'}}>售后状态：等待卖家收货</div>
                        <div style={{width:'33%'}}>售后原因：七天无理由退货</div>
                        <div style={{width:'33%',marginTop:20}}>退款金额：78￥</div>
                        <div style={{width:'33%',marginTop:20}}>退回快递：中通速递</div>
                        <div style={{width:'33%',marginTop:20}}>快递单号：435345345</div>
                        <div style={{width:'33%',marginTop:20}}>退货说明：不想要</div>
                        <div style={{width:'33%',marginTop:20}}>问题描述：时间old飞机螺丝钉解放螺丝钉</div>
                    </div>

                </fieldset>
                <br/><br/>
                <Tab defaultActiveKey={"1"}>
                    <TabPane tab="退回商品" key="1">
                        <Table>
                            <Table.Column title="商品信息" width={200} dataIndex="title" cell={(value)=>{
                                return (<Balloon closable={false} trigger={<Button style={{width:"268px"}} className="btrigger">{value}</Button>} triggerType="hover">
                                            {value}
                                        </Balloon>);
                            }}/>
                            <Table.Column title="商品编码" width={100} dataIndex="num" />
                            <Table.Column title="商品规格" width={100} dataIndex=""/>
                            <Table.Column title="数量" width={100} dataIndex="num" />
                            <Table.Column title="单价" width={100} dataIndex="num" />
                            <Table.Column title="实收金额" width={100} dataIndex="payment"/>
                            <Table.Column title="操作"  width={100} cell={()=>{
                                return (
                                    <span>
                                        <a className="order-details-table-a">修改属性</a>
                                        <a className="order-details-table-a">更换商品</a>
                                    </span>
                                );
                            }}/>
                        </Table>
                    </TabPane>
                </Tab>


                <div style={{display:'flex',justifyContent:'center',marginTop:100}}>
                    <Button type="normal">拒绝收货</Button>&nbsp;&nbsp;&nbsp;
                    <Button type="primary" onClick={()=>{this.setState({visible:true})}}>确认收货</Button>
                </div>

                {/* 确认收货弹窗 */}
                <DialogStorage title="退货入库" visible={this.state.visible}
                    onClose={()=>{this.setState({visible:false})}}
                    onOk={()=>{this.setState({visible:false});console.log(11111);}}
                />
            </div>
        );
    }

}

export default App;
