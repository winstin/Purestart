import React, { Component, PropTypes } from 'react'
import Select from 'qnui/lib/select';
const logisticss = [
    {
        value:'ems',
        text:'中国邮政小包'
    }
    {
        value:'ytkd',
        text:'圆通快递'
    }
];
class EbsSeclet extends Component{
    render(){
        return(
            <Select  placeholder="选择尺寸" onChange="" value="ems"  >
                    <Option value="ems">中国邮政小包</Option>
                    <Option value="ydkd">圆通快递</Option>
            </Select>
        )
    }
}

export default EbsSeclet
