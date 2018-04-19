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

class HpSetting extends Component {
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
	       					<div className='set'>1、当交易完成买家对订单好评之后，软件可以设定是否发送好评奖励短信；</div>
	       					<div className='set'>2、对于塑造店铺的整体服务形象有巨大帮助，另外能提升买家对店铺的信任感增加回头客；</div>
	       					<div className='set'>注意：同一个手机号每天只会收到一条该类型（好评奖励）短信，即使买家拍下多笔订单；</div>
	       				</div>
	            </Feedback>
	           <div style={{width:'19px',height:'16px'}}></div>
	           <div>
	           		<Row>
	           			<div className='set' style={{paddingTop:'20px'}}>好评奖励： 双方互评后，如果买家给出的评价是好评，则给发送好评感谢短信，对用户发送好评奖励短信。</div>
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
		                    <div style={{marginTop:'0px'}}><Radio id="one" value="one">{"【好评奖励】亲爱的<买家旺旺> ，感谢您给小店的好评，小店已经将您加入VIP会员，更多优惠等着您哦！"}</Radio> </div>
		                    <div style={{marginTop:'20px'}}><Radio id="sec" value="sec">{"【好评奖励】亲爱的<买家昵称> ，谢谢您给的5分好评，现在联系客服可以免费获得优惠券，供您下次购买本店宝贝使用。"}</Radio> </div>
		                    <div style={{marginTop:'20px'}}><Radio id="thr" value="thr">{"【好评奖励】亲爱的<买家昵称> ，感谢您给小店亮5颗星星，本店最近有新货，给亲最大的优惠，祝您下次购物愉快哦！"}</Radio> </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HpSetting)

