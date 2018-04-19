import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Button from 'qnui/lib/button'
import Balloon from 'qnui/lib/balloon'
import Search from 'qnui/lib/search'
import Dialog from 'qnui/lib/dialog'
import Radio, { Group as RadioGroup } from 'qnui/lib/radio'
import StockEnterTable from './StockEnterTable'
import {ModifyInput} from '../StockCellModify'
import * as StockControlActions from '../../../actions/StockControl'
import * as StockEnterActions from '../../../actions/StockEnter'
import * as StockEnterDataActions from '../../../actions/StockEnterData'

const actions = {
    ...StockControlActions,
    ...StockEnterActions,
    ...StockEnterDataActions
}

const popupConfirm = ()=>{
    Dialog.confirm({
        content:'请至少选择一条商品信息!',
        onOk: () => {
            return new Promise(resolve => {
                resolve();
            });
        }
    })
}

class StockEnterModel extends Component{
    onSearch(searchValue){/*搜索*/
        const {selectCondition, getOrderDataTable, stockEnterModel} = this.props;
        if(searchValue){
            getOrderDataTable({
                'search_value':searchValue,
                'filter_value':'',
                'sort_value':'',
                'page_num':1
            });
            stockEnterModel("itemunseletected", "选择商品");
        }
    }

    onFilter(filterKeys){/*过滤*/
        const {selectCondition, getOrderDataTable} = this.props;
        getOrderDataTable({
            'search_value':selectCondition.search_value,
            'filter_value':JSON.stringify(filterKeys),
            'sort_value':selectCondition.sort_value,
            'page_num':1
        });
    }

    onSort(dataIndex, order, sort){/*排序*/
        const {selectCondition, getOrderDataTable} = this.props;
        getOrderDataTable({
            'search_value':selectCondition.search_value,
            'filter_value':selectCondition.filter_value,
            'sort_value':JSON.stringify({'dataIndex':dataIndex,'order':order}),
            'page_num':1
        });
    }

    pageOnChange(value, e){/*翻页*/
        const {selectCondition, getOrderDataTable} = this.props;
        getOrderDataTable({
            'search_value':selectCondition.search_value,
            'filter_value':selectCondition.filter_value,
            'sort_value':selectCondition.sort_value,
            'page_num':value
        });
    }

    itemsCheckedOnChange(ItemsSelected_tab_arr){/*勾选*/
        const {checkedOnChangeArr1, checkedOnChangeArr2, stockOrderData, tableid, enterStockValueFun, checkedStockEnter, stockCheckedValue} = this.props;
        let enterStockValueArr = [];
        let chooseStockValueArr = [];
        switch (tableid) {
            case "itemseletected":
                for(let i = 0; i < ItemsSelected_tab_arr.length; i++){
                    if(ItemsSelected_tab_arr[i] == true){
                        enterStockValueArr[i] = stockCheckedValue[i];
                    }
                }
                enterStockValueFun(enterStockValueArr);
                checkedOnChangeArr1(ItemsSelected_tab_arr);
                break;
            case "itemunseletected":
                for(let i = 0; i < ItemsSelected_tab_arr.length; i++){
                    if(ItemsSelected_tab_arr[i] == true){
                        chooseStockValueArr[i] = stockOrderData[i];
                    }
                }
                checkedStockEnter(chooseStockValueArr);
                checkedOnChangeArr2(ItemsSelected_tab_arr);
                break;
            default:
        }
    }

    showValue(value){
        if(value == null){
            value = "-";
        }
        return value;
    }

    //获取图片和标题，点击图片时图片放大
    showImgValue(value, index, record){
        return (
            <div>
                <img src={record.pic_path} style={{width:"50px", height:"50px", float:"left"}} />
                <span style={{marginLeft:"15px", width:"250px", lineHeight:"25px", float:"left"}} >{record.name}</span>
            </div>
        );
    }

    //显示从批量填的数量统一文本框获取的value
    showModiNum(value, index, record){
        let {unionNum, unionPrice, unionSum, enterStockValue} = this.props;
        if(enterStockValue[index]){
            if(record.sku_product_id == enterStockValue[index].sku_product_id){
                if(!unionNum){
                    if(unionPrice != 0){
                        unionNum = Number(unionSum) / Number(unionPrice);
                    }else{
                        unionNum = 0;
                    }
                }
            }
        }else{
            unionNum = 0;
        }
        return (
            <span>{unionNum}</span>
        );
    }

    //显示从批量填的单价统一文本框获取的value
    showModiPrice(value, index, record){
        let {unionNum, unionPrice, unionSum, enterStockValue} = this.props;
        if(enterStockValue[index]){
            if(record.sku_product_id == enterStockValue[index].sku_product_id){
                if(!unionPrice){
                    if(unionNum != 0){
                        unionPrice = Number(unionSum) / Number(unionNum);
                    }else{
                        unionPrice = 0;
                    }
                }
            }
        }else{
            unionPrice = 0;
        }
        return (
            <span>{unionPrice}</span>
        );
    }

