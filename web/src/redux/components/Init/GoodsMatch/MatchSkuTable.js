import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

import Balloon from 'qnui/lib/balloon';

import Navigation,{Item, Group} from 'qnui/lib/navigation';
import Icon from 'qnui/lib/icon';


import Menu from 'qnui/lib/menu';
import Step, { Item as StepItem } from 'qnui/lib/step';
import Button, { Group as ButtonGroup } from 'qnui/lib/button';

import Switch from 'qnui/lib/switch';

import Checkbox from 'qnui/lib/checkbox';

let defaultTrigger = <Button className="btrigger">default</Button>;
let primary = <Button className="btrigger">primary</Button>;
let mountNode = document.getElementById('app');

var Gmatch_sku = {
    "match_sku_left":["L,A","L,B","L,C","L,D"],
    "match_sku_right":["R,A","R,B","R,C","R,D"],
    "unmatch_sku_left":["L,E","L,F","L,G","L,H"],
    "unmatch_sku_right":["R,E","R,F","R,G","R,H"]
};



let PageFrame = React.createClass({
    render:function(){
        return (
            <div id="container">
                <div id="navigation" style={{width:"300px",height:"100%",float:"left",overflow: "hidden",padding: "10px 5px 10px 30px"}}>

                </div>
                <div id="module_data" style={{height:"100%",float:"left",overflow: "hidden",padding: "10px 30px 10px 5px"}}>
                    <div id="initSet" style={{height:"100%",border: "1px solid #EBEBEB",borderRadius: "5px",padding:"10px 20px"}}>
                    </div>
                </div>
            </div>
        );
    }
});


const Demo = () => (
    <div className="container">
        <Balloon  trigger={defaultTrigger} triggerType="hover">
                        default
        </Balloon>

        &nbsp;&nbsp;&nbsp;&nbsp;
        <Balloon type="primary" trigger={primary} closable={false} triggerType="click">
            primary
        </Balloon>
    </div>
);



let onMouseEnter = (id, item, nav) => {
    console.log('onMouseEnter')
}

let onMouseLeave = (id, item, nav) => {
    console.log('onMouseLeave')
}


