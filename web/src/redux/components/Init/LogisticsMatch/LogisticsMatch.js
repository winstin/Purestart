import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Dialog from 'qnui/lib/dialog';
import Checkbox from 'qnui/lib/checkbox';
import Input from 'qnui/lib/input';
import Select from 'qnui/lib/select';
import Icon from 'qnui/lib/icon';
import Button from 'qnui/lib/button';
import Gchina from './Modal/data'

import MatchDialog from './Modal/MatchDialog'
import MatchTable from './Modal/MatchTable'
const { Group: CheckboxGroup } = Checkbox;
import * as LogisticsMatchActions from '../../../actions/LogisticsMatch'

const expressData = ['邮政国内小包', '圆通快递'];
var message = [{"id":"0","placeArr":'江浙沪',"wuliuArr":'中通快递',"usevalue":"开启"},{"id":"1","placeArr":'京津冀，东北三省',"wuliuArr":'百世汇通',"usevalue":"开启"},{"id":"2","placeArr":'北京，天津',"wuliuArr":'申通快递',"usevalue":"开启"}];
var expressmoney = {"weight":"1.0","money":"12.00","addweight":"1.0","addmoney":"8.00"};
var messageexpress = [];

let list = [];


class LogisticsMatch extends React.Component{
    componentDidMount(){
        const {getMessage} = this.props;
        getMessage((val)=>{
            this.setState({
                trade_signed_logistics_value : val.trade_signed_logistics,
                address_anomaly_order_value : val.address_anomaly_order,
                address_anomaly_order_logistics_value : val.address_anomaly_order_logistics,
                ismore_logistics_value : val.ismore_logistics,
            });
        });
    }
    constructor() {
        super();
        this.state = {
            trade_signed_logistics_value : '中国邮政小包',
            address_anomaly_order_value : '中国',
            address_anomaly_order_logistics_value : '中国邮政小包',
            ismore_logistics_value : '中国邮政小包',
            area:Gchina,
            checked:false,
            usevalue:"开启",
            state_message : message,
            messageexpress:messageexpress,
            expressmoney : expressmoney,
            b:{
                visible: false
            },
            a:{
                visible: false
            },
            c:{
                visible: false
            },
            place:{
                isshow: "block",
                editshow:"none"
            },
            weight:{
                isshow: "block",
                editshow:"none"
            },
            money:{
                isshow: "block",
                editshow:"none"
            },
            addweight:{
                isshow: "block",
                editshow:"none"
            },
            addmoney:{
                isshow: "block",
                editshow:"none"
            },
        };
    }
    handleclick(index){
        let messageexpress = this.state.messageexpress;
        messageexpress.splice(index,1);
        this.setState({"messageexpress":messageexpress});
    }
    onOpen(index){
        this.setState({
            index:index,
            b:{
                visible: true
            }
        });
    }
    onAOpen(id){
        this.setState({
            expressmoney:this.props.message[id],
            messageexpress:this.props.logistics_detail[id],
            a:{
                visible: true
            }
        });
    }
    addClick(){
        let add_list = {"place":"","weight":"","money":"","addweight":"","addmoney":""};
        let edit_arr = this.state.messageexpress;
        edit_arr.push(add_list);
        this.setState({
            messageexpress:edit_arr,
            place:{ isshow: "none", editshow:"block" },
            money:{ isshow: "none", editshow:"block" },
            weight:{ isshow: "none", editshow:"block" },
            addweight:{ isshow: "none", editshow:"block" },
            addmoney:{ isshow: "none", editshow:"block"}
        });
    }
    onCOpen(name){
        list = [];
        for(let i = 0; i< Gchina[name].length; i++){
          list.push({
              value: name+i,
              label: Gchina[name][i]
            })
        }
        this.setState({
                c:{
                visible: true
            }
        });
    }
    onClose(){
        this.setState({
            a:{
            visible: false
        },
        b:{
            visible: false
        }
         });
    }
    onCClose(){
        this.setState({
            c:{
            visible: false
        }
         });
    }
    changeCheck(item,check,k){
        this.state.area.areaArr[k].check = !check;
        for(let i = 0; i< Gchina[item].length; i++){

            this.state.area[item][i].check = "false"
        }
        this.setState(this.state);
    }
    //监听默认运费模版的编辑
    handleAChange(event) {
        let expressmoney = this.state.expressmoney;
        expressmoney.weight = event.target.value;
        this.setState(expressmoney);
    }
    handleBChange(event) {
        let expressmoney = this.state.expressmoney;
        expressmoney.money = event.target.value;
        this.setState(expressmoney);
    }
    handleCChange(event) {
        let expressmoney = this.state.expressmoney;
        expressmoney.addweight = event.target.value;
        this.setState(expressmoney);
    }
    handleDChange(event) {
        let expressmoney = this.state.expressmoney;
        expressmoney.addmoney = event.target.value;
        this.setState(expressmoney);
    }
    handleEChange(event) {
        let expressmoney = this.state.expressmoney;
        expressmoney.feetime = event.target.value;
        this.setState(expressmoney);
    }
    //监听特殊目的地运费模版的编辑
    handleFChange(number,cellname,event) {
        let messageexpress = this.state.messageexpress;
        messageexpress[number][cellname] = event.target.value;
        this.setState(messageexpress);
    }
    onChangeCheck(type,checked){
        const {saveMessage,setAll} = this.props;
        if(type=="trade_signed_logistics"){
            this.setState({
                trade_signed_logistics_value : checked
            });
        }else if(type=="address_anomaly_order"){
            checked = this.state.address_anomaly_order_value;
        }else if(type=="address_anomaly_order_logistics"){
            this.setState({
                address_anomaly_order_logistics_value : checked
            });
        }else if(type=="ismore_logistics"){
            this.setState({
                ismore_logistics_value : checked
            });
        }
        saveMessage(type,checked);
    }
    editContent(index){
        switch(index){
            case "place":
                this.setState({ place:{ isshow: "none", editshow:"block" } });
                break;
            case "weight":
                this.setState({ weight:{ isshow: "none", editshow:"block" } });
                break;
            case "money":
                this.setState({ money:{ isshow: "none", editshow:"block" } });
                break;
            case "addweight":
                this.setState({ addweight:{ isshow: "none", editshow:"block" } });
                break;
            case "addmoney":
                this.setState({ addmoney:{ isshow: "none", editshow:"block" } });
                break;
        }
    }
    inputchange(key){
        this.setState({
            address_anomaly_order_value : key
        });
    }
    save(){
        const {hascheck,savelogistics} = this.props;
        if(hascheck==1){
            savelogistics();
        }
        this.setState({
            b:{
                visible: false
            }
        });
    }
    savetemplate(){
        const savetemplateLMaction = this.props.savetemplateLMaction;
        savetemplateLMaction(this.state.expressmoney,this.state.messageexpress);
        this.setState({
            a:{
                visible: false
            },
            place:{ isshow: "block", editshow:"none" },
            money:{ isshow: "block", editshow:"none" },
            weight:{ isshow: "block", editshow:"none" },
            addweight:{ isshow: "block", editshow:"none" },
            addmoney:{ isshow: "block", editshow:"none"}
        });
    }
    render() {
        const {message,setAll,saveMessage} = this.props;
        return (
            <div className="init-logisticsmatch">
                <MatchTable dataSource={message}
                    editModal = {this.onOpen.bind(this)}
                    setModal = {this.onAOpen.bind(this)}
                    createLogistics = {this.save.bind(this)}
                    saveMessage = {saveMessage}
                     />

                <div className="init-logisticsmatch-div">
                    <Checkbox id="istrade_signed_forlogistics" onChange={this.onChangeCheck.bind(this,"istrade_signed_forlogistics")} checked={setAll.istrade_signed_forlogistics==1?true:false}/>
                    <label htmlFor="apple" className="next-checkbox-label">如果是货到付款的订单，指定</label>
                    <Select className="next-checkbox-label" onChange={this.onChangeCheck.bind(this,"trade_signed_logistics")} value={this.state.trade_signed_logistics_value}>
                        <Option value="中国邮政小包">中国邮政小包</Option>
                        <Option value="圆通快递">圆通快递</Option>
                    </Select>
                </div>
                <div className="init-logisticsmatch-div">
                    <Checkbox id="isaddress_anomaly_order" onChange={this.onChangeCheck.bind(this,"isaddress_anomaly_order")} checked={setAll.isaddress_anomaly_order==1?true:false}/>
                    <label htmlFor="apple" className="next-checkbox-label">如果买家详细的收获地址中包含</label>
                    <Input className="textClsName" size="large" value={this.state.address_anomaly_order_value} onChange={this.inputchange.bind(this)}  onBlur={this.onChangeCheck.bind(this,"address_anomaly_order")}/> 则指定
                    <Select className="next-checkbox-label" onChange={this.onChangeCheck.bind(this,"address_anomaly_order_logistics")} value={this.state.address_anomaly_order_logistics_value}>
                        <Option value="中国邮政小包">中国邮政小包</Option>
                        <Option value="圆通快递">圆通快递</Option>
                    </Select>
                </div>
                <div className="init-logisticsmatch-div">
                    <Checkbox id="ismore" onChange={this.onChangeCheck.bind(this,"ismore")} checked={setAll.ismore==1?true:false}/>
                    <label htmlFor="apple" className="next-checkbox-label">不符合以上所有条件则指定</label>
                    <Select className="next-checkbox-label" onChange={this.onChangeCheck.bind(this,"ismore_logistics")} value={this.state.ismore_logistics_value}>
                        <Option value="中国邮政小包">中国邮政小包</Option>
                        <Option value="圆通快递">圆通快递</Option>
                    </Select>
                </div>
                <MatchDialog title="物流匹配" visible = {this.state.b.visible}
                    onOk = {this.save.bind(this)}
                    onCancel = {this.onClose.bind(this)}
                    onClose = {this.onClose.bind(this)}
                    index = {this.state.index}
                    />
                <Dialog visible = {this.state.a.visible}
                        onOk = {this.savetemplate.bind(this)}
                        onCancel = {this.onClose.bind(this)}
                        onClose = {this.onClose.bind(this)} style = {{width:"80%",height:"50%"}} title = "运费模版">
                        <div style={{padding: '20px'}}>
                           <div>默认运费<input ref="weight" value={this.state.expressmoney.weight} onChange={this.handleAChange.bind(this)}/>KG内<input ref="money" value={this.state.expressmoney.money} onChange={this.handleBChange.bind(this)}/>元，每增加<input ref="addweight" value={this.state.expressmoney.addweight} onChange={this.handleCChange.bind(this)}/>KG，增加运费<input ref="addmoney" value={this.state.expressmoney.addmoney} onChange={this.handleDChange.bind(this)}/>元</div>
                           <table style={{width: "100%",textAlign:'center',marginTop:"10px"}}>
                               <tr>
                                   <td className="sppp-td" style={{backgroundColor:"#ebebeb"}}>
                                   <span style={{display:"inline-block",width:"20%",textAlign:"center"}}>目的地</span>
                                   <span style={{display:"inline-block",width:"15%",textAlign:"center"}}>首重（KG）</span>
                                   <span style={{display:"inline-block",width:"15%",textAlign:"center"}}>首费（元）</span>
                                   <span style={{display:"inline-block",width:"15%",textAlign:"center"}}>续重（KG）</span>
                                   <span style={{display:"inline-block",width:"15%",textAlign:"center"}}>续费（元）</span>
                                   <span style={{display:"inline-block",width:"20%",textAlign:"center"}}>操作</span>
                                   </td>
                               </tr>
                               {
                                   this.state.messageexpress.map(
                                       function(index,number){
                                               return(
                                                   <tr >
                                                   <td className="sppp-td">
                                                       <span style={{display:"inline-block",width:"20%",textAlign:"center"}}><span  onClick={this.editContent.bind(this,"place")}  style={{display:this.state.place.isshow}}>{index.place}</span><span style={{display:this.state.place.editshow}}><input placeholder={index.place} style={{width:"40px"}} onChange={this.handleFChange.bind(this,number,"place")}/></span></span>
                                                       <span style={{display:"inline-block",width:"15%",textAlign:"center"}}><span  onClick={this.editContent.bind(this,"weight")}  style={{display:this.state.weight.isshow}}>{index.weight}</span><span style={{display:this.state.weight.editshow}}><input placeholder={index.weight} style={{width:"40px"}} onChange={this.handleFChange.bind(this,number,"weight")}/></span></span>
                                                       <span style={{display:"inline-block",width:"15%",textAlign:"center"}}><span  onClick={this.editContent.bind(this,"money")}  style={{display:this.state.money.isshow}}>{index.money}</span><span style={{display:this.state.money.editshow}}><input placeholder={index.money} style={{width:"40px"}} onChange={this.handleFChange.bind(this,number,"money")}/></span></span>
                                                       <span style={{display:"inline-block",width:"15%",textAlign:"center"}}><span  onClick={this.editContent.bind(this,"addweight")}  style={{display:this.state.addweight.isshow}}>{index.addweight}</span><span style={{display:this.state.addweight.editshow}}><input placeholder={index.addweight} style={{width:"40px"}} onChange={this.handleFChange.bind(this,number,"addweight")}/></span></span>
                                                       <span style={{display:"inline-block",width:"15%",textAlign:"center"}}><span  onClick={this.editContent.bind(this,"addmoney")}  style={{display:this.state.addmoney.isshow}}>{index.addmoney}</span><span style={{display:this.state.addmoney.editshow}}><input placeholder={index.addmoney} style={{width:"40px"}} onChange={this.handleFChange.bind(this,number,"addmoney")}/></span></span>
                                                       <span style={{display:"inline-block",width:"20%",textAlign:"center"}}><a style={{marginLeft:"1rem"}} onClick={this.handleclick.bind(this,index)}>删除</a></span>
                                                   </td>
                                                   </tr>
                                               );
                                       }.bind(this)
                                   )
                               }
                           </table>
                           <div style={{marginTop:"10px"}}><a href="javascript:void(0);" onClick={this.addClick.bind(this)}>添加</a></div>
                           <div style={{marginTop:"20px"}}>快递运费结算时间：每月<input ref="feetime" value={this.state.expressmoney.feetime} onChange={this.handleEChange.bind(this)} style={{width:"20px"}}/>号</div>
                       </div>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        isupdate:state.LogisticsMatch.isupdate,
        message:state.LogisticsMatch.message,
        logistics_detail:state.LogisticsMatch.logistics_detail,
        setAll:state.LogisticsMatch.setAll,
        listCheckArr:state.LogisticsMatch.listCheckArr,
        hascheck:state.MatchCheck.hascheck
    }
}
function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(LogisticsMatchActions, dispatch) //把state方法绑定到props
}
export default connect(mapStateToProps,mapDispatchToProps)(LogisticsMatch)
