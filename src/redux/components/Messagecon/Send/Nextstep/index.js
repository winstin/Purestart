import React,{Component,PropTypes} from 'react'
import Table from 'qnui/lib/table'
import Checkbox from 'qnui/lib/checkbox'
import Button from 'qnui/lib/button';
import Feedback from 'qnui/lib/feedback';
import Step, { Item as StepItem } from 'qnui/lib/step';
import { Row, Col } from 'qnui/lib/grid';
import { Link } from 'react-router'
import Input from 'qnui/lib/input';
export default class Nextstep extends Component {
  render(){
        return(
              <div>
	                <Feedback title="" type='prompt'>
			       		<span className='set'>由于短信运营商规则调整，在23:00-次日08:00之间的短信将于08:00之后送达。</span>
			        </Feedback>
			        <div style={{marginTop:'10px'}}/>
			            <Step current={1} type="arrow">
					        <StepItem title="1.筛选会员" />
					        <StepItem title="2.编辑内容并发送" />
					    </Step>
				    <div style={{marginTop:'15px'}}/>
					<Row>
					    <span style={{fontSize:'14px',marginTop:'7px',width:'150px'}}>文本标签(可插入)：</span>
					 	<Link style={{height:'20px',color:'#4990E2',marginLeft:'0px',cursor:"pointer",marginTop:'7px',}}>卖家旺旺</Link> 
					 	<Link style={{height:'20px',color:'#4990E2',marginLeft:'12px',cursor:"pointer",marginTop:'7px',}}>店铺名称</Link> 
					 	<Link style={{height:'20px',color:'#4990E2',marginLeft:'12px',cursor:"pointer",marginTop:'7px',}}>店铺链接</Link> 
					</Row>
					<div style={{marginTop:'15px'}}/>
					<Row>
					    <span style={{fontSize:'14px',marginTop:'7px',width:'100px'}}>短信内容：</span>
					 	<Link style={{height:'20px',color:'#4990E2',marginLeft:'0px',cursor:"pointer",marginTop:'7px',}}>插入短信模板</Link> 
					</Row>
					<div style={{marginTop:'15px'}}/>
					<Row>
						<Input multiple  style={{border: '1px solid #CCCCCC',width:'80%',height:'180px'}}/>
					</Row>
					<div style={{marginTop:'15px'}}/>
					<Row>
					    <span style={{fontSize:'14px',marginTop:'7px',width:'100px'}}>短信内容预览：</span>
					</Row>
					<div style={{marginTop:'15px'}}/>
					<Row>
						<Input multiple  style={{border: '1px solid #CCCCCC',width:'80%',height:'100px'}}/>
					</Row>
					<Row>
						 <span style={{fontSize:'14px',marginTop:'7px',width:'100px'}}>此次消耗约</span>
						 <span style={{fontSize:'14px',marginTop:'7px',width:'20px',color:'#003B00'}}>7</span>
						 <span style={{fontSize:'14px',marginTop:'7px',width:'10px'}}>条</span>
					</Row>
					<div style={{marginTop:'15px'}}/>
					<Row>
				        <Button type="primary" style={{width:'100px'}} >查询</Button>
				        <Button type="primary" style={{width:'100px',marginLeft:'20px'}}  >下一步</Button>
				    </Row>
              </div>
        );
    }
}
