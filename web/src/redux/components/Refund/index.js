import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'

import Button from 'qnui/lib/button';
import Icon from 'qnui/lib/icon';
import Select, {Option} from 'qnui/lib/select';

import * as actionTypes from './RefundAction'
import RefundTable from './TableConfig'
import Search from './Search'
import Refund from './Refund'
import Scan from './Scan'
import Detail from './Detail'
import {DialogRefund} from './Dialog'
import './main.css'

class App extends React.Component {

    componentDidMount() {
        this.props.getRefund({
            page_no:1,
            sort:"{}",
        });

    }

    onSearch =(params)=>{
        this.props.searchRefundOrder(params)
    }

    render() {
        const page = this.props.route.page; // url参数
        console.log(this.props);
        return (
            <div style={{height:'100%'}}>

                {/* 新建售后单 */}
                <DialogRefund title="新建售后单"
                    visible={this.props.dialogShow.DialogRefund}
                    onClose={()=>{this.props.toggleDialog('DialogRefund')}}
                    onOk= {(params)=>{
                        this.props.addRefundOrder(params);
                        this.props.toggleDialog('DialogRefund'); // 关闭 弹窗
                    }}
                />

                <div className="excep-buttons" style={{display:page==='todo'?'block':'none'}}>
                    <Button type="primary" onClick={()=>{this.props.toggleDialog('DialogRefund')}}>
                        <Icon type="add" /> 新建售后单
                    </Button>
                </div>

                {/* 售后查询 */}
                <div className="excep-buttons" style={{display:page==='search'?'block':'none'}}>
                    <Search onSearch={this.onSearch} />
                </div>

                {/* 入库 */}
                <div className="excep-buttons" style={{display:page==='storage'?'block':'none'}}>
                    <Refund />
                </div>

                {/* 扫描 */}
                {page==='scan'?<Scan />:null}

                {/* 入库详情 */}
                {page==='detail'?<Detail />:null}



                { ['todo','search','storage'].indexOf(page)>-1
                    ?<RefundTable {...this.props} />
                    :null
                 }

            </div>
        );
    }

}

export default connect(
    (state)=>state.Refund,
    (dispatch)=>bindActionCreators(actionTypes,dispatch)
)(App);
