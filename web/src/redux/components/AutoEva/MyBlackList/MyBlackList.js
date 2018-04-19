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

const getData = (i,j) =>{
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
    },
    change = function(value) {
        console.log(value);
    };
class MyBlackList extends Component {
    constructor(props){
        super(props);
        this.state = {
          rowSelection: {
            onChange: this.onChange.bind(this),
            onSelect: function(selected, record, records){ console.log('onSelect',selected, record, records) },
            onSelectAll: function(selected, records){ console.log('onSelectAll', selected, records) },
            selectedRowKeys: []
          },
          dataSource:[],
          assessTotal:0
        }
        this.getBlackList(1);
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
    getBlackList(pageNo){
        console.log("进来了");
        console.log(pageNo);
        let self = this;
        ajax("/iytrade2/ratebalckname",{page: pageNo},"POST",function(e){
            console.log("BlackList", e);
            self.setState({
                dataSource:e.zdpj,
                assessTotal:e.assessTotal
            });
        });
    }
    render(){
        return(
            <div>
                <div>
                    <Button type="primary" size="medium">添加黑名单</Button>&nbsp;&nbsp;&nbsp;
                    <Button type="primary" size="medium">批量删除</Button>
                </div>
                <div style={{marginTop:'10px'}}>
                    <Table
                        dataSource={this.state.dataSource}
                        isLoading = {this.state.isLoading}
                        rowSelection={this.state.rowSelection}
                        hasBorder={false}>
                            <Table.Column title="买家旺旺" dataIndex="blacknick" width={150}/>
                            <Table.Column title="拉黑原因" dataIndex="blackreason" />
                            <Table.Column title="拉黑时间" dataIndex="blacktime" width={200} />
                            <Table.Column title="备注" dataIndex="remark"/>
                            <Table.Column title="操作" cell={renderOper} width={150}/>
                    </Table>
                    <Pagination pageSizeSelector={false} total={2} onChange={change}/>
                </div>
            </div>
        );
    }
}

export default (MyBlackList)
