import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Button from 'qnui/lib/button';
import 'qnui/lib/grid/index.css';
import { Row, Col } from 'qnui/lib/grid';
import Tab from 'qnui/lib/tab';
import Dialog from 'qnui/lib/dialog';
import Input from 'qnui/lib/input';
import Table from 'qnui/lib/table';
import * as MessageActions from '../../../actions/Message'

const TabPane = Tab.TabPane;

 

class Czbutton extends Component {
	constructor(props, context){
        super(props, context);
        this.state = {
      	visible0: false,
  		}
    }
   	handleChange = (key) =>  {
	    if(key == '2'){
	    	this.props.initcz()
	    }else{
	    	console.log(key);
	    }
	}
    onClose0 = () => {
	  this.setState({
	      visible0: false
	  })
	}
	ljcz = () =>{
		this.setState({
	          visible0: true
	      })
	}
    render(){
    	let len = ''
    	if(this.props.cz.log){
    		len = this.props.cz.log.length
    	}else{
    		len = '0'
    	}
        return (
        	<div>
        		<Button  type="primary" onClick={this.ljcz} style={{width:'150px'}}>{this.props.content}</Button>
        		<Dialog visible = {this.state.visible0}  style={{width:'650px',height:'480px'}} minMargin = {50} shouldUpdatePosition
                    onOk = {this.onClose0}
                    onCancel = {this.onClose0}
                    onClose = {this.onClose0} title = "指定号码发送">
                    <Tab defaultActiveKey="1" onChange={this.handleChange}>
				        <TabPane tab="短信充值" key="1">
					        <Row className="demo-row" >
					            <div style={{width:'180px',border:'1px solid #D0D0D0',textAlign:"center",paddingTop:'10px'}}>
					            	<div>充值短信(条)</div>
					            	<span className="num">500</span>
					            	<div style={{marginTop:'5px'}}>优惠价35元</div>
					            	<div style={{marginTop:'5px'}}>约7分/条</div>
					            	<Button  type="primary" style={{marginBottom:'10px',marginTop:'5px'}}>立即购买</Button>
					            </div>
					            <div style={{width:'180px',border:'1px solid #D0D0D0',textAlign:"center",paddingTop:'10px',marginLeft:'15px'}}>
					            	<div>充值短信(条)</div>
					            	<span className="num">1500</span>
					            	<div style={{marginTop:'5px'}}>优惠价100元</div>
					            	<div style={{marginTop:'5px'}}>约6.6分/条</div>
					            	<Button  type="primary" style={{marginBottom:'10px',marginTop:'5px'}}>立即购买</Button>
					            </div>
					            <div style={{width:'180px',border:'1px solid #D0D0D0',textAlign:"center",paddingTop:'10px',marginLeft:'15px'}}>
					            	<div>充值短信(条)</div>
					            	<span className="num">6000</span>
					            	<div style={{marginTop:'5px'}}>优惠价360元</div>
					            	<div style={{marginTop:'5px'}}>约6分/条</div>
					            	<Button  type="primary" style={{marginBottom:'10px',marginTop:'5px'}}>立即购买</Button>
					            </div>
					        </Row>
					        <Row className="demo-row" style={{marginTop:'15px'}}>
					            <div style={{width:'180px',border:'1px solid #D0D0D0',textAlign:"center",paddingTop:'10px'}}>
					            	<div>充值短信(条)</div>
					            	<span className="num">15000(热)</span>
					            	<div style={{marginTop:'5px'}}>优惠价800元</div>
					            	<div style={{marginTop:'5px'}}>约5.3分/条</div>
					            	<Button  type="primary" style={{marginBottom:'10px',marginTop:'5px'}}>立即购买</Button>
					            </div>
					            <div style={{width:'180px',border:'1px solid #D0D0D0',textAlign:"center",paddingTop:'10px',marginLeft:'15px'}}>
					            	<div>充值短信(条)</div>
					            	<span className="num">40000(热)</span>
					            	<div style={{marginTop:'5px'}}>优惠价1800元</div>
					            	<div style={{marginTop:'5px'}}>约4.5分/条</div>
					            	<Button  type="primary" style={{marginBottom:'10px',marginTop:'5px'}}>立即购买</Button>
					            </div>
					            <div style={{width:'180px',border:'1px solid #D0D0D0',textAlign:"center",paddingTop:'10px',marginLeft:'15px'}}>
					            	<div>自定义</div>
					            	<Input style={{width:'80px'}} value={'1500'}></Input>
					            	<div style={{marginTop:'5px'}}>优惠价96元</div>
					            	<div style={{marginTop:'5px'}}>约6.4分/条</div>
					            	<Button  type="primary" style={{marginBottom:'10px',marginTop:'5px'}}>立即购买</Button>
					            </div>
					        </Row>
				        </TabPane>
				        <TabPane tab="充值记录" key="2" >
				        	<span style={{fontSize:'14px'}}>剩余条数:</span>
							<span className="num">{len}</span>
							<span style={{fontSize:'14px'}}>条记录</span>
							<Table dataSource={this.props.cz.log} >
							    <Table.Column title="购买时间" dataIndex="paytime"/>
							    <Table.Column title="套餐包" dataIndex="price" />
							    <Table.Column title="金额" dataIndex="typetitle"/>
							</Table>
				        </TabPane>
		    		</Tab>
            	</Dialog>
        	</div>
        );
    }
}
function mapStateToProps(state, ownProps){
    return {
       	slogdata:state.Message.slogdata,
       	Vipnum:state.Message.Vipnum,
       	smsnum:state.Message.smsnum,
       	cz:state.Message.cz
    }
}
function mapDispatchToProps(dispatch,ownProps){
	return bindActionCreators(MessageActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Czbutton)
