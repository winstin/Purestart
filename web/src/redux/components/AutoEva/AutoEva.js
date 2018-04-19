import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Table from 'qnui/lib/table';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Feedback from 'qnui/lib/feedback';
import Switch from 'qnui/lib/switch';

import MySettings from './MySettings/MySettings';
import MyBlackList from './MyBlackList/MyBlackList';
import MyEvaLog from './MyEvaLog/MyEvaLog';

import * as AutoAction from '../../actions/AutoEva'
import {ajax} from "../../actions/AY_API"

import './main.css'
class AutoEva extends Component {
    componentWillMount() {
        console.log('Component WILL MOUNT!');
        console.log(window.user_nick);
        const {getInitData} = this.props;
        getInitData();
    }
    render(){

        const {add, value, changeAutoEvaSwitchState, changeRadioSwitchState, dataSource, radioSwitchState, autoSwitchState} = this.props;
        const TabPane = Tab.TabPane;
        const extraContent = <div className="radio-state"><div className='text-radio-state'>中差评电台提醒：</div><Switch className="radio-switch" checked={radioSwitchState} size="small" onChange={(radioSwitchState)=>{changeRadioSwitchState(radioSwitchState)}} /></div>;
        return(
            <div>
                <div className='title'>
                    <div className='text-state'>
                        <b>开关状态：</b>
                    </div>
                    <Switch className="autoeva-switch" checked={autoSwitchState} onChange={()=>{changeAutoEvaSwitchState(autoSwitchState)}} />
                    <div className='text-num'><b>爱用报告：您有待执行订单<a className='num'>0</a>笔;累计评价成功<a className='num'>0</a>笔;过滤<a className='num'>0</a>笔;失败<a className='num'>0</a>笔。</b></div>
                    <a className='text-help'>使用帮助</a>
                </div>
                <Tab type="bar" onChange={(key)=>{console.log(key)}} tabBarExtraContent={extraContent}>
                  <TabPane tab="我的设置" key="1"><MySettings dataSource={dataSource} /></TabPane>
                  <TabPane tab="我的黑名单" key="2"><MyBlackList /></TabPane>
                  <TabPane tab="我的评价日志" key="3"><MyEvaLog /></TabPane>
                </Tab>

                {/* <div>
                    <span>{value}</span>
                  <Button type="primary" onClick={()=>{add(value)}}>Add</Button>
                </div> */}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        value:state.AutoEva.value,
        autoSwitchState:state.AutoEva.autoSwitchState,
        radioSwitchState:state.AutoEva.radioSwitchState,
        dataSource:state.AutoEva.dataSource
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( AutoAction , dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoEva)
