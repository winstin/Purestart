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
                title: {name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`},
                id: 100306660940 + i,
                time: 2000 + i
            });
        }
        return result;
    },
    render = (value, index, record) => {
        return <a>Remove({record.id})</a>;
    };


class GunsIndex extends Component {
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
                    <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>查询条件：</span>
                     <Row>
                        <Input placeholder="商户名称" className="textClsName"   style={{width:'120px'}}/>
                        <Input placeholder="商户编号" className="textClsName"  style={{width:'120px',marginLeft:'12px'}}/>
                        <Input placeholder="所属渠道" className="textClsName"  style={{width:'120px',marginLeft:'12px'}}/>
                        <Input placeholder="渠道编号" className="textClsName"  style={{width:'120px',marginLeft:'12px'}}/>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'70px',marginLeft:'12px'}}>时间选择：</span>
                        <RangePicker /><Button type="primary" style={{width:'100px',marginLeft:'10px'}} >搜索</Button>
                    </Row>
                </Row>
                <div style={{marginTop:'20px'}}>
                    <Table dataSource={this.state.dataSource} onRowClick={onRowClick} fixedHeader maxBodyHeight={750}>
                        <Table.Column title="商户编号" dataIndex="id"/>
                        <Table.Column title="商户名称" dataIndex="title.name"/>
                        <Table.Column title="所属渠道" dataIndex="time"/>
                        <Table.Column title="交易总笔数" dataIndex="time"/>
                        <Table.Column title="交易总金额" dataIndex="time"/>
                        <Table.Column title="交易手续费" dataIndex="time"/>
                        <Table.Column title="D0代付手续费" dataIndex="time"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(GunsIndex)
