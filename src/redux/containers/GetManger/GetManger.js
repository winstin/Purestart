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
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Dimensions from 'react-dimensions';


// import MySettings from './MySettings/MySettings';
// import MyBlackList from './MyBlackList/MyBlackList';
// import MyEvaLog from './MyEvaLog/MyEvaLog';


import './GetManger.css'

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

class GetManger extends Component {
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
        const {add, value, switchState ,changeSwitchState,containerHeight} = this.props;
        const TabPane = Tab.TabPane;
        const extraContent = <div className="radio-state"><div className='text-radio-state'>中差评电台提醒：</div><Switch className="radio-switch" checked={switchState} size="small" onChange={()=>{changeSwitchState(switchState)}} /></div>;
        return(
            <div>
                <Row>
                    <span style={{fontSize:'14px',marginTop:'7px',width:'70px',marginLeft:'12px'}}>时间选择：</span>
                    <RangePicker /><Button type="primary" style={{width:'100px',marginLeft:'10px'}} >搜索</Button>
                </Row>
                <div style={{marginTop:'10px',marginBottom:'10px'}}>
                    <Table dataSource={this.state.dataSource} onRowClick={onRowClick} rowSelection={this.state.rowSelection} hasBorder={false} fixedHeader maxBodyHeight={containerHeight}>
                        <Table.Column title={<b>交易日期</b>} dataIndex="id" cell={renderOrder}/>
                        <Table.Column title={<b>交易金额</b>} dataIndex="title.name" width={200}/>
                        <Table.Column title={<b>交易笔数</b>} dataIndex="time" width={150}/>
                        <Table.Column title={<b>交易手续费分成</b>} dataIndex="time" cell={renderNum} width={150}/>
                        <Table.Column title={<b>D0手续费</b>} dataIndex="id" cell={renderWw} width={150}/>
                        <Table.Column title={<b>应结分润</b>} dataIndex="title.name" cell={renderOper} width={100}/>
                        <Table.Column title={<b>收益</b>} dataIndex="title.name" cell={renderOper} width={100}/>
                    </Table>
                </div>
                <div style={{marginTop:'20px',float:'right'}}>
                    <Pagination pageSizeSelector={false} total={2} onChange={change}/>
                </div>
                
            </div>
        );
    }
}



function mapStateToProps(state, ownProps){
    return {
        data:state.ServiceRate.isupdate
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( ServiceRate , dispatch )
}

export default Dimensions({
  getHeight: function() { //element
    return window.innerHeight - 270;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(GetManger)