let MatchSkuTable = React.createClass({
    getInitialState:function(){
        return {"match_sku_info":Gmatch_sku,"left_click":false,"right_click":true,"left_sku":null,"select_type":"left","select_index":0,"enter_select":false};
    },
    handleclick:function(index,event){
        if(this.state.left_sku  == null){
            if(index <= Gmatch_sku.match_sku_left.length - 1){
                Gmatch_sku.unmatch_sku_left.push(Gmatch_sku.match_sku_left[index]);
                Gmatch_sku.match_sku_left.splice(index,1);
            }
            if(index <= Gmatch_sku.match_sku_right.length - 1){
                Gmatch_sku.unmatch_sku_right.push(Gmatch_sku.match_sku_right[index]);
                Gmatch_sku.match_sku_right.splice(index,1);
            }
            this.setState({"match_sku_info":Gmatch_sku});
        }else {
            if(index <= Gmatch_sku.match_sku_left.length - 1){
                Gmatch_sku.match_sku_left.splice(index,1);
            }
            if(index <= Gmatch_sku.match_sku_right.length - 1){
                Gmatch_sku.match_sku_right.splice(index,1);
            }
            this.setState({"match_sku_info":Gmatch_sku,"left_click":false,"right_click":true,"left_sku":null,"select_type":"left","select_index":0,"enter_select":false});
        }
    },
    leftclick:function(index,event){
        Gmatch_sku.match_sku_left.push(Gmatch_sku.unmatch_sku_left[index]);
        this.setState({"match_sku_info":Gmatch_sku,"left_click":true,"right_click":false,"left_sku":index,"select_type":"right","select_index":0});
    },
    rightclick:function(index,event){
        var left_sku = this.state.left_sku;
        Gmatch_sku.match_sku_right.push(Gmatch_sku.unmatch_sku_right[index]);
        Gmatch_sku.unmatch_sku_right.splice(index,1);
        Gmatch_sku.unmatch_sku_left.splice(left_sku,1);
        this.setState({"match_sku_info":Gmatch_sku,"left_click":false,"right_click":true,"left_sku":null,"select_type":"left","select_index":0});
    },
    componentDidMount:function(){
        document.onkeydown = function(){
            var index = this.state.select_index;
            if(this.state.select_type == "left"){
                var max_index = Gmatch_sku.unmatch_sku_left.length - 1;
            }else{
                var max_index = Gmatch_sku.unmatch_sku_right.length - 1;
            }
            if(event.which == 38){/*上*/
                index = index - 2;
                if(index < 0){
                    index = 0;
                }
                this.setState({"select_index":index});

            }
            if(event.which == 40){/*下*/
                index = index + 2;
                if(index > max_index){
                    index = max_index;
                }
                this.setState({"select_index":index});

            }
            if(event.which == 37){/*左*/
                index = index - 1;
                if(index < 0){
                    index = 0;
                }
                this.setState({"select_index":index});

            }
            if(event.which == 39){/*右*/
                index = index + 1;
                if(index > max_index){
                    index = max_index;
                }
                this.setState({"select_index":index});

            }

            if(event.which == 13){/*回车*/
                var select_index = this.state.select_index;
                if(this.state.select_type == "left"){
                    Gmatch_sku.match_sku_left.push(Gmatch_sku.unmatch_sku_left[select_index]);
                    this.setState({"match_sku_info":Gmatch_sku,"left_click":true,"right_click":false,"left_sku":select_index,"select_type":"right","select_index":0,"enter_select":true});
                }else {
                    var left_sku = this.state.left_sku;
                    Gmatch_sku.match_sku_right.push(Gmatch_sku.unmatch_sku_right[select_index]);
                    Gmatch_sku.unmatch_sku_right.splice(select_index,1);
                    Gmatch_sku.unmatch_sku_left.splice(left_sku,1);
                    this.setState({"match_sku_info":Gmatch_sku,"left_click":false,"right_click":true,"left_sku":null,"select_type":"left","select_index":0,"enter_select":false});
                }
            }
        }.bind(this);
    },
    render:function(){
        return (
            <div>
                <div style={{marginTop: "20px"}}>
                    <div style={{display: "inline-block",width: "50%",textAlign:"right"}}>
                        <span className="goods-match-title"><img style={{marginBottom: "-3px"}} src="image/taobao.png"/>明明小明明</span><span className="goods-match-title">货号：AK-25684</span><span className="goods-match-title">编号：<span style={{fontWeight: "bold",color: "#f97745"}}>AG-25084</span></span>
                    </div>
                    <div style={{display: "inline-block",width: "50%"}}>
                        <span className="goods-match-title"><img style={{marginBottom: "-3px"}} src="image/jd.png"/>小明旗舰店</span><span className="goods-match-title">货号：AK-25684</span><span className="goods-match-title">编号：<span style={{fontWeight: "bold",color: "#f97745"}}>AG-25084</span></span>
                    </div>

                </div>
                <div style={{margin: "20px auto",width:"500px",position: "relative"}}>
                    <div style={{padding: "5px 10px",display:"inline-block",width: "500px",border: "1px solid #8cc2f5",borderRadius: "3px"}}>
                        <table style={{width: "100%"}}>
                            <tbody>
                                {
                                    this.state.match_sku_info.match_sku_left.map(
                                        function(value,index){
                                            var last = this.state.match_sku_info.match_sku_left.length - 1;
                                            if(index == last){
                                                return(
                                                    <tr key={"match_tr_" + index}>
                                                    <td className="sppp-td" style={{borderBottom: "none"}}>
                                                    <span style={{display:"inline-block",width:"40%",textAlign:"center"}}>{value}</span>
                                                    <span style={{display:"inline-block",width:"20%",textAlign:"center"}}>=</span>
                                                    <span style={{display:"inline-block",width:"40%",textAlign:"center"}}>{this.state.match_sku_info.match_sku_right[index]}</span>
                                                    </td>
                                                    </tr>
                                                );
                                            }else {
                                                return(
                                                    <tr key={"match_tr_" + index}>
                                                    <td className="sppp-td">
                                                    <span style={{display:"inline-block",width:"40%",textAlign:"center"}}>{value}</span>
                                                    <span style={{display:"inline-block",width:"20%",textAlign:"center"}}>=</span>
                                                    <span style={{display:"inline-block",width:"40%",textAlign:"center"}}>{this.state.match_sku_info.match_sku_right[index]}</span>
                                                    </td>
                                                    </tr>
                                                );
                                            }
                                        }.bind(this)
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                    <div style={{padding: "5px 10px",display:"inline-block",width: "50px",position:"absolute",top: "1px"}}>
                        <table style={{width: "100%"}}>
                            <tbody>
                                {
                                    this.state.match_sku_info.match_sku_left.map(function(value,index){
                                        return (
                                            <tr key={"match_cc_" + index}>
                                                <td className="sppp-td" style={{borderBottom: "none",textAlign: "center"}}>
                                                    <img src="image/close.png" onClick={this.handleclick.bind(this,index)}/>
                                                </td>
                                            </tr>
                                        );
                                    }.bind(this))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>

                <div style={{margin: "20px auto",width:"501px"}}>
                        <table style={{width:"100%"}}>
                            <tbody>
                                <tr>
                                    <td style={{width:"250px",padding:"0",verticalAlign: "initial"}}>
                                        {
                                            this.state.match_sku_info.unmatch_sku_left.map(function(value,index){
                                                if(this.state.left_sku == index){
                                                    return (
                                                        <div className="wpp-sku">
                                                        <label>
                                                        <Checkbox key={"enter_left" + value + index} defaultChecked  disabled={this.state.left_click}/>
                                                        <span className="next-checkbox-label">{value}</span>
                                                        </label>
                                                        </div>
                                                    );
                                                }else {
                                                    if(this.state.select_type == "left" && this.state.select_index == index){
                                                        return (
                                                            <div className="wpp-sku">
                                                                <label>
                                                                    <Checkbox key={"left" + value + index} className="hovered" disabled={this.state.left_click} onClick={this.leftclick.bind(this,index)}/>
                                                                    <span className="next-checkbox-label">{value}</span>
                                                                </label>
                                                            </div>
                                                        );
                                                    }else {
                                                        return (
                                                            <div className="wpp-sku">
                                                                <label>
                                                                    <Checkbox key={"left" + value + index} disabled={this.state.left_click} onClick={this.leftclick.bind(this,index)}/>
                                                                    <span className="next-checkbox-label">{value}</span>
                                                                </label>
                                                            </div>
                                                        );
                                                    }
                                                }

                                            }.bind(this))
                                        }
                                    </td>
                                    <td style={{borderLeft: "1px solid #dddddd",width:"251px",padding:"0",verticalAlign: "initial"}}>
                                        {
                                            this.state.match_sku_info.unmatch_sku_right.map(function(value,index){

                                                    if(this.state.select_type == "right" && this.state.select_index == index){
                                                        return (
                                                            <div className="wpp-sku">
                                                                <label>
                                                                    <Checkbox key={"right" + value + index} className="hovered" disabled={this.state.right_click} onClick={this.rightclick.bind(this,index)}/>
                                                                    <span className="next-checkbox-label">{value}</span>
                                                                </label>
                                                            </div>
                                                        );
                                                    }else {
                                                        return (
                                                            <div className="wpp-sku">
                                                                <label>
                                                                    <Checkbox key={"right" + value + index} disabled={this.state.right_click} onClick={this.rightclick.bind(this,index)}/>
                                                                    <span className="next-checkbox-label">{value}</span>
                                                                </label>
                                                            </div>
                                                        );
                                                    }
                                            }.bind(this))
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                </div>
                <div style={{textAlign:"center"}}>
                    <Button style={{margin:"0 auto"}} type="primary" component="a" href="#" target="_blank">完成</Button>
                </div>
            </div>
        );
    }
});

let StepLabel = React.createClass({
    render:function(){
        if(this.props.labelID == this.props.nowLableID){
            if(this.props.labelID == 0){
                return (
                    <div id="ddtb" style={{height:"100%",display:"block"}}>
                        订单同步
                        <label>
                            <Checkbox/>
                            <span className="next-checkbox-label">雪梨</span>
                        </label>
                    </div>
                );
            }

            if(this.props.labelID == 1){
                return (
                    <div id="znsd" style={{height:"100%",display:"block",padding:"20px 80px"}}>
                        <div>请选择您需要审核的订单类型：</div>

                        <table style={{width:"100%",height:"75%"}}>
                            <tbody>
                                <tr>
                                    <td className="znsd-td">物流信息</td>
                                    <td className="znsd-td">
                                        <Switch defaultChecked={false}/>
                                        <span style={{display: "inline-block",marginLeft: "10px"}}>
                                            <span style={{display: "block"}}>货到付款的订单</span>
                                            <span style={{display: "block",color:"#dec305"}}>买家使用货到付款方式</span>
                                        </span>

                                    </td>
                                    <td className="znsd-td"></td>
                                </tr>
                                <tr>
                                    <td className="znsd-td" rowSpan="2">订单信息</td>
                                    <td className="znsd-td">
                                        <Switch defaultChecked={false}/>
                                        <span style={{display: "inline-block",marginLeft: "10px"}}>
                                            <span style={{display: "block"}}>有买家留言的订单</span>
                                            <span style={{display: "block",color:"#dec305"}}>买家有留言</span>
                                        </span>
                                    </td>
                                    <td className="znsd-td">
                                        <Switch defaultChecked={false}/>
                                        <span style={{display: "inline-block",marginLeft: "10px"}}>
                                            <span style={{display: "block"}}>已合并的订单</span>
                                            <span style={{display: "block",color:"#dec305"}}>买家拍多笔订单系统自动合并</span>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="znsd-td">
                                        <Switch defaultChecked={false}/>
                                        <span style={{display: "inline-block",marginLeft: "10px"}}>
                                            <span style={{display: "block"}}>有备注的订单</span>
                                            <span style={{display: "block",color:"#dec305"}}>客服添加过备注</span>
                                        </span>
                                    </td>
                                    <td className="znsd-td">
                                        <Switch defaultChecked={false}/>
                                        <span style={{display: "inline-block",marginLeft: "10px"}}>
                                            <span style={{display: "block"}}>需要开发票的订单</span>
                                            <span style={{display: "block",color:"#dec305"}}>买家要求开票</span>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="znsd-td" rowSpan="2">买家信息</td>
                                    <td className="znsd-td">
                                        <Switch defaultChecked={false}/>
                                        <span style={{display: "inline-block",marginLeft: "10px"}}>
                                            <span style={{display: "block"}}>已合并的订单</span>
                                            <span style={{display: "block",color:"#dec305"}}>买家拍多笔订单系统自动合并</span>
                                        </span>
                                    </td>
                                    <td className="znsd-td">
                                        <Switch defaultChecked={false}/>
                                        <span style={{display: "inline-block",marginLeft: "10px"}}>
                                            <span style={{display: "block"}}>修改过地址或SKU的订单</span>
                                            <span style={{display: "block",color:"#dec305"}}>修改过订单信息</span>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="znsd-td">
                                        <Switch defaultChecked={false}/>
                                        <span style={{display: "inline-block",marginLeft: "10px"}}>
                                            <span style={{display: "block"}}>需要开发票的订单</span>
                                            <span style={{display: "block",color:"#dec305"}}>买家要求开票</span>
                                        </span>
                                    </td>
                                    <td className="znsd-td">
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div>请选择订单展示方式：</div>
                        <div style={{marginTop: "40px"}}>
                            <label style={{marginLeft: "5%"}}>
                                <Checkbox defaultChecked id="zdhb" />
                                <span className="next-checkbox-label">收货信息一致的多笔订单自动合并</span>
                            </label>
                        </div>
                    </div>
                );
            }

            if(this.props.labelID == 2){
                return (
                    <div style={{height:"100%",display:"block"}}>
                        物流匹配
                    </div>
                );
            }

            if(this.props.labelID == 3){
                return (
                    <div style={{height:"100%",display:"block"}}>
                        打印机设置
                    </div>
                );
            }

            if(this.props.labelID == 4){
                return (
                    <MatchSkuTable />
                );
            }
        }else {
            return null;
        }
    }
});


class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStep: 0
        };
    }
    next() {
        const s = this.state.currentStep + 1;

        this.setState({
            currentStep: s > 5 ? 5 : s
        });
    }
    prev() {
        const s = this.state.currentStep - 1;

        this.setState({
            currentStep: s < 0 ? 0 : s
        });
    }
    onClick(currentStep) {
        console.log(currentStep);

        this.setState({
            currentStep: currentStep
        });
    }
    render() {
        const {currentStep} = this.state;

        return (
            <div style={{height: "100%"}}>
                <Step current={currentStep}>
                    <StepItem title="订单同步" onClick={this.onClick.bind(this)} />
                    <StepItem title="智能审单" onClick={this.onClick.bind(this)} />
                    <StepItem title="物流匹配" onClick={this.onClick.bind(this)} />
                    <StepItem title="打印机设置" onClick={this.onClick.bind(this)} />
                    <StepItem title="商品匹配" onClick={this.onClick.bind(this)} />
                </Step>
                <div style={{height: "80%"}}>
                    <StepLabel labelID="0" nowLableID={this.state.currentStep}/>
                    <StepLabel labelID="1" nowLableID={this.state.currentStep}/>
                    <StepLabel labelID="2" nowLableID={this.state.currentStep}/>
                    <StepLabel labelID="3" nowLableID={this.state.currentStep}/>
                    <StepLabel labelID="4" nowLableID={this.state.currentStep}/>
                </div>

                <ButtonGroup style={{float: "right",marginRight: "10%"}}>
                    <Button onClick={this.prev.bind(this)} type="primary" disabled={currentStep === 0}>上一步</Button>
                    <Button onClick={this.next.bind(this)} type="primary" disabled={currentStep === 5}>下一步</Button>
                </ButtonGroup>
            </div>
        );
    }
}

// ReactDOM.render(<Component />, document.getElementById("initSet"));
export default MatchSkuTable;
