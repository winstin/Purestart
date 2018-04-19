import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React,{Component,PropTypes} from 'react'
import Table from 'qnui/lib/table'
import Button from 'qnui/lib/button'
import {api} from '../../../actions/AY_API.js'

let StockDetailOperJournal = React.createClass({
    getInitialState:function(){
        return {
            detailOperlog:[]
        };
    },
    componentDidMount:function(){
        api("ebs.item.detailoglist", {}, function(e){
            this.setState({
                detailOperlog:e.result
            });
        }.bind(this))
    },
    detailOper:function(value){
        return (
            <a style={{color:"#008BDC"}} >{value}</a>
        );
    },
    goodsInfo:function(value){
        return(
            <div><img src={value.pic_path} style={{width:30, height:30, float:'left'}}/><span style={{float:'left'}}>{value.title}</span></div>
        );
    },

    render:function(){
        const getData = () =>{
            let result = [];
            this.state.detailOperlog.map((logs)=>{
                result.push({
                    info: {
                        pic_path:logs.pic_path,
                        title:logs.title
                    },
                    outer_id:logs.outer_id,
                    prop_name: logs.prop_name,
                    before_num: logs.before_num,
                    num:logs.num
                })
            })
            return result;
        }
        return (
            <div>
                <Button type="secondary" onClick={this.props.changePage} style={{margin:"10px 0"}}>返回操作日志总列表</Button>
                <Table dataSource={getData()}>
                    <Table.Column title="商品信息" dataIndex="info" cell={this.goodsInfo}/>
                    <Table.Column title="商家编码" dataIndex="outer_id" />
                    <Table.Column title="规格" dataIndex="prop_name"/>
                    <Table.Column title="盘点数量" dataIndex="before_num" />
                    <Table.Column title="盘点后的数量" dataIndex="num" />
                </Table>
            </div>
        );
    }
})

export default StockDetailOperJournal
