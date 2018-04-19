import React from 'react'
import Button from 'qnui/lib/button';
import Dialog from 'qnui/lib/dialog';
import {api} from '../redux/actions/AY_API'
import {needCLodop, getLodop} from '../static/LodopFuncs'

let PrintLogistic = React.createClass({
    printLogistic:function(){
        const user_nick = "财宝宝588";
        const {dataSource, getFromValues} = this.props;
        let fromValues = getFromValues();
        let printMould = fromValues.kddModal;
        let mouldName_arr = printMould.split(";");
        let printMouldObj = JSON.parse(localStorage.getItem("printModal"+user_nick));
        let previewMould = {};
        if(mouldName_arr[0] == "private"){
           printMouldObj.private.map((value)=>{
               if(value.mouldname == mouldName_arr[1]){
                   previewMould = value;
               }
           });
        }else {
           printMouldObj.public.map((value)=>{
               if(value.mouldname == mouldName_arr[1]){
                   previewMould = value;
               }
           });
        }
        let mouldSize = previewMould.size.split("X");
        let mouldContent = previewMould.mould.split(";").map((value)=>{
           return value.split(",").map(value=>value);
        });

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

        let printer = parseInt(getFromValues().kddPrintRobot);
        api("ebs.order.getChildListByGroup",condition,function(e){
            let childList_arr = e.result;
            dataSource.map((value,index)=>{
                let print_html = "";
                let printData = this.getPrintData(value,childList_arr[index]);
                mouldContent.map((value)=>{
                    print_html += '<div style="top:'+value[1]+'px;left:'+value[2]+'px;height:'+value[5]+'px;width:'+value[4]+'px;position: absolute;font-size:'+value[3]+'px;font-family:'+value[6]+';font-weight:'+value[7]+';">'+printData[value[0]]+'</div>';
                });

                print_html = '<div style="width:'+mouldSize[0]+'mm;height:'+(mouldSize[1]-20)+'mm;position:relative;">'+print_html+'</div>';
                /*减少2厘米的距离防止组件自动分页 不影响打印效果*/
                let LODOP = getLodop();

                LODOP.PRINT_INIT("快递单");
                LODOP.SET_PRINTER_INDEXA(printer);
                LODOP.SET_PRINT_PAGESIZE(0,mouldSize[0]*10,mouldSize[1]*10,"");/*intOrient, PageWidth,PageHeight,strPageName*/
                LODOP.ADD_PRINT_HTML(0,0,mouldSize[0]+"mm",mouldSize[1]+"mm",print_html);/*Top,Left,Width,Height, strHtmlContent*/
                LODOP.PRINT();
                this.props.setKddSpan(`正在打印${index+1}/${dataSource.length}张快递单`);
                // LODOP.PREVIEW();
            });
        }.bind(this));
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
        /*print_index:-1, mouldSize:[], mouldContent:[], dataSource:[], childList_arr:[], printData:[]*/
        return (
            <Button style={{marginRight:"10px"}} type="secondary" component="button" onClick={this.printLogistic} target="_blank">打印</Button>
        );
    }
});

export default PrintLogistic
