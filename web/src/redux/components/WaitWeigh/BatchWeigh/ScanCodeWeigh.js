import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Input from 'qnui/lib/input'
import Button from 'qnui/lib/button'
import Feedback from 'qnui/lib/feedback'
import Dialog from 'qnui/lib/dialog'
import * as batchWeighOperActions from '../../../actions/batchWeighOper'
import * as ScanCodeWeighActions from '../../../actions/ScanCodeWeigh'
import * as WeighOrderTableActions from '../../../actions/weighOrderTable'

const actions = {
    ...batchWeighOperActions,
    ...ScanCodeWeighActions,
    ...WeighOrderTableActions
}

let weighChange;
class ScanCodeWeigh extends Component {
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
        this.refs.scanWeighValue.focus();
        window.addEventListener('keydown', this.ScanKeyDown.bind(this));
    }

    ScanKeyDown(event){
        let isscanvalue = event.target.value;
        if(isscanvalue){
            if(event.keyCode == 13){
                // this.refs.scanWeighValue.blur();
                const {onOpen, updateWeigh, singleOrderData} = this.props;
                let num = 0;
                onOpen();
                updateWeigh(isscanvalue, singleOrderData[num].tao_tid);
            }
        }
    }

    render() {
        const {singleOrderData, changePage, visible, onClose, onOpen} = this.props;
        //判断是否只勾选一个称重订单或者当前称重订单为最后一个
        console.log("开始渲染了");
        let weighhytml2 = '<div/>';
        weighhytml2 = (<div><a onClick={() => { onClose();changePage(); }} href="javascript:;" style={{marginRight:"10px"}}><span className="dialog-btn">返回称重列表</span></a></div>);

        const footer = weighhytml2;
        let items = [];
        let num = 0;
        singleOrderData[num] ?
            (items.push(
                <div>
                    <span style={{margin: "0 0 30px 50px"}}>{singleOrderData[num].logistics_company ? singleOrderData[num].logistics_company : "未匹配快递"}：{singleOrderData[num].invoice_no}</span>
                    <hr/>
                    <div style={{marginLeft: "50px"}}>
                    {this.detailOrder(singleOrderData[num].jdp_response)}
                    </div>
                    <span style={{display: "block", margin: "20px 0 20px 50px"}}>当前订单号：{singleOrderData[num].tao_tid}</span>
                    <span style={{marginLeft: "50px"}}>收件信息：{singleOrderData[num].receiver_name}，{singleOrderData[num].receiver_mobile}，-，{singleOrderData[num].receiver_address},{singleOrderData[num].receiver_zip}</span>
                </div>
            )) : '';
        return (
            <div className="weigh-info">
                <div className="weigh-title">请将打包好的商品放到称重器上进行称重:{' '}<input placeholder="请称重" ref="scanWeighValue" className="weigh-input"/>{' '}kg</div>
                <div>{items}</div>
                <Dialog visible = {visible} className="weigh-finish" onClose={onClose} footer={footer}>
                    <Feedback size="large" className="feedback">
                        <span>如有相同商品组合不在称重，直接获取当前重量计算运费成本</span>
                    </Feedback>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        singleOrderData:state.ScanCodeWeigh.singleOrderData,
        visible:state.batchWeighOper.visible
    }
}

function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanCodeWeigh)
