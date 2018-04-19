/**
 @author Mothpro
**/
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import OrderTable from '../../../components/Ordertable'
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import * as WaitPrintOrderTableActions from '../../actions/WaitPrintOrderTable'
import _ from 'lodash';
import Data from './data';
import PrintDialog from './PrintDialog'
class WaitPrintOrderTable extends Component {
    constructor() {
        super();
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
    }

    componentDidMount(){
        const {getOrderData,orderTotal} = this.props;
        orderTotal == 0 ?getOrderData({
            'search_value':'',
            'filter_value':'',
            'sort_value':'',
            'page_num':1
        }):'';

    }


    render(){
        console.log('开始渲染打印组件');
        const TabPane = Tab.TabPane;
        const {isLoading, orderTotal, selectCondition, orderData, ItemsSelected_arr} = this.props;
        console.log(this);
        let column_arr = new Data();//获取表格配置

        return (
        <div style={{height:"100%"}}>
            <div className="excep-buttons">
                <PrintDialog text = "批量打印" type = "primary" id = "print"/>
                <PrintDialog text = "重新审核" type = "secondary" id = "pass"/>
                <PrintDialog text = "提交异常" type = "secondary" id = "error"/>
            </div>
            <OrderTable dataSource={orderData} ItemsSelectedArr={ItemsSelected_arr} isLoading = {isLoading}
        columnArr={column_arr} primaryKey="tao_tid" current={selectCondition.page_num} pageSize={50} total={orderTotal} pageOnChange={this.pageOnChange.bind(this)} itemsCheckedOnChange={this.itemsCheckedOnChange.bind(this)} expandedRowRender={(record,index)=> {
            return (<Tab defaultActiveKey="1">
        <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
        <TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
        <TabPane tab="选项卡三" key="3">选项卡三内容</TabPane>
    </Tab>);
}} onSort={this.onSort.bind(this)} onFilter={this.onFilter.bind(this)} onSearch={this.onSearch.bind(this)} leftBottomComponent={()=>{
            return (<span style={{color: "#999"}}>共计{4}个店铺，{orderTotal}条订单信息</span>);
        }}/>
</div>);
    }
}

function mapStateToProps(state, ownProps){
    return {
        orderTotal:state.WaitPrintOrderTable.orderTotal,
        isLoading:state.WaitPrintOrderTable.isLoading,
        orderData:state.WaitPrintOrderTable.orderData,
        selectCondition:state.WaitPrintOrderTable.selectCondition,
        ItemsSelected_arr:state.WaitPrintOrderTable.ItemsSelected_arr
    }
}

function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(WaitPrintOrderTableActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitPrintOrderTable)

/**
 * 自定义组件 Ordertabl相关介绍
 * dataSource  数组  表格展示的数据源
 * columnArr  json对象  用于设置表格每列显示内容
 * primaryKey string  dataSource当中数据的主键 设置了才可以实现正确扩展
 * 				{
 * 					title string 标题
 * 					value string 显示的数据对应dataSource中的key
 * 					cell Function(value, index, record, context), ReactElement 行渲染的逻辑 请默认设置为value=>value
 * 					checked bool 默认是否显示
 * 					sortable bool 是否支持排序
 * 					filters Array 生成标题过滤的菜单,格式为[{label:'xxx', value:'xxx'}]
 * 					filterMode string 过滤的模式是单选还是多选,可选值为single,multiple
 * 					width number 设置单元格宽度
 * 				}
 * 	current num 当前页码
 * 	pageSize num 每页显示条数
 * 	total num 总条数
 * 	pageOnChange function 当前页码发生改变时的回调函数，接受修改后的页码值和点击事件对象两个参数， function(value, e) {}
 * 	itemsCheckedOnChange function 当勾选的条目发生变化时的回调函数，接受修改后对应数据源的每条数据对应的勾选状况组成的数组 function(ItemsSelected_arr) {}
 * 	expandedRowRender function 额外渲染的行的函数 同qnui
 * 	onSort function 点击列排序触发的事件 Function(dataIndex, order, sort) 同qnui
 * 	onFilter function 点击过滤触发的事件 Function(filterKeys) 同qnui
 * 	onSearch function 点击搜索或在搜索框内输出回车触发的回调函数 Function(searchValue) searchValue搜索框内的值
 * 	leftBottomComponent function 自定义左下角显示内容 函数返回值应为一个组件
 * 	by zdh
 */
