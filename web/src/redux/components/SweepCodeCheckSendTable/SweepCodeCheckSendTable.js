/**
 @author Mothpro
**/
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import OrderTable from '../../../components/Ordertable'
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import * as SweepCodeCheckSendTableActions from '../../actions/SweepCodeCheckSendTable'
import _ from 'lodash';
import Data from './data';
import { Row, Col } from 'qnui/lib/grid';
import Dialog from 'qnui/lib/dialog';
import Icon from 'qnui/lib/icon';
import Table from 'qnui/lib/table';
import {api} from '../../actions/AY_API'
import './sweepCode.css'
let time = 5;
let numarr = [];
let morearr = [];
let successNumber = [];
class SweepCodeCheckSendTable extends Component {
    constructor() {
        super();
        this.state = {
            pagenumber:1,
            sweeporder:"",
            orderdetail:"",
            goodssum:"",
            onfocus:false,
            morearr: "",
            successNumber:"",
            sweepfail:"send-goods-fail-isshow",
            sweepsuccess:"send-goods-isshow",
            endsendgoods:"send-goods-fail-isshow",
            count: 5,
            likedtime: true,
            fail:"send-goods-fail",
            success:"send-goods-success",
            msg:"",
            a:{
                visible: false
            },
            b:{
                visible: false
            },
            c:{
                visible: false
            }
        }
    }
    onSearch(searchValue){/*搜索*/
        const {selectCondition, getOrderData} = this.props;
        getOrderData({
            'search_value':searchValue,
            'filter_value':selectCondition.filter_value,
            'sort_value':selectCondition.sort_value,
            'page_num':1
        });
    }

    onFilter(filterKeys){/*过滤*/
        const {selectCondition, getOrderData} = this.props;
        getOrderData({
            'search_value':selectCondition.search_value,
            'filter_value':JSON.stringify(filterKeys),
            'sort_value':selectCondition.sort_value,
            'page_num':1
        });
    }

    onSort(dataIndex, order, sort){/*排序*/
        const {selectCondition, getOrderData} = this.props;
        getOrderData({
            'search_value':selectCondition.search_value,
            'filter_value':selectCondition.filter_value,
            'sort_value':JSON.stringify({'dataIndex':dataIndex,'order':order}),
            'page_num':1
        });
    }

    pageOnChange(value, e){/*翻页*/
        const {selectCondition, getOrderData} = this.props;
        getOrderData({
            'search_value':selectCondition.search_value,
            'filter_value':selectCondition.filter_value,
            'sort_value':selectCondition.sort_value,
            'page_num':value
        });
    }

    itemsCheckedOnChange(ItemsSelected_arr){/*勾选*/
        console.log(ItemsSelected_arr);
        const {checkedOnChange} = this.props;
        checkedOnChange(ItemsSelected_arr);
    }

