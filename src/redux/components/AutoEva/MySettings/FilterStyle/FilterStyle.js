import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Button from 'qnui/lib/button';
import Feedback from 'qnui/lib/feedback';
import Radio, { Group as RadioGroup } from 'qnui/lib/radio';
import Checkbox from 'qnui/lib/checkbox';
import Select, {Option} from 'qnui/lib/select';

import './FilterStyle.css'

const { Group: CheckboxGroup } = Checkbox;
class FilterStyle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ['orange'],
            times:1
        };

        this.onChange = this.onChange.bind(this);
    }
    onSelect(value){
        this.setState({
            times:value
        });
    }
    onChange(selectedItems) {
        this.setState({
            value: selectedItems
        });
    }
    render(){
        let dataSource = this.props.dataSource;
        let checkboxValue = [];
        if (dataSource.blackrate) {
            checkboxValue.push('blackrate')
        }
        if (dataSource.blackcloud) {
            checkboxValue.push('blackcloud')
        }
        if (dataSource.zdblackrate) {
            checkboxValue.push('zdblackrate')
        }
        return(
            <div className='filterStyle'>
                <b className="checkboxGroup-head-text">选择订单过滤方式：</b><br />
                <CheckboxGroup className="checkboxGroup" value={checkboxValue} onChange={this.onChange}>
                    <div className="checkbox">
                        <Checkbox id="blackrate" value="blackrate" className="inline-style checkbox-filter"></Checkbox><span className="inline-style">过滤我的黑名单中的买家</span>&nbsp;&nbsp;<Button type="secondary" size="small">查看我的黑名单</Button>&nbsp;&nbsp;<Button type="secondary" size="small">添加黑名单</Button><br />
                    </div>
                    <div className="checkbox">
                        <Checkbox id="blackcloud" value="blackcloud" className="inline-style checkbox-filter"></Checkbox><span className="inline-style">中差评买家自动加入我的黑名单</span>&nbsp;&nbsp;<Button type="secondary" size="small">一键导入历史中差评买家</Button><br />
                    </div>
                    <div className="checkbox">
                        <Checkbox id="zdblackrate" value="zdblackrate" className="inline-style checkbox-filter">
                        </Checkbox>
                        <span  className="inline-style">过滤云黑名单中买家发出</span>
                        <Select onChange={this.onSelect.bind(this)} value={dataSource.blackcloudcount} size="small"  className="inline-style select-filter">
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="5">5</Option>
                        </Select>
                        <span  className="inline-style">次及以上的买家</span>
                    </div>
                </CheckboxGroup>
            </div>
        );
    }
}

export default (FilterStyle)
