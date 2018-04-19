import React from 'react'
import Checkbox from 'qnui/lib/checkbox'
import Button from 'qnui/lib/button'
import {api} from '../../../actions/AY_API'
import './DeliveryModal.css'

let DeliveryModal = React.createClass({
    getInitialState:function(){
        let delivery_modal = {
            fhdCompanyName:{
                checked:false,
                data:[]
            },
            fhdId:{
                checked:false,
                data:[]
            },
            fhdOrderId:{
                checked:false,
                data:[]
            },
            fhdBuyTime:{
                checked:false,
                data:[]
            },
            fhdBuyerId:{
                checked:false,
                data:[]
            },
            fhdTakeMessage:{
                checked:false,
                data:[]
            },
            fhdBuyerMessage:{
                checked:false,
                data:[]
            },
            fhdSeqNum:{
                checked:false,
                data:[]
            },
            fhdGoodsId:{
                checked:false,
                data:[]
            },
            fhdGoodsName:{
                checked:false,
                data:[]
            },
            fhdGoodsShortName:{
                checked:false,
                data:[]
            },
            fhdFormat:{
                checked:false,
                data:[]
            },
            fhdGoodsNum:{
                checked:false,
                data:[]
            },
            fhdPrice:{
                checked:false,
                data:[]
            },
            fhdItemBenefit:{
                checked:false,
                data:[]
            },
            fhdItemMoney:{
                checked:false,
                data:[]
            },
            fhdTotalMoney:{
                checked:false,
                data:[]
            },
            fhdCarriage:{
                checked:false,
                data:[]
            },
            fhdTotalNum:{
                checked:false,
                data:[]
            },
            fhdBenefit:{
                checked:false,
                data:[]
            },
            fhdReallyMoney:{
                checked:false,
                data:[]
            },
            fhdSellerId:{
                checked:false,
                data:[]
            },
            fhdSellerPhone:{
                checked:false,
                data:[]
            },
            fhdSellerMoblie:{
                checked:false,
                data:[]
            },
            fhdSellerAdd:{
                checked:false,
                data:[]
            },
            fhdSellerMark:{
                checked:false,
                data:[]
            }
        };
        /**
         * showType
         * edit 编辑
         * preview 预览
         */
        return {delivery_modal:delivery_modal,showType:"preview"};
    },
    changeShowState:function(checked,item_id){
        /**
         * fhdId 14,微软雅黑,normal
         * fhdCompanyName 24,微软雅黑,normal
         * fhdOrderId 14,微软雅黑,bold
         * fhdReallyMoney 14,微软雅黑,bold
         * fhdGoodsNum 14,微软雅黑,bold
         * 12,微软雅黑,normal
         */
        let delivery_modal_new = {...this.state.delivery_modal};
        if(checked){
            let item_data = [];
            switch (item_id) {
                case "fhdId":item_data=[item_id,"14","微软雅黑","normal"];break;
                case "fhdCompanyName":item_data=[item_id,"24","微软雅黑","normal"];break;
                case "fhdOrderId":item_data=[item_id,"14","微软雅黑","bold"];break;
                case "fhdReallyMoney":item_data=[item_id,"14","微软雅黑","bold"];break;
                case "fhdGoodsNum":item_data=[item_id,"14","微软雅黑","bold"];break;
                default:
                    item_data=[item_id,"12","微软雅黑","normal"];
            }
            delivery_modal_new[item_id].checked = true;
            delivery_modal_new[item_id].data = item_data;
        }else {
            delivery_modal_new[item_id].checked = false;
            delivery_modal_new[item_id].data = [];
        }
        this.setState({delivery_modal:delivery_modal_new});
    },
    componentDidMount:function(){
        let delivery_modal_new = {...this.state.delivery_modal};
        const user_nick = "财宝宝588";
        let deliveryModal = localStorage.getItem("deliveryModal"+user_nick);
        if(deliveryModal == null){
            api("ebs.printData.getDeliveryMould",{},function(e){
                localStorage.setItem("deliveryModal"+user_nick, e.deliveryMould.buyerop);
                e.deliveryMould.buyerop.split(";").map((value)=>{
                    let item_arr = value.split(",");
                    delivery_modal_new[item_arr[0]].checked = true;
                    delivery_modal_new[item_arr[0]].data = item_arr;
                });
                this.setState({delivery_modal:delivery_modal_new});
            }.bind(this));
        }else {
            deliveryModal.split(";").map((value)=>{
                let item_arr = value.split(",");
                delivery_modal_new[item_arr[0]].checked = true;
                delivery_modal_new[item_arr[0]].data = item_arr;
            });
            this.setState({delivery_modal:delivery_modal_new});
        }
    },
    saveDeliveryMould:function(){
        const user_nick = "财宝宝588";
        let delivery_modal = this.state.delivery_modal;
        let key_arr = Object.keys(delivery_modal);
        let modal_str = "";
        key_arr.map((value,index)=>{
            if(delivery_modal[value].checked){
                let item_str = "";
                delivery_modal[value].data.map((value,index)=>{
                    if(index == 0){
                        item_str += value;
                    }else {
                        item_str += "," + value;
                    }
                });
                if(modal_str == ""){
                    modal_str += item_str;
                }else {
                    modal_str += ";" + item_str;
                }
            }
        });
        let condition = {
            size:"0x0",
            sizewh:"800X400",
            buyerop:modal_str,
            sellerop:"none",
            babyop:"none",
            printname:1,
        };
        api("ebs.printData.saveDeliveryMould",condition,function(e){
            localStorage.setItem("deliveryModal"+user_nick, modal_str);
            this.setState({showType:"preview"});
        }.bind(this));
    },
    editDeliveryMould:function(){
        this.setState({showType:"edit"});
    },
    cancelEditMould:function(){
        let delivery_modal = {
            fhdCompanyName:{
                checked:false,
                data:[]
            },
            fhdId:{
                checked:false,
                data:[]
            },
            fhdOrderId:{
                checked:false,
                data:[]
            },
            fhdBuyTime:{
                checked:false,
                data:[]
            },
            fhdBuyerId:{
                checked:false,
                data:[]
            },
            fhdTakeMessage:{
                checked:false,
                data:[]
            },
            fhdBuyerMessage:{
                checked:false,
                data:[]
            },
            fhdSeqNum:{
                checked:false,
                data:[]
            },
            fhdGoodsId:{
                checked:false,
                data:[]
            },
            fhdGoodsName:{
                checked:false,
                data:[]
            },
            fhdGoodsShortName:{
                checked:false,
                data:[]
            },
            fhdFormat:{
                checked:false,
                data:[]
            },
            fhdGoodsNum:{
                checked:false,
                data:[]
            },
            fhdPrice:{
                checked:false,
                data:[]
            },
            fhdItemBenefit:{
                checked:false,
                data:[]
            },
            fhdItemMoney:{
                checked:false,
                data:[]
            },
            fhdTotalMoney:{
                checked:false,
                data:[]
            },
            fhdCarriage:{
                checked:false,
                data:[]
            },
            fhdTotalNum:{
                checked:false,
                data:[]
            },
            fhdBenefit:{
                checked:false,
                data:[]
            },
            fhdReallyMoney:{
                checked:false,
                data:[]
            },
            fhdSellerId:{
                checked:false,
                data:[]
            },
            fhdSellerPhone:{
                checked:false,
                data:[]
            },
            fhdSellerMoblie:{
                checked:false,
                data:[]
            },
            fhdSellerAdd:{
                checked:false,
                data:[]
            },
            fhdSellerMark:{
                checked:false,
                data:[]
            }
        };
        const user_nick = "财宝宝588";
        let deliveryModal = localStorage.getItem("deliveryModal"+user_nick);
        deliveryModal.split(";").map((value)=>{
            let item_arr = value.split(",");
            delivery_modal[item_arr[0]].checked = true;
            delivery_modal[item_arr[0]].data = item_arr;
        });
        this.setState({delivery_modal:delivery_modal,showType:"preview"});
    },
    render:function(){
        let delivery_modal = this.state.delivery_modal;
        let fhdCompanyName_html;
        if(delivery_modal.fhdCompanyName.checked){
            let data_arr = delivery_modal.fhdCompanyName.data;
            fhdCompanyName_html = (<div  style={{textAlign:"center",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}} >
                    <span>标题</span>
            </div>);
        }
        let fhdId_html;
        if(delivery_modal.fhdId.checked){
            let data_arr = delivery_modal.fhdId.data;
            fhdId_html = (<div  style={{textAlign:"right",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                <span>发货单编号</span>
            </div>);
        }
        let fhdOrderId_html;
        if(delivery_modal.fhdOrderId.checked){
            let data_arr = delivery_modal.fhdOrderId.data;
            fhdOrderId_html = (<span  style={{width: "50%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}} ><span>订单号：</span></span>);
        }
        let fhdBuyTime_html;
        if(delivery_modal.fhdBuyTime.checked){
            let data_arr = delivery_modal.fhdBuyTime.data;
            fhdBuyTime_html = (<span  style={{width: "50%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}><span style={{float:"right"}}>购买时间：</span></span>);
        }
        let fhdBuyerId_html;
        if(delivery_modal.fhdBuyerId.checked){
            let data_arr = delivery_modal.fhdBuyerId.data;
            fhdBuyerId_html = (<div  style={{paddingBottom:"10px",width:"100%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>买家ID：<span></span></div>);
        }
        let fhdTakeMessage_html;
        if(delivery_modal.fhdTakeMessage.checked){
            let data_arr = delivery_modal.fhdTakeMessage.data;
            fhdTakeMessage_html = (<div  style={{paddingBottom:"10px",width:"100%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>收货信息：<span></span></div>);
        }
        let fhdBuyerMessage_html;
        if(delivery_modal.fhdBuyerMessage.checked){
            let data_arr = delivery_modal.fhdBuyerMessage.data;
            fhdBuyerMessage_html = (<div  style={{width:"100%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>买家留言：<span></span></div>);
        }

        let modal_th_num = 0;
        let fhdSeqNum_html_th;
        let fhdSeqNum_html_td;
        if(delivery_modal.fhdSeqNum.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdSeqNum.data;
            fhdSeqNum_html_th = (<th className="delivery-modal-th" style={{width:"10%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                序号
            </th>);
            fhdSeqNum_html_td = (<td className="delivery-modal-div" style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                00001
            </td>);
        }
        let fhdGoodsId_html_th;
        let fhdGoodsId_html_td;
        if(delivery_modal.fhdGoodsId.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdGoodsId.data;
            fhdGoodsId_html_th = (<th className="delivery-modal-th" style={{width:"10%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                货号
            </th>);
            fhdGoodsId_html_td = (<td className="delivery-modal-div" style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                 00001
             </td>);

        }
        let fhdGoodsName_html_th;
        let fhdGoodsName_html_td;
        if(delivery_modal.fhdGoodsName.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdGoodsName.data;
            fhdGoodsName_html_th = (<th className="delivery-modal-th" style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                商品名称
            </th>);
            fhdGoodsName_html_td = (<td className="delivery-modal-div" style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                XXXXXX商品
            </td>);

        }
        let fhdGoodsShortName_html_th;
        let fhdGoodsShortName_html_td;
        if(delivery_modal.fhdGoodsShortName.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdGoodsShortName.data;
            fhdGoodsShortName_html_th = (<th className="delivery-modal-th" style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                商品简称
            </th>);
            fhdGoodsShortName_html_td = (<td className="delivery-modal-div" style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                XX商品
            </td>);

        }
        let fhdFormat_html_th;
        let fhdFormat_html_td;
        if(delivery_modal.fhdFormat.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdFormat.data;
            fhdFormat_html_th = (<th className="delivery-modal-th" style={{width:"10%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                规格
            </th>);
            fhdFormat_html_td = (<td className="delivery-modal-div" style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                个
            </td>);

        }
        let fhdGoodsNum_html_th;
        let fhdGoodsNum_html_td;
        if(delivery_modal.fhdGoodsNum.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdGoodsNum.data;
            fhdGoodsNum_html_th = (<th className="delivery-modal-th" style={{width:"10%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                数量
            </th>);
            fhdGoodsNum_html_td = (<td className="delivery-modal-div" style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                0
            </td>);

        }
        let fhdPrice_html_th;
        let fhdPrice_html_td;
        if(delivery_modal.fhdPrice.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdPrice.data;
            fhdPrice_html_th = (<th className="delivery-modal-th" style={{width:"10%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                单价
            </th>);
            fhdPrice_html_td = (<td className="delivery-modal-div" style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                0.00
            </td>);

        }
        let fhdItemBenefit_html_th;
        let fhdItemBenefit_html_td;
        if(delivery_modal.fhdItemBenefit.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdItemBenefit.data;
            fhdItemBenefit_html_th = (<th className="delivery-modal-th" style={{width:"11%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                优惠(元)
            </th>);
            fhdItemBenefit_html_td = (<td className="delivery-modal-div" style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                0.00
            </td>);

        }
        let fhdItemMoney_html_th;
        let fhdItemMoney_html_td;
        if(delivery_modal.fhdItemMoney.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdItemMoney.data;
            fhdItemMoney_html_th = (<th className="delivery-modal-th" style={{width:"11%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                金额(元)
            </th>);
            fhdItemMoney_html_td = (<td className="delivery-modal-div" style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                0.00
            </td>);

        }


        let fhdTotalMoney_html;
        if(delivery_modal.fhdTotalMoney.checked){
            let data_arr = delivery_modal.fhdTotalMoney.data;
            fhdTotalMoney_html = (<span style={{width:"40%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}} >
                货品合计：元
            </span>);
        }
        let fhdCarriage_html;
        if(delivery_modal.fhdCarriage.checked){
            let data_arr = delivery_modal.fhdCarriage.data;
            fhdCarriage_html = (<span style={{width:"60%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}} >
                运费：元
            </span>);
        }
        let fhdTotalNum_html;
        if(delivery_modal.fhdTotalNum.checked){
            let data_arr = delivery_modal.fhdTotalNum.data;
            fhdTotalNum_html = (<span style={{width:"40%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}} >
                货品总量：
            </span>);
        }
        let fhdBenefit_html;
        if(delivery_modal.fhdBenefit.checked){
            let data_arr = delivery_modal.fhdBenefit.data;
            fhdBenefit_html = (<span style={{width:"30%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}} >
                优惠总价：元
            </span>);
        }
        let fhdReallyMoney_html;
        if(delivery_modal.fhdReallyMoney.checked){
            let data_arr = delivery_modal.fhdReallyMoney.data;
            fhdReallyMoney_html = (<span style={{width:"30%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                <span style={{float:"right"}}>实收金额：元</span>
            </span>);
        }
        let fhdSellerId_html;
        if(delivery_modal.fhdSellerId.checked){
            let data_arr = delivery_modal.fhdSellerId.data;
            fhdSellerId_html = (<span style={{width:"40%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}} >
                卖家ID：
            </span>);
        }
        let fhdSellerPhone_html;
        if(delivery_modal.fhdSellerPhone.checked){
            let data_arr = delivery_modal.fhdSellerPhone.data;
            fhdSellerPhone_html = (<span style={{width:"30%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}} >
                卖家电话：
            </span>);
        }
        let fhdSellerMoblie_html;
        if(delivery_modal.fhdSellerMoblie.checked){
            let data_arr = delivery_modal.fhdSellerMoblie.data;
            fhdSellerMoblie_html = (<span style={{width:"30%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                卖家手机：
            </span>);
        }
        let fhdSellerAdd_html;
        if(delivery_modal.fhdSellerAdd.checked){
            let data_arr = delivery_modal.fhdSellerAdd.data;
            fhdSellerAdd_html = (<div style={{marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>卖家地址：</div>);
        }
        let fhdSellerMark_html;
        if(delivery_modal.fhdSellerMark.checked){
            let data_arr = delivery_modal.fhdSellerMark.data;
            fhdSellerMark_html = (<div style={{marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>卖家备注：</div>);
        }

        /**
         * showType
         * edit 保存
         * preview 预览
         */
        let delivery_modal_html;
        if(this.state.showType == "edit"){
            delivery_modal_html = (
                <div>
                <div style={{width: "1000px",height: "400px",margin: "50px auto"}}>
                    <div style={{width: "300px",height: "400px",float:"left"}}>
                        <div style={{width: "150px",height: "400px",float:"left",paddingTop: "10px"}}>
                            <Checkbox key={`delModalfhdCompanyName_${delivery_modal.fhdCompanyName.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdCompanyName");}} defaultChecked={delivery_modal.fhdCompanyName.checked}>标题</Checkbox><br/>
                            <Checkbox key={`delModalfhdId_${delivery_modal.fhdId.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdId");}} defaultChecked={delivery_modal.fhdId.checked}>发货单编号</Checkbox><br/>
                            <Checkbox key={`delModalfhdOrderId_${delivery_modal.fhdOrderId.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdOrderId");}} defaultChecked={delivery_modal.fhdOrderId.checked}>订单号</Checkbox><br/>
                            <Checkbox key={`delModalfhdBuyTime_${delivery_modal.fhdBuyTime.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdBuyTime");}} defaultChecked={delivery_modal.fhdBuyTime.checked}>购买时间</Checkbox><br/>
                            <Checkbox key={`delModalfhdBuyerId_${delivery_modal.fhdBuyerId.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdBuyerId");}} defaultChecked={delivery_modal.fhdBuyerId.checked}>买家ID</Checkbox><br/>
                            <Checkbox key={`delModalfhdTakeMessage_${delivery_modal.fhdTakeMessage.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdTakeMessage");}} defaultChecked={delivery_modal.fhdTakeMessage.checked}>收货信息</Checkbox><br/>
                            <Checkbox key={`delModalfhdBuyerMessage_${delivery_modal.fhdBuyerMessage.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdBuyerMessage");}} defaultChecked={delivery_modal.fhdBuyerMessage.checked}>买家留言</Checkbox><br/>
                            <Checkbox key={`delModalfhdSeqNum_${delivery_modal.fhdSeqNum.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdSeqNum");}} defaultChecked={delivery_modal.fhdSeqNum.checked}>序号</Checkbox><br/>
                            <Checkbox key={`delModalfhdGoodsId_${delivery_modal.fhdGoodsId.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdGoodsId");}} defaultChecked={delivery_modal.fhdGoodsId.checked}>货号</Checkbox><br/>
                            <Checkbox key={`delModalfhdGoodsName_${delivery_modal.fhdGoodsName.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdGoodsName");}} defaultChecked={delivery_modal.fhdGoodsName.checked}>商品名称</Checkbox><br/>
                            <Checkbox key={`delModalfhdGoodsShortName_${delivery_modal.fhdGoodsShortName.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdGoodsShortName");}} defaultChecked={delivery_modal.fhdGoodsShortName.checked}>商品简称</Checkbox><br/>
                            <Checkbox key={`delModalfhdFormat_${delivery_modal.fhdFormat.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdFormat");}} defaultChecked={delivery_modal.fhdFormat.checked}>规格</Checkbox><br/>
                            <Checkbox key={`delModalfhdGoodsNum_${delivery_modal.fhdGoodsNum.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdGoodsNum");}} defaultChecked={delivery_modal.fhdGoodsNum.checked}>数量</Checkbox><br/>
                        </div>
                        <div style={{width: "150px",height: "400px",float:"left",paddingTop: "10px"}}>
                            <Checkbox key={`delModalfhdPrice_${delivery_modal.fhdPrice.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdPrice");}} defaultChecked={delivery_modal.fhdPrice.checked}>单价</Checkbox><br/>
                            <Checkbox key={`delModalfhdItemBenefit_${delivery_modal.fhdItemBenefit.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdItemBenefit");}} defaultChecked={delivery_modal.fhdItemBenefit.checked}>优惠(元)</Checkbox><br/>
                            <Checkbox key={`delModalfhdItemMoney_${delivery_modal.fhdItemMoney.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdItemMoney");}} defaultChecked={delivery_modal.fhdItemMoney.checked}>金额(元)</Checkbox><br/>
                            <Checkbox key={`delModalfhdTotalMoney_${delivery_modal.fhdTotalMoney.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdTotalMoney");}} defaultChecked={delivery_modal.fhdTotalMoney.checked}>货品合计</Checkbox><br/>
                            <Checkbox key={`delModalfhdCarriage_${delivery_modal.fhdCarriage.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdCarriage");}} defaultChecked={delivery_modal.fhdCarriage.checked}>运费</Checkbox><br/>
                            <Checkbox key={`delModalfhdTotalNum_${delivery_modal.fhdTotalNum.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdTotalNum");}} defaultChecked={delivery_modal.fhdTotalNum.checked}>货品总量</Checkbox><br/>
                            <Checkbox key={`delModalfhdBenefit_${delivery_modal.fhdBenefit.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdBenefit");}} defaultChecked={delivery_modal.fhdBenefit.checked}>优惠总价</Checkbox><br/>
                            <Checkbox key={`delModalfhdReallyMoney_${delivery_modal.fhdReallyMoney.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdReallyMoney");}} defaultChecked={delivery_modal.fhdReallyMoney.checked}>实收金额</Checkbox><br/>
                            <Checkbox key={`delModalfhdSellerId_${delivery_modal.fhdSellerId.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdSellerId");}} defaultChecked={delivery_modal.fhdSellerId.checked}>卖家ID</Checkbox><br/>
                            <Checkbox key={`delModalfhdSellerPhone_${delivery_modal.fhdSellerPhone.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdSellerPhone");}} defaultChecked={delivery_modal.fhdSellerPhone.checked}>卖家电话</Checkbox><br/>
                            <Checkbox key={`delModalfhdSellerMoblie_${delivery_modal.fhdSellerMoblie.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdSellerMoblie");}} defaultChecked={delivery_modal.fhdSellerMoblie.checked}>卖家手机</Checkbox><br/>
                            <Checkbox key={`delModalfhdSellerAdd_${delivery_modal.fhdSellerAdd.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdSellerAdd");}} defaultChecked={delivery_modal.fhdSellerAdd.checked}>卖家地址</Checkbox><br/>
                            <Checkbox key={`delModalfhdSellerMark_${delivery_modal.fhdSellerMark.checked}`} onChange={(value)=>{this.changeShowState(value,"fhdSellerMark");}} defaultChecked={delivery_modal.fhdSellerMark.checked}>卖家备注</Checkbox><br/>
                        </div>
                    </div>
                    <div style={{width: "700px",height: "400px",float:"left"}}>
                        <div style={{width:"622px",padding:"10px 20px 10px 20px",border: "1px solid #bbbbbb",margin:"10px auto",boxShadow: "5px 5px 5px #cccccc"}}>
                        <div style={{width:"580px"}}>
                            {fhdId_html}
                            {fhdCompanyName_html}
                            <div>
                                {fhdOrderId_html}
                                {fhdBuyTime_html}
                            </div>
                            <table cellSpacing="0" style={{textAlign:"center",width:"100%",borderRight: "1px solid black"}}>
                                <thead>
                                    <tr>
                                        <td colSpan={modal_th_num} style={{padding:"10px",borderLeft: "1px solid black",borderTop: "1px solid black",textAlign: "left"}}>
                                            {fhdBuyerId_html}
                                            {fhdTakeMessage_html}
                                            {fhdBuyerMessage_html}
                                        </td>
                                    </tr>
                                    <tr>
                                        {fhdSeqNum_html_th}
                                        {fhdGoodsId_html_th}
                                        {fhdGoodsName_html_th}
                                        {fhdGoodsShortName_html_th}
                                        {fhdFormat_html_th}
                                        {fhdGoodsNum_html_th}
                                        {fhdPrice_html_th}
                                        {fhdItemBenefit_html_th}
                                        {fhdItemMoney_html_th}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {fhdSeqNum_html_td}
                                        {fhdGoodsId_html_td}
                                        {fhdGoodsName_html_td}
                                        {fhdGoodsShortName_html_td}
                                        {fhdFormat_html_td}
                                        {fhdGoodsNum_html_td}
                                        {fhdPrice_html_td}
                                        {fhdItemBenefit_html_td}
                                        {fhdItemMoney_html_td}
                                    </tr>
                                </tbody>
                            </table>

                            <div style={{borderBottom:"1px solid"}}>
                                <div>
                                    {fhdTotalMoney_html}
                                    {fhdCarriage_html}
                                </div>
                                <div>
                                    {fhdTotalNum_html}
                                    {fhdBenefit_html}
                                    {fhdReallyMoney_html}
                                </div>
                            </div>

                            <div>
                                {fhdSellerId_html}
                                {fhdSellerPhone_html}
                                {fhdSellerMoblie_html}
                            </div>
                            {fhdSellerAdd_html}
                            {fhdSellerMark_html}
                        </div>
                        </div>
                    </div>
                </div>
                <div style={{width: "1000px",margin: "0 auto",textAlign: "right"}}>
                    <Button type="normal" onClick={this.cancelEditMould} component="button" target="_blank" style={{marginRight: "10px"}}>取消</Button>
                    <Button type="primary" onClick={this.saveDeliveryMould} component="button" target="_blank">保存模板</Button>
                </div>
                </div>
            );
        }else {
            delivery_modal_html = (
                <div>
                <div style={{width:"622px",padding:"10px 20px 10px 20px",border: "1px solid #bbbbbb",margin:"80px auto",boxShadow: "5px 5px 5px #cccccc"}}>
                <div style={{width:"580px"}}>
                    {fhdId_html}
                    {fhdCompanyName_html}
                    <div>
                        {fhdOrderId_html}
                        {fhdBuyTime_html}
                    </div>
                    <table cellSpacing="0" style={{textAlign:"center",width:"100%",borderRight: "1px solid black"}}>
                        <thead>
                            <tr>
                                <td colSpan={modal_th_num} style={{padding:"10px",borderLeft: "1px solid black",borderTop: "1px solid black",textAlign: "left"}}>
                                    {fhdBuyerId_html}
                                    {fhdTakeMessage_html}
                                    {fhdBuyerMessage_html}
                                </td>
                            </tr>
                            <tr>
                                {fhdSeqNum_html_th}
                                {fhdGoodsId_html_th}
                                {fhdGoodsName_html_th}
                                {fhdGoodsShortName_html_th}
                                {fhdFormat_html_th}
                                {fhdGoodsNum_html_th}
                                {fhdPrice_html_th}
                                {fhdItemBenefit_html_th}
                                {fhdItemMoney_html_th}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {fhdSeqNum_html_td}
                                {fhdGoodsId_html_td}
                                {fhdGoodsName_html_td}
                                {fhdGoodsShortName_html_td}
                                {fhdFormat_html_td}
                                {fhdGoodsNum_html_td}
                                {fhdPrice_html_td}
                                {fhdItemBenefit_html_td}
                                {fhdItemMoney_html_td}
                            </tr>
                        </tbody>
                    </table>

                    <div style={{borderBottom:"1px solid"}}>
                        <div>
                            {fhdTotalMoney_html}
                            {fhdCarriage_html}
                        </div>
                        <div>
                            {fhdTotalNum_html}
                            {fhdBenefit_html}
                            {fhdReallyMoney_html}
                        </div>
                    </div>

                    <div>
                        {fhdSellerId_html}
                        {fhdSellerPhone_html}
                        {fhdSellerMoblie_html}
                    </div>
                    {fhdSellerAdd_html}
                    {fhdSellerMark_html}
                </div>
                </div>
                <div style={{textAlign:"center"}}>
                    <Button type="primary" onClick={this.editDeliveryMould} component="button" target="_blank">编辑模板</Button>
                </div>
                </div>
            );
        }

        return (
            <div>
                {delivery_modal_html}
            </div>
        );
    }
});

export default DeliveryModal
