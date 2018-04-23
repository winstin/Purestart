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
const rowSelection = {
        onChange: onRowClick,
        getProps: (record) => {
            return {
                disabled: record.id === 23324
            };
        }
    };


class ServiceManger extends Component {
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
                <Row style={{marginTop:'20px'}}>
                    <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>查询条件：</span>
                     <Row>
                        <Input placeholder="渠道名称" className="textClsName"  style={{width:'120px',marginLeft:'0px'}}/>
                        <Input placeholder="渠道编号" className="textClsName"  style={{width:'120px',marginLeft:'12px'}}/>
                        <Button type="primary" style={{width:'100px',marginLeft:'10px'}} >搜索</Button>
                    </Row>
                </Row>
                <div style={{marginTop:'20px'}}>
                    <Button type="primary" style={{width:'100px',marginLeft:'10px'}} >添加</Button>
                    <Button type="normal" style={{width:'100px',marginLeft:'10px'}} >修改</Button>
                    <Button type="secondary" style={{width:'120px',marginLeft:'10px'}} >冻结/启用</Button>
                </div>
                <div style={{marginTop:'20px'}}>
                    <Table dataSource={this.state.dataSource} onRowClick={onRowClick} fixedHeader maxBodyHeight={720} rowSelection={rowSelection}>
                        <Table.Column title="商户号" dataIndex="time"/>
                        <Table.Column title="商户名称" dataIndex="time"/>
                        <Table.Column title="结算卡号" dataIndex="time"/>
                        <Table.Column title="渠道名称" dataIndex="time"/>
                        <Table.Column title="渠道编号" dataIndex="time"/>
                        <Table.Column title="建档时间" dataIndex="time"/>
                        <Table.Column title="商户类型" dataIndex="time"/>
                        <Table.Column title="电话" dataIndex="time"/>
                        <Table.Column title="费率（‰）" dataIndex="time"/>
                        <Table.Column title="代付费" dataIndex="time"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ServiceManger)
