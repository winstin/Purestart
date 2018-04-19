import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Input from 'qnui/lib/input'
import Button from 'qnui/lib/button'
import Feedback from 'qnui/lib/feedback'
import Dialog from 'qnui/lib/dialog'
import * as batchWeighOperActions from '../../../actions/batchWeighOper'
import * as weighOrderTableActions from '../../../actions/weighOrderTable'

const actions = {
    ...batchWeighOperActions,
    ...weighOrderTableActions
}

let weighChange, isbatchvalue;
class BatchWeigh extends Component {
    detailOrder (value){
        if(value){
            value = JSON.parse(value);
            return value.trade_fullinfo_get_response.trade.orders.order.map(function(value, index){
                return (
                    <div style={{overflow: "hidden", marginTop: "20px", position: "relative"}}>
                        <img src={value.pic_path} style={{width: 40, height: 40}}/>
                        <div className="intro">
                        <span>{value.title}</span>
                        <span>{value.seller_type}</span>
                        </div>
                        <Button type="primary" className="weigh-button"><span>{value.sku_properties_na ? value.sku_properties_na : "其他"}{' '}x3</span></Button>
                    </div>
                );
            });
        }
    }

    componentDidMount(){
        this.refs.batchWeighValue.focus();
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleKeyDown(e){
        isbatchvalue = e.target.value;
        if(isbatchvalue){
            if(e.keyCode == 13){
                //按下enter键后取消焦点并重置input里的值
                this.refs.batchWeighValue.blur();
                const {onOpen, counterWeighNum, onClose, Batch_Weigh_Oper, num, updateWeigh, getOrderData, batchWeighOper} = this.props;
                onOpen();
                updateWeigh(isbatchvalue, Batch_Weigh_Oper[num].tao_tid);
                this.refs.batchWeighValue.value = "";
                if(num >= Batch_Weigh_Oper.length - 1){
                    getOrderData({
                        'search_value':'',
                        'filter_value':'',
                        'sort_value':'',
                        'page_num':1
                    });
                } else{
                    weighChange = setTimeout(function(){
                        counterWeighNum();
                        onClose();
                    }, 3000);
                }
            }
        }
    }

    backOrderList(){
        const {changePage, onClose, counterWeighNum} = this.props;
        counterWeighNum();onClose();changePage();clearTimeout(weighChange);return;
    }

    nextOrderShow(){
        const {onClose, counterWeighNum} = this.props;
        counterWeighNum();onClose();clearTimeout(weighChange);return;
    }

    render() {
        console.log("开始渲染了");
        const {Batch_Weigh_Oper, num, isactive, counterWeighNum, visible, onClose, onOpen} = this.props;
        //判断是否只勾选一个称重订单或者当前称重订单为最后一个
        // console.log(Batch_Weigh_Oper.length);
        let isbatchweight = (num == Batch_Weigh_Oper.length - 1);
        let weighhytml1 = '<div/>';
        weighhytml1 = (<div><a onClick={this.backOrderList.bind(this)} href="javascript:;" style={{marginRight:"10px"}}><span className="dialog-btn">返回称重列表</span></a></div>);

        let weighhytml2 = '<div/>';
        weighhytml2 = (<div><a onClick={this.backOrderList.bind(this)} href="javascript:;" style={{marginRight:"10px"}}><span className="dialog-btn">返回称重列表</span></a>
        <a type="primary" onClick={this.nextOrderShow.bind(this)} href="javascript:;"><span className="dialog-btn">下一单</span> </a></div>);

        const footer = (isbatchweight ?  weighhytml1 : weighhytml2);
        let items = [];
        Batch_Weigh_Oper[num] ?
            (items.push(
                <div>
                    <span style={{margin: "0 0 30px 50px"}}>{Batch_Weigh_Oper[num].logistics_company ? Batch_Weigh_Oper[num].logistics_company :"未匹配快递"}：{Batch_Weigh_Oper[num].invoice_no}</span>
                    <hr/>
                    <div style={{marginLeft: "50px"}}>
                    {this.detailOrder(Batch_Weigh_Oper[num].jdp_response)}
                    </div>
                    <span style={{display: "block", margin: "20px 0 20px 50px"}}>当前订单号：{Batch_Weigh_Oper[num].tao_tid}</span>
                    <span style={{marginLeft: "50px"}}>收件信息：{Batch_Weigh_Oper[num].receiver_name}，{Batch_Weigh_Oper[num].receiver_mobile}，-，{Batch_Weigh_Oper[num].receiver_address},{Batch_Weigh_Oper[num].receiver_zip}</span>
                </div>
            )) : '';
        return (
            <div className="weigh-info">
                <div className="weigh-title">请将打包好的商品放到称重器上进行称重:{' '}<input placeholder="请称重" ref="batchWeighValue" className="weigh-input"/>{' '}kg</div>
                <div>{items}</div>
                <Dialog visible = {visible} className="weigh-finish" onClose={onClose} footer={footer}>
                    <Feedback size="large" className="feedback">
                    {
                        isbatchweight ? '' : <span>订单商品称重成功，<b>3</b>秒后继续称重下一单</span>
                    }
                        <span>如有相同商品组合不在称重，直接获取当前重量计算运费成本</span>
                    </Feedback>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        Batch_Weigh_Oper:state.batchWeighOper.Batch_Weigh_Oper, //称重列表的打勾后存储的数组
        num:state.batchWeighOper.num,  //控制称重页面的单个渲染值，初始值为0，每称重一次后num+1
        visible:state.batchWeighOper.visible,  //控制弹窗的显示和隐藏（true false）
        ItemsSelected_arr:state.weighOrderTable.ItemsSelected_arr //称重列表页面的勾选值
    }
}

function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BatchWeigh)
