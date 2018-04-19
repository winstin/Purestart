import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Button from 'qnui/lib/button';
import 'qnui/lib/grid/index.css';
import { Row, Col } from 'qnui/lib/grid';
import Switch from 'qnui/lib/switch';
import Message from './Mestop'
import Czbutton from './Czbutton'
import { Link } from 'react-router'
import Overlay from 'qnui/lib/overlay';
import Cfsetting from './Cfsetting';
import * as MessageActions from '../../actions/Message'
import Dialog from 'qnui/lib/dialog';
import Input from 'qnui/lib/input';
import Table from 'qnui/lib/table';
import Tab from 'qnui/lib/tab';
import 'qnui/lib/grid/index.css';
import {api,ajax} from "./../../actions/AY_API"

const TabPane = Tab.TabPane;

function handleChange(key) {
    console.log(key);
}
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
const ReactHighcharts = require('react-highcharts');
class Messagecon extends Component {
	constructor(props, context){
        super(props, context);
        this.state = {
            visible1: false,
            visible2: false,
            visible3: false,
            visible4: false,
            visible5: false,
            visible6: false,
			visible7: false,//修改簽名
            tip1:'',
            tip2:'',
            tip3:'',
            tip4:'',
            tip5:'',
            tip6:'',
            cf:false,
            ec:false,
            fh:false,
            sh:false,
            hp:false,
            zcp:false,
        }
        this.card1 = (<div  style={{width:'150px',marginLeft:'20px',height:'60px'}}></div>)
        this.card2 = (<div  style={{width:'150px',marginLeft:'20px',height:'60px'}}></div>)
        this.card3 = (<div  style={{width:'150px',marginLeft:'20px',height:'60px'}}></div>)
        this.card4 = (<div  style={{width:'150px',marginLeft:'20px',height:'60px'}}></div>)
        this.card5 = (<div  style={{width:'150px',marginLeft:'20px',height:'60px'}}></div>)
        this.card6 = (<div  style={{width:'150px',marginLeft:'20px',height:'60px'}}></div>)

    }
    componentWillMount(){
        this.props.getOrderData({
            smsspan:'',
            smsnum:'',
            smsdata:'',
            bingtu:'',
        });
        if (this.props.smsdata.smspay == 'on') {/*催付*/
            this.setState({cf:true})
            this.card1 = (<div  style={{width:'150px',marginLeft:'20px'}}>今日已发：{this.props.bingtu.smspay}条</div>)
        } else {
            this.setState({cf:false})
        }
        if (this.props.smsdata.smssecond == 'on') {/*二次催付*/
            this.setState({ec:true})
            this.card2 = (<div  style={{width:'150px',marginLeft:'20px'}}>今日已发：{this.props.bingtu.smssecond}条</div>)
        } else {
            this.setState({ec:false})
        }
        if (this.props.smsdata.smssend == 'on') {/*发货*/
            this.setState({fh:true})
             this.card3 = (<div  style={{width:'150px',marginLeft:'20px'}}>今日已发：{this.props.bingtu.smssend}条</div>)
        } else {
            this.setState({fh:false})
        }
        if (this.props.smsdata.smsgood == 'on') {/*好评奖励*/
            this.setState({hp:true})
             this.card5 = (<div  style={{width:'150px',marginLeft:'20px'}}>今日已发：{this.props.bingtu.smsgood}条</div>)
        } else {
            this.setState({hp:false})
        }
        if (this.props.smsdata.smsbad == 'on') {/*中差评提醒*/
            this.setState({zcp:true})
             this.card6 = (<div  style={{width:'150px',marginLeft:'20px'}}>今日已发：{this.props.bingtu.smsbad}条</div>)
        } else {
            this.setState({zcp:false})
        }
        if (this.props.smsdata.smswl == 'on') {/*收货提醒*/
            this.setState({sh:true})
            this.card4 = (<div  style={{width:'150px',marginLeft:'20px'}}>今日已发：{this.props.bingtu.smswl}条</div>)
        } else {
            this.setState({sh:false})
        }
    }
    onClick(e,value){
    	switch(e){
            case 'cf':{
                if(value){
		    		this.setState({
		    			tip1:'开启成功',
		    			cf:true
		    		})
		    		
		    		this.card1 = (<div  style={{width:'150px',marginLeft:'20px'}}>今日已发：{this.props.bingtu.smspay}条</div>)
		    // 		ajax("/iytrade2/zdrate",{},"",function(e){
						// 	console.log('=============开关控制==============')
						// 	console.error(e);
						// });
		    	}else{
		    		this.setState({
		    			tip1:'关闭成功',
		    			cf:false
		    		})
		        	this.card1 = (<div  style={{width:'150px',marginLeft:'20px',height:'60px'}}></div>)
		    	}
		    	this.setState({visible1: !this.state.visible1});
                break;
            }
            case 'ec':{
                if(value){
		    		this.setState({
		    			tip2:'开启成功',
		    			ec:true
		    		})
		    		this.card2 = (<div  style={{width:'150px',marginLeft:'20px'}}>今日已发：{this.props.bingtu.smssecond}条</div>)
		    	}else{
		    		this.setState({
		    			tip2:'关闭成功',
		    			ec:false
		    		})
		        	this.card2 = (<div  style={{width:'150px',marginLeft:'20px',height:'60px'}}></div>)
		    	}
		    	this.setState({visible2: !this.state.visible2});
                break;
            }
            case 'fh':{
                if(value){
		    		this.setState({
		    			tip3:'开启成功',
		    			fh:true
		    		})
		    		this.card3 = (<div  style={{width:'150px',marginLeft:'20px'}}>今日已发：{this.props.bingtu.smssend}条</div>)
		    	}else{
		    		this.setState({
		    			tip3:'关闭成功',
		    			fh:false
		    		})
		        	this.card3 = (<div  style={{width:'150px',marginLeft:'20px',height:'60px'}}></div>)
		    	}
		    	this.setState({visible3: !this.state.visible3});
                break;
            }
            case 'sh':{
                if(value){
		    		this.setState({
		    			tip4:'开启成功',
		    			sh:true
		    		})
		    		this.card4 = (<div  style={{width:'150px',marginLeft:'20px'}}>今日已发：{this.props.bingtu.smswl}条</div>)
		    	}else{
		    		this.setState({
		    			tip4:'关闭成功',
		    			sh:false
		    		})
		        	this.card4 = (<div  style={{width:'150px',marginLeft:'20px',height:'60px'}}></div>)
		    	}
		    	this.setState({visible4: !this.state.visible4});
                break;
            }
            case 'hp':{
                if(value){
		    		this.setState({
		    			tip5:'开启成功',
		    			hp:true
		    		})
		    		this.card5 = (<div  style={{width:'150px',marginLeft:'20px'}}>今日已发：{this.props.bingtu.smsgood}条</div>)
		    	}else{
		    		this.setState({
		    			tip5:'关闭成功',
		    			hp:false
		    		})
		        	this.card5 = (<div  style={{width:'150px',marginLeft:'20px',height:'60px'}}></div>)
		    	}
		    	this.setState({visible5: !this.state.visible5});
                break;
            }
            case 'zcp':{
                if(value){
		    		this.setState({
		    			tip6:'开启成功',
		    			zcp:true
		    		})
		    		this.card6 = (<div  style={{width:'150px',marginLeft:'20px'}}>今日已发：{this.props.bingtu.smsbad}条</div>)
		    	}else{
		    		this.setState({
		    			tip6:'关闭成功',
		    			zcp:false
		    		})
		        	this.card6 = (<div  style={{width:'150px',marginLeft:'20px',height:'60px'}}></div>)
		    	}
		    	this.setState({visible6: !this.state.visible6});
                break;
            }

        }
        
    }
    onClose(e){
    	switch(e){
            case 'cf':{
               this.setState({
		            visible1: false
		        })
                break;
            }
            case 'ec':{
               this.setState({
		            visible2: false
		        })
                break;
            }
            case 'fh':{
               this.setState({
		            visible3: false
		        })
                break;
            }
            case 'sh':{
               this.setState({
		            visible4: false
		        })
                break;
            }
            case 'hp':{
               this.setState({
		            visible5: false
		        })
                break;
            }
            case 'zcp':{
               this.setState({
		            visible6: false
		        })
                break;
            }
        }
       
    }
    changeName = () => {
     	this.setState({
          visible7: true
      })
  	}
	onClose7 = () => {
	      this.setState({
	          visible7: false
	      })
	  }
	modifySignature = () => {
    	
  	}

