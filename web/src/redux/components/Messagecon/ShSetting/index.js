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

class ShSetting extends Component {
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
	       					<div className='set'>1、很多买家收到宝贝后不及时确认收货和评价，软件自动发送短信去提醒买家；</div>
	       					<div className='set'>2、可以帮助卖家大幅度加快回款速度和好评率，软件会统计短信发出后1天内的签收效果；</div>
	       					<div className='set'>注意：由于淘宝物流数据来自于第三方快递，签收发送成功率约80%。</div>
	       				</div>
	            </Feedback>
	           <div style={{width:'19px',height:'16px'}}></div>
	           <div>
	           		<Row>
	           			<div className='set' style={{paddingTop:'20px'}}>收货提醒： 物流签收后提醒（无需物流的订单不提醒）</div>
	  	           		</Row>
	           </div>
	            <div>
	           		<Row>
	           			<div className='set' style={{paddingTop:'20px'}}>其他设定：</div>
	           			<div style={{marginTop:'20px'}}>
	           				<div >	
		           				<Checkbox id="first" /><label style={{marginLeft:'6px'}}>曾经给过本店铺差评的买家不发送</label>
		           			</div>
		           			 	<div style={{marginTop:'10px'}}><Checkbox id="second" /><label style={{marginLeft:'6px'}}>低于设定金额的订单不发送</label></div>
				            <div style={{marginTop:'10px'}}/>
				            	{this.state.othercard}
	           			</div>
	           		</Row>
	           </div>
	            <div>
	           		<Row>
	           			<div className='set' style={{paddingTop:'20px'}}>短信签名：</div>
				        <div className='set' style={{paddingTop:'20px'}}>【{this.props.smsdata.smsspan}】</div>
				        <img src="http://q.aiyongbao.com/gx1688/image/wwzx.png" style={{marginLeft:'12px',width:'16px',height:'16px',marginTop:'19px'}} />
	           		</Row>
	            </div>
	            <div>
	           		<Row>
	           			<div className='set' style={{paddingTop:'22px'}}>短信内容：</div>
	           			<div style={{marginTop:'20px'}}>
	           			 <RadioGroup value={this.state.val} onChange={this.onChange}>
		                    <div style={{marginTop:'0px'}}><Radio id="one" value="one">{"【收货提醒】亲爱的<买家姓名>，感谢您在我们店铺购买宝贝，真诚期待给予好评。"}</Radio> </div>
		                    <div style={{marginTop:'20px'}}><Radio id="sec" value="sec">{"【收货提醒】<买家姓名>，麻烦确认收货并好评，我们期待您的支持和鼓励！"}</Radio> </div>
		                    <div style={{marginTop:'20px'}}><Radio id="thr" value="thr">{"【收货提醒】亲爱的<买家旺旺>，我们已经收到您的付款信息，期待您收货后给予好评，如果商品如出现任何问题请联系客服！"}</Radio> </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShSetting)

