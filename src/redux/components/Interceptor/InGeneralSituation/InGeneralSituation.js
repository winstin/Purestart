import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Tab from 'qnui/lib/tab';
import { Row, Col } from 'qnui/lib/grid';
import Switch from 'qnui/lib/switch';
import Dialog from 'qnui/lib/dialog';
import Button from 'qnui/lib/button';
import Input from 'qnui/lib/input';
import * as InGeneralSituationActions from '../../../actions/InGeneralSituation'

class InGeneralSituation extends Component{
    
    componentDidMount(){
        this.props.getGeneralList({
            areaon: "",
            areasum: "",
            baby: "",
            babysum: "",
            black: "",
            blacksum: "",
            closetime: "",
            cloud: "",
            cloudsum: "",
            conon: "",
            consum: "",
            denfenon: "",
            optime: "",
            phone: "",
            sendsms: "",
            smsnum: "",
            wangwang: "",
            whitesum: ""
        }); 
        console.log("------componentDidMount---------")
        console.log(this.props);
      
    }


    state = {
      isShow: false
    }
  
    makeDialogShow = () => {
        this.setState({isShow:true});
    }

    makeDialogHide = () => {
        this.setState({isShow:false});
    }


    render(){
      console.log("-----------拦截概况------------")
      console.log(this.props);
      const {orderData,autoSwitchState,changeInterceptorSwitchState} = this.props;
      /*areaon,areasum,baby,babysum,black,blacksum,closetime,cloud,cloudsum,conon,consum,denfenon,optime,phone,sendsms,smsnum,wangwang,whitesum*/
      console.log(orderData);
      console.log(autoSwitchState)
     let autoInterceptorSwitchState = orderData.black;
     
        return (  
        	        <div>
                       <div>
        				         <span>拦截概况</span>
        				         <span style={{float:'right'}}><a style={{color:'#D0011B'}} href="http://bangpai.taobao.com/group/thread/15074034-291382553.htm">使用帮助</a></span>
        				       </div>
                       <div style={{borderStyle:'solid',borderWidth:'1px',borderColor:'#EBEBEB',marginTop:'8px'}}>
                         <Row justify="space-between" style={{height:'50px',paddingTop:'10px'}}>
        				              <Col span="12">
                                  <Row type="across">
                                     <Col span='8'>
  				                              <div>拦截总开关：</div>
                                     </Col>
                                     <Col span='8'>
  				                              <Switch  checked={autoSwitchState} size='small'  onChange={()=>{changeInterceptorSwitchState(autoSwitchState)}}/>
                                     </Col>
                                     <Col span='8'></Col>
  				                        </Row>
        				              </Col>
        				              <Col span="12">
                                  <Row type="across">
                                     <Col span='8'>
  				                              <div>拦截短信通知：</div>
                                     </Col>
                                     <Col span='8'>
  				                              <Switch checked={orderData.sendsms} size='small'/>
                                     </Col>
                                     <Col span='8'></Col>
  				                        </Row>
        				              </Col>
        				         </Row>
      				           <Row justify="space-between" style={{height:'30px'}}>
      				                <Col span="12"><div>最后一次开启时间：&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{orderData.optime}</div></Col>
      				                <Col span="12"><div>接收手机号:<span style={{color:'#4990E2'}}>{orderData.phone}</span>  &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; <span style={{color:'#4990E2'}}><a onClick={this.makeDialogShow}>修改</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#'>短信充值</a></span></div></Col>
      				           </Row>
                         <Dialog style={{width:"420px",height:"200px"}} visible = {this.state.isShow}
                              onOk = {()=>{}}
                              onCancel = {this.makeDialogHide}
                              onClose = {this.makeDialogHide}
                              title = {<span style={{fontWeight:'700',fontSize:'16px'}}>修改手机号码</span>}
                              >
                            <div>
                                <span style={{fontWeight:'600'}}>手机号：</span><Input/> <Button type="primary">获取验证码</Button> <br/>
                                <div style={{marginTop:'15px',fontWeight:'600'}}>
                                   验证码：<Input/>
                                </div>
                            </div>  
                         </Dialog>
      				           <Row justify="space-between" style={{height:'30px'}}>
      				                <Col span="12"><div>最后一次关闭时间：&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{orderData.closetime}</div></Col>
      				                <Col span="12"><div style={{color:'#4990E2'}}><a href='#'>查看发送记录</a></div></Col>
      				           </Row>
                       </div>
                       <div style={{paddingTop:'20px'}}>高级拦截
                          <span style={{color:'#D0011B',paddingLeft:'20px'}}>注明：当拦截总开关【关闭】时，高级拦截设置都不会被拦截哦~~~</span>
                       </div>
                       <div style={{borderStyle:'solid',borderWidth:'1px',borderColor:'#EBEBEB',marginTop:'8px'}}>
                         <Row justify="space-between" style={{height:'50px',borderBottomStyle:'solid',borderWidth:'1px',borderColor:'#EBEBEB'}}>
      				              <Col span="12" style={{borderRightStyle:'solid',borderWidth:'1px',borderColor:'#EBEBEB'}}>
                              <Row type="across" style={{paddingTop:'16px'}}>
                                 <Col span='8'>
			                              <div>云黑名单拦截：</div>
                                 </Col>
                                 <Col span='8'>
			                              <Switch checked={orderData.cloud} size='small'/>
                                 </Col>
                                 <Col span='8'>
			                             <span>已拦截：<span style={{color:'#F98900'}}>{orderData.cloudsum}</span>&nbsp;笔</span>
                                 </Col>
      				                </Row>
      				              </Col>
      				              <Col span="12">
                              <Row type="across" style={{paddingTop:'16px'}}>
                                 <Col span='8'>
			                             <div>我的黑名单拦截：</div>
                                 </Col>
                                 <Col span='8'>
			                             <Switch size='small' checked={orderData.black}/>
                                 </Col>
                                 <Col span='8'>
			                             <span>已拦截：<span style={{color:'#F98900'}}>{orderData.blacksum}</span>&nbsp;笔</span>
                                 </Col>
			                        </Row>
      				              </Col>
				                  </Row>
				                 <Row justify="space-between" style={{height:'50px',borderBottomStyle:'solid',borderWidth:'1px',borderColor:'#EBEBEB'}}>
				                    <Col span="12" style={{borderRightStyle:'solid',borderWidth:'1px',borderColor:'#EBEBEB'}}>
                                <Row type="across" style={{paddingTop:'16px'}}>
                                   <Col span='8'>
				                               <div>区域拦截：</div>
                                   </Col>
                                   <Col span='8'>
				                               <Switch checked={orderData.areaon} size='small'/>
                                   </Col>
                                   <Col span='8'>
				                               <span>已拦截：<span style={{color:'#F98900'}}>{orderData.areasum}</span>&nbsp;笔</span>
                                   </Col>
				                        </Row>
				                    </Col>
				                    <Col span="12">
                                <Row type="across" style={{paddingTop:'16px'}}>
                                   <Col span='8'>
				                               <div>收件人拦截：</div>
                                   </Col>
                                   <Col span='8'>
				                               <Switch checked={orderData.conon} size='small'/>
                                   </Col>
                                   <Col span='8'>
				                               <span>已拦截：<span style={{color:'#F98900'}}>{orderData.consum}</span>&nbsp;笔</span>
                                   </Col>
				                        </Row>
				                    </Col>
				                 </Row>
				                 <Row justify="space-between" style={{height:'50px'}}>
				                    <Col span="12" style={{borderRightStyle:'solid',borderWidth:'1px',borderColor:'#EBEBEB'}}>
                                <Row type="across" style={{paddingTop:'16px'}}>
                                   <Col span='8'>
				                              <div>旺旺过滤：</div>
                                   </Col>
                                   <Col span='8'>
				                              <Switch checked={orderData.wangwang} size='small'/>
                                   </Col>
                                   <Col span='8'>
				                              <span>已拦截：<span style={{color:'#F98900'}}>{orderData.whitesum}</span>&nbsp;笔</span>
                                   </Col>
				                        </Row>
				                    </Col>
				                    <Col span="12">
                                <Row type="across" style={{paddingTop:'16px'}}>
                                   <Col span='8'>
				                              <div>宝贝过滤：</div>
                                   </Col>
                                   <Col span='8'>
				                              <Switch checked={orderData.baby} size='small'/>
                                   </Col>
                                   <Col span='8'>
				                              <span>已拦截：<span style={{color:'#F98900'}}>{orderData.babysum}</span>&nbsp;笔</span>
                                   </Col>
				                        </Row>
				                    </Col>
				                 </Row>
                      </div> 
                </div>
        );
    }
}


function mapStateToProps(state, ownProps){
    return {
       orderData:state.InGeneralSituation.orderData,
       autoSwitchState:state.InGeneralSituation.autoSwitchState
    }
}
function mapDispatchToProps(dispatch,ownProps){
  return bindActionCreators(InGeneralSituationActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InGeneralSituation)