    render(){
    	var config = "";
    	const {getOrderData,smsspan,smsnum,bingtu,fb} = this.props;
    	if(bingtu.smswl == '0' && bingtu.smsbad == '0'&& bingtu.smssend == '0'&&bingtu.smspay == '0'&&bingtu.smsgood == '0'&&bingtu.smssecond == '0'){
			config = {
			   chart : {
			       plotBackgroundColor: null,
			       plotBorderWidth: null,
			       plotShadow: false
			   },
			    title : {
			      text: ''   
			   }, 
			   tooltip : {
			      pointFormat: '{series.name}: <b>{point.percentage:0}%</b>'
			   },
			    credits: {
	          		enabled:false
				},
				colors:[
	                        '#46A1E6',
	                        '#999999',
	                        '#9BCC1F',
	                       '#FFAA3E', 
	                       '#D09AF9',
	                       '#FF7466', 
	            ],
			    plotOptions : {
			      pie: {
			         allowPointSelect: true,
			         cursor: 'pointer',
			         dataLabels: {
			            enabled: true,
			            format: '<b>{point.name}</b>:0条',
			         }
			      }
			   },
			   series: [{
			      type: 'pie',
			      name: '短信关怀',
			      data: [
			         ['收货提醒',  1],
			         ['中差评提醒', 1],
			         {
			            name: '发货提醒',
			            y: 1,
			         },
			         ['催付提醒',   1],
			         ['好评感谢',  1],
			         ['二次催付',   1]
			      ]
			   }] ,   
			}
    	}else{
	    	config = {
			   chart : {
			       plotBackgroundColor: null,
			       plotBorderWidth: null,
			       plotShadow: false
			   },
			    title : {
			      text: ''   
			   }, 
			   tooltip : {
			      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			   },
			    credits: {
	          		enabled:false
				},
				colors:[
	                        '#46A1E6',
	                        '#999999',
	                        '#9BCC1F',
	                       '#FFAA3E', 
	                       '#D09AF9',
	                       '#FF7466', 
	            ],
			    plotOptions : {
			      pie: {
			         allowPointSelect: true,
			         cursor: 'pointer',
			         dataLabels: {
			            enabled: true,
			            format: '<b>{point.name}</b>:{point.y}条',
			         }
			      }
			   },
			   series: [{
			      type: 'pie',
			      name: '短信关怀',
			      data: [
			         ['收货提醒',  Number(bingtu.smswl)],
			         ['中差评提醒', Number(bingtu.smsbad)],
			         {
			            name: '发货提醒',
			            y: Number(bingtu.smssend),
			         },
			         ['催付提醒',    Number(bingtu.smspay)],
			         ['好评感谢',   Number(bingtu.smsgood)],
			         ['二次催付',   Number(bingtu.smssecond)]
			      ]
			   }] ,   
			}
    	}
		let style = {
            border: '1px solid #999',
            padding: '10px',
            width: '100px',
            height: '40px',
            background: '#fff'
        }
        return (
        	<div style={{width:'100%'}}>
	            <div style={{width:'100%',lineHeight:'45px',backgroundColor:'#F7F7F9'}}>
	            			<Row>
					            <Col fixedSpan="4">
					                	<span style={{marginLeft:"1%",fontSize:'14px'}}>群发短信</span>
					            </Col>
					            <Col fixedSpan="8">
										<span style={{fontSize:'14px'}}>剩余条数:</span>
										<span className="num">{smsnum}</span>
										<span style={{fontSize:'14px'}}>条</span>
					            </Col>
					            <Col >
					            	<Czbutton content="立即充值"/>
					            </Col>
					             <Col fixedSpan="11" style={{paddingLeft:'63px'}}>
					            		<span style={{fontSize:'14px'}}>短信签名：</span>
										<span style={{fontSize:'14px'}}>{smsspan}</span>
					            </Col>
					            <Col fixedSpan="2" style={{marginTop:'3px'}}>	
					            	<img src="http://q.aiyongbao.com/gx1688/image/wwzx.png" onClick={this.changeName}/>
					            	<Dialog visible = {this.state.visible7}
						                    onOk = {this.modifySignature}
						                    onCancel = {this.onClose7}
						                    onClose = {this.onClose7} title = "设置短信签名">
						                    <Input className="textClsName" />
						            </Dialog>
								</Col>
						   	</Row>          	
	            </div>
	            <div stlye={{width:'100%',display:'inline-block'}}>
	            	<Message style={{width:'100%'}} inex={this}/>
	            </div>
	            <Row style={{width:'100%'}}>
		            <Col fixedSpan="24">
		            	 <div style={{width:'100%',lineHeight:'190px',textAlign:'center'}}><ReactHighcharts config={config} ref="chart"></ReactHighcharts></div>
		            	<Row  justify="center">
				            <Col span="5">
					            <Row>
						            <Col span="5"><div style={{width:'16px',height:'16px',backgroundColor:'#FFAA3E'}}></div></Col>
						            <Col span="1"><div className="demo-col-inset"></div></Col>
						            <Col span="6"><div style={{width:'56px'}}>催付提醒</div></Col>
						   		</Row>
				            </Col>
				            <Col span="2"><div className="demo-col-inset"></div></Col>
				            <Col span="5">
								<Row>
						            <Col span="5"><div style={{width:'16px',height:'16px',backgroundColor:'#FF7466'}}></div></Col>
						            <Col span="1"><div className="demo-col-inset"></div></Col>
						            <Col span="6"><div style={{width:'56px'}}>二次催付</div></Col>
						   		</Row>
				            </Col>
				        </Row>
				        <Row justify="center">
				            <Col span="5">
					            <Row>
						            <Col span="5"><div style={{width:'16px',height:'16px',backgroundColor:'#9BCC1F'}}></div></Col>
						            <Col span="1"><div className="demo-col-inset"></div></Col>
						            <Col span="6"><div style={{width:'56px'}}>发货提醒</div></Col>
						   		</Row>
				            </Col>
				            <Col span="2"><div className="demo-col-inset"></div></Col>
				            <Col span="5">
								<Row>
						            <Col span="5"><div style={{width:'16px',height:'16px',backgroundColor:'#46A1E6'}}></div></Col>
						            <Col span="1"><div className="demo-col-inset"></div></Col>
						            <Col span="6"><div style={{width:'56px'}}>收货提醒</div></Col>
						   		</Row>
				            </Col>
				        </Row>
				        <Row justify="center">
				            <Col span="5">
					            <Row>
						            <Col span="5"><div style={{width:'16px',height:'16px',backgroundColor:'#D09AF9'}}></div></Col>
						            <Col span="1"><div className="demo-col-inset"></div></Col>
						            <Col span="6"><div style={{width:'56px'}}>好评感谢</div></Col>
						   		</Row>
				            </Col>
				            <Col span="2"><div className="demo-col-inset"></div></Col>
				            <Col span="5">
								<Row>
						            <Col span="5"><div style={{width:'16px',height:'16px',backgroundColor:'#999999'}}></div></Col>
						            <Col span="1"><div className="demo-col-inset"></div></Col>
						            <Col span="6"><div style={{width:'76px'}}>中差评提醒</div></Col>
						   		</Row>
				            </Col>
				        </Row>
		            </Col>
		            <Col>
		            	<Row className="btoright">
		            		<div style={{width:'16px',height:'16px',backgroundColor:'#11CDFB',marginLeft:'12px',marginTop:'21px'}}></div>
					        <div style={{width:'70px',height:'20px',marginLeft:'20px'}}>群发短信</div>
					        <div style={{width:'265px',height:'20px',marginLeft:'26px'}}>活动预告/上新通知/节日营销/店庆促销</div>
					        <div  style={{width:'116px',marginLeft:'18px'}}>发送：{this.props.smsdata.telnum}条</div>
					        <Link style={{fontSize:'11px',color:"#4990E2",cursor:"pointer",marginLeft:'15px'}} to="/dist/Message/send">立即群发</Link>
				        </Row>
				        <Row className="right1">
				        	<div style={{width:'16px',height:'16px',backgroundColor:'#FFAA3E',marginLeft:'12px',marginTop:'21px'}}></div>
					        <div style={{width:'70px',height:'20px',marginLeft:'20px'}}>催付提醒</div>
					        <div style={{width:'183px',height:'20px',marginLeft:'26px'}}>拍下后10分-2小时未付款</div>
					        <Switch style={{marginTop:'17px',marginLeft:'20px'}} checked={this.state.cf} onChange={this.onClick.bind(this,'cf')} id="toggle"/>
					        <Overlay visible={this.state.visible1}
				                     hasMask
				                     safeNode="toggle"
				                     align="cc cc"
				                     onRequestClose={this.onClose.bind(this,'cf')}>
				                <span style={style}>{this.state.tip1}</span>
				            </Overlay>
					        {this.card1}
					        <Link style={{height:'20px',color:'#4990E2',marginLeft:'12px',cursor:"pointer"}} to="/dist/Message/cf">设置</Link> 
				        </Row>
				        <Row className="right2">
				        	<div style={{width:'16px',height:'16px',backgroundColor:'#FF7466',marginLeft:'12px',marginTop:'21px'}}></div>
					        <div style={{width:'70px',height:'20px',marginLeft:'20px'}}>二次催付</div>
					        <div style={{width:'183px',height:'20px',marginLeft:'26px'}}>拍下后6小时-2天内未付款</div>
					        <Switch style={{marginTop:'17px',marginLeft:'20px'}} checked={this.state.ec} onChange={this.onClick.bind(this,'ec')} id="toggle1"/>
					        <Overlay visible={this.state.visible2}
				                     hasMask
				                     safeNode="toggle1"
				                     align="cc cc"
				                     onRequestClose={this.onClose.bind(this,'ec')}>
				                <span style={style}>{this.state.tip2}</span>
				            </Overlay>
					        {this.card2}
					        <Link style={{height:'20px',color:'#4990E2',marginLeft:'12px',cursor:"pointer"}} to="/dist/Message/ec">设置</Link> 
				        </Row>
				        <Row className="right1">
				            <div style={{width:'16px',height:'16px',backgroundColor:'#9BCC1F',marginLeft:'12px',marginTop:'21px'}}></div>
					        <div style={{width:'70px',height:'20px',marginLeft:'20px'}}>发货提醒</div>
					        <div style={{width:'183px',height:'20px',marginLeft:'26px'}}>卖家点击发货时发送</div>
					        <Switch style={{marginTop:'17px',marginLeft:'20px'}}  checked={this.state.fh} onChange={this.onClick.bind(this,'fh')} id="toggle2"/>
					        <Overlay visible={this.state.visible3}
				                     hasMask
				                     safeNode="toggle2"
				                     align="cc cc"
				                     onRequestClose={this.onClose.bind(this,'fh')}>
				                <span style={style}>{this.state.tip3}</span>
				            </Overlay>
					        {this.card3}
					        <Link style={{height:'20px',color:'#4990E2',marginLeft:'12px',cursor:"pointer"}} to="/dist/Message/fh">设置</Link> 
				        </Row>
				        <Row className="right2">
					        <div style={{width:'16px',height:'16px',backgroundColor:'#46A1E6',marginLeft:'12px',marginTop:'21px'}}></div>
					        <div style={{width:'70px',height:'20px',marginLeft:'20px'}}>收货提醒</div>
					        <div style={{width:'183px',height:'20px',marginLeft:'26px'}}>买家已签收时</div>
					        <Switch style={{marginTop:'17px',marginLeft:'20px'}}   checked={this.state.sh} onChange={this.onClick.bind(this,'sh')} id="toggle3"/>
					        <Overlay visible={this.state.visible4}
				                     hasMask
				                     safeNode="toggle3"
				                     align="cc cc"
				                     onRequestClose={this.onClose.bind(this,'sh')}>
				                <span style={style}>{this.state.tip4}</span>
				            </Overlay>
					        {this.card4}
					        <Link style={{height:'20px',color:'#4990E2',marginLeft:'12px',cursor:"pointer"}} to="/dist/Message/sh">设置</Link> 
				        </Row>
				        <Row className="right1">
				            <div style={{width:'16px',height:'16px',backgroundColor:'#D09AF9',marginLeft:'12px',marginTop:'21px'}}></div>
				           	<div style={{width:'70px',height:'20px',marginLeft:'20px'}}>好评感谢</div>
				           	<div style={{width:'183px',height:'20px',marginLeft:'26px'}}>双方好评之后发送</div>
				           	<Switch style={{marginTop:'17px',marginLeft:'20px'}}  checked={this.state.hp} onChange={this.onClick.bind(this,'hp')} id="toggle4"/>
					        <Overlay visible={this.state.visible5}
				                     hasMask
				                     safeNode="toggle4"
				                     align="cc cc"
				                     onRequestClose={this.onClose.bind(this,'hp')}>
				                <span style={style}>{this.state.tip5}</span>
				            </Overlay>
					        {this.card5}
					        <Link style={{height:'20px',color:'#4990E2',marginLeft:'12px',cursor:"pointer"}} to="/dist/Message/hp">设置</Link> 
				        </Row>
				        <Row className="right2">
				           	<div style={{width:'16px',height:'16px',backgroundColor:'#999999',marginLeft:'12px',marginTop:'21px'}}></div>
				           	<div style={{width:'70px',height:'20px',marginLeft:'20px'}}>中差评提醒</div>
				           	<div style={{width:'183px',height:'20px',marginLeft:'26px'}}>双方好评之后给差评买家发送</div>
				           	<Switch style={{marginTop:'17px',marginLeft:'20px'}}   checked={this.state.zcp} onChange={this.onClick.bind(this,'zcp')} id="toggle5"/>
					        <Overlay visible={this.state.visible6}
				                     hasMask
				                     safeNode="toggle5"
				                     align="cc cc"
				                     onRequestClose={this.onClose.bind(this,'zcp')}>
				                <span style={style}>{this.state.tip6}</span>
				            </Overlay>
					        {this.card6}
					        <Link style={{height:'20px',color:'#4990E2',marginLeft:'12px',cursor:"pointer"}} to="/dist/Message/zcp">设置</Link> 
				        </Row>
		            </Col>
		        </Row>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
       	smsspan:state.Message.smsspan,
       	smsnum:state.Message.smsnum,
       	smsdata:state.Message.smsdata,
       	bingtu:state.Message.bingtu,
       	fb:state.Message.fb
    }
}
function mapDispatchToProps(dispatch,ownProps){
	return bindActionCreators(MessageActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Messagecon)
