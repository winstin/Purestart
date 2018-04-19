import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Button from 'qnui/lib/button'
import Dialog from 'qnui/lib/dialog'
import Search from 'qnui/lib/search'
import Radio, { Group as RadioGroup } from 'qnui/lib/radio'
import StockEnterTable from './StockEnterTable'
import StockEnterModel from './StockEnterModel'
import * as StockControlActions from '../../../actions/StockControl'
import * as StockEnterActions from '../../../actions/StockEnter'
import * as StockEnterDataActions from '../../../actions/StockEnterData'

const actions = {
    ...StockControlActions,
    ...StockEnterActions,
    ...StockEnterDataActions
}

class StockEnter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 'price'
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        this.setState({
            value: value
        });
    }

    sotockEnterEnsure(){
        const {onCloseEnter, tableid, stockEnterModel} = this.props;
        switch (tableid) {
            case 'itemseletected':
                onCloseEnter();
                break;
            case 'itemunseletected':
                stockEnterModel("itemseletected", "进货入库", 'table-cross', 'controlOrderTable');
                break;
            default:
        }
    }
    //批量填写的取消
    closeModiStock(){
        const {onCloseModi} = this.props;
        onCloseModi();
    }
    //批量填写的确认
    ensureModiStock(){
        const {onCloseModi, stockEnterModel, StockPriceAndDefect, saveInputValue } = this.props;
        let unionNum = document.getElementsByClassName('unionNum')[0].value;
        let unionPrice = document.getElementsByClassName('unionPrice')[0].value;
        let unionSum = document.getElementsByClassName('unionSum')[0].value;
        saveInputValue(unionNum, unionPrice, unionSum);
        // stockEnterModel("itemseletected", "进货入库", 'table-cross', 'controlOrderTable');
        onCloseModi();
    }

    render(){
        const { visiblemodi, onOpenModi, onCloseModi, visibleenter, onCloseEnter, stockEnterModel } = this.props;

        //进货入库的取消确定按钮
        let weighhytml1 = '<div/>';
        weighhytml1 = (<div style={{position:'absolute', bottom:'20px', right:'15px'}}><Button type="normal" onClick={onCloseEnter}>取消</Button><Button type="primary" onClick={this.sotockEnterEnsure.bind(this)}><span>确定</span></Button></div>);
        const footer =  weighhytml1;

        //批量填写的取消确定按钮
        let weighhytml2 = '<div/>';
        weighhytml2 = (<div><Button type="normal" onClick={this.closeModiStock.bind(this)}>取消</Button><Button type="primary" onClick={this.ensureModiStock.bind(this)}><span>确定</span></Button></div>);
        const footer2 =  weighhytml2;

        return (
            /*库存列表中选中后点击进货入库出现的界面 && 库存列表中未选中后点击进货入库出现的界面 */
            <div>
                <Dialog visible = {visibleenter} footer={footer} onClose = {onCloseEnter} style={{width:'60%', height:'60%'}}>
                    <StockEnterModel stockEnterModel={()=>{stockEnterModel("itemseletected", "进货入库", 'table-cross', 'controlOrderTable');}}/>
                </Dialog>

                <Dialog visible = {visiblemodi} footer={footer2} onClose = {this.closeModiStock.bind(this)}>
                    <h4 className="dialog-title">批量填写</h4>
                    <RadioGroup value={this.state.value} onChange={this.onChange} >
                        <div className="stock-input"><span style={{margin:"0 15px 0 25px"}}>数量统一为：</span><input className="unionNum"/></div>
                        <div className="stock-input"><Radio value="price"/><span style={{margin:"0 15px 0 8px"}}>单价统一为：</span><input className="unionPrice"/></div>
                        <div className="stock-input"><Radio value="cost"/><span style={{margin:"0 15px 0px 8px"}}>总价统一为：</span><input className="unionSum"/>
                        </div>
                    </RadioGroup>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        visibleenter:state.StockControl.visibleenter,   //进货入库弹窗的隐藏显示值
        visiblemodi:state.StockEnter.visiblemodi,      //批量填写弹窗的隐藏显示值
        tableid:state.StockEnterData.tableid,         //控制进货入库后的页面内容展示值
        title:state.StockEnterData.title,            //点击进货入库按钮后，通过点击事件改变title值
        ItemsSelected_tab_arr1:state.StockEnterData.ItemsSelected_tab_arr1    //点击批量填写按钮后，用进货入库的勾选值判断修改的内容
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( actions , dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(StockEnter)
