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
import StockCheckDetail from './StockCheckDetail'
import {ModifyInput} from '../CheckCellModify'
import * as StockCheckTableAction from '../../../actions/StockCheckTable'

class StockCheckTable extends Component {
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
                stockCheckedValue[i] = orderData[i];
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
        if(value == null || value == ''){
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

    //盘点后的库存可编辑的行
    editedAfterStock(value="", index, record){
        const {start_time, end_time} = this.props;
        return (
            <ModifyInput value={value?value:""} onSave={(inputValue)=>{
                const id = record.sku_product_id;
                this.saveModify({ after_defect_num: inputValue, init_defect_num:record.defect_num, start_time:start_time, end_time:end_time}, id);
            }}/>
        );
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
        const {selectCondition, orderData, ItemsSelected_arr, total, stores} = this.props;
        let filters = [{label: '包含1',value: 1},{label: '包含2',value: 2},{label: '包含3', value: 3}];
        let store_id_filters = [{label:"淘宝",value:"TB"},
                                {label:"京东",value:"JD"},
                                {label:"天猫",value:"TM"},
                                {label:"1688",value:"1688"}];
        let column_arr = [
            {'title':'商品信息','value':'','cell':this.showImgValue,'checked':true,'sortable':false,'filters':store_id_filters,'filterMode':"multiple",'width':350},
            {'title':'规格','value':'prop_name','cell':this.showValue,'checked':true,'sortable':false,'filters':store_id_filters,'filterMode':"multiple",'width':100},
            {'title':'商家编码','value':'outer_id','cell':this.showValue,'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':100},
            {'title':'实际库存','value':'defect_num','cell':this.showValue,'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':100},
            {'title':"盘点后的库存",'value':'','cell':this.editedAfterStock.bind(this),'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':150},
            {'title':'成本价','value':'cost_price','cell':this.showValue,'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':100},
            {'title':'分类','value':'ebs_type','cell':this.showValue,'checked':true,'sortable':false,'filters':store_id_filters,'filterMode':"multiple",'width':100},
            {'title':'店铺','value':'store_id','cell':this.getStoreIcon,'checked':true,'sortable':false,'filters':store_id_filters,'filterMode':"multiple",'width':100}
        ];
        return (
            <OrderTable dataSource={orderData} ItemsSelectedArr={ItemsSelected_arr} columnArr={column_arr} primaryKey="sku_product_id"  current={selectCondition.page_num} pageSize={50} total={total} pageOnChange={this.pageOnChange.bind(this)}  expandedRowRender={(record,index)=> {
                return (
                    <StockCheckDetail record={record}/>
                );
            }} itemsCheckedOnChange={this.itemsCheckedOnChange.bind(this)}
            onSort={this.onSort.bind(this)} onFilter={this.onFilter.bind(this)} onSearch={this.onSearch.bind(this)} leftBottomComponent={()=>{
                return (<span style={{color: "#999"}}>共计{1}个店铺，{total}条订单信息</span>);
            }} />
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        orderData:state.StockCheckTable.orderData,
        selectCondition:state.StockCheckTable.selectCondition,
        ItemsSelected_arr:state.StockCheckTable.ItemsSelected_arr,
        total:state.StockCheckTable.total,
        stores:state.StockCheckTable.stores
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( StockCheckTableAction , dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(StockCheckTable)
