import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import './main.css'
/**
 * StoreIcon
 * storeType 店铺所属体系
 * storeIndex 店铺序号
 *1688 #ff6500
 *JD #dc0000
 *TB #ff5600
 *TM #d20000
 */
let StoreIcon = React.createClass({
    render:function(){
        let iconColor = "";
        switch (this.props.storeType) {
            case "1688":
                iconColor = "#ff6500";
                break;
            case "JD":
                iconColor = "#dc0000";
                break;
            case "TB":
                iconColor = "#ff5600";
                break;
            case "TM":
                iconColor = "#d20000";
                break;
            default:
                iconColor = "#ff6500";
        }
        return (
            <div className="flag-icon" style={{backgroundColor:iconColor}}>{this.props.storeIndex}</div>
        );
    }
});

export default StoreIcon
