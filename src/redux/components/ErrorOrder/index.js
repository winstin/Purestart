import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Menu from 'qnui/lib/menu';
import Button from 'qnui/lib/button';
import Icon from 'qnui/lib/icon';
import Dropdown from 'qnui/lib/dropdown';
import Input from 'qnui/lib/input';
import Select from 'qnui/lib/select';
import Feedback from 'qnui/lib/feedback';

import StoreIcon from '../../../components/StoreIcon'
import FlagIcon from '../../../components/FlagIcon'


import {ModifyInput,ModifyLogistics} from './CellModify'
import Detail from './Detail'
import OrderTable from '../../../components/Ordertable' // 引入Ordertable
import * as ErrorOrderActions from '../../actions/ErrorOrder'  // 引入Action
import {filters,columnArr,AddressBallon,FiltersInput} from './TableConfig'  // 引入表格设置
import  {DialogTrade} from './Dialogs' // 引入 弹出框
import './main.css'

class ExceptionalOrder extends Component {
    constructor(props) {
        super(props);
    }
    // 组件mount之后请求数据
    componentDidMount(){
        this.props.getOrderData({
            'search_value':'',
            'filter_value':'', // 过滤 memu 多选
            'filter_search':'{}', // 过滤 搜索框
            'sort_value':'',
            'page_num':1,
            'ebs_status': 1
        });
    }

    onSearch=(search_value)=>{/*搜索*/
        this.props.getOrderData({
            ...this.props.selectCondition,
            search_value
        })
    }

    onFilter= (filterKeys)=>{/*过滤*/
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

    onSort=(dataIndex, order, sort)=>{/*排序*/
        this.props.getOrderData({
            ...this.props.selectCondition,
            'sort_value':JSON.stringify({'dataIndex':dataIndex,'order':order}),
            'page_num':1
        })
    }

    pageOnChange=(value)=>{/*翻页*/
        this.props.getOrderData({
            ...this.props.selectCondition,
            'page_num':value
        })
    }

    //恢复异常订单
    errorOrdersBack =()=>{
        const ids = this.getCheckedIds().join(',');
        if (ids.length === 0) return  Feedback.toast.show({
            type: 'error',
            hasMask: true,
            duration: 1000,
            content: '未选择任何订单!'
        });
        this.props.backErrorOrders({ids})
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
        this.props.batchModify(args); //批量修改请求
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
        const {ItemsSelectedArr,orderData,selectCondition,total} = this.props  // redux 返回的 state


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
                case "error_response": // 异常原因
                    column.title = <FiltersInput title="异常原因" value={filterSearchs.error_response||''} item="error_response" onFilterSearch={this.onFilterSearch} />
                    break;
                case "buyer_message": // 留言
                    column.title = <FiltersInput title="留言" value={filterSearchs.buyer_message||''} item="buyer_message" onFilterSearch={this.onFilterSearch} />
                    break;
                case "logistics_No": // 物流单号
                    column.title = <FiltersInput title="物流单号" value={filterSearchs.logistics_No||''} item="logistics_No" onFilterSearch={this.onFilterSearch} />
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
                    <Button type="primary" onClick={this.errorOrdersBack}> 恢复正常 </Button> &nbsp;&nbsp;
                    <Dropdown
                        trigger={<Button type="secondary">
                            批量操作 <Icon type="arrow-down" />
                            </Button>}
                        triggerType="click"  align="tr br" offset={[0, 4]}>
                        <Menu onClick={(name)=>{
                            if (this.getCheckedIds().length == 0) return  Feedback.toast.show({
                                type: 'error',
                                hasMask: true,
                                duration: 1000,
                                content: '未选择任何订单!'
                            });
                            this.props.openDialog(name)
                        }}>
                            <Menu.Item key="remarks">批量改备注</Menu.Item>
                            <Menu.Item key="logistics">批量改物流</Menu.Item>
                            <Menu.Item key="error">批量改异常原因</Menu.Item>
                        </Menu>
                    </Dropdown>
                </div>
                <OrderTable
                    dataSource={orderData}
                    columnArr={columnArr}
                    primaryKey="tao_tid"
                    ItemsSelectedArr={ItemsSelectedArr}
                    current={selectCondition.page_num}
                    pageSize={50}
                    total={total}
                    pageOnChange={this.pageOnChange}
                    itemsCheckedOnChange={this.props.checkItems}
                    onSort={this.onSort}
                    onFilter={this.onFilter}
                    onSearch={this.onSearch}
                    leftBottomComponent={()=>{
                        return (<span style={{color: "#999"}}>共计{this.props.stores.length}个店铺，{this.props.total}条订单信息</span>);
                    }}
                    expandedRowRender={(recode,i)=> { return <Detail orderDetail={recode}/> }}
                />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return state.ErrorOrder;
}

function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(ErrorOrderActions, dispatch)
}

// 绑定 redux 的 state和 dispatch
export default connect(mapStateToProps, mapDispatchToProps)(ExceptionalOrder)
