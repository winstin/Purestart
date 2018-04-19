import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Input from 'qnui/lib/input'
import Button from 'qnui/lib/button'
import Feedback from 'qnui/lib/feedback'
import Dialog from 'qnui/lib/dialog'
import {api} from '../../actions/AY_API'
import StoreIcon from '../../../components/StoreIcon'
import * as GoodsListTableActions from '../../actions/GoodsListTable'
import Table from 'qnui/lib/table'
import './GoodsListTable.css'
class GoodsSkuTable extends Component {
    constructor() {
        super();
        this.state = {
            defaultValue:[],
            showInput:"input-none",
            showtext:"input-show",
            record:"",
            index:"",
            store_id:"",
            listener:false
            }
        }
    componentDidMount(){
        const {productId,store_id} = this.props;
        let condition = {
            'ebs_iid':productId
        };
        api("ebs.item.getItemSkuMessage",condition,function(e){
            let result = e.result;
            this.setState({
                defaultValue:result,
                store_id:store_id
            });
        }.bind(this));
    }

    nameCell(value,index,record){
        return (<div><span style={{float:"left",width:"15%"}}><img style={{width:"40px"}} src={record.pic_path}/></span><span style={{float:"left",width:"85%",lineHeight:"20px"}}>{record.prop_name}</span></div>);
    }
    storeIdCell(value){
        const {productId,store_id} = this.props;
        if(_.isEmpty(store_id)){
            return store_id;
        }else{
            return (<StoreIcon storeType={store_id} storeIndex='1' />);
        }
    }
    operationCell(value,index,record){
        const {productId,store_id,showlog} = this.props;
        return (<span><a style={{color:"#76abe9"}}>详情</a><a style={{marginLeft:"10px",color:"#76abe9"}} onClick={()=>{showlog(record);}}>日志</a><a style={{marginLeft:"10px",color:"#76abe9"}}>编辑</a></span>);
    }
    barCodeCell(value,index,record){
        if(_.isEmpty(value)){
            return (<div onClick={this.showinput.bind(this,index,record)}><span  className={this.state.showtext} id = {'text'+record.ebs_sku_id}>点击扫码录入</span><input id = {'mycodeinput'+record.ebs_sku_id} ref="myInput" placeholder="支持扫码录入" className={this.state.showInput} style={{width:"100px"}} /></div>);
        }else{
            return value;
        }
    }
    listPriceCell(value,index,record){
        const {productId,store_id,changePrice} = this.props;
        return(<div onClick={()=>{changePrice(record);}} id={"skupicevalue"+record.ebs_sku_id}>{value}</div>);
    }
    showinput(index,record){//行内操作展示input框
        console.log(index);
        this.setState({
            record:record,
            index:index
        });
        if(this.state.listener){

        }else{
            window.addEventListener('keydown', this.handleKeyDown.bind(this));
            this.setState({
                listener:true
            });
        }
        document.getElementById("mycodeinput"+record.ebs_sku_id).style.display="block";
        document.getElementById("text"+record.ebs_sku_id).style.display="none";
        var input = document.getElementById("mycodeinput"+record.ebs_sku_id).focus();
    }
    handleKeyDown(e){//录入商品sku编码触发的方法
        if(e.keyCode == 13){
            var codevalue = document.getElementById("mycodeinput"+this.state.record.ebs_sku_id).value;
            console.log(codevalue);
            console.log(this.state.record.ebs_sku_id);
            console.log(this.state.defaultValue[this.state.index].sub_barcode);
            let condition = {
                'sub_barcode':codevalue,
                'sku_product_id':this.state.record.ebs_sku_id
            };
            api("ebs.item.setGoodsBarcode",condition,function(rsp){
                let result = rsp.result;
                console.log(result);
                if(rsp.result){
                    this.state.defaultValue[this.state.index].sub_barcode = codevalue;
                    this.setState({
                        showtext:"input-block",
                        defaultValue : this.state.defaultValue
                    });
                }
                console.log(result);
            }.bind(this));
        }
    }
    render() {
        return (
            <div style={{marginLeft:"55px"}}>
                <input style={{position: "absolute",zIndex:"-1" }}ref="myCodeInput"/>
                <Table dataSource={this.state.defaultValue} hasHeader={false} hasBorder={false}>
                    <Table.Column  dataIndex="name" style={{'width':"400px"}} cell={this.nameCell}/>
                    <Table.Column  dataIndex="jiancheng" style={{'width':"200px"}}/>
                    <Table.Column  dataIndex="brandcat" style={{'width':"200px"}}/>
                    <Table.Column  dataIndex="outer_id" style={{'width':"150px"}}/>
                    <Table.Column  dataIndex="sub_barcode" style={{'width':"150px"}} cell={this.barCodeCell.bind(this)}/>
                    <Table.Column  dataIndex="price" style={{'width':"100px"}} cell={this.listPriceCell.bind(this)}/>
                    <Table.Column  dataIndex="store_id" style={{'width':"150px"}}  cell={this.storeIdCell.bind(this)}/>
                    <Table.Column  dataIndex="time" style={{'width':"150px"}} cell={this.operationCell.bind(this)}/>
                </Table>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        orderTotal:state.GoodsListTable.orderTotal,
        isLoading:state.GoodsListTable.isLoading,
        orderData:state.GoodsListTable.orderData,
        selectCondition:state.GoodsListTable.selectCondition,
        ItemsSelected_arr:state.GoodsListTable.ItemsSelected_arr,
        itemsClassData:state.GoodsListTable.itemsClassData,
        result:state.GoodsListTable.result,
        isshow:state.GoodsListTable.isshow,
    }
}

function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(GoodsListTableActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsSkuTable)