    componentDidMount(){
        const {getOrderData,orderTotal} = this.props;
        orderTotal == 0 ?getOrderData({
            'search_value':'',
            'filter_value':'',
            'sort_value':'',
            'page_num':1
        }):'';

    }
    //切换页方法 并获取焦点 与触发键盘监听事件
    changePage(i){
        this.setState({
            pagenumber : i
        });
        const {orderData} = this.props;
        console.log(orderData);
        let sweepid = "123456789";
        console.log(this.state.pagenumber);
        for(let j = 0; j < orderData.length; j++){
            if(orderData[j].invoice_no == sweepid){
                this.state.sweeporder = orderData[j];
            }
        }
        let orderdetail = "";
        let condition = {
            'tao_tid':this.state.sweeporder.tao_tid
        };
        api("ebs.order.childDataList",condition,function(e){
            orderdetail = e.result;
            this.setState({
                pagenumber : i,
                sweeporder : this.state.sweeporder,
                orderdetail : orderdetail
            });

            if(this.state.pagenumber==2){
                this.refs.myInput.focus();
                window.addEventListener('keydown', this.handleKeyDown.bind(this));
            }
        }.bind(this));

    }
    //获取表格数据方法
    getData = () =>{
        let orders = this.state.orderdetail;
        let result = [];
        for(let i = 0; i< orders.length; i++){
          result.push({
              id:orders[i].outer_iid,
              message:<div><span style={{float:"left",width:"20%"}}><img style={{width:"100px"}} src={orders[i].pic_path}/></span><span style={{float:"left",width:"80%",lineHeight:"30px"}}>{orders[i].title} </span></div>,
              ordersum: <div style={{fontSize:"25px",textAlign:"center"}}>{orders[i].num}</div>,
              sweepsum:<div className={this.state.goodssum[i].sweepnumberstyle} style={{fontSize:"25px",textAlign:"center"}}>{this.state.goodssum[i].sum}</div>
            })
        }
        return result;
    }
    //关闭弹框方法
    onClose(x){
        switch(x){
            case "a":
                this.setState({
                    a:{
                        visible: false
                    }
                });
                break;
            case "b":
            this.setState({
                b:{
                    visible: false
                }
            });
            break;
            case "c":
            this.setState({
                c:{
                    visible: false
                }
            });
            break;
        }
    }
//回车事件触发的方法
    handleKeyDown(e){
        if(e.keyCode == 13){
            if(this.state.pagenumber == 2){//在扫描快递单页面操作
                const {orderData} = this.props;
                let sweepid = this.refs.myInput.value;//获取快递单号
                for(let j = 0; j < orderData.length; j++){//根据快递单号匹配出订单信息
                    if(orderData[j].invoice_no == sweepid){
                        this.state.sweeporder = orderData[j];
                    }
                }

                if(this.state.sweeporder == ""){//如果订单信息没有匹配出，给出提示弹框
                    this.setState({
                        b:{
                            visible: true
                        }
                    });
                    this.refs.myInput.value = "";
                    return;
                }
                let orderdetail = "";
                let condition = {
                    'tao_tid':this.state.sweeporder.tao_tid
                };
                let goodssum = [];
                api("ebs.order.childDataList",condition,function(e){//调用获取订单详情接口 根据订单号
                    orderdetail = e.result;
                    for(let i=0; i<orderdetail.length; i++){
                        goodssum.push({
                            code:orderdetail[i].barcode,
                            sum: 0,
                            sweepnumberstyle:"havesweep",
                          })
                    }
                    this.setState({//跳转到第三页（商品详情页）并获取到商品详细数据
                        pagenumber : 3,
                        sweeporder : this.state.sweeporder,
                        orderdetail : orderdetail,
                        goodssum:goodssum
                    });
                    if(this.state.pagenumber==3){
                        this.refs.codevalue.focus();//获取详情页输入框焦点，该输入框已隐藏
                    }
                }.bind(this));
            }else if(this.state.pagenumber == 3){ //进入订单详情页面 对扫码数量的处理
                let goodscode = this.refs.codevalue.value;//获取详情页面input框焦点数据
                for(let i = 0; i < this.state.goodssum.length; i++){//匹配所获取到的是那个子订单，并使数目加一
                    if(goodscode == this.state.goodssum[i].code){
                        this.state.goodssum[i].sum = this.state.goodssum[i].sum + 1;
                        this.setState(this.state);
                    }
                }
                for(let j = 0; j < this.state.goodssum.length; j++){
                    if(this.state.goodssum[j].sum >= this.state.orderdetail[j].num){//判断扫码数量是否大于等于商品数目
                        this.state.goodssum[j].sweepnumberstyle = "have-sweep-sum-finish";
                        this.setState(this.state);
                        if(this.state.successNumber.indexOf(j) <= -1){//如果大于等于商品数目且刚刚满足条件就做一次记录
                            successNumber.push(j);
                            this.setState({
                                successNumber:successNumber
                            });
                        }else{
                            if(this.state.goodssum[j].sum > this.state.orderdetail[j].num){//如果大于商品数目且改变该行数据样式
                                this.state.goodssum[j].sweepnumberstyle = "have-sweep-sum-nofinish";
                                if(this.state.morearr.indexOf(j) > -1){//把满足条件的数据做记录
                                }else{
                                    morearr.push(j)
                                    console.log("-------------->");
                                    console.log(morearr);
                                    this.state.morearr=morearr;
                                    this.setState(this.state);
                                }
                            }
                        }
                    }
                }
                if(this.state.successNumber.length >= this.state.goodssum.length){//根据满足条件的记录判断是否都已扫码完成
                        var input = document.getElementById("your-input-id");//完成输入框失去焦点
                        input.blur();
                        console.log(this.state.morearr);
                        if(this.state.morearr == ""){//如果没有扫码数目超出的商品 直接弹出自动发货按钮
                            this.setState({
                                a:{
                                    visible: true
                                }
                            });
                            if(this.state.likedtime){
                              this.timer = setInterval(function () {//自动发货倒计时
                                var count = this.state.count;
                                this.state.likedtime = false;
                                count -= 1;
                                if (count < 1) {
                                    clearInterval(this.timer);
                                    let condition = {
                                        'tid':this.state.sweeporder.tao_tid,
                                        'out_sid':this.state.sweeporder.invoice_no,
                                        'company_code':this.state.sweeporder.logistics_company
                                    };

                                    api("ebs.order.sendGoodsOffline",condition,function(e){//调用自动发货api
                                        /*if(e.logistics_offline_send_response && e.logistics_offline_send_response.shipping.is_success == true){
                                            this.setState({
                                                a:{
                                                    visible: false,
                                                },
                                                pagenumber:4

                                            });
                                        }else if(e.msg){
                                            this.setState({
                                                a:{
                                                    visible: false,
                                                },

                                                fail:"send-goods-success",
                                                success:"send-goods-fail",
                                                pagenumber:4,
                                                msg:e.msg

                                            });
                                        }*/
                                        if(e.updata_list && e.updata_order){
                                            this.setState({
                                                a:{
                                                    visible: false,
                                                },
                                                pagenumber:4

                                            });
                                        }else{
                                            this.setState({
                                                a:{
                                                    visible: false,
                                                },

                                                fail:"send-goods-success",
                                                success:"send-goods-fail",
                                                pagenumber:4,

                                            });
                                        }
                                        console.log(e);
                                    }.bind(this));
                                }
                                this.setState({
                                  count: count
                                });
                                console.log(this.state.count);
                              }.bind(this), 1000);
                            }
                        }else{//有超出数目商品展示错误提示
                            this.setState({
                                sweepfail:"send-goods-isshow",
                                sweepsuccess:"send-goods-fail-isshow",
                            });
                            console.log("fail");
                        }
                }
                this.refs.codevalue.value = "";//输入框清空
            }
        }
    }
    //直接发货方法
    sendGoods(){
        clearInterval(this.timer);
        let condition = {
            'tid':this.state.sweeporder.tao_tid,
            'out_sid':this.state.sweeporder.invoice_no,
            'company_code':this.state.sweeporder.logistics_company
        };
        console.log(condition);

        api("ebs.order.sendGoodsOffline",condition,function(e){
            /*if(e.logistics_offline_send_response && e.logistics_offline_send_response.shipping.is_success == true){
                this.setState({
                    a:{
                        visible: false,
                    },
                    pagenumber:4

                });
            }else if(e.msg){
                this.setState({
                    a:{
                        visible: false,
                    },

                    fail:"send-goods-success",
                    success:"send-goods-fail",
                    pagenumber:4,
                    msg:e.msg

                });
            }*/
            if(e.updata_list && e.updata_order){
                this.setState({
                    a:{
                        visible: false,
                    },
                    pagenumber:4

                });
            }else{
                this.setState({
                    a:{
                        visible: false,
                    },

                    fail:"send-goods-success",
                    success:"send-goods-fail",
                    pagenumber:4,

                });
            }
            console.log(e);
        }.bind(this));
    }
    //终止发货方法
    endSendGoods(){
        clearInterval(this.timer);
        this.setState({
            sweepsuccess:"send-goods-fail-isshow",
            endsendgoods:"send-goods-isshow",
            a:{
                visible: false
            }
        });
    }
    //表格红色边框提示显示 千牛表格组件的方法
    cellRender = (value, index, record, context) => {
        if(this.state.morearr == ""){
            return value;
        }else{
            for(let i = 0; i < this.state.morearr.length; i++){
                if(index == this.state.morearr[i]){
                    return <div><span>{value}</span><span style={{display: "block",position: "absolute",width: "100%",height: "120px",border: "1px solid red",left:"0px",marginTop:"-68px"}}></span></div>
                }else{
                    return value;
                }
            }
        }
   }

