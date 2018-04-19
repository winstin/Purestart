import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

/**
 * FlagIcon
 * type 1、2、3、4、5 分别对应  红、黄、绿、蓝、紫
 */
let FlagIcon = React.createClass({
    render:function(){
        return (
            // <img src={`image/flag${this.props.type}.png`} />
            <img src={`//cdn.zzgdapp.com/trade/web/images/op_memo_${this.props.type}.png`}/>
        );
    }
});

export default FlagIcon
