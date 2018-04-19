/**
 @author Mothpro
**/
import React, { Component, PropTypes } from 'react'
import Balloon from 'qnui/lib/balloon';
import FlagIcon from '../../../components/FlagIcon';
import StoreIcon from '../../../components/StoreIcon'
import _ from 'lodash';
import {api} from '../../actions/AY_API'
import Dialog from 'qnui/lib/dialog';
import GoodsListTable from './GoodsListTable'
let recordvalue = "";
let typevalue = "";
let listener = false;
export default  class Data{
    constructor(){
        return this.getData();

    }
    ebsTypeCell(value){//分类Cell
        return value;
    }
    listPriceCell(value, index, record){//售价Cell
        if(record.is_only == 1){
            return (<div onClick={this.editOuterId.bind(this,record,"price")}><span id = {'pricevalue'+record.num_iid}>{value}</span><input id = {'price'+record.num_iid}  placeholder={value}  style={{display:"none",width:"80px"}}/></div>);
        }else{
            return value;
        }
    }
    outerIdCell(value, index, record){//商家编码Cell
        if(_.isEmpty(value)){
            return (<div onClick={this.editOuterId.bind(this,record,"outerid")}><span id = {'outeridvalue'+record.num_iid}>----</span><input id = {'outerid'+record.num_iid}  placeholder={value}  style={{display:"none",width:"100px"}}/></div>);
        }else{
            return (<div onClick={this.editOuterId.bind(this,record,"outerid")}><span id = {'outeridvalue'+record.num_iid}>{value}</span><input id = {'outerid'+record.num_iid}  placeholder={value}  style={{display:"none",width:"100px"}}/></div>);
        }
    }
    nameCell(value, index, record){//商品信息/规格Cell
        return (
            <Balloon closable={false} trigger={<div><span style={{float:"left",width:"15%"}}><img style={{width:"40px"}} src={record.pic_path}/></span><span style={{float:"left",width:"85%",lineHeight:"20px"}}>{value}</span></div>} triggerType="hover">
                        <img style={{width:"150px"}} src={record.pic_path}/>
                    </Balloon>);
    }
    storeIdCell(value){//店铺Cell
        if(_.isEmpty(value)){
            return value;
        }else{
            return (<StoreIcon storeType={value} storeIndex="1" />);
        }
    }
    operationCell(){//操作Cell
        return (<span style={{backgroundColor:"#f9f9fa"}}><a style={{color:"#76abe9"}}>详情</a><a style={{marginLeft:"10px",color:"#76abe9"}} onClick={this.showlog.bind(this)}>日志</a><a style={{marginLeft:"10px",color:"#76abe9"}}>编辑</a></span>
        );
    }
    barCodeCell(value){//商品条码Cell
        return value;
    }
    forShortCell(value, index, record){//商品简称

        if(_.isEmpty(value)){
            return (<div onClick={this.editOuterId.bind(this,record,"forShort")}><span id = {'forShortvalue'+record.num_iid}>----</span><input id = {'forShort'+record.num_iid}  placeholder={value}  style={{display:"none",width:"100px"}}/></div>);
        }else{
            return (<div onClick={this.editOuterId.bind(this,record,"forShort")}><span id = {'forShortvalue'+record.num_iid}>{value}</span><input id = {'forShort'+record.num_iid}  placeholder={value}  style={{display:"none",width:"100px"}}/></div>);
        }
    }
    editOuterId(record,type){//行内操作展示弹框
        recordvalue  = record;
        typevalue = type;
        console.log(record);
        console.log(type);
        if(listener){
        }else{
            window.addEventListener('keydown', this.handleKeyDown.bind(this));
            listener = true;
        }
        document.getElementById(type+record.num_iid).style.display="block";
        document.getElementById(type+"value"+record.num_iid).style.display="none";
    }
    handleKeyDown(e){//行内操作触发的方法 改价 改简称等
        if(e.keyCode == 13){
            console.log(13);
            let condition = "";
            let inputvalue = document.getElementById(typevalue+recordvalue.num_iid).value;
            switch(typevalue){
                case "outerid":
                    condition = {
                        'outer_id':inputvalue,
                        'short_title':"",
                        'ebs_iid':recordvalue.ebs_iid
                    };
                    break;
                case "forShort":
                    condition = {
                        'outer_id':"",
                        'short_title':inputvalue,
                        'ebs_iid':recordvalue.ebs_iid
                    };
                    break;
                case "price":
                    condition = {
                        'outer_id':"",
                        'list_price':inputvalue,
                        'ebs_iid':recordvalue.ebs_iid
                    };
                    break;
            }
            api("ebs.item.updateGoodsMessage",condition,function(rsp){
                let result = rsp.result;
                if(rsp.result){
                    console.log(rsp.result);
                    document.getElementById(typevalue+recordvalue.num_iid).style.display="none";
                    document.getElementById(typevalue+"value"+recordvalue.num_iid).style.display="block";
                    document.getElementById(typevalue+"value"+recordvalue.num_iid).innerHTML=inputvalue;

                }
            }.bind(this));
        }
    }

    getData(){
        let store_id_filters = [
            {label:"淘宝",value:"TB"},
            {label:"京东",value:"JD"},
            {label:"天猫",value:"TM"},
            {label:"1688",value:"1688"}
        ];
        let filters = [{label: '包含1',value: 6},{label: '包含2',value: 2},
        {label: '包含3',value: 3,children:[{label: '张宏志',value: '张宏志'},{label: '旗子0',value: 0},{label: '旗子1',value: 1},{label: '旗子2',value: 2}]}];
        return [
                {'title':'商品信息/规格','value':'title','cell':this.nameCell.bind(this),'checked':true,'sortable':false,'filters':filters,'filterMode':"multiple",'width':400},
                {'title':'商品简称','value':'short_title','cell':this.forShortCell.bind(this),'checked':true,'sortable':false,'filters':filters,'filterMode':"multiple",'width':200},
                {'title':'分类','value':'ebs_type','cell':this.ebsTypeCell,'checked':true,'sortable':false,'filters':filters,'filterMode':"multiple",'width':200},
                {'title':'商家编码','value':'outer_id','cell':this.outerIdCell.bind(this),'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':150},
                {'title':'商品条码','value':'barcode','cell':this.barCodeCell,'checked':true,'sortable':true,'filters':false,'filterMode':null,'width':150},
                {'title':'售价','value':'list_price','cell':this.listPriceCell.bind(this),'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':100},
                {'title':'店铺','value':'store_id','cell':this.storeIdCell,'checked':true,'sortable':false,'filters':store_id_filters,'filterMode':"multiple",'width':150},
            ];
    }
}
