import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Table from 'qnui/lib/table'
import Button from 'qnui/lib/button'
import {api} from '../../../actions/AY_API.js'

let StockOperJournal = React.createClass({
    getInitialState:function(){
        return {
            operlog:[]
        };
    },
    componentDidMount:function(){
        const condition = {
            remark:"库存盘点"
        }
        api("ebs.item.operloglist", condition, function(e){
            this.setState({
                operlog:e.result
            });
        }.bind(this))
    },
    detailOper:function(value){
        return (
            <a  style={{color:"#008BDC"}} onClick={this.props.changePage}>{value}</a>
        );
    },
    render:function(){
        const getData = () =>{
            let result = [];
            this.state.operlog.map((logs)=>{
                result.push({
                    oper_time: logs.oper_time,
                    num: logs.num,
                    oper_nick: logs.oper_nick,
                    operation: "查看操作"
                })
            })
            return result;
        }
        return (
            <div>
                <div className="operJounal">
                    <Table dataSource={getData()}>
                        <Table.Column title="盘点时间" dataIndex="oper_time"/>
                        <Table.Column title="盘点数量" dataIndex="num" />
                        <Table.Column title="盘点人" dataIndex="oper_nick"/>
                        <Table.Column title="操作" dataIndex="operation" cell={this.detailOper}  />
                    </Table>
                </div>

            </div>
        );
    }
})

export default StockOperJournal
