import React from 'react'
import './main.css'
import {needCLodop, getLodop} from '../static/LodopFuncs'

let DeliveryPage = React.createClass({
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
        return {delivery_modal:delivery_modal};
    },
    componentDidMount:function(){
        let delivery_modal_new = {...this.state.delivery_modal};
        let deliveryModal = this.props.deliveryModal;
        deliveryModal.split(";").map((value)=>{
            let item_arr = value.split(",");
            delivery_modal_new[item_arr[0]].checked = true;
            delivery_modal_new[item_arr[0]].data = item_arr;
        });
        this.setState({delivery_modal:delivery_modal_new});
    },
    printTest:function(){
        let LODOP = getLodop();
        LODOP.PRINT_INIT("delivery_page");
        /*Top,Left,Width,Height,strHtml*/
        LODOP.ADD_PRINT_TABLE("29mm","5%","90%","190mm",document.getElementById("delivery_page_table").innerHTML);
		// LODOP.SET_PRINT_STYLEA(0,"Vorient",3);/*3--上边距和下边距同时锁定（中间拉伸）*/
		LODOP.ADD_PRINT_HTML(0,"5%","90%","25mm",document.getElementById("delivery_page_head").innerHTML);
		LODOP.SET_PRINT_STYLEA(0,"ItemType",1);/*1--页眉页脚*/
		LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
	    LODOP.ADD_PRINT_HTML("220mm","5%","90%","40mm",document.getElementById("delivery_page_foot").innerHTML);
		LODOP.SET_PRINT_STYLEA(0,"ItemType",1);/*1--页眉页脚*/
		LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
        LODOP.PREVIEW();
        //delivery_page_table
    },
    render:function(){
        let delivery_modal = this.state.delivery_modal;
        let printData = this.props.printData;
        let fhdCompanyName_html;
        if(delivery_modal.fhdCompanyName.checked){
            let data_arr = delivery_modal.fhdCompanyName.data;
            fhdCompanyName_html = (<div  style={{textAlign:"center",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}} >
                <span>{printData.fhdCompanyName}</span>
            </div>);
        }
        let fhdId_html;
        if(delivery_modal.fhdId.checked){
            let data_arr = delivery_modal.fhdId.data;
            fhdId_html = (<div  style={{textAlign:"right",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                <span>{printData.fhdId}</span>
            </div>);
        }
        let fhdOrderId_html;
        if(delivery_modal.fhdOrderId.checked){
            let data_arr = delivery_modal.fhdOrderId.data;
            fhdOrderId_html = (<span  style={{width: "50%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}} ><span>订单号：{printData.tao_tid}</span></span>);
        }
        let fhdBuyTime_html;
        if(delivery_modal.fhdBuyTime.checked){
            let data_arr = delivery_modal.fhdBuyTime.data;
            fhdBuyTime_html = (<span  style={{width: "50%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}><span style={{float:"right"}}>购买时间：{printData.pay_time}</span></span>);
        }
        let fhdBuyerId_html;
        if(delivery_modal.fhdBuyerId.checked){
            let data_arr = delivery_modal.fhdBuyerId.data;
            fhdBuyerId_html = (<div  style={{paddingBottom:"10px",width:"100%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>买家ID：{printData.buyer_nick}<span></span></div>);
        }
        let fhdTakeMessage_html;
        if(delivery_modal.fhdTakeMessage.checked){
            let data_arr = delivery_modal.fhdTakeMessage.data;
            fhdTakeMessage_html = (<div  style={{paddingBottom:"10px",width:"100%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>收货信息：{printData.fhdTakeMessage}<span></span></div>);
        }
        let fhdBuyerMessage_html;
        if(delivery_modal.fhdBuyerMessage.checked){
            let data_arr = delivery_modal.fhdBuyerMessage.data;
            fhdBuyerMessage_html = (<div  style={{width:"100%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>买家留言：{printData.fhdBuyerMessage}<span></span></div>);
        }


        let fhdSeqNum_html_th;
        let fhdGoodsId_html_th;
        let fhdGoodsName_html_th;
        let fhdGoodsShortName_html_th;
        let fhdFormat_html_th;
        let fhdGoodsNum_html_th;
        let fhdPrice_html_th;
        let fhdItemBenefit_html_th;
        let fhdItemMoney_html_th;
        let modal_th_num = 0;
        if(delivery_modal.fhdSeqNum.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdSeqNum.data;
            fhdSeqNum_html_th = (<th style={{width:"10%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderTop: "1px solid black",borderBottom: "1px solid black",fontFamily:"微软雅黑",fontWeight:"normal"}}>
                序号
            </th>);
        }

        if(delivery_modal.fhdGoodsId.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdGoodsId.data;
            fhdGoodsId_html_th = (<th style={{width:"10%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderTop: "1px solid black",borderBottom: "1px solid black",fontFamily:"微软雅黑",fontWeight:"normal"}}>
                货号
            </th>);
        }

        if(delivery_modal.fhdGoodsName.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdGoodsName.data;
            fhdGoodsName_html_th = (<th style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderTop: "1px solid black",borderBottom: "1px solid black",fontFamily:"微软雅黑",fontWeight:"normal"}}>
                商品名称
            </th>);
        }

        if(delivery_modal.fhdGoodsShortName.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdGoodsShortName.data;
            fhdGoodsShortName_html_th = (<th style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderTop: "1px solid black",borderBottom: "1px solid black",fontFamily:"微软雅黑",fontWeight:"normal"}}>
                商品简称
            </th>);
        }

        if(delivery_modal.fhdFormat.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdFormat.data;
            fhdFormat_html_th = (<th style={{width:"10%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderTop: "1px solid black",borderBottom: "1px solid black",fontFamily:"微软雅黑",fontWeight:"normal"}}>
                规格
            </th>);
        }

        if(delivery_modal.fhdGoodsNum.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdGoodsNum.data;
            fhdGoodsNum_html_th = (<th style={{width:"10%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderTop: "1px solid black",borderBottom: "1px solid black",fontFamily:"微软雅黑",fontWeight:"normal"}}>
                数量
            </th>);
        }

        if(delivery_modal.fhdPrice.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdPrice.data;
            fhdPrice_html_th = (<th style={{width:"10%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderTop: "1px solid black",borderBottom: "1px solid black",fontFamily:"微软雅黑",fontWeight:"normal"}}>
                单价
            </th>);
        }

        if(delivery_modal.fhdItemBenefit.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdItemBenefit.data;
            fhdItemBenefit_html_th = (<th style={{width:"11%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderTop: "1px solid black",borderBottom: "1px solid black",fontFamily:"微软雅黑",fontWeight:"normal"}}>
                优惠(元)
            </th>);
        }

        if(delivery_modal.fhdItemMoney.checked){
            modal_th_num++;
            let data_arr = delivery_modal.fhdItemMoney.data;
            fhdItemMoney_html_th = (<th style={{width:"11%",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderTop: "1px solid black",borderBottom: "1px solid black",fontFamily:"微软雅黑",fontWeight:"normal"}}>
                金额(元)
            </th>);
        }







        let fhdTotalMoney_html;
        if(delivery_modal.fhdTotalMoney.checked){
            let data_arr = delivery_modal.fhdTotalMoney.data;
            fhdTotalMoney_html = (<span style={{width:"40%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}} >
                货品合计：{printData.fhdTotalMoney}元
            </span>);
        }
        let fhdCarriage_html;
        if(delivery_modal.fhdCarriage.checked){
            let data_arr = delivery_modal.fhdCarriage.data;
            fhdCarriage_html = (<span style={{width:"60%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}} >
                运费：{printData.fhdCarriage}元
            </span>);
        }
        let fhdTotalNum_html;
        if(delivery_modal.fhdTotalNum.checked){
            let data_arr = delivery_modal.fhdTotalNum.data;
            fhdTotalNum_html = (<span style={{width:"40%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}} >
                货品总量：{printData.fhdTotalNum}
            </span>);
        }
        let fhdBenefit_html;
        if(delivery_modal.fhdBenefit.checked){
            let data_arr = delivery_modal.fhdBenefit.data;
            fhdBenefit_html = (<span style={{width:"30%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}} >
                优惠总价：{printData.fhdBenefit}元
            </span>);
        }
        let fhdReallyMoney_html;
        if(delivery_modal.fhdReallyMoney.checked){
            let data_arr = delivery_modal.fhdReallyMoney.data;
            fhdReallyMoney_html = (<span style={{width:"30%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                <span style={{float:"right"}}>实收金额：{printData.fhdReallyMoney}元</span>
            </span>);
        }
        let fhdSellerId_html;
        if(delivery_modal.fhdSellerId.checked){
            let data_arr = delivery_modal.fhdSellerId.data;
            fhdSellerId_html = (<span style={{width:"40%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}} >
                卖家ID：{printData.fhdSellerId}
            </span>);
        }
        let fhdSellerPhone_html;
        if(delivery_modal.fhdSellerPhone.checked){
            let data_arr = delivery_modal.fhdSellerPhone.data;
            fhdSellerPhone_html = (<span style={{width:"30%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}} >
                卖家电话：{printData.fhdSellerPhone}
            </span>);
        }
        let fhdSellerMoblie_html;
        if(delivery_modal.fhdSellerMoblie.checked){
            let data_arr = delivery_modal.fhdSellerMoblie.data;
            fhdSellerMoblie_html = (<span style={{width:"30%",display: "inline-block",verticalAlign: "middle",marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>
                卖家手机：{printData.fhdSellerMoblie}
            </span>);
        }
        let fhdSellerAdd_html;
        if(delivery_modal.fhdSellerAdd.checked){
            let data_arr = delivery_modal.fhdSellerAdd.data;
            fhdSellerAdd_html = (<div style={{marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>卖家地址：{printData.fhdSellerAdd}</div>);
        }
        let fhdSellerMark_html;
        if(delivery_modal.fhdSellerMark.checked){
            let data_arr = delivery_modal.fhdSellerMark.data;
            fhdSellerMark_html = (<div style={{marginTop:"10px",fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3]}}>卖家备注：{printData.fhdSellerMark}</div>);
        }
        return (
            <div>
                <div id="delivery_page" style={{width:"622px",padding:"10px 20px 10px 20px",border: "1px solid #bbbbbb",margin:"10px auto",boxShadow: "5px 5px 5px #cccccc"}}>
                    <div style={{width:"580px"}}>
                    <div id="delivery_page_head">
                        {fhdId_html}
                        {fhdCompanyName_html}
                        <div>
                            {fhdOrderId_html}
                            {fhdBuyTime_html}
                        </div>
                    </div>
                        <div id="delivery_page_table">
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
                                {
                                    printData.child_arr.map((value)=>{
                                        let fhdSeqNum_html_td;
                                        let fhdGoodsId_html_td;
                                        let fhdGoodsName_html_td;
                                        let fhdGoodsShortName_html_td;
                                        let fhdFormat_html_td;
                                        let fhdGoodsNum_html_td;
                                        let fhdPrice_html_td;
                                        let fhdItemBenefit_html_td;
                                        let fhdItemMoney_html_td;

                                        if(delivery_modal.fhdSeqNum.checked){
                                            let data_arr = delivery_modal.fhdSeqNum.data;
                                            fhdSeqNum_html_td = (<td style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderBottom: "1px solid black"}}>
                                                {value.fhdSeqNum}
                                            </td>);
                                        }

                                        if(delivery_modal.fhdGoodsId.checked){
                                            let data_arr = delivery_modal.fhdGoodsId.data;
                                            fhdGoodsId_html_td = (<td style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderBottom: "1px solid black"}}>
                                                 {value.fhdGoodsId}
                                             </td>);

                                        }

                                        if(delivery_modal.fhdGoodsName.checked){
                                            let data_arr = delivery_modal.fhdGoodsName.data;
                                            fhdGoodsName_html_td = (<td style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderBottom: "1px solid black"}}>
                                                {value.fhdGoodsName}
                                            </td>);

                                        }

                                        if(delivery_modal.fhdGoodsShortName.checked){
                                            let data_arr = delivery_modal.fhdGoodsShortName.data;
                                            fhdGoodsShortName_html_td = (<td style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderBottom: "1px solid black"}}>
                                                {value.fhdGoodsShortName}
                                            </td>);

                                        }

                                        if(delivery_modal.fhdFormat.checked){
                                            let data_arr = delivery_modal.fhdFormat.data;
                                            fhdFormat_html_td = (<td style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderBottom: "1px solid black"}}>
                                                {value.fhdFormat}
                                            </td>);

                                        }

                                        if(delivery_modal.fhdGoodsNum.checked){
                                            let data_arr = delivery_modal.fhdGoodsNum.data;
                                            fhdGoodsNum_html_td = (<td style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderBottom: "1px solid black"}}>
                                                {value.fhdGoodsNum}
                                            </td>);

                                        }

                                        if(delivery_modal.fhdPrice.checked){
                                            let data_arr = delivery_modal.fhdPrice.data;
                                            fhdPrice_html_td = (<td style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderBottom: "1px solid black"}}>
                                                {value.fhdPrice}
                                            </td>);

                                        }

                                        if(delivery_modal.fhdItemBenefit.checked){
                                            let data_arr = delivery_modal.fhdItemBenefit.data;
                                            fhdItemBenefit_html_td = (<td style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderBottom: "1px solid black"}}>
                                                {value.fhdItemBenefit}
                                            </td>);

                                        }

                                        if(delivery_modal.fhdItemMoney.checked){
                                            let data_arr = delivery_modal.fhdItemMoney.data;
                                            fhdItemMoney_html_td = (<td style={{fontSize: data_arr[1]+"px",fontFamily: data_arr[2],fontWeight: data_arr[3],borderLeft: "1px solid black",borderBottom: "1px solid black"}}>
                                                {value.fhdItemMoney}
                                            </td>);

                                        }

                                        return (
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
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                        </div>
                        <div id="delivery_page_foot">
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
                <div><button onClick={this.printTest}>打印</button></div>
            </div>
        );
    }
});

export default DeliveryPage;
