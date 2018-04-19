import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React,{Component,PropTypes} from 'react'
import Table from 'qnui/lib/table'
import Checkbox from 'qnui/lib/checkbox'
import Button from 'qnui/lib/button'
import Dialog from 'qnui/lib/dialog'
import WeighOrderTable from './WeighOrder/WeighOrderTable'
import BatchWeigh from './BatchWeigh/BatchWeigh'
import ScanCodeWeigh from './BatchWeigh/ScanCodeWeigh'
import ScanCodeWeighOper from './ScanCodeWeigh/ScanCodeWeighOper'
import * as WaitWeighActions from '../../actions/WaitWeigh'
import * as batchWeighOperActions from '../../actions/batchWeighOper'
import * as weighOrderTableActions from '../../actions/weighOrderTable'
import './waitWeigh.css'

const actions = {
    ...WaitWeighActions,
    ...batchWeighOperActions,
    ...weighOrderTableActions
}

const popupConfirm = ()=>{
    Dialog.confirm({
        content:'请先勾选需称重的订单',
        onOk: () => {
            return new Promise(resolve => {
                resolve();
            });
        }
    })
}

class WaitWeigh extends React.Component {
    checkWeigh(activevalue){
        const { counter, changePage, Batch_Weigh_Oper, num } = this.props;
        console.log("kkkkkkk",num,"kkkkk",Batch_Weigh_Oper.length);
        if(!Batch_Weigh_Oper[num] || num > Batch_Weigh_Oper.length - 1){
            popupConfirm();
            Batch_Weigh_Oper.splice(0, Batch_Weigh_Oper.length);
        }else{
            changePage(activevalue);
        }
    }

    render(){
        const {isactive, changePage} = this.props;
        let html = '<div/>';
        switch (isactive) {
            case 'orderlist':
                html = (
                    <div style={{height:"100%"}}>
                        <div style={{position:"absolute", zIndex: "1000"}}>
                            <Button type="primary" onClick={this.checkWeigh.bind(this, 'weighdetail')}><span>批量称重</span></Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" onClick={()=>{changePage('scancode')}} ><span>扫码称重</span></Button>
                        </div>
                        <WeighOrderTable />
                    </div>
                )
                break;
            case 'weighdetail':
                html = (
                    <div>
                    <Button type="primary" onClick={()=>{changePage('orderlist')}}><span>返回称重列表</span></Button>
                    <BatchWeigh changePage={()=>{changePage('orderlist')}}/>
                    </div>
                )
                break;
            case 'scancodeweigh':
                html = (
                    <div>
                    <ScanCodeWeigh changePage={()=>{changePage('orderlist')}}/>
                    </div>
                )
                break;
            case 'scancode':
                html = (
                    <div>
                    <Button type="primary" onClick={()=>{changePage('orderlist')}}><span>返回称重列表</span></Button>
                    <ScanCodeWeighOper changePage={()=>{changePage('scancodeweigh')}}/>
                    </div>
                )
            default:

        }
        return (
            <div style={{width:"100%", height:"100%"}}>
                <div style={{width:"100%", height:"100%"}} >
                    {html}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps){
    return {
        isactive:state.WaitWeigh.isactive,  //控制订单称重下四个组件的渲染
        Batch_Weigh_Oper:state.batchWeighOper.Batch_Weigh_Oper, //称重列表页面的勾选后存储的数组
        ItemsSelected_arr:state.weighOrderTable.ItemsSelected_arr, //称重列表页面的勾选值
        num:state.batchWeighOper.num   //控制称重页面单个订单称重
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( actions , dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitWeigh)
