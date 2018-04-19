import React from 'react'
import Button from 'qnui/lib/button';
import Dialog from 'qnui/lib/dialog';
import DeliveryPage from './DeliveryPage'
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
            this.setState({isShow:true,show_index:1,printMould:getFromValues().fhdModal,childList_arr:e.result,printData:this.getPrintData(dataSource[0],e.result[0])});
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
                let condition = {
                    tao_tid:dataSource[show_index-1].tao_tid
                };
                api("ebs.order.childDataList",condition,function(e){
                    this.setState({show_index:show_index,printData:this.getPrintData(dataSource[show_index-1],this.state.childList_arr[show_index-1])});
                }.bind(this));
            }
        }
    },
    getPrintData(orderData,childOrderDatas){/*获取打印所需数据*/
        let printData = {};
        let mydate = new Date();
        printData.fhdCompanyName="-"; /*标题*/
        printData.fhdId="-"; /*发货单编号*/
        printData.fhdOrderId=orderData.tao_tid; /*订单号*/
        printData.fhdBuyTime=orderData.pay_time; /*购买时间*/
        printData.fhdBuyerId=orderData.buyer_nick; /*买家ID*/
        printData.fhdTakeMessage=orderData.receiver_name+","+orderData.receiver_mobile+","+orderData.receiver_phone+","+orderData.address+","+orderData.receiver_zip; /*收货信息*/
        printData.fhdBuyerMessage=orderData.buyer_message; /*买家留言*/

        let childs_data = [];
        for(let i = 1; i <= 40; i++){
            childs_data.push({
                fhdSeqNum:"序号"+i,
                fhdGoodsId:"货号"+i,
                fhdGoodsName:"商品名称"+i,
                fhdGoodsShortName:"商品简称"+i,
                fhdFormat:"规格"+i,
                fhdGoodsNum:"数量"+i,
                fhdPrice:"单价"+i,
                fhdItemBenefit:"优惠"+i,
                fhdItemMoney:"金额"+i,
            });
        }
        printData.child_arr = childs_data;
        // printData.fhdSeqNum="-"; /*序号*/
        // printData.fhdGoodsId="-"; /*货号*/
        // printData.fhdGoodsName="-"; /*商品名称*/
        // printData.fhdGoodsShortName="-"; /*商品简称*/
        // printData.fhdFormat="-"; /*规格*/
        // printData.fhdGoodsNum="-";  /*数量*/
        // printData.fhdPrice="-"; /*单价*/
        // printData.fhdItemBenefit="-"; /*优惠(元)*/
        // printData.fhdItemMoney="-"; /*金额(元)*/

        printData.fhdTotalMoney="-"; /*货品合计*/
        printData.fhdCarriage="-"; /*运费*/
        printData.fhdTotalNum="-"; /*货品总量*/
        printData.fhdBenefit="-"; /*优惠总价*/
        printData.fhdReallyMoney="-"; /*实收金额*/
        printData.fhdSellerId="-"; /*卖家ID*/
        printData.fhdSellerPhone="-"; /*卖家电话*/
        printData.fhdSellerMoblie="-"; /*卖家手机*/
        printData.fhdSellerAdd="-"; /*卖家地址*/
        printData.fhdSellerMark="-"; /*卖家备注*/

        return printData;
    },
    render:function(){
        const {dataSource} = this.props;
        const user_nick = "财宝宝588";
        let printData = this.state.printData;
        let deliveryModal = localStorage.getItem("deliveryModal"+user_nick);
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
                    <div style={{maxHeight: "500px",overflow:"auto"}}>
                        <DeliveryPage deliveryModal={deliveryModal} printData={printData} />
                    </div>
                </Dialog>
            </span>
        );
    }
});

export default PrintPreview
