import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from 'qnui/lib/checkbox';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Search from 'qnui/lib/search';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import * as ServiceRate from '../../actions/ServiceRate'
// import {getInitData} from '../../actions/ServiceRate';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Pagination from 'qnui/lib/pagination';


const onRowClick = function(record, index, e) {
        console.log(record, index, e);
    },
    getData = (length) => {
        let result = [];
        for (let i = 0; i < length; i++) {
            result.push({
                title: {name: `2000`},
                id: 100306660940 + i,
                time: 2000 + i
            });
        }
        return result;
    },
    render = (value, index, record) => {
        return <a>Remove({record.id})</a>;
    };


class BatchPage extends Component {
  constructor(props) {
        super(props);

        this.state = {
            dataSource: getData(30)
        };

    }

  onSearch(value) {
      console.log(value);
  }

  loadTradeList(){
    let self = this;
    let list = [];
    //gettbtime();

    const {getTradeList} = this.props;
    getTradeList();

  }
  componentWillMount() {
      console.log('Component WILL MOUNT!');
  }

  componentDidMount(){
    console.log("首次渲染页面")
    console.log(this.props)
    const {getInitData} = (this.props);
    getInitData();
  }

  render() {
        return (
            <div>
                <Row>
                    <div style={{width:'25%'}}>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>总商户数:</span>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>0</span>
                    </div>
                    <div style={{width:'25%'}}>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>总订单数:</span>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>0</span>
                    </div>
                    <div style={{width:'25%'}}>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>总金额:</span>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>0</span>
                    </div>
                    <div style={{width:'25%'}}>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>总分润:</span>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>0</span>
                    </div>
                </Row>
                <Row style={{marginTop:'20px'}}>
                    <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>查询条件：</span>
                     <Row>
                        <Input placeholder="订单号" className="textClsName"   style={{width:'120px'}}/>
                        <Input placeholder="渠道订单号" className="textClsName"  style={{width:'120px',marginLeft:'12px'}}/>
                        <Input placeholder="渠道名称" className="textClsName"  style={{width:'120px',marginLeft:'12px'}}/>
                        <Input placeholder="渠道编号" className="textClsName"  style={{width:'120px',marginLeft:'12px'}}/>
                        <Input placeholder="商户名称" className="textClsName"  style={{width:'120px',marginLeft:'12px'}}/>
                        <Input placeholder="商户号" className="textClsName"  style={{width:'120px',marginLeft:'12px'}}/>
                        <Input placeholder="订单状态" className="textClsName"  style={{width:'120px',marginLeft:'12px'}}/>
                        <Input placeholder="交易结果" className="textClsName"  style={{width:'120px',marginLeft:'12px'}}/>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'70px',marginLeft:'12px'}}>时间选择：</span>
                        <RangePicker />
                        <Button type="primary" style={{width:'80px',marginLeft:'10px'}} >搜索</Button>
                        <Button type="normal" style={{width:'80px',marginLeft:'10px'}} >导出</Button>
                    </Row>
                </Row>
                <div style={{marginTop:'20px'}}>
                    <Table dataSource={this.state.dataSource} onRowClick={onRowClick} fixedHeader maxBodyHeight={750}>
                        <Table.Column title="订单号" dataIndex="id"/>
                        <Table.Column title="渠道订单号" dataIndex="title.name"/>
                        <Table.Column title="交易时间" dataIndex="time"/>
                        <Table.Column title="商户号" dataIndex="time"/>
                        <Table.Column title="商户名称" dataIndex="time"/>
                        <Table.Column title="所属渠道" dataIndex="time"/>
                        <Table.Column title="渠道编号" dataIndex="time"/>
                        <Table.Column title="交易金额" dataIndex="time"/>
                        <Table.Column title="费率（‰）" dataIndex="time"/>
                        <Table.Column title="代付费" dataIndex="time"/>
                        <Table.Column title="交易手续费" dataIndex="time"/>
                        <Table.Column title="交易状态" dataIndex="time"/>
                        <Table.Column title="银行名称" dataIndex="time"/>
                        <Table.Column title="交易结果" dataIndex="time"/>
                        <Table.Column title="上游渠道" dataIndex="time"/>
                        <Table.Column title="交易卡号" dataIndex="time"/>
                        <Table.Column title="交易类型" dataIndex="time"/>
                        <Table.Column title="结算卡号" dataIndex="time"/>
                    </Table>
                </div>
                <div style={{marginTop:'20px',float:'right'}}>
                    <Pagination defaultCurrent={2} size="large" />
                </div>
            </div>
        );
    }
    reduceContent() {
        this.setState({
            dataSource: getData(10)
        });
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

export default connect(mapStateToProps, mapDispatchToProps)(BatchPage)
