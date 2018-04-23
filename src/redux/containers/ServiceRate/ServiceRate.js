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


class ServiceRates extends Component {
  constructor(props) {
        super(props);
        this.id = "";
        this.name = "";
    }


    componentDidMount(){
        const {getInitData} = this.props;
        getInitData();
    }

    handleChange(current) {
        console.log(this.props);
        const {getData} = this.props;
        getData(current);
    }


    searchData(){
        const{SearchData} = this.props;
        SearchData(this.id,this.name);
    }

    onchange(type,value){
        // alert(type+'==='+value);
        if(type == "id"){
            this.id = value;
        }else{
            this.name = value;
        }

    }
    render() {
        const {dataSource,isLoad,total} = this.props;
        
       
        if(!isLoad){
            console.log('服务商')
            console.log(dataSource);
            return (
                <div>
                    <Row>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>渠道编号：</span>
                         <Row>
                            <Input placeholder="渠道编号" className="textClsName"   style={{width:'120px'}} onChange={this.onchange.bind(this,'id')}/>
                            <span style={{fontSize:'14px',marginTop:'7px',width:'70px',marginLeft:'12px'}}>渠道名称：</span>
                            <Input placeholder="渠道名称" className="textClsName"   style={{width:'120px',marginLeft:'6px'}} onChange={this.onchange.bind(this,'name')}/>
                            <Button type="primary" style={{width:'100px',marginLeft:'10px'}} onClick={this.searchData.bind(this)}>搜索</Button>
                            <Button type="normal" style={{width:'100px',marginLeft:'10px'}} >添加</Button>
                        </Row>
                    </Row>
                    <div style={{marginTop:'20px'}}>
                        <Table dataSource={dataSource} onRowClick={onRowClick} fixedHeader maxBodyHeight={750}>
                            <Table.Column title="编号" dataIndex="id"/>
                            <Table.Column title="创建时间" dataIndex="createTime"/>
                            <Table.Column title="服务商编号" dataIndex="appid"/>
                            <Table.Column title="服务商名称" dataIndex="agentName"/>
                            <Table.Column title="业务类型" dataIndex="time"/>
                            <Table.Column title="上游渠道" dataIndex="time"/>
                            <Table.Column title="交易类型" dataIndex="time"/>
                            <Table.Column title="结算类型" dataIndex="time"/>
                            <Table.Column title="鉴权费" dataIndex="d0fee"/>
                            <Table.Column title="结算费率" dataIndex="fee0"/>
                            <Table.Column title="代付费" dataIndex="time"/>
                        </Table>
                    </div>
                    <div style={{marginTop:'20px',float:'right'}}>
                        <Pagination defaultCurrent={1} size="large" onChange={this.handleChange.bind(this)} pageSize={15} total={total}/>
                    </div>
                </div>
            );
        }else{
            return <div style={{marginTop:'20px',float:'right'}}>111</div>
        }
    }
}

function mapStateToProps(state, ownProps){
    return {
        dataSource:state.ServiceRate.dataSource,
        isLoad:state.ServiceRate.isLoad,
        total:state.ServiceRate.total,
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( ServiceRate , dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRates)
