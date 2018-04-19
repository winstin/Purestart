import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Button from 'qnui/lib/button';
import 'qnui/lib/grid/index.css';
import { Row, Col } from 'qnui/lib/grid';
import './../CfSetting/cf.css';
import Select, {Option} from 'qnui/lib/select';
import Checkbox from 'qnui/lib/checkbox';
import Radio,{ Group as RadioGroup } from 'qnui/lib/radio';
import Feedback from 'qnui/lib/feedback';
import Step, { Item as StepItem } from 'qnui/lib/step';
import Input from 'qnui/lib/input';
import Table from 'qnui/lib/table';
import Pagination from 'qnui/lib/pagination';
import Nextstep from './Nextstep'
import * as MessageActions from '../../../actions/Message'

const onRowClick = function(record, index, e){
    console.log(record, index, e);
  },
  getData = () =>{
    let result = [];
    for(let i = 0; i< 5; i++){
      result.push({
          title:{
            name: `Quotation for 1PCS Nano ${3+i}.0 controller compatible`,
            },
          id:100306660940+i,
          time: 2000 + i
        })
    }
    return result;
},
render= (value, index, record) => {
    return <a>Remove({record.id})</a>;
}
class Send extends Component {
	constructor(props) {
        super(props);
        this.state = {
			next:false
        };

    }
    next(){
    	this.setState({next:true})
    }
	render(){
		console.log(this.props.smsdata)
		if(!this.state.next){
			return (
	        	<div>
		           <Feedback title="" type='prompt'>
		       				<span className='set'>由于短信运营商规则调整，在23:00-次日08:00之间的短信将于08:00之后送达。</span>
		            </Feedback>
		            <div style={{marginTop:'10px'}}/>
		            <Step current={0} type="arrow">
				       	<StepItem title="1.筛选会员" />
				        <StepItem title="2.编辑内容并发送" />
				    </Step>
				    <div style={{marginTop:'15px'}}/>
					<Row>
					    <span style={{fontSize:'14px',marginTop:'7px',width:'120px'}}>交易金额&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</span>
					     <Row>
				            <Col fixedSpan="28"><Row>
						            <Col span="6"><Button type="primary" style={{width:'120px'}} >不限</Button></Col>
						            <Col span="6"><Button type="normal" style={{width:'120px'}} >{'<100元'}</Button></Col>
						            <Col span="6"><Button type="normal"  style={{width:'120px'}}>100-200元</Button></Col>
						            <Col span="6"><Button type="normal"  style={{width:'120px'}}>{'>200元'}</Button></Col>
						        </Row>
						    </Col>
				            <Col></Col>
				        </Row>
					</Row>
					<div style={{marginTop:'15px'}}/>
					<Row>
					    <span style={{fontSize:'14px',marginTop:'7px',width:'120px'}}>交易次数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</span>
					     <Row>
				            <Col fixedSpan="28"><Row>
						            <Col span="6"><Button type="primary" style={{width:'120px'}} >不限</Button></Col>
						            <Col span="6"><Button type="normal" style={{width:'120px'}} >1次</Button></Col>
						            <Col span="6"><Button type="normal"  style={{width:'120px'}}>2-3次</Button></Col>
						            <Col span="6"><Button type="normal"  style={{width:'120px'}}>3次以上</Button></Col>
						        </Row>
						    </Col>
				            <Col></Col>
				        </Row>
					</Row>
					<div style={{marginTop:'15px'}}/>
					<Row>
					    <span style={{fontSize:'14px',marginTop:'7px',width:'120px'}}>最近下单时间：</span>
					     <Row>
				            <Col fixedSpan="21"><Row>
						            <Col span="8"><Button type="primary" style={{width:'120px'}} >不限</Button></Col>
						            <Col span="8"><Button type="normal" style={{width:'120px'}} >30以内</Button></Col>
						            <Col span="8"><Button type="normal"  style={{width:'120px'}}>90天以内</Button></Col>
						        </Row>
						    </Col>
				            <Col></Col>
				        </Row>
					</Row>
					<div style={{marginTop:'15px'}}/>
					<Row>
					    <span style={{fontSize:'14px',marginTop:'7px',width:'120px'}}>黑名单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</span>
					     <Row>
				            <div style={{marginTop:'4px',marginLeft:'8px'}}>	
			           			<Checkbox id="first" /><label style={{marginLeft:'6px'}}>不给黑名单用户发送短信</label><span style={{height:'20px',color:'#4990E2',marginLeft:'12px',cursor:"pointer"}}>查看黑名单</span>
			           		</div>
				        </Row>
					</Row>
					<div style={{marginTop:'15px'}}/>
					<Row>
					    <span style={{fontSize:'14px',marginTop:'7px',width:'120px'}}>同时给我发送：</span>
					     <Row>
				            <div style={{marginTop:'4px',marginLeft:'8px'}}>	
			           			<Checkbox id="first" /><Input className="textClsName"  size="small" style={{marginLeft:'10px'}} value={this.props.smsdata.telphone}/><span style={{height:'20px',color:'#FD3D43',marginLeft:'12px'}}>此条免费</span>
			           		</div>
				        </Row>
					</Row>
					<div style={{marginTop:'15px'}}/>
					<Row>
					    <span style={{fontSize:'14px',marginTop:'7px',width:'50px'}}>目前共 </span>
					    <span style={{fontSize:'14px',marginTop:'7px',width:'20px',color:'#003B00'}}>18</span>
					    <span style={{fontSize:'14px',marginTop:'7px',width:'50px'}}>位会员</span>
					    <Row>
				            <Col fixedSpan="14"><Row>
						            <Col span="12"><Button type="primary" style={{width:'120px'}} >查询</Button></Col>
						            <Col span="12"><Button type="primary" style={{width:'120px'}}  onClick={this.next.bind(this)}>下一步</Button></Col>
						        </Row>
						    </Col>
				            <Col></Col>
				        </Row>
					</Row>
					<div style={{marginTop:'15px'}}/>
					<Table dataSource={getData()} onRowClick={onRowClick}>
					    <Table.Column title="买家昵称" dataIndex="id"/>
					    <Table.Column title="姓名" dataIndex="title.name" />
					    <Table.Column title="手机号" dataIndex="time"/>
					    <Table.Column title="购买次数" dataIndex="time"/>
					    <Table.Column title="最后交易金额" dataIndex="time"/>
					    <Table.Column title="最后下单时间" dataIndex="time"/>
					</Table>
					<div style={{marginTop:'15px'}}/>
					<Pagination defaultCurrent={2} style={{float:'right'}}/>
	            </div>
	        );
		}else{
			return(<Nextstep/>)
		}
	}
} 
      

function mapStateToProps(state, ownProps){
    return {
        smsdata:state.Message.smsdata,
    }
}
function mapDispatchToProps(dispatch,ownProps){
	return bindActionCreators(MessageActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Send)

