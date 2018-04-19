import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'qnui/lib/grid';
import Button from 'qnui/lib/button';
import * as MessageActions from '../../../actions/Message'
import { Link } from 'react-router'
import Select, {Option} from 'qnui/lib/select';
import Table from 'qnui/lib/table';
import Dialog from 'qnui/lib/dialog';
import Input from 'qnui/lib/input';
import Tab from 'qnui/lib/tab';
import Feedback from 'qnui/lib/feedback';
import Czbutton from '../Czbutton'

const TabPane = Tab.TabPane;

function handleChange(key) {
    console.log(key);
}
class Messagetop extends Component {
	state = {
      	visible: false,
        visible8: false,
        visible9: false,
        falg:false,
        name:'',
        header:'',
        telphone:'',
        addr:'',
  	}
	onOpen = () => {
      this.setState({
          visible: true
      })
      this.props.smslog('all')
  	}
  	changedata = (value) => {
  		if(value == '1'){
  			this.props.smslog('smspay')
  		}else if(value == '1'){
  			this.props.smslog('smssend')
  		}else if(value == '2'){
  			this.props.smslog('smsgood')
  		}else if(value == '3'){
  			this.props.smslog('smsbad')
  		}else if(value == '4'){
  			this.props.smslog('smswl')
  		}else if(value == '5'){
  			this.props.smslog('smstrade')
  		}else if(value == '6'){
  			this.props.smslog('smsdefen')
  		}else if(value == '7'){
  			this.props.smslog('smsbatch')
  		}else if(value == '0'){
  			this.props.smslog('all')
  		}
      	
  	}
  	onClose = () => {
      this.setState({
          visible: false
       })
  	}
  	onClose8 = () => {
      this.setState({
          visible8: false
       })
  	}
  	onClose9 = () => {
      this.setState({
          visible9: false
       })
  	}
  	kfp = () => {
		this.setState({
			visible8: true
		})
		
  	}
  	zdsend = () => {
      this.setState({
          visible9: true
       })
  	}
  	componentWillMount(){
  		this.props.initfp()
  		console.log('=======加载数据============')
  		console.log(this.props.fp)
  		if(this.props.fp != undefined && this.props.fp != ''){
  			console.log('============')
  			this.setState({
	  			header:this.props.fp.invoice.header,
	  			name:this.props.fp.invoice.name,
	  			telphone:this.props.fp.invoice.telphone,
	  			addr:this.props.fp.invoice.addr,
	  		})
  		}else{
  			return
  		}
  	}
    render(){
    	const {smsnum,smslog,slogdata,Vipnum,fp} = this.props;
    	const sta = (value, index, record) => {
    		if(value=='0'){
    			return <a style={{color:'red'}}>提交失败</a>;
    		}else{
    			return <a style={{color:'green'}}>发送成功</a>;
    		}
           
        }
        const Mestype =  (value, index, record) => {
        		if(value == 'smspay'){
		  			return <a >催付提醒</a>;
		  		}else if(value == 'smssecond'){
					return <a >二次催付提醒</a>;		  		
				}else if(value == 'smssend'){
					return <a >发货提醒</a>;		  		
				}else if(value == 'smsgood'){
					return <a >好评奖励</a>;		  		
				}else if(value == 'smsbad'){
					return <a >中差评提醒</a>;		  		
				}else if(value == 'smswl'){
					return <a >收货提醒</a>;		  		
				}else if(value == 'smstrade'){
					return <a >手动发送</a>;		  		
				}else if(value == 'smsdefen'){
					return <a >差评拦截</a>;		  		
				}else if(value == 'smsbatch'){
					return <a >群发短信</a>;		  		
				}
        }
        return (<Row >
	            <Col span="6"><div className="top">
	            	<div stlye={{width:'100%',textAlign:'center'}}>
	        		 	<Row className="demo-row" justify="center">
	        			<Col span="7" style={{paddingLeft:'65px'}} >
	        				<img src="http://q.aiyongbao.com/gx1688/image/wwzx.png" style={{marginTop:'35px'}} />
	        			</Col>
	        			<Col fixedSpan="10">
	        			<div stlye={{paddingTop:'40px',width:'100%'}}>
	        				<div stlye={{textAlign:"center",alignItems:'center',justifyContent: 'center'}}>
	        					<span className="demo-col-inset1">活动预告</span>
	        					<span className="demo-col-inset1">上新通知</span>
	        				</div>
	        				<div stlye={{textAlign:"center"}}>
	        					<span  className="demo-col-inset1">节日营销</span>
	        					<span  className="demo-col-inset1">店庆促销</span>
	        				</div>
	        				<div style={{textAlign:"center"}}>
					       		 <Link  className="inset" to="/dist/Message/send">立即群发</Link>
		            		</div>
	        			</div>
	        			</Col>
	        			<Col span="7">
	        			</Col>
	        			</Row>
		            </div>
	            </div></Col>
	            <Col span="6"><div className="top">
	            	<div stlye={{width:'100%',textAlign:'center'}}>
	        		 	<Row className="demo-row" justify="center">
	        			<Col span="7" style={{paddingLeft:'65px'}} >
	        				<img src="http://q.aiyongbao.com/gx1688/image/wwzx.png" style={{marginTop:'35px'}} />
	        			</Col>
	        			<Col fixedSpan="10">
	        			<div stlye={{paddingTop:'40px',width:'100%'}}>
	        				<div stlye={{textAlign:"center",alignItems:'center',justifyContent: 'center'}}>
	        					<span className="demo-col-inset1">线下会员</span>
	        					<span className="demo-col-inset1">淘外订单</span>
	        				</div>
	        				<div stlye={{textAlign:"center"}}>
	        					<span  className="demo-col-inset1">有手机号均可</span>
	        					<span  className="demo-col-inset1"></span>
	        				</div>
	        				<div style={{textAlign:"center"}}>
		            			<Button  type="primary" style={{width:'150px'}} onClick={this.zdsend}>指定号码发送</Button>
		            			<Dialog visible = {this.state.visible9}  style={{width:'600px'}}
				                    onOk = {this.onClose9}
				                    onCancel = {this.onClose9}
				                    onClose = {this.onClose9} title = "指定号码发送">
				                  	<Row>
					           			<div className='set' style={{paddingTop:'20px'}}>指定手机号码：</div>
								        <div>
								        	<Input className="textClsName" multiple style={{width:'450px',marginTop:'10px'}}/>
								        	<div style={{color:'red'}}>*若指定发送多个号码，请用逗号"，"隔开。</div>
								        </div>
							        </Row>
							        <Feedback title="" type='prompt'>
						       			<div className='set'>短信里不要输入【 】 # ￥ $ & * ~ { } \\ + ^ 等特殊符号</div>
						            </Feedback>
							        <Row>
					           			<div className='set' style={{paddingTop:'20px'}}>短信内容&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</div>
								        <Input className="textClsName" multiple style={{width:'450px',marginTop:'10px'}}/>
							        </Row>
				            	</Dialog>
		            		</div>
	        			</div>
	        			</Col>
	        			<Col span="7">
	        			</Col>
	        			</Row>
		            </div>
	            </div></Col>
	            <Col span="6"><div className="top">
	               	<div stlye={{width:'100%',textAlign:'center'}}>
	        		 	<Row className="demo-row" justify="center">
	        			<Col span="7" style={{paddingLeft:'65px'}} >
	        				<img src="http://q.aiyongbao.com/gx1688/image/wwzx.png" style={{marginTop:'35px'}} />
	        			</Col>
	        			<Col fixedSpan="10">
	        			<div stlye={{paddingTop:'40px',width:'100%'}}>
	        				<div stlye={{textAlign:"center",alignItems:'center',justifyContent: 'center'}}>
	        					<span className="demo-col-inset1">店铺会员：</span>
	        					<span className="num">{Vipnum.totalsnum}</span>
	        					<span className="inset">个</span>
	        				</div>
	        				<div stlye={{textAlign:"center"}}>
	        					<span  className="demo-col-inset1">线下会员：</span>
	        					<span className="num">{Vipnum.loveappnum}</span>
	        					<span  className="inset">个</span>
	        				</div>
	        				<div style={{textAlign:"center"}}>
	        					<Link  className="inset" to='dist/Message/manvip'>管理会员</Link>
		            		</div>
	        			</div>
	        			</Col>
	        			<Col span="7">
	        			</Col>
	        			</Row>
		            </div>
	            </div></Col>
	            <Col span="6"><div className="top">
	               	<div stlye={{width:'100%',textAlign:'center'}}>
	        		 	<Row className="demo-row" justify="center">
	        			<Col span="7" style={{paddingLeft:'65px'}} >
	        				<img src="http://q.aiyongbao.com/gx1688/image/wwzx.png" style={{marginTop:'35px'}} />
	        			</Col>
	        			<Col fixedSpan="10">
	        			<div stlye={{paddingTop:'40px',width:'100%'}}>
	        				<div stlye={{textAlign:"center",alignItems:'center',justifyContent: 'center'}}>
	        					<span className="demo-col-inset1">剩余条数：</span>
	        					<span className="num">{smsnum}</span>
	            				<span  className="inset">条</span>
	        				</div>
	        				<div stlye={{textAlign:"center"}}>
	        					<span  style={{height:'20px',color:'#4990E2',marginLeft:'16px',cursor:"pointer"}} onClick={this.onOpen}>发送记录</span>
	            				<span  style={{height:'20px',color:'#4990E2',marginLeft:'26px',cursor:"pointer"}} onClick={this.kfp}>开发票</span>
	            				<Dialog visible = {this.state.visible}  style={{width:'1000px'}} minMargin = {50} shouldUpdatePosition
				                    onOk = {this.onClose}
				                    onCancel = {this.onClose}
				                    onClose = {this.onClose} title = "短信发送记录">
				                    <span >共累计提交短信</span>
		        					<span className="num">{slogdata.assessTotal}</span>
		            				<span  >条记录</span><br/>
		            				<Select placeholder="全部" style={{marginTop:'14px'}} onChange={this.changedata}>
		            					<Option value="0">全部</Option>
						                <Option value="1">订单催付</Option>
						                <Option value="2">发货提醒</Option>
						                <Option value="3">好评奖励</Option>
						                <Option value="4">中差评提醒</Option>
						                <Option value="5">收货提醒</Option>
						                <Option value="6">手动发送</Option>
						                <Option value="7">差评拦截</Option>
						                <Option value="8">群发短信</Option>
						            </Select>
				                    <Table dataSource={slogdata.smslog} >
									    <Table.Column title="购买时间" dataIndex="smstime"/>
									    <Table.Column title="订单编号" dataIndex="tid" />
									    <Table.Column title="发送号码" dataIndex="sendphone" width="13%"/>
									    <Table.Column title="短信内容" dataIndex="smstext" width="30%"/>
									    <Table.Column title="状态" dataIndex="status" cell={sta}/>
									    <Table.Column title="计费条数" dataIndex="smsnum"  width="10%"/>
									    <Table.Column title="短信类型" dataIndex="smstype" cell={Mestype} width="13%"/>
									</Table>
				            	</Dialog>
				            	<Dialog visible = {this.state.visible8}  style={{width:'600px'}}
				                    onOk = {this.onClose8}
				                    onCancel = {this.onClose8}
				                    onClose = {this.onClose8} title = "开发票">
				                     <Tab defaultActiveKey="1" onChange={handleChange}>
								        <TabPane tab="普通发票" key="1">
								        	<Row>
							           			<div className='set' style={{paddingTop:'20px'}}>发票抬头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</div>
										        <Input className="textClsName" style={{width:'250px',marginTop:'10px'}} value={this.state.header}/>
							           		</Row>
							           		<Row>
							           			<div className='set' style={{paddingTop:'20px'}}>开票内容&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</div>
										        <div className='set' style={{paddingTop:'20px'}}>软件服务费</div>
							           		</Row>
							           		<Row>
							           			<div className='set' style={{paddingTop:'20px'}}>可开票金额(元)：</div>
										       	<div className='set' style={{paddingTop:'20px'}}>暂无可开票金额(暂不支持低于200元的申请)</div>
							           		</Row>
							           		<Row>
							           			<div className='set' style={{paddingTop:'20px'}}>联系人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</div>
										        <Input className="textClsName" style={{width:'150px',marginTop:'10px'}} value={this.state.name} />
							           		</Row>
							           		<Row>
							           			<div className='set' style={{paddingTop:'20px'}}>联系电话&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</div>
										        <Input className="textClsName" style={{width:'250px',marginTop:'10px'}} value={this.state.telphone}/>
							           		</Row>
							           		<Row>
							           			<div className='set' style={{paddingTop:'20px'}}>开票寄送地址：</div>
										        <Input className="textClsName" style={{width:'250px',marginTop:'10px'}} value={this.state.addr}/>
							           		</Row>
							           		<Row style={{marginTop:'15px'}}>
							           			<span className='set' >温馨提示：</span>
							           			<div>
								           			<div>1.获取发票需要承担顺丰到付费用！</div>
								           			<div>2.今年累计的缴费金额开票期截止到今年年底，请知悉！</div>
							           			</div>
							           		</Row>
								        </TabPane>
								        <TabPane tab="增值税发票" key="2">
								        	<Row>
							           			<div className='set' style={{paddingTop:'20px'}}>发票抬头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</div>
										        <Input className="textClsName" style={{width:'250px',marginTop:'10px'}}/>
							           		</Row>
							           		<Row>
							           			<div className='set' style={{paddingTop:'20px'}}>开户银行&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</div>
										        <Input className="textClsName" style={{width:'250px',marginTop:'10px'}}/>
							           		</Row>
							           		<Row>
							           			<div className='set' style={{paddingTop:'20px'}}>纳税人识别号：</div>
										        <Input className="textClsName" style={{width:'250px',marginTop:'10px'}}/>
							           		</Row>
							           		<Row>
							           			<div className='set' style={{paddingTop:'20px'}}>银行账号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</div>
										        <Input className="textClsName" style={{width:'150px',marginTop:'10px'}}/>
							           		</Row>
							           		<Row>
							           			<div className='set' style={{paddingTop:'20px'}}>注册地址&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</div>
										        <Input className="textClsName" style={{width:'250px',marginTop:'10px'}}/>
							           		</Row>
							           		<Row>
							           			<div className='set' style={{paddingTop:'20px'}}>开票内容&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</div>
										        <div className='set' style={{paddingTop:'20px'}}>软件服务费</div>
							           		</Row>
							           		<Row>
							           			<div className='set' style={{paddingTop:'20px'}}>可开票金额(元)：</div>
										       	<div className='set' style={{paddingTop:'20px'}}>暂无可开票金额(暂不支持低于200元的申请)</div>
										       	<Button  type="primary" style={{width:'150px',marginTop:'10px',marginLeft:'10px'}} >刷新加载</Button>
							           		</Row>
							           		<Row>
							           			<div className='set' style={{paddingTop:'20px'}}>联系人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</div>
										        <Input className="textClsName" style={{width:'250px',marginTop:'10px'}}/>
							           		</Row>
								        </TabPane>
								        
								    </Tab>
				            	</Dialog>
	            				<span  className="inset"></span>
	        				</div>
	        				<div style={{textAlign:"center"}}>
	        					<Czbutton content="充值"/>
		            		</div>
	        			</div>
	        			</Col>
	        			<Col span="7">
	        			</Col>
	        			</Row>
		            </div>
	            </div></Col>
			 </Row>  
        );
    }
}


function mapStateToProps(state, ownProps){
    return {
       	slogdata:state.Message.slogdata,
       	Vipnum:state.Message.Vipnum,
       	smsnum:state.Message.smsnum,
       	fp:state.Message.fp,
    }
}
function mapDispatchToProps(dispatch,ownProps){
	return bindActionCreators(MessageActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Messagetop)

