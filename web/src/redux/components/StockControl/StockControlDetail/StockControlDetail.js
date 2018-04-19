import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import Tab from 'qnui/lib/tab'
import Icon from 'qnui/lib/icon'
import Table from 'qnui/lib/table'
import Checkbox from 'qnui/lib/checkbox'
import {api} from '../../../actions/AY_API.js'

let StockControlDetail =  React.createClass({
    getInitialState:function(){
        return {
            operloglist:[]
        };
    },
    componentDidMount:function(){
        const condition = {
            sku_product_id:this.props.record.sku_product_id,
            remark:"库存管理"
        }
        api("ebs.item.operloglist", condition, function(e){
            this.setState({
                operloglist:e.result
            });
        }.bind(this))
    },
    render:function(){
        return(
            <div className="oper-log">
                {
                    this.state.operloglist.map((logs)=>{
                        return(
                            <div className="detail-log">
                                <span>{logs.oper_time}</span>
                                <span>【{logs.oper_nick}】</span>
                                <span>{logs.detail}</span>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
});



export default StockControlDetail
