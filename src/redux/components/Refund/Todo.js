import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'

import Button from 'qnui/lib/button';
import Icon from 'qnui/lib/icon';

import OrderTable from '../../../components/Ordertable' // 引入Ordertable
import * as actionTypes from './RefundAction'
import {columnArr} from './TableConfig'
import Detail from './Detail'
import {DialogRefund} from './Dialog'
import './main.css'

class Refund extends React.Component {

    componentDidMount() {
        this.props.getRefund({
            type:1
        });
    }

    render() {
        console.warn(this.props);
        return (
            <div style={{height:'100%'}}>
                {/* <DialogRefund title="新建售后单"
                    visible={this.props.dialogShow.DialogRefund}
                    onClose={()=>{this.props.toggleDialog('DialogRefund')}}
                />
                <div className="excep-buttons">
                    <Button type="primary" onClick={()=>{this.props.toggleDialog('DialogRefund')}}>
                        <Icon type="add" /> 新建售后单
                    </Button>
                </div> */}
                <OrderTable
                    dataSource={this.props.data}
                    columnArr={columnArr}
                    primaryKey="tao_tid"
                    current={1}
                    pageSize={50}
                    total={200}
                    pageOnChange={()=>{}}
                    itemsCheckedOnChange={()=>{}}
                    leftBottomComponent={()=>{
                        return (<span style={{color: "#999"}}>共计</span>);
                    }}
                    expandedRowRender={(recode,i)=><Detail />}
                />
            </div>
        );
    }

}

export default connect(
    (state)=>state.Refund,
    (dispatch)=>bindActionCreators(actionTypes,dispatch)
)(Refund);
