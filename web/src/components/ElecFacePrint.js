import React from 'react'
import Button from 'qnui/lib/button'
import {api} from '../redux/actions/AY_API'
import getUUID from '../static/getUUID'
import {needCLodop, getLodop} from '../static/LodopFuncs'

let ElecFacePrint = React.createClass({
    printElecFace:function(){
        const {dataSource,getFromValues} = this.props;
        const user_nick = "财宝宝588";
        let kddModal = getFromValues().kddModal;
        let LODOP = getLodop();
        let kddPrintRobot = LODOP.GET_PRINTER_NAME(getFromValues().kddPrintRobot);/*获取打印机*/
        let printMould = "";
        let efModal_arr = JSON.parse(localStorage.getItem("efModal"+user_nick));
        efModal_arr.map((value)=>{
            if(value.modal_name == kddModal.split(";")[1]){
                printMould = value.modal_content;/*获取电子面单模板*/
            }
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


        api("ebs.order.getChildListByGroup",condition,function(e){
            let childList_arr = e.result;
            let documents_arr = dataSource.map((value,index)=>{
                return this.getPrintData(value,childList_arr[index],printMould);
            });

            let request = {
                    "cmd": "print",
                    "requestID": "print_ef",
                    "version": "1.0",
                    "task": {
                        "taskID": getUUID(8,16),
                        "preview": false,  //如果为true，则是预览模式，为false，则直接打印
                        "previewType":"image",//如果是预览模式，是以pdf还是image方式预览，二选一，此属性不是必选，默认以pdf预览。
                        "printer": kddPrintRobot,
                        "notifyMode":"allInOne",//打印结果通知模式，是逐个document通知还是批量一次通知最终打印结果
                        "documents": documents_arr
                    }
            }

            window.webSocket.onmessage = function(event)
            {
                console.log('Client received a message',event);
                let result = JSON.parse(event.data);
                console.log(result);
                if(result.cmd == "print"){
                    if(result.status == "success"){
                        if(result.requestID == "print_ef"){
                            console.log("电子面单打印成功");
                        }
                    }else{
                        if(result.requestID == "print_ef"){/*打印失败*/
                        }
                    }
                }
            }.bind(this);
            window.webSocket.send(JSON.stringify(request));
        }.bind(this));

    },
    getPrintData(orderData,childOrderDatas,printMould){/*获取打印所需数据*/
        let mydate = new Date();
        let efmDate = ""; /*打单日期*/
        let efmNum = ""; /*商品总数*/
        let efmTid = ""; /*订单号*/
        let efmAttr = ""; /*货号+属性*/
        let efmShortAndAttr = ""; /*商品简称+属性*/
        let efmRemark = ""; /*备注*/
        let cp_code = "";
        let url = "";
        printMould.split(",").map((value, index)=>{
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

        let request = {
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
        };

        return request;
    },
    render:function(){
        return (
            <Button style={{marginRight:"10px"}} type="secondary" onClick={this.printElecFace} component="button" target="_blank">打印</Button>
        );
    }
});

export default ElecFacePrint
