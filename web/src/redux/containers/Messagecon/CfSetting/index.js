import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Button from 'qnui/lib/button';
import 'qnui/lib/grid/index.css';
import { Row, Col } from 'qnui/lib/grid';
import './cf.css';
import Select, {Option} from 'qnui/lib/select';
import Checkbox from 'qnui/lib/checkbox';
import Radio,{ Group as RadioGroup } from 'qnui/lib/radio';
import Feedback from 'qnui/lib/feedback';
import Input from 'qnui/lib/input';
import Cfsetting from '../../../components/Messagecon/Cfsetting'

class Cfset extends Component {
	constructor(props) {
        super(props);
        this.state = {
            value : '1',
            val: 'one',
            othercard:'',
            money:'0.00'
        };
        this.onChange = this.onChange.bind(this);
    }
    onSelect(value){
        this.setState({
            value
        });
    }
    componentWillMount() {  
        this.Save()
    }
    Setting(){
    	this.setState({othercard:(
    					<div>
				            <span className='set'>当前设置的最低订单金额:</span>
					        <span className='set'>元 </span>
					        <div>
					            <Input className="textClsName" placeholder="0.00" size="small"  onChange={this.setnum.bind(this)}/>
					            <Button  type="primary" size="small" style={{marginLeft:'14px'}} onClick={this.Save.bind(this)}>保存</Button>
				            </div>
			            </div>
			            )})
    }
    onChange(value) {
        this.setState({
            val: value
        });
    }
    setnum(value){
    	this.setState({money:value})
    }
    Save(){
    	this.setState({othercard:(<div style={{marginTop:'10px'}}>
					            <span className='set'>当前设置的最低订单金额:</span>
					            <span style={{fontSize:'12px',color:'#003B00'}}>{this.state.money}</span>
					            <span className='set'>元 </span>
					            <span style={{height:'20px',color:'#4990E2',marginLeft:'12px',cursor:"pointer"}} onClick={this.Setting.bind(this)}>设置</span>
				            </div>)})
    }

	render(){
		  return (
        	<Cfsetting/>
        );
	}
} 
      

export default Cfset
