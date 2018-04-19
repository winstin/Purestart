import React from 'react'
import Button from 'qnui/lib/button';
import Dialog from 'qnui/lib/dialog';
import PrintPreviewItem from './PrintPreviewItem'
import {api} from '../redux/actions/AY_API'

let PrintPreview = React.createClass({
    getInitialState:function(){
        return {isShow:false,show_index:1,printMould:"",childList_arr:[],printData:{}};
    },
    makeDialogShow:function(){
        const {dataSource,getFromValues} = this.props;
        let tao_tids = "";
        dataSource.map((value,index)=>{
            if(index == 0){
                tao_tids += value.tao_tid;
            }else {
                tao_tids += "," + value.tao_tid;
            }
        });
        let condition = {
            tao_tids:tao_tids
        };
        api("ebs.order.getChildListByGroup",condition,function(e){
            this.setState({isShow:true,show_index:1,printMould:getFromValues().kddModal,childList_arr:e.result,printData:this.getPrintData(dataSource[0],e.result[0])});
        }.bind(this));
    },
    makeDialogHide:function(){
        this.setState({isShow:false});
    },
    changeShowIndex:function(type){/*改变显示序号*/
        const {dataSource} = this.props;
        if(type == "next"){/*下一个*/
            let show_index = this.state.show_index;
            let max_index= this.props.dataSource.length;
            show_index++;
            if(show_index <= max_index){
                this.setState({show_index:show_index,printData:this.getPrintData(dataSource[show_index-1],this.state.childList_arr[show_index-1])});
            }
        }else {/*上一个*/
            let show_index = this.state.show_index;
            show_index--;
            if(show_index >= 1){
                this.setState({show_index:show_index,printData:this.getPrintData(dataSource[show_index-1],this.state.childList_arr[show_index-1])});
            }
        }
    },
    getPrintData(orderData,childOrderDatas){/*获取打印所需数据*/
        let printData = {};
        let mydate = new Date();
        printData.s_shi = orderData.receiver_city; /*目的地*/
        printData.sname = orderData.receiver_name; /*收货人*/
        printData.saddress = orderData.address; /*收货地址*/
        printData.scompany = "-"; /*收货公司*/
        printData.sphone = orderData.receiver_mobile; /*收货方电话*/
        printData.smobile = orderData.receiver_phone; /*收货方手机*/
        printData.SpostCode = orderData.receiver_zip; /*收货方邮编*/
        printData.to_province = orderData.receiver_state; /*收货方省*/
        printData.to_city = orderData.receiver_city; /*收货方市*/
        printData.to_district = orderData.receiver_district; /*收货方区*/
        printData.buyerNick = orderData.buyer_nick; /*买家旺旺*/
        printData.buyerMessage = orderData.buyer_message; /*买家留言*/
        printData.btitle = "-"; /*货品名称*/
        printData.totalPrices = "-"; /*货品总价*/
        printData.reallyMoney = orderData.payment; /*实付价格*/
        printData.goods_number = "-"; /*货号*/
        printData.gNumAndbPro = "-"; /*货号+属性*/

        printData.f_shi = "-"; /*始发地*/
        printData.fname = "-"; /*发货人*/
        printData.faddress = "-"; /*发货地址*/
        printData.fcompany = "-"; /*发货公司*/
        printData.fphone = "-"; /*发货方电话*/
        printData.fmobile = "-"; /*发货方手机*/
        printData.FpostCode = "-"; /*发货方邮编*/
        printData.names = "-"; /*发货方签名*/
        printData.date = mydate.toLocaleDateString(); /*发货日期*/

        printData.ballnum = "-"; /*货品总量*/
        printData.bproperty = "-"; /*货品属性*/
        printData.orderNumber = "-"; /*订单编号*/
        printData.benefit = "-"; /*优惠*/
        printData.sellerRemark = "-"; /*备注*/
        printData.goods_short_name = "-"; /*商品简称*/
        printData.gShortNamAndbPro = "-"; /*商品简称+属性*/

        return printData;
    },
    render:function(){
        const {dataSource} = this.props;
        const user_nick = "财宝宝588";
        let preview_element;
        if(this.state.printMould != ""){
            let mouldName_arr = this.state.printMould.split(";");
            let printMould = JSON.parse(localStorage.getItem("printModal"+user_nick));
            let previewMould = {};
            if(mouldName_arr[0] == "private"){
                printMould.private.map((value)=>{
                    if(value.mouldname == mouldName_arr[1]){
                        previewMould = value;
                    }
                });
            }else {
                printMould.public.map((value)=>{
                    if(value.mouldname == mouldName_arr[1]){
                        previewMould = value;
                    }
                });
            }
            let mouldSize = previewMould.size.split("X");
            let mouldContent = previewMould.mould.split(";").map((value)=>{
                return value.split(",").map(value=>value);
            });
            /**
             * [item_id,"50","100","16","80","20","宋体","normal","false"]
             * id,top,left,fontSize,width,height,fontFamily,fontWeight,换行
             */
            preview_element = (<div style={{margin:"0 auto",width:mouldSize[0]+"mm",height:mouldSize[1]+"mm",backgroundSize: "100% 100%",backgroundImage:`url(http://itradeprint.oss.aliyuncs.com/${previewMould.moprice})`,position:"relative"}}>
                {
                    mouldContent.map((value)=>{
                        return (
                            <div style={{top:value[1]+"px",left:value[2]+"px",height:value[5]+"px",width:value[4]+"px",position: "absolute" ,fontSize:value[3]+"px",fontFamily:value[6] ,fontWeight:value[7] }}>
                                {this.state.printData[value[0]]}
                            </div>
                        );
                    })
                }
            </div>);
        }
        return (
            <span>
                <Button type="secondary" component="button" onClick={this.makeDialogShow} target="_blank">打印预览</Button>
                <Dialog style={{width:"1000px",height:"650px"}} visible = {this.state.isShow}
                    onOk = {()=>{}}
                    onCancel = {this.makeDialogHide}
                    onClose = {this.makeDialogHide}
                    title = {<span>打印预览</span>}
                    footer = {
                        <div style={{textAlign: "center"}}>
                            <a onClick={()=>{this.changeShowIndex("last")}} style={{margin:"0 10px",color:"#2192d9"}} href="javascript:void(0);">上一单</a>
                            <span>共{this.props.dataSource.length}单，本批次第{this.state.show_index}单</span>
                            <a onClick={()=>{this.changeShowIndex("next")}} style={{margin:"0 10px",color:"#2192d9"}} href="javascript:void(0);">下一单</a>
                        </div>
                    }>
                    <div style={{minHeight: "500px"}}>
                        {preview_element}
                    </div>
                </Dialog>
            </span>
        );
    }
});

export default PrintPreview
