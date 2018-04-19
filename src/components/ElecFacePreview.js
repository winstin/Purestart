import React from 'react'
import Button from 'qnui/lib/button'
import Dialog from 'qnui/lib/dialog'
import {api} from '../redux/actions/AY_API'
import getUUID from '../static/getUUID'
import {needCLodop, getLodop} from '../static/LodopFuncs'

let ElecFacePreview = React.createClass({
    getInitialState:function(){
        const {getFromValues} = this.props;
        const user_nick = "财宝宝588";
        let kddModal = getFromValues().kddModal;
        let LODOP = getLodop();
        let kddPrintRobot = LODOP.GET_PRINTER_NAME(getFromValues().kddPrintRobot);/*获取打印机*/
        let printMould = "";
        let efModal_arr = JSON.parse(localStorage.getItem("efModal"+user_nick));
        efModal_arr.map((value)=>{
            if(value.modal_name == kddModal.split(";")[1]){
                printMould = value.modal_content;
            }
        });/*电子面单模板*/
        return {isShow:false,show_index:1,printMould:printMould,printer:kddPrintRobot,childList_arr:[],printData:""};
    },
    makeDialogShow:function(){
        const {dataSource} = this.props;
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
            window.webSocket.onmessage = function(event)
            {
                console.log('Client received a message',event);
                let result = JSON.parse(event.data);
                console.log(result);
                if(result.cmd == "print"){
                    if(result.status == "success"){
                        if(result.requestID == "preview_ef_modal"){
                            this.setState({isShow:true,show_index:1,childList_arr:e.result,printData:result.previewImage[0]});
                        }
                    }else{
                        if(result.requestID == "print_ef"){/*打印失败*/
                        }
                    }
                }
            }.bind(this);
            window.webSocket.send(JSON.stringify(this.getPrintData(dataSource[0],e.result[0])));
        }.bind(this));
    },
    makeDialogHide:function(){
        this.setState({isShow:false});
    },
    changeShowIndex:function(type){/*改变显示序号*/
        const {dataSource} = this.props;
        let show_index = this.state.show_index;
        let max_index= this.props.dataSource.length;
        if(type == "next"){/*下一个*/
            show_index++;
        }else {/*上一个*/
            show_index--;
        }
        if(show_index <= max_index && show_index >= 1){
            window.webSocket.onmessage = function(event)
            {
                console.log('Client received a message',event);
                let result = JSON.parse(event.data);
                console.log(result);
                if(result.cmd == "print"){
                    if(result.status == "success"){
                        if(result.requestID == "preview_ef_modal"){
                            this.setState({show_index:show_index,printData:result.previewImage[0]});
                        }
                    }else{
                        if(result.requestID == "print_ef"){/*打印失败*/
                        }
                    }
                }
            }.bind(this);
            window.webSocket.send(JSON.stringify(this.getPrintData(dataSource[show_index-1],this.state.childList_arr[show_index-1])));
        }

    },
    getPrintData(orderData,childOrderDatas){/*获取打印所需数据*/
        // console.log(orderData);
        // let printData = {};
        //
        // printData.s_shi = orderData.receiver_city; /*目的地*/
        // printData.sname = orderData.receiver_name; /*收货人*/
        // printData.saddress = orderData.address; /*收货地址*/
        // printData.scompany = "-"; /*收货公司*/
        // printData.sphone = orderData.receiver_mobile; /*收货方电话*/
        // printData.smobile = orderData.receiver_phone; /*收货方手机*/
        // printData.SpostCode = orderData.receiver_zip; /*收货方邮编*/
        // printData.to_province = orderData.receiver_state; /*收货方省*/
        // printData.to_city = orderData.receiver_city; /*收货方市*/
        // printData.to_district = orderData.receiver_district; /*收货方区*/
        // printData.buyerNick = orderData.buyer_nick; /*买家旺旺*/
        // printData.buyerMessage = orderData.buyer_message; /*买家留言*/
        // printData.btitle = "-"; /*货品名称*/
        // printData.totalPrices = "-"; /*货品总价*/
        // printData.reallyMoney = orderData.payment; /*实付价格*/
        // printData.goods_number = "-"; /*货号*/
        // printData.gNumAndbPro = "-"; /*货号+属性*/
        //
        // printData.f_shi = "-"; /*始发地*/
        // printData.fname = "-"; /*发货人*/
        // printData.faddress = "-"; /*发货地址*/
        // printData.fcompany = "-"; /*发货公司*/
        // printData.fphone = "-"; /*发货方电话*/
        // printData.fmobile = "-"; /*发货方手机*/
        // printData.FpostCode = "-"; /*发货方邮编*/
        // printData.names = "-"; /*发货方签名*/
        // printData.date = ; /*发货日期*/
        //
        // printData.ballnum = "-"; /*货品总量*/
        // printData.bproperty = "-"; /*货品属性*/
        // printData.orderNumber = "-"; /*订单编号*/
        // printData.benefit = "-"; /*优惠*/
        // printData.sellerRemark = "-"; /*备注*/
        // printData.goods_short_name = "-"; /*商品简称*/
        // printData.gShortNamAndbPro = "-"; /*商品简称+属性*/

        let mydate = new Date();
        let efmDate = ""; /*打单日期*/
        let efmNum = ""; /*商品总数*/
        let efmTid = ""; /*订单号*/
        let efmAttr = ""; /*货号+属性*/
        let efmShortAndAttr = ""; /*商品简称+属性*/
        let efmRemark = ""; /*备注*/
        let cp_code = "";
        let url = "";
        this.state.printMould.split(",").map((value, index)=>{
            if(index == 0){
                cp_code = value;
            }else if (index ==1) {
                url = value;
            }else if (value == "efmDate") {
                efmDate = mydate.toLocaleDateString();/*打单日期*/
            }else if (value == "efmNum") {
                efmNum = "商品总数";/*商品总数*/
            }else if (value == "efmTid") {
                efmTid = orderData.tao_tid;/*订单号*/
            }else if (value == "efmAttr") {
                efmAttr = "\n货号+属性";/*货号+属性*/
            }else if (value == "efmShortAndAttr") {
                efmShortAndAttr = "\n商品简称+属性";/*商品简称+属性*/
            }else if (value == "efmRemark") {
                efmRemark = "\n备注";/*备注*/
            }
        });
        let goodsInfo = efmDate + efmNum + efmTid + efmAttr + efmShortAndAttr + efmRemark;
        let senderaddress = {
            province:"上海市",
            city:"上海市",
            district:"宝山区",
            detail:"新二路55号"
        };
        let sendermobile = "84472147";
        let sendername = "赵小昊";
        let senderphone = "13701452547";
        let request =   {
                            "cmd": "print",
                            "requestID": "preview_ef_modal",
                            "version": "1.0",
                            "task": {
                                "taskID": getUUID(8,16),
                                "preview": true,  //如果为true，则是预览模式，为false，则直接打印
                                "previewType":"image",//如果是预览模式，是以pdf还是image方式预览，二选一，此属性不是必选，默认以pdf预览。
                                "printer": this.state.printer,
                                "notifyMode":"allInOne",/*打印结果通知模式，是逐个document通知还是批量一次通知最终打印结果*/
                                "documents": [
                                    {
                                            "documentID": "",
                                            "contents": [
                                             {
                                                 "data": {
                                                     "recipient": {/*收件人信息*/
                                                         "address": {
                                                             "city": orderData.receiver_city,/*城市*/
                                                             "detail": orderData.receiver_address,/*详细地址*/
                                                             "district": orderData.receiver_district,/*区*/
                                                             "province": orderData.receiver_state/*省*/
                                                         },
                                                         "mobile": orderData.receiver_phone,/*手机号码*/
                                                         "name": orderData.receiver_name,
                                                         "phone": orderData.receiver_mobile/*固定电话*/
                                                     },
                                                     "routingInfo": {/*路由信息*/
                                                         "consolidation": {/*集包地信息*/
                                                             "name": "",
                                                             "code": ""
                                                         },
                                                         "origin": {/*发件网点信息*/
                                                             "code":""
                                                         },
                                                         "sortation": {/*大头笔信息*/
                                                             "name": ""
                                                         },
                                                         "routeCode": ""/*三段码信息*/
                                                     },
                                                     "sender": {/*发件信息*/
                                                         "address": senderaddress,
                                                         "mobile": sendermobile,
                                                         "name": sendername,
                                                         "phone": senderphone
                                                     },
                                                     "shippingOption": {
                                                         "code": "STANDARD_EXPRESS",/*产品编码*/
                                                         "title": "标准快递"/*产品名称*/
                                                     },
                                                     "cpCode":cp_code,
                                                     "waybillCode": ""
                                                 },
                                                 "signature": "19d6f7759487e556ddcdd3d499af087080403277b7deed1a951cc3d9a93c42a7e22ccba94ff609976c5d3ceb069b641f541bc9906098438d362cae002dfd823a8654b2b4f655e96317d7f60eef1372bb983a4e3174cc8d321668c49068071eaea873071ed683dd24810e51afc0bc925b7a2445fdbc2034cdffb12cb4719ca6b7",
                                                 "templateURL": url
                                             },
                                              /*自定义模板数据*/
                                             {
                                                 "templateURL": "https://cloudprint.cainiao.com/template/isv/34633",
                                                 "data": {
                                                         "goodsInfo": goodsInfo
                                                 }
                                             }
                                            ]
                                    }
                                ]
                            }
                        };

        return request;
    },
    render:function(){
        const {dataSource} = this.props;
        return (
            <span>
                <Button type="secondary" component="button" onClick={this.makeDialogShow} target="_blank">打印预览</Button>
                <Dialog style={{width:"500px",height:"800px"}} visible = {this.state.isShow}
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
                    <div style={{height: "650px",textAlign:"center"}}>
                        <img style={{width:"360px",border:"1px solid"}} src={this.state.printData}/>
                    </div>
                </Dialog>
            </span>
        );
    }
});

export default ElecFacePreview
