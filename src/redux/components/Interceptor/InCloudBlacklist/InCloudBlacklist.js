import React,{Component,PropTypes} from 'react';
import { connect } from 'react-redux';
import Radio,{ Group as RadioGroup } from 'qnui/lib/radio';
import Button from 'qnui/lib/button';
import Icon from 'qnui/lib/icon';
import {ajax} from "../../../actions/AY_API";

const list = [
    {
        value: 'one',
        disabled: false
    }, {
        value: 'two',
        disabled: false
    }, {
        value: 'three',
        disabled:false
    }
];
class  InCloudBlacklist extends Component{

      constructor(props) {
   	    
        super(props);
        this.state = {
            value:'one',
        };

        this.onChange = this.onChange.bind(this);

    }
	
	 onChange(selectedItems) {

        this.setState({
            value: selectedItems
        });
        
        /*保存选择到数据库*/
        ajax("/iytrade2/savetype",{usernick:window.user_nick,value:selectedItems,type:'cloud'},"POST",function(e){
            console.log("----------保存成果")
        })
    }

    render(){
        return ( 
          <div>
          	   <div style={{fontWeight:'600'}}>设置曾发出过中差评的买家：</div>
	           <div style={{height:'30px',backgroundColor:'#FEF1E8',marginTop:'10px',paddingTop:'8px'}}>
                 &nbsp;&nbsp;<Icon  style={{color:'orange'}} type="warning" size="xs"/>&nbsp;&nbsp;  
                 <span>提示：符合任一选中状态的买家都会拦截,不能购买您的宝贝,拍下订单10秒后,订单将自动关闭。</span>
               </div>
	           <div style={{marginTop:'10px'}}>
	              <span>设置拦截条件：</span>
	           </div>
	           <RadioGroup dataSource={list} value={this.state.value} onChange={this.onChange}>
		           <div style={{marginTop:'10px'}}>
		              <Radio id="firstTime" value='one'/><label htmlFor='firstTime'>曾发出过一次中差评的买家</label>
		           </div>
		           <div style={{marginTop:'10px'}}>
		              <Radio id="secondTime" value='two'/><label htmlFor='secondTime'>发出过二次及以上的中差评的买家</label>
		           </div>
		           <div style={{marginTop:'10px'}}>
		              <Radio id="fiveTime" value='three' /><label htmlFor='fiveTime'>发出过五次及以上的中差评的买家</label>
	           </div> 
	           </RadioGroup>
          </div>
        )
    }
}

export default InCloudBlacklist