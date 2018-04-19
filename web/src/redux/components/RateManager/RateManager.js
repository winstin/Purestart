import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Table from 'qnui/lib/table';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Feedback from 'qnui/lib/feedback';
import Switch from 'qnui/lib/switch';
import { Row, Col } from 'qnui/lib/grid';
import Pagination from 'qnui/lib/pagination';

import "./RateManager.css"
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
const change = function(value) {
    console.log(value);
};
// import MySettings from './MySettings/MySettings';
// import MyBlackList from './MyBlackList/MyBlackList';
// import MyEvaLog from './MyEvaLog/MyEvaLog';

import * as AddAction from '../../actions/AutoEva'
class RateManager extends Component {
    constructor(props){
        super(props);
        this.state = {
          rowSelection: {
            onChange: this.onChange.bind(this),
            onSelect: function(selected, record, records){ console.log('onSelect',selected, record, records) },
            onSelectAll: function(selected, records){ console.log('onSelectAll', selected, records) },
            selectedRowKeys: []
          },
          dataSource: getData(0, 5)
        }
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
    render(){
        const {add, value, switchState ,changeSwitchState} = this.props;
        const TabPane = Tab.TabPane;
        const extraContent = <div className="radio-state"><div className='text-radio-state'>中差评电台提醒：</div><Switch className="radio-switch" checked={switchState} size="small" onChange={()=>{changeSwitchState(switchState)}} /></div>;
        return(
            <div>
                <div>
                    <b style={{fontSize:'16px'}}>店铺动态评分：</b>
                </div>
                <Row style={{backgroundColor:'#EBEBEB',color:'#000000',marginTop:'10px'}} type="across" className="demo-row">
                    <Col span="8"><div className="demo-col-inset col-line-height">&nbsp;&nbsp;宝贝与描述相符</div></Col>
                    <Col span="8"><div className="demo-col-inset col-line-height">&nbsp;&nbsp;卖家的服务态度</div></Col>
                    <Col span="8"><div className="demo-col-inset col-line-height">&nbsp;&nbsp;物流的服务质量</div></Col>
                </Row>
                <Row type="across" className="demo-row bottom-border">
                    <Col span="8"><div className="demo-col-inset" style={{display:'inline-flex',flexDirection:'row',alignItems:'center'}}><img src="//cdn.zzgdapp.com//trade/web/images/qap_img/pc/level_start_light.png" width="24" align="middle" height="24"/><img src="//cdn.zzgdapp.com//trade/web/images/qap_img/pc/level_start_light.png" width="24" align="middle" height="24"/><img src="//cdn.zzgdapp.com//trade/web/images/qap_img/pc/level_start_light.png" width="24" align="middle" height="24"/><img src="//cdn.zzgdapp.com//trade/web/images/qap_img/pc/level_start_light.png" width="24" align="middle" height="24"/><img src="//cdn.zzgdapp.com//trade/web/images/qap_img/pc/level_start_light.png" width="24" align="middle" height="24"/>&nbsp;&nbsp;&nbsp;<b>3.0分</b></div></Col>
                    <Col span="8"><div className="demo-col-inset" style={{display:'inline-flex',flexDirection:'row',alignItems:'center'}}><img src="//cdn.zzgdapp.com//trade/web/images/qap_img/pc/level_start_light.png" width="24" align="middle" height="24"/><img src="//cdn.zzgdapp.com//trade/web/images/qap_img/pc/level_start_light.png" width="24" align="middle" height="24"/><img src="//cdn.zzgdapp.com//trade/web/images/qap_img/pc/level_start_light.png" width="24" align="middle" height="24"/><img src="//cdn.zzgdapp.com//trade/web/images/qap_img/pc/level_start_light.png" width="24" align="middle" height="24"/><img src="//cdn.zzgdapp.com//trade/web/images/qap_img/pc/level_start_light.png" width="24" align="middle" height="24"/>&nbsp;&nbsp;&nbsp;<b>3.0分</b></div></Col>
                    <Col span="8"><div className="demo-col-inset" style={{display:'inline-flex',flexDirection:'row',alignItems:'center'}}><img src="//cdn.zzgdapp.com//trade/web/images/qap_img/pc/level_start_light.png" width="24" align="middle" height="24"/><img src="//cdn.zzgdapp.com//trade/web/images/qap_img/pc/level_start_light.png" width="24" align="middle" height="24"/><img src="//cdn.zzgdapp.com//trade/web/images/qap_img/pc/level_start_light.png" width="24" align="middle" height="24"/><img src="//cdn.zzgdapp.com//trade/web/images/qap_img/pc/level_start_light.png" width="24" align="middle" height="24"/><img src="//cdn.zzgdapp.com//trade/web/images/qap_img/pc/level_start_light.png" width="24" align="middle" height="24"/>&nbsp;&nbsp;&nbsp;<b>3.0分</b></div></Col>
                </Row>
                <div className="sub-title-div" style={{display:'inline-flex',flexDirection:'row',alignItems:'center',marginTop:'10px'}}>
                    <b>卖家信用：</b>
                    <img src="//cdn.zzgdapp.com//trade/web/images/qap_img/pc/level_love.png" width="24" align="middle" height="24"/>&nbsp;&nbsp;&nbsp;<b>203</b>&nbsp;&nbsp;&nbsp;<b style={{color:'#4990E2'}}>(距离下个等级还需要48分）</b>
                </div>
                <div style={{marginTop:'10px'}}>
                    <b style={{fontSize:'16px'}}>好评率&nbsp;&nbsp;&nbsp;&nbsp;：97.24%</b>
                </div>
                <div style={{marginTop:'10px'}}>
                    <Tab type="bar" size="small">
                        <TabPane tab="收到的好评" key="1">
                            <Table dataSource={this.state.dataSource} onRowClick={onRowClick} hasBorder={false}>
                                <Table.Column title="评价结果" dataIndex="id"/>
                                <Table.Column title="评价内容" dataIndex="title.name" />
                                <Table.Column title="评价时间" dataIndex="time"/>
                                <Table.Column title="订单编号" dataIndex="time"/>
                                <Table.Column title="价格" dataIndex="id"/>
                                <Table.Column title="宝贝名称" dataIndex="title.name" />
                                <Table.Column title="买家旺旺" dataIndex="time"/>
                                <Table.Column title="操作" dataIndex="time"/>
                            </Table>
                        </TabPane>
                        <TabPane tab="收到的中评" key="2">
                            <Table dataSource={this.state.dataSource} onRowClick={onRowClick} hasBorder={false}>
                                <Table.Column title="评价结果" dataIndex="id"/>
                                <Table.Column title="评价内容" dataIndex="title.name" />
                                <Table.Column title="评价时间" dataIndex="time"/>
                                <Table.Column title="订单编号" dataIndex="time"/>
                                <Table.Column title="价格" dataIndex="id"/>
                                <Table.Column title="宝贝名称" dataIndex="title.name" />
                                <Table.Column title="买家旺旺" dataIndex="time"/>
                                <Table.Column title="操作" dataIndex="time"/>
                            </Table>
                        </TabPane>
                        <TabPane tab="收到的差评" key="3">
                            <Table dataSource={this.state.dataSource} onRowClick={onRowClick} hasBorder={false}>
                                <Table.Column title="评价结果" dataIndex="id"/>
                                <Table.Column title="评价内容" dataIndex="title.name" />
                                <Table.Column title="评价时间" dataIndex="time"/>
                                <Table.Column title="订单编号" dataIndex="time"/>
                                <Table.Column title="价格" dataIndex="id"/>
                                <Table.Column title="宝贝名称" dataIndex="title.name" />
                                <Table.Column title="买家旺旺" dataIndex="time"/>
                                <Table.Column title="操作" dataIndex="time"/>
                            </Table>
                        </TabPane>
                        <TabPane tab="给他人的评价" key="4">
                            <Table dataSource={this.state.dataSource} onRowClick={onRowClick} hasBorder={false}>
                                <Table.Column title="评价结果" dataIndex="id"/>
                                <Table.Column title="评价内容" dataIndex="title.name" />
                                <Table.Column title="评价时间" dataIndex="time"/>
                                <Table.Column title="订单编号" dataIndex="time"/>
                                <Table.Column title="价格" dataIndex="id"/>
                                <Table.Column title="宝贝名称" dataIndex="title.name" />
                                <Table.Column title="买家旺旺" dataIndex="time"/>
                                <Table.Column title="操作" dataIndex="time"/>
                            </Table>
                        </TabPane>
                    </Tab>
                    <Pagination pageSizeSelector={false} total={2} onChange={change}/>
                </div>
            </div>
        );
    }
}

// function mapStateToProps(state, ownProps){
//     return {
//         value:state.RateManager.value,
//         switchState:state.RateManager.switchState
//     }
// }
//
// function mapDispatchToProps(dispatch,ownProps){
//     return  bindActionCreators( AddAction , dispatch )
// }

// export default connect(mapStateToProps, mapDispatchToProps)(RateManager)
export default (RateManager)
