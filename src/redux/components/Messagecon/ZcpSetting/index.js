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

class ZcpSetting extends Component {
	constructor(props) {
        super(props);
        this.state = {
            value : '1',
            val: 'one',
            sta:'a',
            othercard:'',
            mobnum:'',
        };
        this.onChange = this.onChange.bind(this);
        this.onChan = this.onChan.bind(this);
    }
    componentWillMount() { 
        this.Save()
    }
    //号码设置点击
    Setting(){
    	this.setState({othercard:(
    					<div>
					        <div>
					            <Input className="textClsName"  size="small" value={this.props.smsdata.telphone} onChange={this.setnum.bind(this)}/>
					            <Button  type="primary" size="small" style={{marginLeft:'14px'}} onClick={this.Save.bind(this)}>保存</Button>
				            </div>
			            </div>
			            )})
    }
    setnum(value){
    	this.setState({inputnum:value})
    }
    //保存预警设置的号码
    Save(){
    	this.setState({othercard:(<div style={{marginTop:'0px'}}>
					            <span className='set'>{this.props.smsdata.telphone}</span>
					            <span style={{height:'20px',color:'#4990E2',marginLeft:'12px',cursor:"pointer"}} onClick={this.Setting.bind(this)}>设置</span>
				            </div>)})
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
    onChan(value) {
        this.setState({
            sta: value
        });
    }
	render(){
		const {goback} = this.props;
		  return (
        	<div>
	           <Feedback title="" type='prompt'>
	       				<span className='set'>使用说明:</span>
	       				<div>
	       					<div className='set'>1、当交易完成买家对订单中、差评之后，软件第一时间发送短信给买家了解商品及中、差评原因；</div>
	       					<div className='set'>2、第一时间提醒店铺中、差评，对于及时修改差评有巨大帮助，及时修改中、差评提高店铺好评率；</div>
	       					<div className='set'>注意：同一个手机号每天只会收到一条该类型（中差评提醒）短信，即使买家拍下多笔订单(卖家自己的手机号可以接收到多条预警短信)； </div>
	       					<div className='set'>注意：每晚8点后不发短信，延迟到次日早上8点发送。</div>
	       				</div>
	            </Feedback>
	           <div style={{width:'19px',height:'16px'}}></div>
	           <div>
	           		<Row>
           			<div className='set' style={{paddingTop:'20px'}}>中差评提醒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：双方互评后，如果买家给出的评价是中差评，则给发送中差评提醒短信。</div></Row>
           			<div style={{marginTop:'20px',marginLeft:'15px'}}>
           			    <RadioGroup value={this.state.sta} onChange={this.onChan}>
		                    <div style={{marginTop:'0px',marginLeft:'80px'}}><Radio value="a">对买家发出短信挽回，并对自己发送短信预警 提醒内容预览</Radio> </div>
		                    <div style={{marginTop:'20px',marginLeft:'80px'}}><Radio value="b">仅对自己发出短信预警</Radio> </div>
		                    <div style={{marginTop:'20px',marginLeft:'80px'}}><Radio  value="c">仅对买家发出短信挽回</Radio> </div>
	                	</RadioGroup>
           			</div>
	  	           	
	           </div>
	            <div>
	           		<Row>

	           			<div className='set' style={{paddingTop:'20px'}}>预警手机号码：</div>
	           			<div style={{marginTop:'18px'}}>
				           {this.state.othercard}
	           			</div>
	           		</Row>
	           </div>
	            <div>
	           		<Row>
	           			<div className='set' style={{paddingTop:'20px'}}>短信签名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</div>
				        <div className='set' style={{paddingTop:'20px'}}>【{this.props.smsdata.smsspan}】</div>
				        <img src="http://q.aiyongbao.com/gx1688/image/wwzx.png" style={{marginLeft:'12px',width:'16px',height:'16px',marginTop:'19px'}} />
	           		</Row>
	            </div>
	            <div>
	           		<Row>
	           			<div className='set' style={{paddingTop:'22px'}}>短信内容&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</div>
	           			<div style={{marginTop:'20px'}}>
	           			 <RadioGroup value={this.state.val} onChange={this.onChange}>
		                    <div style={{marginTop:'0px'}}><Radio id="one" value="one">{"【订单提醒】亲爱的<买家姓名> ，很抱歉让您有了不满意的购物经历。稍后客服会主动回访帮您解决宝贝问题！"}</Radio> </div>
		                    <div style={{marginTop:'20px'}}><Radio id="sec" value="sec">{"【订单提醒】亲爱的<买家旺旺> ，宝贝哪里让您不满意呢？服务质量是店铺的生命力，请稍安勿躁！售后这就主动来为您解决问题！"}</Radio> </div>
		                    <div style={{marginTop:'20px'}}><Radio id="thr" value="thr">{"【订单提醒】亲爱的<买家旺旺> ，万水千山总是情，改下评价行不行？本店正升级改版，中差评对我影响重大。望您助我走出困境！"}</Radio> </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ZcpSetting)

