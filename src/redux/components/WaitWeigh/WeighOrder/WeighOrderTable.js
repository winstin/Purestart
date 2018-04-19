import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Balloon from 'qnui/lib/balloon';
import Table from 'qnui/lib/table';
import OrderTable from '../../../../components/Ordertable'
import * as weighOrderTableActions from '../../../actions/weighOrderTable'
import * as batchWeighOperActions from '../../../actions/batchWeighOper'

import StoreIcon from '../../../../components/StoreIcon'
import logistics from '../../../../static/logistics'

const action = {
    ...weighOrderTableActions,
    ...batchWeighOperActions
}

class WeighOrderTable extends Component {
    onSearch(searchValue){/*搜索*/
        const {selectCondition, getOrderData} = this.props;
        getOrderData({
            'search_value':searchValue,
            'filter_value':selectCondition.filter_value,
            'sort_value':selectCondition.sort_value,
            'page_num':1
        });
        console.log(selectCondition);
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
        const {checkedOnChange, orderData, batchWeighOper} = this.props;
        let Batch_Weigh_Oper = [];
        // let num = 0;
        for(let i = 0; i < ItemsSelected_arr.length; i++){
            if(ItemsSelected_arr[i] == true){
                Batch_Weigh_Oper.push(orderData[i]);
            }
        }
        batchWeighOper(Batch_Weigh_Oper);
        checkedOnChange(ItemsSelected_arr);
    }

    componentDidMount(){
        const {total,getOrderData} = this.props;
        total == 0 ? getOrderData({
            'search_value':'',
            'filter_value':'',
            'sort_value':'',
            'page_num':1
        }):'';
    }

    showValue(value){
        if(value == null){
            value = "-";
        }
        return value;
    }

    getStoreIcon(value){
        return (<StoreIcon storeType="JD" storeIndex="1" />);
    }

    receiverAddressCell(value){
        return (<Balloon closable={false} trigger={<Button style={{width:"168px"}} className="btrigger">{value}</Button>} triggerType="hover">
                    {value}
                </Balloon>);
    }

    orderMessage(value){
        if(JSON.parse(value).trade){
            return '-';
        } else{
            return JSON.parse(value).trade_fullinfo_get_response.trade.orders.order.map(function(value, index){
                return (
                    <div style={{display: "inline-block", marginRight: "10px", overflow: 'hidden'}}>
                    <img src={value.pic_path} style={{width: 40, height: 40}}/>
                    <span>{value.sku_properties_na ? value.sku_properties_na : ""}</span>
                    </div>
                );
            });
        }
    }


    render(){
        let logistics_name_filters = logistics.map((data)=>{return {label:data.log_name,value:data.log_id};});
        const {selectCondition, orderData, ItemsSelected_arr, total, stores} = this.props;
        console.log(selectCondition);
        let filters = [{label: '包含1',value: 1},{label: '包含2',value: 2},{label: '包含3', value: 3}];
        let column_arr = [
            {'title':'物流匹配','value':'logistics_company','cell':this.showValue,'checked':true,'sortable':false,'filters':logistics_name_filters,'filterMode':"multiple",'width':200},
            {'title':'物流单号','value':'invoice_no','cell':this.showValue,'checked':true,'sortable':false,'filters':filters,'filterMode':"multiple",'width':200},
            {'title':'订单号','value':'tao_tid','cell':this.showValue,'checked':true,'sortable':false,'filters':filters,'filterMode':"multiple",'width':200},
            {'title':'重量','value':'weight  ','cell':this.showValue,'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':200},
            {'title':'买家ID','value':'buyer_nick','cell':this.showValue,'checked':true,'sortable':true,'filters':false,'filterMode':null,'width':200},
            {'title':'收件人','value':'receiver_name','cell':this.showValue,'checked':true,'sortable':false,'filters':filters,'filterMode':"multiple",'width':200},
            {'title':'收件电话','value':'receiver_mobile','cell':this.showValue,'checked':true,'sortable':false,'filters':filters,'filterMode':"multiple",'width':200},
            {'title':'收件地址','value':'receiver_address','cell':this.receiverAddressCell,'checked':true,'sortable':false,'filters':filters,'filterMode':"multiple",'width':200},
            {'title':'订单信息','value':'jdp_response','cell':this.orderMessage,'checked':true,'sortable':true,'filters':false,'filterMode':null,'width':200},
            {'title':'店铺','value':'store_id','cell':this.getStoreIcon,'checked':true,'sortable':false,'filters':filters,'filterMode':"multiple",'width':200},
            {'title':'发货时间','value':'consign_time ','cell':this.showValue,'checked':true,'sortable':true,'filters':false,'filterMode':null,'width':200}
        ];
        return (
            <OrderTable dataSource={orderData} ItemsSelectedArr={ItemsSelected_arr} columnArr={column_arr} primaryKey="tao_tid"  current={selectCondition.page_num} pageSize={50} total={total} pageOnChange={this.pageOnChange.bind(this)} itemsCheckedOnChange={this.itemsCheckedOnChange.bind(this)}
            onSort={this.onSort.bind(this)} onFilter={this.onFilter.bind(this)} onSearch={this.onSearch.bind(this)} leftBottomComponent={()=>{
                return (<span style={{color: "#999"}}>共计{stores.length}个店铺，{total}条订单信息</span>);
            }} />
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        orderData:state.weighOrderTable.orderData,
        selectCondition:state.weighOrderTable.selectCondition,
        ItemsSelected_arr:state.weighOrderTable.ItemsSelected_arr,
        total:state.weighOrderTable.total,
        stores:state.weighOrderTable.stores,
        Batch_Weigh_Oper:state.batchWeighOper.Batch_Weigh_Oper
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( action , dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(WeighOrderTable)
