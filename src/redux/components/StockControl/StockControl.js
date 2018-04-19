import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React,{Component,PropTypes} from 'react'
import Button from 'qnui/lib/button'
import Dialog from 'qnui/lib/dialog'
import Radio, { Group as RadioGroup } from 'qnui/lib/radio'
import StockControlList from './StockControlList/StockControlList'
import StockEnter from './StockEnter/StockEnter'
import {Link} from 'react-router'
import './StockControl.css'
import * as StockEnterDataActions from '../../actions/StockEnterData'
import * as StockControlActions from '../../actions/StockControl'
import * as StockEnterActions from '../../actions/StockEnter'

const actions = {
    ...StockControlActions,
    ...StockEnterDataActions
}

const popupConfirm = ()=>{
    Dialog.confirm({
        content:'请至少选择一条商品信息!',
        onOk: () => {
            return new Promise(resolve => {
                resolve();
            });
        }
    })
}

class StockControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'stockUnion'
        };
        this.onChange = this.onChange.bind(this);
    }
    onChange(value) {
        this.setState({
            value: value
        });
    }

    // 根据ItemsSelectedArr 得到 选中的id
    getCheckedIds(){
        const {ItemsSelectedArr,orderData} = this.props;
        let ids_checked = [];
        for (var i = 0; i < ItemsSelectedArr.length; i++) {
            if (ItemsSelectedArr[i]) {
                ids_checked.push(orderData[i].sku_product_id)
            }
        }
        return ids_checked;
    }

    updateStockOnChange(){
        const { onClose, getOrderData, changeOnStock, addOperLog, ItemsSelected_arr,stockCheckedValue } = this.props;
        let stockunion = document.getElementsByClassName('stockunion')[0].value;
        let stockadd   = document.getElementsByClassName('stockadd')[0].value;
        let stocksub   = document.getElementsByClassName('stocksub')[0].value;
        switch (this.state.value) {
            case 'stockUnion':
                changeOnStock(stockunion, this.state.value);
                break;
            case 'stockAdd':
                changeOnStock(stockadd, this.state.value);
                break;
            case 'stockSub':
                changeOnStock(stocksub, this.state.value);
                break;
            default:
        }
        onClose();
    }

    batchModiStock(){
        const { onOpen, stockCheckedValue } = this.props;
        if(stockCheckedValue.length == 0){
            popupConfirm();
        }else{
            onOpen();
        }
    }

    render(){
        const {visible, onClose, onOpen, onOpenEnter, tableid, title} = this.props;
        let html = '<div/>';
        let weighhytml1 = '<div/>';
        weighhytml1 = (<div><Button type="normal" onClick={onClose}>取消</Button><Button type="primary" onClick={this.updateStockOnChange.bind(this)}><span>确定</span></Button></div>);
        const footer =  weighhytml1;
        return (
            <div style={{width:"100%", height:"100%"}}>
                <div style={{position:"absolute", zIndex: "1000"}}>
                    <Link to="stockCheck"><Button type="secondary" style={{marginRight:"10px"}}><span>库存盘点</span></Button></Link>
                    <Button type="secondary" onClick={onOpenEnter} style={{marginRight:"10px"}}><span>进货入库</span></Button>
                    <Button type="secondary" onClick={this.batchModiStock.bind(this)} style={{marginRight:"10px"}}><span>批量改库存</span></Button>
                    <Link to="stockSync"><Button type="secondary"><span>库存同步</span></Button></Link>
                </div>
                <StockControlList />

                <Dialog visible = {visible} footer={footer} onClose = {onClose}>
                    <h4 className="dialog-title">批量修改库存</h4>
                    <RadioGroup value={this.state.value} onChange={this.onChange} >
                        <div className="stock-input"><Radio  value="stockUnion"/><span style={{margin:"0 8px"}}>每个商品库存统一为：</span><input className="stockunion"/></div>
                        <div className="stock-input"><Radio value="stockAdd"/><span style={{margin:"0 23px 0 8px"}}>每个商品库存增加：</span><input className="stockadd"/></div>
                        <div className="stock-input"><Radio value="stockSub"/><span style={{margin:"0 23px 0 8px"}}>每个商品库存减少：</span><input className="stocksub"/>
                        </div>
                    </RadioGroup>
                </Dialog>

                <StockEnter />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        visible:state.StockControl.visible,  //批量修改库存弹窗隐藏显示值
        ItemsSelected_arr:state.StockControl.ItemsSelected_arr,  //库存管理列表的勾选值
        orderData:state.StockControl.orderData,  //库存管理列表的数据源
        stockCheckedValue:state.StockEnter.stockCheckedValue  //库存管理已勾选的数组值
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( actions , dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(StockControl)
