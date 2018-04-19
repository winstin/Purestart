import React from 'react';
import Icon from 'qnui/lib/icon';
import OrderTable from '../../../components/Ordertable' // 引入Ordertable
import TableDetail from './TableDetail'

const cellOperation = (value)=>(
    <div>
        <a href="">确认收货</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="">拒绝收货</a>
    </div>
);

const cellBuyer_nick = (value)=>(
    <span>
        {value} <Icon type="atm" style={{color:'#0b70af'}}/>
    </span>
)

const cellRefund_status = (value)=>{
    switch (value) {
        case 'WAIT_SELLER_AGREE':
            return "买家申请退款"
        case 'WAIT_BUYER_RETURN_GOODS':
            return "等待买家退货"
        case 'WAIT_SELLER_CONFIRM_GOODS':
            return "等待卖家确认收货"
        case 'SELLER_REFUSE_BUYER':
            return "卖家拒绝退款"
        case 'CLOSED':
            return "退款关闭"
        case 'SUCCESS':
            return "退款成功"
        default: return value
    }
}

//售后类型
const filter_refund_type = [
    { value: '退款', label: "退款" },
    { value: '退货且退款', label: "退货且退款" },
    // { value: '3', label: "换货" },
    // { value: '4', label: "补发" },
    // { value: '5', label: "开发票" },
    // { value: '6', label: "维修" },
    // { value: '7', label: "退差价" }
]


//售后状态
const filter_refund_status = [
    { value: 'CLOSED', label: "退款关闭" },
    { value: 'SELLER_REFUSE_BUYER', label: "卖家拒绝退款" },
    { value: 'SUCCESS', label: "退款成功" },
    { value: 'WAIT_BUYER_RETURN_GOODS', label: "等待买家发货" },
    { value: 'WAIT_SELLER_AGREE', label: "等待卖家同意" },
    { value: 'WAIT_SELLER_CONFIRM_GOODS', label: "等待卖家确认收货" },
    // { value: '7', label: "等待仓库发货" },
    // { value: '8', label: "等待财务开票" },
    // { value: '9', label: "等待维修" },
]

//售后原因
const filter_refund_msg = [
    { value: '7天无理由退换货', label: "7天无理由退换货" },
    { value: '不喜欢/不想要', label: "不喜欢/不想要" },
    { value: '做工问题', label: "做工问题" },
    { value:'其他', label: "其他"},
    { value:'功能缺失', label: "功能缺失"},
    { value:'协商一致退款', label: "协商一致退款"},
    { value:'卖家发错货', label: "卖家发错货"},
    { value:'发票问题', label: "发票问题"},
    { value:'外观/型号/参数与描述不符', label: "外观/型号/参数与描述不符"},
    { value:'多拍/拍错/不想要', label: "多拍/拍错/不想要"},
    { value:'多拍/错拍/不想要', label: "多拍/错拍/不想要"},
    { value:'大小/尺寸与商品描述不符', label: "大小/尺寸与商品描述不符"},
    { value:'少件/漏发', label: "少件/漏发"},
    { value:'尺码拍错', label: "尺码拍错"},
    { value:'快递/物流一直未送到', label: "快递/物流一直未送到"},
    { value:'快递/物流无跟踪记录', label: "快递/物流无跟踪记录"},
    { value:'快递一直未送到', label: "快递一直未送到"},
    { value:'快递无跟踪记录', label: "快递无跟踪记录"},
    { value:'我不想要了', label: "我不想要了"},
    { value:'拍错/多拍', label: "拍错/多拍"},
    { value:'拍错/多拍/不想要', label: "拍错/多拍/不想要"},
    { value:'效果不好/不喜欢/不想要', label: "效果不好/不喜欢/不想要"},
    { value:'服务承诺', label: "服务承诺"},
    { value:'未按约定时间发货', label: "未按约定时间发货"},
    { value:'材质面料与商品描述不符', label: "材质面料与商品描述不符"},
    { value:'质量问题', label: "质量问题"},
    { value:'退运费', label: "退运费"},
    { value:'颜色/图案/款式与商品描述不符', label: "颜色/图案/款式与商品描述不符"},
]


// 所属店铺
let filters_store_id = [
    {label:"淘宝",value:"TB"},
    {label:"京东",value:"JD"},
    {label:"天猫",value:"TM"},
    {label:"1688",value:"1688"}
];

// 售后表 列显示
let columnArr = [
    { 'title': '操作', 'value': 'operation',cell:cellOperation ,'width': 200 },
    { 'title': '买家旺旺', 'value': 'buyer_nick',cell:cellBuyer_nick, 'width': 200 },
    { 'title': '售后状态', 'value': 'refund_status', cell:cellRefund_status, filters: filter_refund_status,'width': 200 },
    { 'title': '售后类型', 'value': 'refund_type', filters:filter_refund_type,'width': 200 },
    { 'title': '售后原因', 'value': 'refund_reason', filters:filter_refund_msg, 'width': 200 },
    { 'title': '所属店铺', 'value': 'store_id', filters:filters_store_id, 'width': 150 },
    { 'title': '退款金额', 'value': 'refund_fee', cell:value=><span style={{color:'#ffa000'}}>{value}</span>,'sortable': true, 'width': 150 },
    { 'title': '申请时间', 'value': 'created', 'sortable': true, 'width': 200 }
]
columnArr.map(column=>column.checked = true);

class RefundTable extends React.Component {

    onSearch= (search_value)=>{/*搜索*/
        this.props.getRefund({
            ...this.props.params,
            page_no:1,
            search_value
        });
    }

    onFilter= (filterKeys)=>{/*过滤*/
        const filter_value = JSON.stringify(filterKeys)
        this.props.getRefund({
            ...this.props.params,
            page_no:1,
            filter_value
        });
    }

    onSort= (dataIndex, order, sort)=>{/*排序*/
        this.props.getRefund({
            ...this.props.params,
            page_no:1,
            sort:JSON.stringify(sort)
        });
    }

    pageOnChange=(value)=>{/*翻页*/
        this.props.getRefund({
            ...this.props.params,
            page_no:value
        });
    }

    render() {
        return (
            <OrderTable
                style={{display:'none'}}
                dataSource={this.props.dataSource}
                columnArr={columnArr}
                primaryKey="refund_id"
                current={this.props.params.page_no}
                pageSize={50}
                total={this.props.total}
                pageOnChange={this.pageOnChange}
                onSort={this.onSort}
                onSearch={this.props.onSearch}
                onFilter={this.onFilter}
                itemsCheckedOnChange={()=>{}}
                leftBottomComponent={()=>{
                    return (<span style={{color: "#999"}}>
                        共计 {this.props.stores?this.props.stores.length:0} 个店铺，
                        {this.props.total}条订单信息
                    </span>);
                }}
                expandedRowRender={(recode,i)=><TableDetail dataSource={recode}/>}
            />
        )
    }
}

export default RefundTable;
