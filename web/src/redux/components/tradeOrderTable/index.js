import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Balloon from 'qnui/lib/balloon';
import Dropdown from 'qnui/lib/dropdown';
import Icon from 'qnui/lib/icon';
import Menu from 'qnui/lib/menu';
import Feedback from 'qnui/lib/feedback';

// 引入 公共组件
import OrderTable from '../../../components/Ordertable'
import FlagIcon from '../../../components/FlagIcon'
import StoreIcon from '../../../components/StoreIcon'
import TradeOrderDetails from '../../../components/TradeOrderDetails'
import logistics from '../../../static/logistics'

//引入 表格设置 弹框 和 行内编辑逻辑
import {filters,columnArr,AddressBallon,FiltersInput} from './TableConfigDsd'  // 引入表格设置
import {DialogTrade} from '../ErrorOrder/Dialogs' // 引入 弹出框
import {ModifyInput,ModifyLogistics} from '../ErrorOrder/CellModify'

import * as tradeOrderTableActions from '../../actions/tradeOrderTable'

class TradeOrderTable extends React.Component {

    componentDidMount(){
        this.props.getOrderData({
            'search_value':'',
            'filter_value':'',
            'filter_search':'{}', // 过滤 搜索框
            'sort_value':'',
            'page_num':1,
            'ebs_status': 0
        });
    }

    onSearch(search_value){/*搜索*/
        this.props.getOrderData({
            ...this.props.selectCondition,
            search_value
        })
    }

    onFilter(filterKeys){/*过滤*/
        this.props.getOrderData({
            ...this.props.selectCondition,
            'filter_value':JSON.stringify(filterKeys),
            'page_num':1
        })
    }

    //filter 搜索 确认 重置
    onFilterSearch= (obj)=>{
        const filterSearchs = JSON.parse(this.props.selectCondition.filter_search)
        const newfilterSearchs = {...filterSearchs,...obj}
        this.props.getOrderData({
            ...this.props.selectCondition,
            'filter_search':JSON.stringify(newfilterSearchs),
            'page_num':1
        })
    }

    onSort(dataIndex, order, sort){/*排序*/
        this.props.getOrderData({
            ...this.props.selectCondition,
            'sort_value':JSON.stringify({'dataIndex':dataIndex,'order':order}),
            'page_num':1
        })
    }
    pageOnChange(value, e){/*翻页*/
        this.props.getOrderData({
            ...this.props.selectCondition,
            'page_num':value
        })
    }

    //行编辑 备注
    modifyCell = (value="-", index, record, context)=>{
        return (
            <div onClick={()=>{
                this.props.addModifyId(record.tao_tid)
                this.props.openDialog("remark");
            }}>
                {value}
            </div>
        );
    }

    //行编辑 收件地址
    modifyAddress = (value="-", index, record, context)=>{
        return (
            <AddressBallon value={value} onClick={()=>{
                this.props.addModifyId(record.tao_tid)
                this.props.openDialog("address");
            }}/>
        )
    }


    // 行内编辑收件电话
    modifyMobile= (value="-", index, record, context)=>{
        return(
            <ModifyInput value={value} onSave={(inputValue)=>{
                const id = record.tao_tid;
                this.saveModify({ receiver_mobile: inputValue}, id)
            }}/>
        )
    }

    // 行内编辑收件人
    modifyName= (value="-", index, record, context)=>{
        return(
            <ModifyInput value={value} onSave={(inputValue)=>{
                const id = record.tao_tid;
                this.saveModify({ receiver_name: inputValue}, id)
            }}/>
        )
    }


    // 根据ItemsSelectedArr 得到 选中的id
    getCheckedIds(){
        const {ItemsSelectedArr,orderData} = this.props;
        let ids_checked = [];
        for (var i = 0; i < ItemsSelectedArr.length; i++) {
            if (ItemsSelectedArr[i]) {
                ids_checked.push(orderData[i].tao_tid)
            }
        }
        return ids_checked;
    }

    // 保存批量修改
    saveModify = (obj,id)=>{

        // 批量 或 行内 操作 id
        const ids = this.getCheckedIds().join(',') || [this.props.modifyId || id];
        const args = {
            selectCondition : this.props.selectCondition,
            ids,
            ...obj
        }
        if (obj.error_response) {
            this.props.addError(args)
        }else {
            this.props.batchModify(args); //批量修改请求
        }
        this.props.closeDialog(); //关闭 弹框
    }

    // 物流匹配 行内修改
    modifyLogistics= (value, index, record, context)=>{
        return(
            <ModifyLogistics value={value||'-'} onSave={(selectValue)=>{
                const id = record.tao_tid;
                this.saveModify({ logistics_company: selectValue}, id)
            }}/>
        )
    }
  
