/**
 @author Mothpro
**/
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import OrderTable from '../../../components/Ordertable'
import GoodsSkuTable from './GoodsSkuTable'
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import * as GoodsListTableActions from '../../actions/GoodsListTable'
import _ from 'lodash';
import Data from './data';
import {api} from '../../actions/AY_API'
import Dialog from 'qnui/lib/dialog';
import Icon from 'qnui/lib/icon';
import Menu from 'qnui/lib/menu';
import Checkbox from 'qnui/lib/checkbox';
import Radio, { Group as RadioGroup } from 'qnui/lib/radio';
import './GoodsListTable.css'
import StoreIcon from '../../../components/StoreIcon'
const { Group: CheckboxGroup } = Checkbox;

const ButtonGroup = Button.Group;
const shopslist = [
    {
        value: 'TAO',
        label: '淘宝'
    }, {
        value: 'DJ',
        label: '京东'
    }, {
        value: 'TM',
        label: '天猫'
    }
];
let selectclass = "";
class GoodsTable extends Component {
    constructor() {
        super();
        this.state = {
            store_id:'',
            disabled : true,
            up:{
                visible: false
            },
            down:{
                visible: false
            },
            update:{
                visible: false
            },
            delete:{
                visible: false
            },
            logs:{
                visible: false
            },
            itemsClass:[],
            inputclassshow:"input-class-none",
            addclassshow:"input-class-show",
            shopsvalue:"",
            listlogsdata:[],
            listItemMess:"",
            choosevalue: 'tongyiprice',
            tongyishow:"input-class-show",
            fenbieshow:"input-class-none"
        }
    }
    onSearch(searchValue){/*搜索*/
        const {selectCondition, getOrderData} = this.props;
        getOrderData({
            'search_value':searchValue,
            'filter_value':selectCondition.filter_value,
            'sort_value':selectCondition.sort_value,
            'page_num':1
        });
    }

    onFilter(filterKeys){/*过滤*/
        const {selectCondition, getOrderData} = this.props;
        getOrderData({
            'search_value':selectCondition.search_value,
            'filter_value':JSON.stringify(filterKeys),
            'sort_value':selectCondition.sort_value,
            'page_num':1
        });
    }

    onSort(dataIndex, order, sort){/*排序*/
        const {selectCondition, getOrderData} = this.props;
        getOrderData({
            'search_value':selectCondition.search_value,
            'filter_value':selectCondition.filter_value,
            'sort_value':JSON.stringify({'dataIndex':dataIndex,'order':order}),
            'page_num':1
        });
    }

    pageOnChange(value, e){/*翻页*/
        const {selectCondition, getOrderData} = this.props;
        getOrderData({
            'search_value':selectCondition.search_value,
            'filter_value':selectCondition.filter_value,
            'sort_value':selectCondition.sort_value,
            'page_num':value
        });
    }

    itemsCheckedOnChange(ItemsSelected_arr){/*勾选*/
        console.log(ItemsSelected_arr);
        const {checkedOnChange} = this.props;
        checkedOnChange(ItemsSelected_arr);
        if(ItemsSelected_arr.indexOf(true) > -1){
            this.setState({
                disabled : false
            });
        }else{
            this.setState({
                disabled : true
            });
        }
    }

