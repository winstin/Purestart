import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Button from 'qnui/lib/button';
import Feedback from 'qnui/lib/feedback';
import Radio, { Group as RadioGroup } from 'qnui/lib/radio';
import Select, {Option} from 'qnui/lib/select';

import './EvaStyle.css'

class EvaStyle extends Component {
    onChange(value) {
        this.setState({
            value: value
        });
    }
    onSelect(value){
        this.setState({
            times:value
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            value: '0',
            times:1
        };
        this.onChange = this.onChange.bind(this);
    }
    render(){
        let dataSource = this.props.dataSource;
        return(
            <div className='evaStyle'>
                <b className="radioGroup-head-text">选择评价方式：</b><br />
                <RadioGroup className='radioGroup' value={dataSource.alreadyrate} onChange={this.onChange}>
                    <div className="radio">
                        <Radio id="0" value="0" className='inline-style radio-select'></Radio>
                        <span className='inline-style'>交易成功后立即进行好评。</span>
                    </div>
                    <div className="radio">
                        <Radio id="1" value="1" className='inline-style radio-select'></Radio>
                            <span className='inline-style'>买家评价后立即给予好评；如果买家未评价，则距离默认评价</span>
                            <Select onChange={this.onSelect.bind(this)} value={dataSource.robhouser} size="small"  className="inline-style select-filter">
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                                <Option value="6">6</Option>
                                <Option value="7">7</Option>
                                <Option value="8">8</Option>
                                <Option value="9">9</Option>
                                <Option value="10">10</Option>
                                <Option value="11">11</Option>
                                <Option value="12">12</Option>
                                <Option value="13">13</Option>
                                <Option value="14">14</Option>
                                <Option value="15">15</Option>
                                <Option value="16">16</Option>
                                <Option value="17">17</Option>
                                <Option value="18">18</Option>
                                <Option value="19">19</Option>
                                <Option value="20">20</Option>
                                <Option value="21">21</Option>
                                <Option value="22">22</Option>
                                <Option value="23">23</Option>
                            </Select>
                            <span className='inline-style'>小时前，进行评价。</span>
                    </div>
                    <div className="radio">
                        <Radio id="2" value="2" className='inline-style radio-select'></Radio>
                            <span className='inline-style'>买家确认收货后</span>
                            <Select onChange={this.onSelect.bind(this)} value={dataSource.timingday} size="small"  className="inline-style select-filter">
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                                <Option value="6">6</Option>
                                <Option value="7">7</Option>
                                <Option value="8">8</Option>
                                <Option value="9">9</Option>
                                <Option value="10">10</Option>
                                <Option value="11">11</Option>
                                <Option value="12">12</Option>
                                <Option value="13">13</Option>
                                <Option value="14">14</Option>
                            </Select>
                            <span className='inline-style'>天</span>
                            <Select onChange={this.onSelect.bind(this)} value={dataSource.timinghouser} size="small"  className="inline-style select-filter">
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                                <Option value="6">6</Option>
                                <Option value="7">7</Option>
                                <Option value="8">8</Option>
                                <Option value="9">9</Option>
                                <Option value="10">10</Option>
                                <Option value="11">11</Option>
                                <Option value="12">12</Option>
                                <Option value="13">13</Option>
                                <Option value="14">14</Option>
                                <Option value="15">15</Option>
                                <Option value="16">16</Option>
                                <Option value="17">17</Option>
                                <Option value="18">18</Option>
                                <Option value="19">19</Option>
                                <Option value="20">20</Option>
                                <Option value="21">21</Option>
                                <Option value="22">22</Option>
                                <Option value="23">23</Option>
                            </Select>
                            <span className='inline-style'>小时，进行评价。</span>
                    </div>
                </RadioGroup>
            </div>
        );
    }
}

export default (EvaStyle)
