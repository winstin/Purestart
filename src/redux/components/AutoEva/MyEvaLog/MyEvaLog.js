import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Table from 'qnui/lib/table';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Feedback from 'qnui/lib/feedback';
import Switch from 'qnui/lib/switch';
import Pagination from 'qnui/lib/pagination';

import {ajax} from "../../../actions/AY_API"

const onRowClick = function(record, index, e){
        console.log(record, index, e);
    },
    getData = (i,j) =>{
        let result = [];
        for (let k =i; k < j; k++) {
          result.push({
              title:{
                name: `Quotation for 1PCS Nano ${3+i}.0 controller compatible`,
                },
              id:100306660940+k,
              time: 2000 + k
            })
        }
        return result;
    },
    renderOper = (value, index, record) => {
        return <div className="table-button-cell"><Button type="secondary" size="small">编辑</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button type="normal" size="small">删除</Button></div>;
    };
const TabPane = Tab.TabPane;


class MyEvaLog extends Component {

    constructor(props){
        super(props);
        this.state = {
          rowSelection: {
            onChange: this.onChange.bind(this),
            onSelect: function(selected, record, records){ console.log('onSelect',selected, record, records) },
            onSelectAll: function(selected, records){ console.log('onSelectAll', selected, records) },
            selectedRowKeys: []
          },
          successSource: [],
          successTotal: 0,
          failureSource: [],
          failureTotal: 0,
          blockSource: [],
          blockTotal: 0,
          evaSource: [],
          evaTotal: 0
        }
        this.getAutoRateLog(1, 1);
        this.getAutoRateLog(1, 0);
        this.getBlockLog(1);
        this.getEvaluate(1, 1);
    }

    onChange(ids, records){
        let {rowSelection} = this.state;
        rowSelection.selectedRowKeys = ids;
        console.log('onChange', ids, records);
            this.setState({ rowSelection });
    }
    clear(){
        let {rowSelection} = this.state;
        rowSelection.selectedRowKeys = [];
        this.setState({ rowSelection });
    }
    toggleLoading(){
        this.setState({isLoading: !this.state.isLoading});
    }
    changeMode(){
        let {rowSelection} = this.state;
        rowSelection.mode = 'single';
        this.setState({ rowSelection });
    }
    modifyDataSource(){
        this.setState({
          dataSource: getData(9, 14)
        })
    }
    /**
     * 评价日志
     * pageNo 页码
     * statue 1 评价成功 0 评价失败
     */
    getAutoRateLog(pageNo, status){
        console.log("进来了");
        console.log(pageNo);
        let self = this;
        ajax("/iytrade2/zdratelog",{page: pageNo,status: status},"POST",function(e){
            console.log("AutoRateLog", e);
            if (status) {
                self.setState({
                    successSource:e.zdpj,
                    successTotal: Number(e.assessTotal)
                });
            } else {
                self.setState({
                    failureSource:e.zdpj,
                    failureTotal: Number(e.assessTotal)
                });
            }
        });
    }
    /**
     * 拦截日志
     */
    getBlockLog(pageNo){
        let self = this;
        ajax("/iytrade2/blacklogs",{page: pageNo},"POST",function(e){
            console.log("BlockLog", e);
            self.setState({
                blockSource:e.zdpj,
                blockTotal: e.assessTotal
            });
        });
    }
    /**
     * 待执行订单
     */
    getEvaluate(pageNo){
        let self = this;
        ajax("/iytrade2/getevaluate",{page:pageNo,status:0},"POST",function(e){
            console.log("Evaluate", e);
            self.setState({
                evaSource:e.zdpj,
                evaTotal: e.assessTotal
            });
        });
    }
    render(){
        let self = this;
        const successChange = function(value) {
            console.log(value);
            self.getAutoRateLog(value, 1);
        };
        const failureChange = function(value) {
            console.log(value);
            self.getAutoRateLog(value, 0);
        };
        const blockChange = function(value) {
            console.log(value);
            self.getBlockLog(value);
        };
        const evaChange = function(value) {
            console.log(value);
            self.getEvaluate(value, 1);
        };
        return(
            <div>
                <Tab type="capsule" size="small">
                    <TabPane tab="评价成功日志" key="1">
                        <Table dataSource={this.state.successSource} onRowClick={onRowClick} hasBorder={false}>
                            <Table.Column title="买家旺旺" dataIndex="buyer_nick"/>
                            <Table.Column title="订单信息" dataIndex="tradeid" />
                            <Table.Column title="评价时间" dataIndex="opttime"/>
                            <Table.Column title="评价内容" dataIndex="content"/>
                        </Table>
                        <Pagination style={{marginTop:'10px'}} pageSizeSelector={false} pageSize={20} total={this.state.successTotal} onChange={successChange}/>
                    </TabPane>
                    <TabPane tab="评价失败日志" key="2">
                        <Table dataSource={this.state.failureSource} onRowClick={onRowClick} hasBorder={false}>
                            <Table.Column title="买家旺旺" dataIndex="buyer_nick"/>
                            <Table.Column title="订单信息" dataIndex="tradeid" />
                            <Table.Column title="评价时间" dataIndex="opttime"/>
                            <Table.Column title="评价内容" dataIndex="content"/>
                        </Table>
                        <Pagination style={{marginTop:'10px'}} pageSizeSelector={false} pageSize={20} total={this.state.failureTotal} onChange={failureChange}/>
                    </TabPane>
                    <TabPane tab="拦截日志" key="3">
                        <Table dataSource={this.state.blockSource} onRowClick={onRowClick} hasBorder={false}>
                            <Table.Column title="买家旺旺" dataIndex="buyernick"/>
                            <Table.Column title="订单信息" dataIndex="trade" />
                            <Table.Column title="拦截原因" dataIndex="reason"/>
                            <Table.Column title="拦截时间" dataIndex="mytime"/>
                        </Table>
                        <Pagination style={{marginTop:'10px'}} pageSizeSelector={false} pageSize={20} total={this.state.blockTotal} onChange={blockChange}/>
                    </TabPane>
                    <TabPane tab="待执行订单" key="4">
                        <Table dataSource={this.state.evaSource} onRowClick={onRowClick} hasBorder={false}>
                            <Table.Column title="买家旺旺" dataIndex="tid"/>
                            <Table.Column title="订单信息" dataIndex="oid" />
                            <Table.Column title="预计评价时间" dataIndex="optime"/>
                        </Table>
                        <Pagination style={{marginTop:'10px'}} pageSizeSelector={false} pageSize={20} total={this.state.evaTotal} onChange={evaChange}/>
                    </TabPane>
                </Tab>
            </div>
        );
    }
}

export default (MyEvaLog)