    componentDidMount(){
        const {getOrderData,orderTotal,getItemsClass} = this.props;
        orderTotal == 0 ?getOrderData({
            'search_value':'',
            'filter_value':'',
            'sort_value':'',
            'page_num':1
        }):'';
        let condition = {
        };
        api("ebs.item.getItemsClass",condition,function(e){
            console.log("getItemsClass",e);
            if(e.result){
                this.setState({
                    itemsClass:e.result
                });
            }
        }.bind(this));
    }
    changeClass(){//修改商品分类
        const {isLoading, orderTotal, selectCondition, orderData, ItemsSelected_arr, getOrderData} = this.props;
        if(selectclass != ""){
            let ebs_type = "";
            if(selectclass == "未分类商品"){
            }else{
                ebs_type = selectclass;
            }
            for(let i = 0; i < ItemsSelected_arr.length; i++){
                if(ItemsSelected_arr[i] == true){
                    let condition = {
                        'ebs_type' : ebs_type,
                        'ebs_iid': orderData[i].ebs_iid,
                    };
                    api("ebs.item.changeItemsClass",condition,function(rsp){
                        let result = rsp.result;
                        if(rsp.result){
                            this.setState({
                                update:{
                                    visible: false
                                }
                            });
                            getOrderData({
                                'search_value':'',
                                'filter_value':'',
                                'sort_value':'',
                                'page_num':1
                            });
                            console.log(rsp.result);
                        }
                        console.log(result);
                    }.bind(this));
                }
            }
        }
    }
    dialogShow(item){//展示不同操作弹框
        switch(item){
            case "up":
                this.setState({
                    up:{
                        visible: true
                    }
                });
            break;
            case "down":
                this.setState({
                    down:{
                        visible: true
                    }
                });
            break;
            case "update":
                this.setState({
                    update:{
                        visible: true
                    }
                });
            break;
            case "delete":
                this.setState({
                    delete:{
                        visible: true
                    }
                });
            break;
        }
    }
    onClose = (item) => {//关闭不同操作弹框
        switch(item){
            case "up":
                this.setState({
                    up:{
                        visible: false
                    }
                });
            break;
            case "down":
                this.setState({
                    down:{
                        visible: false
                    }
                });
            break;
            case "update":
                this.setState({
                    update:{
                        visible: false
                    }
                });
            break;
            case "delete":
                this.setState({
                    delete:{
                        visible: false
                    }
                });
            break;
            case "logs":
                this.setState({
                    logs:{
                        visible: false
                    }
                });
            break;
        }
    }
    deleteItems(){//删除商品
        const {isLoading, orderTotal, selectCondition, orderData, ItemsSelected_arr, getOrderData} = this.props;
        console.log(orderData);
        console.log(ItemsSelected_arr);
        for(let i = 0; i < ItemsSelected_arr.length; i++){
            if(ItemsSelected_arr[i] == true){
                let condition = {
                    'ebs_iid':orderData[i].ebs_iid,
                };
                api("ebs.item.deleteItems",condition,function(rsp){
                    let result = rsp.result;
                    if(rsp.result){
                        this.setState({
                            delete:{
                                visible: false
                            }
                        });
                        getOrderData({
                            'search_value':'',
                            'filter_value':'',
                            'sort_value':'',
                            'page_num':1
                        });
                        console.log(rsp.result);
                    }
                    console.log(result);
                }.bind(this));
            }
        }

    }
    soldOutItems(){//下架商品
        const {isLoading, orderTotal, selectCondition, orderData, ItemsSelected_arr, getOrderData} = this.props;
        console.log(orderData);
        console.log(ItemsSelected_arr);
        for(let i = 0; i < ItemsSelected_arr.length; i++){
            if(ItemsSelected_arr[i] == true){
                let condition = {
                    'ebs_iid':orderData[i].ebs_iid,
                };
                api("ebs.item.soldOutItems",condition,function(rsp){
                    let result = rsp.result;
                    if(rsp.result){
                        this.setState({
                            down:{
                                visible: false
                            }
                        });
                        getOrderData({
                            'search_value':'',
                            'filter_value':'',
                            'sort_value':'',
                            'page_num':1
                        });
                        console.log(rsp.result);
                    }
                    console.log(result);
                }.bind(this));
            }
        }

    }
    inputItemsClass(){//展示添加分类输入框
        this.setState({
            inputclassshow:"input-class-show",
            addclassshow:"input-class-none",
        });
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
    handleKeyDown(e){//添加分类方法
        if(e.keyCode == 13){
            console.log(this.refs.classname.value);
            if(this.refs.classname.value != ""){
                let condition = {
                    'brandcat':this.refs.classname.value,
                };
                api("ebs.item.addItemsClass",condition,function(rsp){
                    let result = rsp.result;
                    if(rsp.result){
                        this.state.itemsClass.push({
                            "brandcat":this.refs.classname.value
                        })
                        this.setState({
                            inputclassshow:"input-class-none",
                            addclassshow:"input-class-show",
                            itemsClass:this.state.itemsClass
                        });
                        console.log(rsp.result);
                    }
                    console.log(result);
                }.bind(this));
            }
        }
    }
    onChange(selectedItems) {
        console.log(selectedItems);
        let shopstr = "";
        for(let i = 0; i < selectedItems.length; i++){
            if(i == 0){
                shopstr = selectedItems[i];
            }else{
                shopstr = shopstr+" " +selectedItems[i];
            }
        }
        console.log(shopstr);
        this.setState({
            shopsvalue: shopstr
        });
    }
    putAwayItems(){//商品上架
        const {isLoading, orderTotal, selectCondition, orderData, ItemsSelected_arr, getOrderData} = this.props;
        if(this.state.shopsvalue != ""){
            console.log(this.state.shopsvalue);
            for(let i = 0; i < ItemsSelected_arr.length; i++){
                if(ItemsSelected_arr[i] == true){
                    let condition = {
                        'store_id' : this.state.shopsvalue,
                        'ebs_iid': orderData[i].ebs_iid,
                    };
                    api("ebs.item.putAwayItems",condition,function(rsp){
                        let result = rsp.result;
                        if(rsp.result){
                            this.setState({
                                up:{
                                    visible: false
                                }
                            });
                            getOrderData({
                                'search_value':'',
                                'filter_value':'',
                                'sort_value':'',
                                'page_num':1
                            });
                        }
                        console.log(result);
                    }.bind(this));
                }
            }
        }
    }
    operationCell(value, index, record){//操作Cell
        return (<span style={{backgroundColor:"#f9f9fa"}}><a style={{color:"#76abe9"}} href={"https://item.taobao.com/item.htm?id="+record.num_iid}>详情</a><a style={{marginLeft:"10px",color:"#76abe9"}} onClick={this.showlog.bind(this,record)}>日志</a><a style={{marginLeft:"10px",color:"#76abe9"}}>编辑</a></span>
        );
    }

    showlog(record){//展示商品日志
        this.setState({
            listItemMess:record
        });
        console.log(record);
        let condition = {
            'num_iid': record.ebs_iid,
        };
        api("ebs.item.getItemsLogs",condition,function(rsp){
            let result = rsp.result;
            if(rsp.result){
                this.setState({
                    logs:{
                        visible: true
                    },
                    listlogsdata:rsp.result,
                    listItemMess:record
                });
            }
            console.log(result);
        }.bind(this));
    }
    onChangePrice(value){//展示不同方式修改价格的弹框
        console.log(value);
        if(value == "tongyiprice"){
            this.setState({
                choosevalue: value,
                tongyishow:"input-class-show",
                fenbieshow:"input-class-none"
            });
        }else{
            this.setState({
                choosevalue: value,
                tongyishow:"input-class-none",
                fenbieshow:"input-class-show"
            });
        }
    }

    changePriceAction(){//改价方法
        const {skuPriceData,closePrice} = this.props;
        if(this.state.choosevalue == 'tongyiprice'){
            console.log(this.refs.tongyiinput.value);
            let condition = {
                'price' : this.refs.tongyiinput.value,
                'ebs_sku_id': skuPriceData.ebs_sku_id,
            };
            api("ebs.item.updateSkuPrice",condition,function(rsp){
                let result = rsp.result;
                if(rsp.result){
                    closePrice();
                    document.getElementById("skupicevalue"+skuPriceData.ebs_sku_id).innerHTML=this.refs.tongyiinput.value;
                }
                console.log(result);
            }.bind(this));
        }else{
            console.log(this.refs.fenbieinput.value);
            let condition = {
                'price' : this.refs.fenbieinput.value,
                'ebs_sku_id': skuPriceData.ebs_sku_id,
                'seller_nick' : skuPriceData.seller_nick
            };
            api("ebs.item.updateSkuPrice",condition,function(rsp){
                let result = rsp.result;
                if(rsp.result){
                    closePrice();
                    document.getElementById("skupicevalue"+skuPriceData.ebs_sku_id).innerHTML=this.refs.fenbieinput.value;
                }
                console.log(result);
            }.bind(this));
        }
    }
    render(){
        console.log('开始渲染打印组件');
        const TabPane = Tab.TabPane;
        const {isLoading, orderTotal, selectCondition, orderData, ItemsSelected_arr, itemsClassData,isshow,closelog,skulogData,skulogsArr,changePriceShow,skuPriceData,closePrice} = this.props;
        console.log('===>');
        console.log(changePriceShow);
        let logsData = "";
        if(_.isEmpty(skulogsArr)){
            logsData = [1];
        }else{
            logsData = skulogsArr;
        }
        let column_arr = new Data();//获取表格配置
        column_arr.push(
            {'title':'操作','value':'','cell':this.operationCell.bind(this),'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':150},
        );
        return (
        <div style={{height:"100%"}}>
            <div style={{zIndex:"99",position: "fixed"}}>
                <Button type="secondary" component="a" style={{marginLeft:"10px"}} target="_blank">新商品</Button>
                <ButtonGroup style={{marginLeft:"10px"}}>
                    <Button  disabled = {this.state.disabled} type="secondary" onClick={this.dialogShow.bind(this,"up")}>上架</Button>
                    <Button  disabled = {this.state.disabled} type="secondary" onClick={this.dialogShow.bind(this,"down")}>下架</Button>
                    <Button  disabled = {this.state.disabled} type="secondary" onClick={this.dialogShow.bind(this,"update")}>修改分类</Button>
                    <Button  disabled = {this.state.disabled} type="secondary" onClick={this.dialogShow.bind(this,"delete")}>删除商品</Button>
                </ButtonGroup>
                <Button type="secondary" component="a" style={{marginLeft:"10px"}} target="_blank">匹配商品</Button>
            </div>
            <OrderTable dataSource={orderData} ItemsSelectedArr={ItemsSelected_arr} isLoading = {isLoading}
        columnArr={column_arr} primaryKey="ebs_iid" current={selectCondition.page_num} pageSize={50} total={orderTotal} pageOnChange={this.pageOnChange.bind(this)} itemsCheckedOnChange={this.itemsCheckedOnChange.bind(this)} expandedRowRender={(record,index)=> {
            return (
                <GoodsSkuTable productId={record.ebs_iid} store_id={record.store_id} />
            );
}} onSort={this.onSort.bind(this)} onFilter={this.onFilter.bind(this)} onSearch={this.onSearch.bind(this)} leftBottomComponent={()=>{
            return (<span style={{color: "#999"}}>共计{4}个店铺，{orderTotal}条订单信息</span>);
        }}/>
        <Dialog visible = {this.state.up.visible} onOk = {this.putAwayItems.bind(this)} onCancel = {this.onClose.bind(this,"up")} onClose = {this.onClose.bind(this,"up")} title = "上架">
             <div>请选择上架店铺:</div><CheckboxGroup  dataSource={shopslist} onChange={this.onChange.bind(this)} />
        </Dialog>
        <Dialog visible = {this.state.down.visible} onOk = {this.soldOutItems.bind(this)} onCancel = {this.onClose.bind(this,"down")} onClose = {this.onClose.bind(this,"down")} title = "下架">
            <div>确认下架选中商品</div>
        </Dialog>
        <Dialog visible = {this.state.update.visible} onOk = {this.changeClass.bind(this)} onCancel = {this.onClose.bind(this,"update")} onClose = {this.onClose.bind(this,"update")} title = "批量修改分类">

            <Menu onSelect={onSelect} selectMode="single">
                <Menu.Item key="未分类商品">未分类商品</Menu.Item>
            {
                this.state.itemsClass.map(
                    function(index){
                        return (<Menu.Item key={index.brandcat}>{index.brandcat}</Menu.Item>);
                    }.bind(this)
                )
            }
            </Menu>
            <a className={this.state.addclassshow} style={{color:"#76abe9",lineHeight:"40px",marginLeft:"10px"}} onClick={this.inputItemsClass.bind(this)}><Icon type="add" size="xs"/>添加新分类</a>
            <input ref="classname" style={{marginTop:"20px",width:"180px"}} className={this.state.inputclassshow} placeholder="请输入分类名称Enter保存"/>
        </Dialog>
        <Dialog visible = {this.state.delete.visible} onOk = {this.deleteItems.bind(this)} onCancel = {this.onClose.bind(this,"delete")} onClose = {this.onClose.bind(this,"delete")} title = "删除商品">
            <div>确认删除选中商品</div>
        </Dialog>

        <Dialog visible = {isshow}  onClose = {()=>{closelog();}} title = "日志" style ={{width:"50%"}} footer = {<Button  type='secondary' onClick={()=>{closelog();}}>关闭</Button>}>
        <div style={{width:"80%"}}><span style={{float:"left",width:"8%"}}><img style={{width:"40px"}} src={skulogData?skulogData.pic_path:"xxx"}/></span><span style={{float:"left",width:"85%",lineHeight:"30px"}}>{skulogData?skulogData.title:"无"}</span></div>
        <table style={{width: "100%"}}>
            <tr>
                <td className="sppp-td" style={{backgroundColor:"#ebebeb"}}>
                <span style={{display:"inline-block",width:"20%",textAlign:"center"}}>时间</span>
                <span style={{display:"inline-block",width:"20%",textAlign:"center"}}>操作人</span>
                <span style={{display:"inline-block",width:"40%",textAlign:"center"}}>操作内容</span>
                </td>
            </tr>
            {
                logsData.map(
                    function(index){
                            return(
                                <tr >
                                <td className="sppp-td">
                                <span style={{display:"inline-block",width:"20%",textAlign:"center"}}>{index.oper_time}</span>
                                <span style={{display:"inline-block",width:"20%",textAlign:"center"}}>{index.oper_nick}</span>
                                <span style={{display:"inline-block",width:"40%",textAlign:"center"}}>{index.remark}</span>
                                </td>
                                </tr>
                            );
                    }.bind(this)
                )
            }
        </table>
        </Dialog>
    <Dialog visible = {this.state.logs.visible}  onClose = {this.onClose.bind(this,"logs")} footer = {<Button  type='secondary' onClick={this.onClose.bind(this,"logs")}>关闭</Button>}title = "日志" style ={{width:"50%"}}>
        <div style={{width:"80%"}}><span style={{float:"left",width:"8%"}}><img style={{width:"40px"}} src={this.state.listItemMess.pic_path}/></span><span style={{float:"left",width:"85%",lineHeight:"30px"}}>{this.state.listItemMess.title}</span></div>
        <table style={{width: "100%"}}>
            <tr>
                <td className="sppp-td" style={{backgroundColor:"#ebebeb"}}>
                <span style={{display:"inline-block",width:"20%",textAlign:"center"}}>时间</span>
                <span style={{display:"inline-block",width:"20%",textAlign:"center"}}>操作人</span>
                <span style={{display:"inline-block",width:"40%",textAlign:"center"}}>操作内容</span>
                </td>
            </tr>
            {
                this.state.listlogsdata.map(
                    function(index){
                            return(
                                <tr >
                                <td className="sppp-td">
                                <span style={{display:"inline-block",width:"20%",textAlign:"center"}}>{index.oper_time}</span>
                                <span style={{display:"inline-block",width:"20%",textAlign:"center"}}>{index.oper_nick}</span>
                                <span style={{display:"inline-block",width:"40%",textAlign:"center"}}>{index.detail}</span>
                                </td>
                                </tr>
                            );
                    }.bind(this)
                )
            }
        </table>
        </Dialog>
        <Dialog visible = {changePriceShow} onClose = {()=>{closePrice();}} onCancel = {()=>{closePrice();}}  onOk = {this.changePriceAction.bind(this)} title = "修改商品价格"  style ={{width:"40%"}}>
            <RadioGroup value={this.state.choosevalue} onChange={this.onChangePrice.bind(this)}>
                <Radio id="tongyiprice" value="tongyiprice">各店统一价格</Radio>
                <Radio id="fenbieprice" value="fenbieprice">分别设置价格</Radio>
            </RadioGroup>

            <div className={this.state.tongyishow} style={{lineHeight:"50px",marginLeft:"30px"}}>统一售价为：<input id="tongyiinput" ref="tongyiinput"/></div>
            <div className={this.state.fenbieshow}>
                <div  style={{lineHeight:"50px",marginLeft:"30px"}}><span>{skuPriceData!=""?skuPriceData.seller_nick:"无"}</span><input id ="fenbieinput" ref="fenbieinput" style={{marginLeft:'10px'}} /></div>
            </div>
        </Dialog>
</div>);
    }
}

const onSelect = (key) => {
    console.log(key);
    selectclass = key[0];
    console.log(selectclass);
}
function mapStateToProps(state, ownProps){
    console.log(state);
    return {
        orderTotal:state.GoodsListTable.orderTotal,//商品list总数
        isLoading:state.GoodsListTable.isLoading,
        orderData:state.GoodsListTable.orderData,//商品list数据
        selectCondition:state.GoodsListTable.selectCondition,
        ItemsSelected_arr:state.GoodsListTable.ItemsSelected_arr,
        itemsClassData:state.GoodsListTable.itemsClassData,
        isshow:state.GoodsListTable.isshow,
        changePriceShow:state.GoodsListTable.changePriceShow,
        skulogData:state.GoodsListTable.skulogData,
        skulogsArr:state.GoodsListTable.skulogsArr,
        skuPriceData:state.GoodsListTable.skuPriceData
    }
}

function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(GoodsListTableActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsTable)
