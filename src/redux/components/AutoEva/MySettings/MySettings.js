import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Table from 'qnui/lib/table';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Feedback from 'qnui/lib/feedback';
import Switch from 'qnui/lib/switch';
import Notice from 'qnui/lib/notice';
import Radio, { Group as RadioGroup } from 'qnui/lib/radio';

import EvaStyle from './EvaStyle/EvaStyle';
import FilterStyle from './FilterStyle/FilterStyle';
import EvaSettings from './EvaSettings/EvaSettings';


class MySettings extends Component {
    onChange(value) {
        this.setState({
            value: value
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            value: 'orange'
        };
        this.onChange = this.onChange.bind(this);
    }
    render(){
        return(
            <div>
                <div>
                    <Feedback title="" type='prompt'>
                        <span style={{fontSize:'12px'}}>提示：1.自动评价功能开启之前的订单不会自动评价请手动<a style={{color:'#4990E2'}}>批量评价</a> 2.自动评价系统默认给买家好评 3.自动评价不支持天猫卖家</span>
                    </Feedback>
                </div>
                <EvaStyle dataSource={this.props.dataSource}/>
                <FilterStyle dataSource={this.props.dataSource}/>
                <EvaSettings dataSource={this.props.dataSource}/>
            </div>
        );
    }
}

export default (MySettings)