    //显示从批量填的总价统一文本框获取的value
    showModiSum(value, index, record){
        let {unionNum, unionPrice, unionSum, enterStockValue} = this.props;
        if(enterStockValue[index]){//判断进货入库页面的表格index是当前的index
            if(record.sku_product_id == enterStockValue[index].sku_product_id){
                //判断当前一行表格的sku_product_id是否等于已勾选的sku_product_id
                if(!unionSum){//判断unionSum是否存在
                    unionSum = Number(unionNum) * Number(unionPrice);//存在则相加
                }
            }
        }else{
            unionSum = 0;
        }
        return (
            <span>{unionSum}</span>
        );
    }
    //批量填写判断
    batchFillOut(){
        if(this.props.enterStockValue.length == 0){
            popupConfirm();
        }else {
            this.props.onOpenModi();
        }
    }

    render(){
        const { stockOrderData, ItemsSelected_tab_arr1, enterStockValue, ItemsSelected_tab_arr2, total, stores, stockCheckedValue, onOpenModi, tableid, title, cross, tableclassname} = this.props;
        let column_arr, btnhtml = '<div/>';
        switch (tableid) {
            case "itemseletected":
                column_arr = [
                    {'title':'商家编码','value':'outer_id','cell':this.showValue.bind(this),'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':50},
                    {'title':'商品名称','value':'name','cell':this.showValue.bind(this),'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':200},
                    {'title':'商品规格','value':'prop_name','cell':this.showValue.bind(this),'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':50},
                    {'title':'数量','value':' ','cell':this.showModiNum.bind(this),'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':50},
                    {'title':'单价成本','value':'cost_price','cell':this.showModiPrice.bind(this),'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':100},
                    {'title':'采购总价','value':' ','cell':this.showModiSum.bind(this),'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':100}
                ];
                btnhtml = (<div>
                    <Button type="secondary" style={{position: "absolute", top:'90px', left:'400px', zIndex:"1000"}} onClick={this.batchFillOut.bind(this)}>批量填写</Button>
                    <h3 style={{fontWeight:"bold"}}>{title} <span style={{fontSize:"12px", color:"#999", fontWeight: "normal"}}>当搜索结果精确为一条商品，Enter搜索即为添加</span></h3>
                    <StockEnterTable  dataSource={stockCheckedValue} cross={cross} tableclassname={tableclassname} ItemsSelectedArr={ItemsSelected_tab_arr1} columnArr={column_arr} primaryKey="outer_id" onSearch={this.onSearch.bind(this)} itemsCheckedOnChange={this.itemsCheckedOnChange.bind(this)}/>
                </div>);
                break;
            case "itemunseletected":
                column_arr = [
                    {'title':'商品信息','value':'','cell':this.showImgValue,'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':350},
                    {'title':'商品规格','value':'prop_name','cell':this.showValue,'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':50},
                    {'title':'商家编码','value':'outer_id','cell':this.showValue,'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':50},
                    {'title':'商品名称','value':'name','cell':this.showValue,'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':200},
                    {'title':'成本','value':'cost_price','cell':this.showValue,'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':100},
                    {'title':'实际库存','value':'defect_num','cell':this.showValue,'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':100}
                ];
                btnhtml = (<div>
                    <h3 style={{fontWeight:"bold"}}>{title}</h3>
                    <StockEnterTable  dataSource={stockOrderData} ItemsSelectedArr={ItemsSelected_tab_arr2} columnArr={column_arr} primaryKey="outer_id" onSearch={this.onSearch.bind(this)} itemsCheckedOnChange={this.itemsCheckedOnChange.bind(this)} />
                </div>);
                break;
            default:

        }
        return (
            /*库存列表中选中后点击进货入库出现的界面 && 库存列表中未选中后点击进货入库出现的界面 */
            <div style={{height:"100%"}}>
                {btnhtml}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        stockOrderData:state.StockEnterData.stockOrderData,                        //获取从数据库返回的查询值，数组
        selectCondition:state.StockEnterData.selectCondition, //search_value 搜索值filter_value 过滤值sort_value 排序值page_num 页码
        ItemsSelected_tab_arr1:state.StockEnterData.ItemsSelected_tab_arr1,      //进货入库勾选值
        enterStockValue:state.StockEnterData.enterStockValue,                   //进货入库勾选值后存的数组
        ItemsSelected_tab_arr2:state.StockEnterData.ItemsSelected_tab_arr2,    //选择商品勾选值
        chooseStockValue:state.StockEnterData.chooseStockValue,               //选择商品勾选值后存的数组
        total:state.StockEnterData.total,                                    //列表总条数
        stores:state.StockEnterData.stores,                                 //店铺总个数
        tableid:state.StockEnterData.tableid,                              //控制进货入库后的页面内容展示值
        title:state.StockEnterData.title,                                 //点击进货入库按钮后，通过点击事件改变title值
        cross:state.StockEnterData.cross,                                 //点击进货入库按钮后，表格是否需要叉号
        tableclassname:state.StockEnterData.tableclassname,               //点击进货入库按钮后，表格是否需要改变样式
        unionNum:state.StockEnterData.unionNum,                          //存储数量统一的input值
        unionPrice:state.StockEnterData.unionPrice,                     //存储单价统一的input值
        unionSum:state.StockEnterData.unionSum,                        //存储总价统一的input值
        stockCheckedValue:state.StockEnter.stockCheckedValue,         //列表勾选存储的值，数组
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( actions , dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(StockEnterModel)
