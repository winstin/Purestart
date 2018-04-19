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
import Input from 'qnui/lib/input';
import * as MessageActions from '../../../actions/Message'

class FhSetting extends Component {
	constructor(props) {
        super(props);
        this.state = {
            value : '1',
            val: 'one',
            othercard:''
        };
        this.onChange = this.onChange.bind(this);
    }
    componentWillMount() {  
        this.setState({othercard:(<div style={{marginTop:'10px'}}>
					            <span className='set'>当前设置的最低订单金额:</span>
					            <span style={{fontSize:'12px',color:'#003B00'}}>0.00</span>
					            <span className='set'>元 </span>
					            <span style={{height:'20px',color:'#4990E2',marginLeft:'12px',cursor:"pointer"}} onClick={this.Setting.bind(this)}>设置</span>
				            </div>)})
    }
    Setting(){
    	this.setState({othercard:(
    					<div>
				            <span className='set'>当前设置的最低订单金额:</span>
					        <span className='set'>元 </span>
					        <div>
					            <Input className="textClsName" placeholder="0.00" size="small"/>
					            <Button  type="primary" size="small" style={{marginLeft:'14px'}}>保存</Button>
				            </div>
			            </div>
			            )})
    }
    onSelect(value){
        this.setState({
            value
        });
    }
    onChange(value) {
        this.setState({
            val: value
        });
    }
	render(){
		const {goback} = this.props;
		  return (
        	<div>
	            <Feedback title="" type='prompt'>
	       				<span className='set'>使用说明:</span>
	       				<div>
	       					<div className='set'>1、当客户下单后在设定的时间内没有付款，软件会自动发送短信提醒买家付款；</div>
	       					<div className='set'>2、每天只要几条短信钱，就可以很方便的将未付款订单转换成店铺的实际销售额；</div>
	       					<div className='set'>注意：同一个手机号每天只会收到一条该类型(订单催付)短信，即使买家拍下多笔订单；</div>
	       					<div className='set'>注意：每晚8点后不发短信，延迟到次日早上8点发送。</div>
	       				</div>
	            </Feedback>
	           <div style={{width:'19px',height:'16px'}}></div>
	           <div>
	           		<Row>
	           			<div className='set' style={{paddingTop:'20px'}}>发货提醒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;： 卖家发货后立即发送短信</div>
	  	           		</Row>
	           </div>
	            <div>
	           		<Row>
	           			<div className='set' style={{paddingTop:'20px'}}>其他设定&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</div>
	           			<div style={{marginTop:'20px'}}>
	           				<div >	
		           				<Checkbox id="first" /><label style={{marginLeft:'6px'}}>无需物流的订单不发送</label>
		           			</div>
		           			 	<div style={{marginTop:'10px'}}><Checkbox id="second" /><label style={{marginLeft:'6px'}}>曾经给过本店铺差评的买家不发送</label></div>
					            <div style={{marginTop:'10px'}}><Checkbox id="three" /><label style={{marginLeft:'6px'}}>低于设定金额的订单不发送</label></div>
				            	<div style={{marginTop:'10px'}}/>
				            	{this.state.othercard}
	           			</div>
	           		</Row>
	           </div>
	            <div>
	           		<Row>
	           			<div className='set' style={{paddingTop:'20px'}}>短信签名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</div>
				        <div className='set' style={{paddingTop:'20px'}}>【{this.props.smsdata.smsspan}】</div>
				        <img src="http://q.aiyongbao.com/gx1688/image/wwzx.png" style={{marginLeft:'12px',width:'16px',height:'16px',marginTop:'19px'}} />
	           		</Row>
	            </div>
	            <div>
	           		<Row>
	           			<div className='set' style={{paddingTop:'22px'}}>请选择短信内容：</div>
	           			<div style={{marginTop:'20px'}}>
	           			 <RadioGroup value={this.state.val} onChange={this.onChange}>
		                    <div style={{marginTop:'0px'}}><Radio id="one" value="one">【发货提醒】，亲的宝贝已经发货了！“物流公司”派送，运单号 物流单号,请记得及时收货噢！</Radio> </div>
		                    <div style={{marginTop:'20px'}}><Radio id="sec" value="sec">【发货提醒】，您的宝贝已经发货了！请保持手机畅通方便快递联系您，签收前记得先检查包装哟！</Radio> </div>
		                    <div style={{marginTop:'20px'}}><Radio id="thr" value="thr">【发货提醒】亲爱的，感谢您的惠顾，宝贝已经发货啦，请知悉， 祝您生活愉快。</Radio> </div>
		                    <div style={{marginTop:'20px'}}><Radio id="fou" value="fou"><span style={{height:'20px',color:'#4990E2',marginLeft:'12px',cursor:"pointer"}} >编辑自定义模板</span></Radio> </div>
		                </RadioGroup>
	           			</div>
	           		</Row>
	            </div>
	            <div>
		            <Row >
	            		<Col offset="13">
	            			<div  style={{paddingTop:'52px'}}> 
		           			 	<Button type="primary">保存</Button>
		           				<Button type="normal" style={{marginLeft:'24px'}} onClick={goback}>取消</Button>
		           			</div>
	            		</Col>
	       			</Row>
	           </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(FhSetting)