    render(){
        console.log('开始渲染打印组件');
        const TabPane = Tab.TabPane;
        const {isLoading, orderTotal, selectCondition, orderData, ItemsSelected_arr} = this.props;
        let column_arr = new Data();//获取表格配置
        if(this.state.pagenumber == 1){
            return (<div style={{marginTop:"10px",height:"100%",width:"100%"}}>
                    <div style={{zIndex:"99",position: "fixed"}}>
                        <Button type="secondary" component="a" style={{marginLeft:"10px"}} target="_blank">批量发货</Button>
                        <Button type="secondary" component="a" style={{marginLeft:"10px"}} onClick={this.changePage.bind(this,2)} target="_blank">扫码发货</Button>
                        <Button type="secondary" component="a" style={{marginLeft:"10px"}} target="_blank">提交异常</Button>
                    </div>
                    <div style={{height:"100%",width:"100%"}}>
                    <OrderTable dataSource={orderData} ItemsSelectedArr={ItemsSelected_arr} isLoading = {isLoading}
                    columnArr={column_arr} primaryKey="tao_tid" current={selectCondition.page_num} pageSize={50} total={orderTotal} pageOnChange={this.pageOnChange.bind(this)} itemsCheckedOnChange={this.itemsCheckedOnChange.bind(this)} expandedRowRender={(record,index)=> {
                        return (<Tab defaultActiveKey="1">
                    <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
                    <TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
                    <TabPane tab="选项卡三" key="3">选项卡三内容</TabPane>
                </Tab>);
            }} onSort={this.onSort.bind(this)} onFilter={this.onFilter.bind(this)} onSearch={this.onSearch.bind(this)} leftBottomComponent={()=>{
                        return (<span style={{color: "#999"}}>共计{4}个店铺，{orderTotal}条订单信息</span>);
                    }}/>
                    </div>
                    </div>
            );
        }else if(this.state.pagenumber == 2){
            return(
                <div>
                    <h2 style={{textAlign:'center',marginTop:"100px"}}>请扫描物流单号：<input ref="myInput" placeholder="请扫描物流单号" /></h2>
                    <div className="scsg-img-style"><img src="image/scsg.png" /></div>
                    <Dialog visible = {this.state.b.visible} footer = {<div style={{textAlign:'center'}}><Button onClick={this.onClose.bind(this,"b")}>重新扫描</Button></div>}
                        onClose = {this.onClose.bind(this,"b")} title = "温馨提示">
                        <div>没有匹配到订单</div>
                     </Dialog>
                </div>
            );
        }else if(this.state.pagenumber == 3){
            return(
                <div>
                    <div className={this.state.sweepfail} style={{margin:"30px 0 20px 0"}}>
                        <span className="send-goods-fail"><Icon  type="error" size="xl"/>自动发货失败，检测到此订单商品有异常，请确认是否继续发货</span>
                        <Button className="send-goods-fail-button" onClick={this.sendGoods.bind(this)}>强制发货</Button>
                        <Button className="send-goods-fail-button2" type="primary" onClick={this.changePage.bind(this,2)}>重新扫描</Button>
                    </div>
                    <div className={this.state.endsendgoods} style={{margin:"30px 0 20px 0"}}>
                        <Button className="send-goods-fail-button" type="primary">提交异常</Button>
                        <Button className="send-goods-fail-button2" type="secondary" onClick={this.sendGoods.bind(this)}>继续发货</Button>
                        <Button className="send-goods-fail-button2" type="secondary" onClick={this.changePage.bind(this,2)}>跳过</Button>
                    </div>
                    <h2 className={this.state.sweepsuccess}>请扫描商品条形码，进行验货，核对全部正确5秒后自动发货</h2>
                    <div style={{width:"70%",marginLeft:'15%'}}>
                        <Table  dataSource={this.getData()} >
                            <Table.Column style={{width:"15%"}} title="商家编码" cell={this.cellRender} dataIndex="id"/>
                            <Table.Column style={{width:"65%"}}title="商品信息" dataIndex="message"/>
                            <Table.Column style={{width:"15%"}}title="订单数目" dataIndex="ordersum"/>
                            <Table.Column style={{width:"15%"}}title="扫码数目" dataIndex="sweepsum"/>
                        </Table>
                    </div>
                    <div style={{width:"80%",margin:"3% 0 0 10%"}}>
                        <span style={{margin: "0 0 30px 10px"}}>订单编号：{this.state.sweeporder.tao_tid}</span>
                        <span style={{margin: "0 0 30px 40%"}}>{this.state.sweeporder.logistics_company}：{this.state.sweeporder.invoice_no}</span>
                        <hr/>
                        <div  style={{marginLeft:'10px',lineHeight:"30px",marginTop:"20px"}}>买家留言：{this.state.sweeporder.buyer_message != null ?this.state.sweeporder.buyer_message:"无" }</div>
                        <div  style={{marginLeft:'10px',lineHeight:"30px"}}>卖家备注：{ this.state.sweeporder.seller_memo != null ?this.state.sweeporder.seller_memo:"无"}</div>
                        <div  style={{marginLeft:'10px',lineHeight:"30px"}}>收件信息：{this.state.sweeporder.address}</div>
                    </div>
                    <Dialog visible = {this.state.a.visible} onClose = {this.onClose.bind(this,"a")}
                    footer = {<div style={{textAlign:'center'}}><Button onClick={this.endSendGoods.bind(this)}>取消发货</Button><Button type="primary" onClick={this.sendGoods.bind(this)}>确认发货</Button></div>} title = "自动发货">
                            <div>
                            <div>此订单商品全部验货完成<span style={{fontSize:"25px",color:"red",margin:"0 10px 0 10px"}}>{this.state.count}</span>秒后自动发货</div>
                           </div>
                    </Dialog>
                    <input id="your-input-id" style={{position:"absolute",top:"100px",left:"-200px"}} ref = "codevalue"/>
                </div>
            );
        }else if(this.state.pagenumber == 4){
            return(
                <div>
                    <div className={this.state.success}>
                        <div style={{textAlign:'center',marginTop:"250px"}}><Icon  type="success" size="xxl" style={{color:"#6ed363"}}/>发货成功，该商品还未称重，已帮您添加到订单称重列表</div>
                        <div style={{textAlign:'center',marginTop:"100px"}}><Button onClick={this.changePage.bind(this,1)}>返回扫描验发列表</Button><Button type="primary" style={{marginLeft:"10px"}} onClick={this.changePage.bind(this,2)}>继续扫描下一单</Button></div>
                    </div>
                    <div className={this.state.fail}>
                        <div style={{textAlign:'center',marginTop:"250px"}}><Icon  type="error" size="xxl" style={{color:"red"}}/>发货失败，{this.state.msg}</div>
                        <div style={{textAlign:'center',marginTop:"100px"}}><Button onClick={this.changePage.bind(this,1)}>返回扫描验发列表</Button><Button type="primary" style={{marginLeft:"10px"}} onClick={this.changePage.bind(this,2)}>继续扫描下一单</Button></div>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state, ownProps){
    console.log(state);
    return {
        orderTotal:state.SweepCodeCheckSendTable.orderTotal,
        isLoading:state.SweepCodeCheckSendTable.isLoading,
        orderData:state.SweepCodeCheckSendTable.orderData,
        selectCondition:state.SweepCodeCheckSendTable.selectCondition,
        ItemsSelected_arr:state.SweepCodeCheckSendTable.ItemsSelected_arr
    }
}

function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(SweepCodeCheckSendTableActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SweepCodeCheckSendTable)
