import React,{Component,PropTypes} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from 'qnui/lib/button';
import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import Checkbox from 'qnui/lib/checkbox';
import Select, {Option} from 'qnui/lib/select';
import Icon from 'qnui/lib/icon';
import { Row, Col } from 'qnui/lib/grid';
import * as InBasicSettingsActions from '../../../actions/InBasicSettings'

const ButtonGroup = Button.Group;
const { Group: CheckboxGroup } = Checkbox;
class InBasicSettings extends Component {

    componentDidMount(){
        this.props.getBasicList({
          neutralon:'',
          carnum:'',
          bigmoney:''
        }); 
        console.log("------componentDidMount---------")
        console.log(this.props);
    }

   constructor(props) {
   	    
        super(props);
        this.state = {
            value: this.props.checkboxValue,
            times:1
        };

        this.onChange = this.onChange.bind(this);

    }
     
    onChange(selectedItems) {
    	console.log("-------------------onChange")
    	/*数据的变化需要保存到数据库*/
    	console.log(selectedItems)
        this.setState({
            value: selectedItems
        });
    }
    /*点击按钮选择宽松条件还是严格条件*/
    handleclick(type){
      console.log("--------button")
      console.log(type)
      let kuanData=['conditions','neutralon','badon','addblack'];
      let yanData=['goodrate','credit','regdays','conditions','neutralon','badon','addblack'];
      if(type=='kuansong'){
         this.setState({
             value:kuanData
         })
         console.log(this.state.value)
      }else{
         this.setState({
             value:yanData
         })
         console.log(this.state.value)
      }
    }

