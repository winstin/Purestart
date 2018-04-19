import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Tab from 'qnui/lib/tab'
import Button from 'qnui/lib/button'
import Balloon from 'qnui/lib/balloon'
import Menu from 'qnui/lib/menu'
import OrderTable from '../../../../components/Ordertable'
import FlagIcon from '../../../../components/FlagIcon'
import StoreIcon from '../../../../components/StoreIcon'
import DialogEbs from '../../../../components/DialogEbs'
import {ModifyInput} from '../StockCellModify'
import StockControlDetail from '../StockControlDetail/StockControlDetail'
import * as StockControlActions from '../../../actions/StockControl'
import * as StockEnterActions from '../../../actions/StockEnter'

const actions = {
    ...StockControlActions,
    ...StockEnterActions
}

class StockControlList extends Component {
    onSearch(searchValue){/*搜索*/
        const {selectCondition, getOrderData, orderData} = this.props;
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
        const {checkedOnChange, orderData, checkedStockEnter} = this.props;
        let stockCheckedValue = [];
        for(let i = 0; i < ItemsSelected_arr.length; i++){
            if(ItemsSelected_arr[i] == true){
                stockCheckedValue.push(orderData[i]);
            }
        }
        checkedStockEnter(stockCheckedValue);
        checkedOnChange(ItemsSelected_arr);
    }

    componentDidMount(){
        const {total,getOrderData} = this.props;
        getOrderData({
            'search_value':'',
            'filter_value':'',
            'sort_value':'',
            'page_num':1
        });
    }

    showValue(value){
        if(value == null ){
            value = "-";
        }
        return value;
    }

    //获取图片和标题，点击图片时图片放大
    showImgValue(value, index, record){
        return (
            <div>
                <Balloon closable={false} trigger={
                    <img src={record.pic_path} style={{width:"50px", height:"50px", float:"left"}}/>} triggerType="hover">
                        <img src={record.pic_path} style={{width:"150px", height:"150px", float:"left"}}/>
                </Balloon>
                <span style={{marginLeft:"15px", width:"250px", lineHeight:"25px", float:"left"}} >{record.name}</span>
            </div>
        );
    }

    //为店铺加样式
    getStoreIcon(value){
        return (<StoreIcon storeType={value} storeIndex="1" />);
    }

    //鼠标移到可用库存上显示的ballon
    showCommentBallon(value, index, record){
        return (
            <div>
                <Balloon closable={false} trigger={<div>{value}</div>} triggerType="hover" >
                    可用库存 = 实际库存 - 锁定库存(通过审核订单)
                </Balloon>
            </div>
        );
    }

    //行编辑  实际库存
    isEditedStockNum(value="-", index, record, context){
        return(
            <ModifyInput value={value} onSave={(inputValue)=>{
                const id = record.sku_product_id;
                this.saveModify({ defect_num: inputValue}, id);
            }}/>
        )
    }
    //行编辑  成本价
    isEditedStockPrice(value="-", index, record, context){
        return(
            <ModifyInput value={value} onSave={(inputValue)=>{
                const id = record.sku_product_id;
                this.saveModify({ cost_price: inputValue}, id);
            }}/>
        )
    }

    // 保存批量修改
    saveModify = (obj,id)=>{
        // 批量 或 行内 操作 id
        const ids = [this.props.modifyId || id];
        const args = {
            selectCondition : this.props.selectCondition,
            ids,
            ...obj
        }
        this.props.batchModify(args); //批量修改请求
    }

    render(){
        console.log();
        const {selectCondition, orderData, ItemsSelected_arr, total, stores} = this.props;
        let store_id_filters = [{label:"淘宝",value:"TB"},
                                {label:"京东",value:"JD"},
                                {label:"天猫",value:"TM"},
                                {label:"1688",value:"1688"}];
        let column_arr = [
            {'title':'商品信息','value':'','cell':this.showImgValue,'checked':true,'sortable':false,'filters':store_id_filters,'filterMode':"multiple",'width':350},
            {'title':'规格','value':'prop_name','cell':this.showValue,'checked':true,'sortable':false,'filters':store_id_filters,'filterMode':"multiple",'width':100},
            {'title':'分类','value':'ebs_type','cell':this.showValue,'checked':true,'sortable':false,'filters':store_id_filters,'filterMode':"multiple",'width':100},
            {'title':'商家编码','value':'outer_id','cell':this.showValue,'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':100},
            {'title':'实际库存','value':'defect_num','cell':this.isEditedStockNum.bind(this),'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':100},
            {'title':"可用库存",'value':'defect_num','cell':this.showCommentBallon.bind(this),'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':100},
            {'title':'成本价','value':'cost_price','cell':this.isEditedStockPrice.bind(this),'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':100},
            {'title':'店铺','value':'store_id','cell':this.getStoreIcon,'checked':true,'sortable':false,'filters':store_id_filters,'filterMode':"multiple",'width':100},
            {'title':'商品条码','value':'sub_barcode','cell':this.showValue,'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':200}
        ];
        return (
            <OrderTable dataSource={orderData} ItemsSelectedArr={ItemsSelected_arr} columnArr={column_arr} primaryKey="num_iid"  current={selectCondition.page_num} pageSize={50} total={total} pageOnChange={this.pageOnChange.bind(this)}  expandedRowRender={(record)=> {
                return (
                    <StockControlDetail record={record}/>
                );
            }} itemsCheckedOnChange={this.itemsCheckedOnChange.bind(this)}
            onSort={this.onSort.bind(this)} onFilter={this.onFilter.bind(this)} onSearch={this.onSearch.bind(this)} leftBottomComponent={()=>{
                return (<span style={{color: "#999"}}>共计{stores}个店铺，{total}条订单信息</span>);
            }} />
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        orderData:state.StockControl.orderData,  //库存管理列表的表格数据源
        selectCondition:state.StockControl.selectCondition, //对象：搜索、过滤、排序、页码
        ItemsSelected_arr:state.StockControl.ItemsSelected_arr, //存储勾选值
        total:state.StockControl.total, //查询列表总条数
        stores:state.StockControl.stores //查选库存管理的店铺个数
    }
}

function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( actions , dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(StockControlList)