    render(){
        console.log(this.props);
        const {selectCondition, orderData, ItemsSelectedArr, total, stores,dialogVisableName,closeDialog} = this.props;

        // 过滤搜索 对象
        let filterSearchs = {};
        if (this.props.selectCondition.filter_search) {
            filterSearchs = JSON.parse(this.props.selectCondition.filter_search) || {};
        }
        //给 需要行内编辑的cell 绑定方法
        for (let i = 0; i < columnArr.length; i++) {
            let column = columnArr[i]
            column.checked = true; // 用户自定义列
            column.cell = (value)=>value||'-'; // 单元格 渲染逻辑

            switch (column.value) {
                case "error_status": // 异常状态
                    column.cell = value => <span style={{color:'red'}}>{value|| '-'}</span>;
                    break;
                case "seller_flag": // 旗子
                    column.cell = value =><FlagIcon type = {value} />;
                    break;
                case "buyer_message": // 留言
                    column.title = <FiltersInput title="留言" value={filterSearchs.buyer_message||''} item="buyer_message" onFilterSearch={this.onFilterSearch} />
                    break;
                case "receiver_name": // 收件人
                    column.title = <FiltersInput title="收件人" value={filterSearchs.receiver_name||''} item="receiver_name" onFilterSearch={this.onFilterSearch} />
                    break;
                case "seller_memo":  // 备注
                    column.cell = this.modifyCell;
                    column.title = <FiltersInput title="备注" value={filterSearchs.seller_memo||''} item="seller_memo" onFilterSearch={this.onFilterSearch} />
                    break;
                case "receiver_mobile":  // 收件电话
                    column.cell = this.modifyMobile;
                    column.title = <FiltersInput title="收件电话" value={filterSearchs.receiver_mobile||''} item="receiver_mobile" onFilterSearch={this.onFilterSearch} />
                    break;
                case "receiver_address": // 收件地址
                    column.cell = this.modifyAddress;
                    column.title = <FiltersInput title="收件地址" value={filterSearchs.receiver_address||''} item="receiver_address" onFilterSearch={this.onFilterSearch} />
                    break;
                case "tao_tid": // 订单号
                    column.title = <FiltersInput title="订单号" value={filterSearchs.tao_tid||''} item="tao_tid" onFilterSearch={this.onFilterSearch} />
                    break;
                case "logistics_company": // 物流匹配
                    column.cell = this.modifyLogistics;
                    break;
                case "receiver_name": // 收获人
                    column.cell = this.modifyName;
                    break;
                case "store_id": // 店铺
                    column.cell = value => <StoreIcon storeType={value} storeIndex={value} />
                    break;

            }
        }


        return (
            <div style={{height:'100%'}}>
                <div className="excep-buttons">
                    <DialogTrade // 自定义弹框
                        name={this.props.dialogVisableName}
                        onClose={this.props.closeDialog}
                        onOk={this.saveModify}
                    />
                    <Button type="primary">审核通过</Button> &nbsp;&nbsp;
                    <Button type="secondary" onClick={()=>{
                        if (this.getCheckedIds().length == 0) return  Feedback.toast.show({
                            type: 'error',
                            hasMask: true,
                            duration: 1000,
                            content: '未选择任何订单!'
                        });
                        this.props.openDialog('error');
                    }}>提交异常</Button> &nbsp;&nbsp;
                    <Dropdown
                        trigger={
                            <Button type="secondary">
                            批量操作 <Icon type="arrow-down" />
                            </Button>
                        }
                        triggerType="click" offset={[0, 4]}>
                        <Menu onClick={(name)=>{
                            if (this.getCheckedIds().length == 0) return  Feedback.toast.show({
                                type: 'error',
                                hasMask: true,
                                duration: 1000,
                                content: '未选择任何订单!'
                            });
                            this.props.openDialog(name)
                        }}>
                            <Menu.Item key="remark">批量改备注</Menu.Item>
                            <Menu.Item key="logistics">批量改物流</Menu.Item>
                        </Menu>
                    </Dropdown> &nbsp;&nbsp;
                </div>
                <OrderTable
                    dataSource={orderData}
                    ItemsSelectedArr={ItemsSelectedArr}
                    columnArr={columnArr}
                    primaryKey="tao_tid"
                    current={selectCondition.page_num}
                    pageSize={50}
                    total={total}
                    pageOnChange={this.pageOnChange.bind(this)}
                    itemsCheckedOnChange={this.props.checkedOnChange}
                    expandedRowRender={(record,index)=> {
                        return (<TradeOrderDetails orderDetail={record}/>);
                    }}
                    onSort={this.onSort.bind(this)}
                    onFilter={this.onFilter.bind(this)}
                    onSearch={this.onSearch.bind(this)}
                    leftBottomComponent={()=>{
                        return (<span style={{color: "#999"}}>共计{stores.length}个店铺，{total}条订单信息</span>);
                    }}
                />
            </div>

        );
    }
}

export default connect(
    state=>state.tradeOrderTable,  // 绑定state到 TradeOrderTable组件上
    dispatch=>bindActionCreators(tradeOrderTableActions, dispatch) // action TradeOrderTable组件上
)(TradeOrderTable);

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
 * 	itemsCheckedOnChange function 当勾选的条目发生变化时的回调函数，接受修改后对应数据源的每条数据对应的勾选状况组成的数组 function(ItemsSelectedArr) {}
 * 	expandedRowRender function 额外渲染的行的函数 同qnui
 * 	onSort function 点击列排序触发的事件 Function(dataIndex, order, sort) 同qnui
 * 	onFilter function 点击过滤触发的事件 Function(filterKeys) 同qnui
 * 	onSearch function 点击搜索或在搜索框内输出回车触发的回调函数 Function(searchValue) searchValue搜索框内的值
 * 	leftBottomComponent function 自定义左下角显示内容 函数返回值应为一个组件
 * 	by zdh
 */