    render(){
        const {orderData,checkboxValue}=this.props;
        console.log(checkboxValue)
        return ( 
          <div>
            <CheckboxGroup value={this.state.value} dataSource={checkboxValue} onChange={this.onChange}>
          	<div>
              <span>一键快速设置：</span>
              <ButtonGroup>
                 <Button  style={{backgroundColor:'#ffffff'}} size="large" onClick={this.handleclick.bind(this,"kuansong")}>按宽松条件</Button>
                 <Button  style={{backgroundColor:'#ffffff'}} size="large" onClick={this.handleclick.bind(this,"yange")}>按严格条件</Button>
              </ButtonGroup>
            </div>
            <div style={{height:'30px',backgroundColor:'#FEF1E8',marginTop:'10px',paddingTop:'8px'}}>
                 &nbsp;&nbsp;<Icon type="warning"  style={{color:'orange'}} size="xs"/>&nbsp;&nbsp;  
                 <span>提示：符合任一选中状态的买家都会拦截,不能购买您的宝贝,拍下订单10秒后,订单将自动关闭。</span>
            </div>
             <Row  style={{height:'160px',marginTop:'8px'}}>
                 <Col span='8' style={{borderStyle:'solid',borderWidth:'1px',borderColor:'#EBEBEB',marginLeft:'-12px'}}>
                 	<div style={{marginLeft:'10px'}}>
                 		<div style={{marginTop:'13px',fontWeight:'600'}}>中差评拦截</div>
		                <div style={{marginTop:'16px'}}>
				          <Checkbox id="zhongp" value='neutralon' />&nbsp;&nbsp;<label htmlFor='zhongp'>给过我中评的买家</label>
				        </div>
			            <div style={{marginTop:'16px'}}>
			              <Checkbox id="chap" value='badon' />&nbsp;&nbsp;<label htmlFor='chap'>给过我差评的买家</label>
			            </div>
			            <div style={{marginTop:'16px'}}>
			              <Checkbox id="haop" value='goodrate'  />&nbsp;&nbsp;<label htmlFor='haop'><span style={{color:'#F98900'}}>收到好评率</span>低于：</label>&nbsp;&nbsp;
			              <Input size='small' value={orderData.goodrate[1]} style={{ width:'10%'}}/>&nbsp;&nbsp;%
			            </div>
                 	</div>
                 </Col>
                 <Col span='8' style={{borderStyle:'solid',borderWidth:'1px',borderColor:'#EBEBEB',marginLeft:'12px'}}>
                    <div style={{marginLeft:'10px'}}>
	             		<div style={{marginTop:'13px',fontWeight:'600'}}>买家信息拦截</div>
		                <div style={{marginTop:'16px'}}>
                           <Checkbox id="mjxyf"  value='credit'  />&nbsp;&nbsp;<label htmlFor='mjxyf'>买家信用分数低于：</label>
	                       <Input size='small' value={orderData.credit[1]} style={{ width:'10%'}}/>&nbsp;&nbsp;分 		
	                    </div>
			            <div style={{marginTop:'16px'}}>
	                       <Checkbox id="wzfb"   value='noalipay'  />&nbsp;&nbsp;<label htmlFor='wzfb'>没有绑定支付宝账户的买家（主要是防止新注册买家购买）</label>
			            </div>
			            <div style={{marginTop:'16px'}}>
			               <Checkbox id="mjzcts"  value='regdays'   />&nbsp;&nbsp;<label htmlFor='mjzcts'>买家注册天数小于：</label>
	                       <Input size='small' value={orderData.regdays[1]} style={{ width:'10%'}}/>&nbsp;&nbsp;天
			            </div>
		            </div>
                 </Col>
                 <Col span='8' style={{borderStyle:'solid',borderWidth:'1px',borderColor:'#EBEBEB',marginLeft:'12px'}}>
                    <div style={{marginLeft:'10px'}}>
	             		<div style={{marginTop:'13px',fontWeight:'600'}}>买家信息拦截</div>
		                <div style={{marginTop:'10px'}}>
                           <Checkbox id="ddjed"   value='bigmoney' />&nbsp;&nbsp;<label htmlFor='ddjed'>此次订单金额大于(含运费)：</label>
	                       <Input size='small' value={orderData.bigmoney[1]} style={{ width:'10%'}}/>&nbsp;&nbsp;元 		
	                    </div>
			            <div style={{marginTop:'10px'}}>
                           <Checkbox id="ddjex"  value='smallmoney'  />&nbsp;&nbsp;<label htmlFor='ddjex'>此次订单金额小于(含运费)：</label>
	                       <Input size='small' value={orderData.smallmoney[1]} style={{ width:'10%'}} />&nbsp;&nbsp;元			            
	                    </div>
			            <div style={{marginTop:'10px'}}>
			               <Checkbox id="gmjs"  value='carnum'  />&nbsp;&nbsp;<label htmlFor='gmjs'>一个订单购买件数（含购物车）大于：</label>
	                       <Input size='small' value={orderData.carnum[1]} style={{ width:'10%'}} />&nbsp;&nbsp;件
			            </div>
			             <div style={{marginTop:'10px'}}>
			               <Checkbox id="tybbgm"  value='babynum'  />&nbsp;&nbsp;<label htmlFor='tybbgm'>一个订单中同一宝贝购买数大于：</label>
	                       <Input size='small' value={orderData.babynum[1]}  style={{ width:'10%'}} />&nbsp;&nbsp;件
			            </div>
		            </div>
                 </Col>
             </Row>
             <div style={{borderStyle:'solid',borderWidth:'1px',borderColor:'#EBEBEB',marginTop:'10px',height:'80px'}}>
             	<div style={{marginLeft:'10px'}}>
	             		<div style={{marginTop:'13px',fontWeight:'600'}}>买家信息拦截</div>
		                <div style={{marginTop:'10px'}}>
                           <Checkbox id="dlgjz"  value='conditions' />&nbsp;&nbsp;<label htmlFor='dlgjz'>地址或留言包含以下关键字：</label>
	                       <Input value={orderData.conditions[1]} style={{ width:'60%'}}  />&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:'#F98900'}}>*关键字之间用逗号隔开</span>
	                    </div>
                </div>
             </div>
             <div style={{borderStyle:'solid',borderWidth:'1px',borderColor:'#EBEBEB',marginTop:'10px',height:'100px'}}>
             	<div style={{marginLeft:'10px'}}>
	             		<div style={{marginTop:'13px',fontWeight:'600'}}>设置关闭理由</div>
		                <div>
		                   <span>设置关闭交易时卖家解释(买家可以看的见哦):</span>&nbsp;&nbsp;&nbsp;&nbsp;
			                <Select  defaultValue="买家信息填写错误,重新拍">{/* onChange={this.onSelect.bind(this)} value={this.state.value}*/}
			                    <Option value="1">未及时付款</Option>
			                    <Option value="2">买家不想买了</Option>
			                    <Option value="3">买家信息填写错误,重新拍</Option>
			                    <Option value="4">恶意买家、同行捣乱</Option>
			                    <Option value="5">缺货</Option>
			                    <Option value="6">买家拍错了</Option>
			                    <Option value="7">同城见面交易</Option>
			                </Select>
                        </div>
                        <div style={{marginTop:'10px'}}>
                        	    <Checkbox id="yytbz" value='addbiew'  />&nbsp;&nbsp;<label htmlFor='yytbz'>将关闭交易的原因添加到备注（仅自己能看到，买家看不到）</label>
                        </div>
                </div>
             </div>
	          <div style={{marginTop:'15px',color:'#F98900'}}> 
	               <Checkbox id="warn"   value='addblack' />&nbsp;&nbsp;<label htmlFor='warn'>符合拦截的条件的用户自动添加到我的黑名单库，下次购买付款自动关闭订单。</label>
	          </div>
              <div style={{marginTop:'15px'}}>注：淘宝限制买家在提交订单后10秒内，不允许关闭订单，因此，订单的付款时间和成交时间相差10秒内时，系统不进行拦截；</div>
              <div style={{marginTop:'15px'}}>问：关闭订单是否会招致买家投诉？</div>
              <div style={{marginTop:'15px'}}>答：会，但是淘宝不会受理类似投诉； 2013年12月，淘宝规则变更，不再受理类似交易订单关闭的投诉；&nbsp;&nbsp;<a style={{color:'#4990E2'}} href="//rule.taobao.com/detail-1309.htm?spm=a1z13.2196609.2196609.19.UG9n7s&amp;mai_info_source=ww&amp;mai_info_id=9796">查看官方公告</a></div>
          </CheckboxGroup>
          </div>
       );
    }
};



function mapStateToProps(state, ownProps){
    return {
        orderData:state.InBasicSettings.orderData,
        checkboxValue:state.InBasicSettings.checkboxValue
    }
}
function mapDispatchToProps(dispatch,ownProps){
  return bindActionCreators(InBasicSettingsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InBasicSettings)
