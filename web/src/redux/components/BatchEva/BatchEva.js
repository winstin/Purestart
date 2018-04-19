import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Table from 'qnui/lib/table';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Feedback from 'qnui/lib/feedback';
import Switch from 'qnui/lib/switch';
import Pagination from 'qnui/lib/pagination';
import Select, {Option} from 'qnui/lib/select';


// import MySettings from './MySettings/MySettings';
// import MyBlackList from './MyBlackList/MyBlackList';
// import MyEvaLog from './MyEvaLog/MyEvaLog';

import * as AddAction from '../../actions/AutoEva'

import './BatchEva.css'

const change = function(value) {
    console.log(value);
};
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
    renderOrder = (value, index, record) => {
        return <div style={{display: 'inline-flex',flexDirection:'row'}}>
                   <img style={{width:'60px',height:'60px',minHeight:'60px',minWidth:'60px'}} alt="商品图片" src="https://img.alicdn.com/bao/uploaded/i1/TB1znGQNXXXXXbEXpXXXXXXXXXX_!!0-item_pic.jpg_80x80.jpg"/>&nbsp;&nbsp;
                   <a className="orange-text a-href" style={{color:"#4990E2",marginLeft:'10px'}}>不锈钢盖帽 圆头六角螺冒 盖型螺母 装饰螺母 M4~M20 盖帽螺母</a>
               </div>;
    },
    renderOper = (value, index, record) => {
        return <div><a style={{color:"#4990E2"}} className="a-href">评价</a></div>;
    },
    renderNum = (value, index, record) => {
        return <div><span>共3笔</span><br /><span className="orange-text">198.6元</span><br /><span>(快递：6.00元)</span></div>;
    },
    renderWw = (value, index, record) => {
        return <div><span>Img</span>&nbsp;&nbsp;<span className="orange-text" style={{color:"#4990E2"}}>顾超js</span></div>;
    };

class BatchEva extends Component {
    constructor(props){
        super(props);
        this.state = {
            rowSelection: {
              onChange: this.onChange.bind(this),
              onSelect: function(selected, record, records){ console.log('onSelect',selected, record, records) },
              onSelectAll: function(selected, records){ console.log('onSelectAll', selected, records) },
              selectedRowKeys: []
            },
            dataSource: getData(0, 5),
            rateState: '所有'
        }
    }
    onSelect(value){
        this.setState({
            rateState:value
        });
    }
    onChange(ids, records){
        let {rowSelection} = this.state;
        rowSelection.selectedRowKeys = ids;
        console.log('onChange', ids, records);
        this.setState({ rowSelection });
    }
    modifyDataSource(){
        this.setState({
          dataSource: getData(9, 14)
        })
    }
    render(){
        const {add, value, switchState ,changeSwitchState} = this.props;
        const TabPane = Tab.TabPane;
        const extraContent = <div className="radio-state"><div className='text-radio-state'>中差评电台提醒：</div><Switch className="radio-switch" checked={switchState} size="small" onChange={()=>{changeSwitchState(switchState)}} /></div>;
        return(
            <div>
                <div className='batchEva-title'>
                    <span className="inline-style">评价状态：</span>
                    <Select onChange={this.onSelect.bind(this)} value={this.state.rateState} className="rateState-select inline-style">
                        <Option value="all">所有</Option>
                        <Option value="rated">买家已评</Option>
                        <Option value="norate">买家未评</Option>
                    </Select>
                    <Button style={{marginLeft:'10px',marginRight:'20px'}} className="inline-style" type="primary" onClick={()=>{add(value)}}>批量评价</Button>
                    <span className="inline-style">共有<a className="orange-text a-href">2</a>个待评价订单</span>
                    <span className="inline-style-right" style={{marginRight:'5px'}}>当前页面有<a className="orange-text a-href">2</a>个不能评价的订单</span>
                </div>
                <div style={{marginTop:'10px',marginBottom:'10px'}}>
                    <Table dataSource={this.state.dataSource} onRowClick={onRowClick} rowSelection={this.state.rowSelection} hasBorder={false}>
                        <Table.Column title={<b>宝贝信息</b>} dataIndex="id" cell={renderOrder}/>
                        <Table.Column title={<b>订单号</b>} dataIndex="title.name" width={200}/>
                        <Table.Column title={<b>确认时间</b>} dataIndex="time" width={150}/>
                        <Table.Column title={<b>数量/实收款</b>} dataIndex="time" cell={renderNum} width={150}/>
                        <Table.Column title={<b>买家旺旺</b>} dataIndex="id" cell={renderWw} width={150}/>
                        <Table.Column title={<b>操作</b>} dataIndex="title.name" cell={renderOper} width={100}/>
                    </Table>
                </div>
                <Pagination pageSizeSelector={false} total={2} onChange={change}/>
            </div>
        );
    }
}

// function mapStateToProps(state, ownProps){
//     return {
//         value:state.BatchEva.value,
//         switchState:state.BatchEva.switchState
//     }
// }
//
// function mapDispatchToProps(dispatch,ownProps){
//     return  bindActionCreators( AddAction , dispatch )
// }

// export default connect(mapStateToProps, mapDispatchToProps)(BatchEva)
export default (BatchEva)
