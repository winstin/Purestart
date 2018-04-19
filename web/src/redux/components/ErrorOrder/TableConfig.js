import React from 'react'
import Balloon from 'qnui/lib/balloon';
import Button from 'qnui/lib/button';
import FlagIcon from '../../../components/FlagIcon'
import logistics from '../../../static/logistics'
import Input from 'qnui/lib/input';
import Overlay from 'qnui/lib/overlay';

const Popup = Overlay.Popup;


// 异常过滤
const error_response_filters=[
    {label:<font style={{color:"red"}}>改</font>,value:'改'},
    {label:<font style={{color:"red"}}>缺</font>,value:'缺'},
    {label:<font style={{color:"red"}}>退</font>,value:'退'},
    {label:<font style={{color:"red"}}>匹</font>,value:'匹'},
    {label:<font style={{color:"red"}}>负</font>,value:'负'}
];

// 旗子过滤
const seller_flag_filters=[
    {label:<FlagIcon type="1"/>,value:'1'},
    {label:<FlagIcon type="2"/>,value:'2'},
    {label:<FlagIcon type="3"/>,value:'3'},
    {label:<FlagIcon type="4"/>,value:'4'},
    {label:<FlagIcon type="5"/>,value:'5'}
];

// 物流过滤
let logistics_name_filters = logistics.map((data)=>{return {label:data.log_name,value:data.log_id};});

// 卖家店铺过滤
let store_id_filters = [
    {label:"淘宝",value:"TB"},
    {label:"京东",value:"JD"},
    {label:"天猫",value:"TM"},
    {label:"1688",value:"1688"}
];

// 地址 Balloon
const AddressBallon = props => (
    <div onClick={()=>{props.onClick()}}>
        <Balloon
            closable={false}
            trigger={
                <Button style = {{width:"168px"}} className = "btrigger" >
                    { props.value }
                </Button>
            }
            triggerType="hover">
            {props.value}
        </Balloon>
    </div>
)

// 自定义过滤搜索框
export class FiltersInput extends React.Component {
    state={visible:false}
    onVisibleChange=(visible)=>{
        this.setState({visible})
    }
    onClick=()=>{
        this.setState({visible: !this.state.visible});
    }
    onConfirm=()=>{
        this.onClick()
        this.props.onFilterSearch({ [this.props.item]: this.refs.FilterValue.refs.input.value })
    }
    onReset=()=>{
        this.onClick()
        this.props.onFilterSearch({ [this.props.item]: "" })
    }
    render() {
        let spanStyle = {
            border: '1px solid #ddd',
            padding: '10px',
            width: '200px',
            height: '100px',
            background: '#fff'
        }
        return (
            <span>
                {this.props.title}
                <Popup
                    trigger={<i className="next-icon next-icon-filter filter-input"></i>}
                    triggerType="click"
                    visible={this.state.visible}
                    onVisibleChange={this.onVisibleChange.bind(this)}>

                    <span style={spanStyle}>
                        <Input defaultValue={this.props.value} size="large" style={{width:160,marginBottom:15}} ref="FilterValue"/>
                        <Button type="primary" onClick={this.onConfirm}>确认</Button>&nbsp;&nbsp;&nbsp;
                        <Button type="normal" onClick={this.onReset}>重置</Button>
                    </span>
                </Popup>
            </span>
        )
    }
}


// 列选项
const columnArr = [
    { 'title': '异常', 'value': 'error_status', 'filters': error_response_filters, 'width': 100 },
    { 'value': 'error_response', 'width': 200 },
    { 'title': '旗子', 'value': 'seller_flag', 'filters': seller_flag_filters, 'width': 100 },
    { 'title': '备注', 'value': 'seller_memo', 'width': 200 },
    { 'title': '留言', 'value': 'buyer_message', 'width': 200 },
    { 'title': '物流匹配', 'value': 'logistics_company', 'filters': logistics_name_filters, 'width': 200 },
    { 'title': '物流单号', 'value': 'logistics_No', 'width': 150 },
    { 'title': '买家ID', 'value': 'buyer_nick', 'sortable': true, 'width': 150 },
    { 'title': '收件人', 'value': 'receiver_name', 'width': 100 },
    { 'title': '收件电话', 'value': 'receiver_mobile', 'width': 150 },
    { 'title': '收件地址', 'value': 'receiver_address', 'width': 200 },
    { 'title': '实付', 'value': 'payment', 'sortable': true, 'width': 200 },
    { 'title': '店铺', 'value': 'store_id', 'filters': store_id_filters, 'width': 200 },
    { 'title': '优惠', 'value': 'discount', 'sortable': true, 'width': 100 },
    { 'title': '邮费', 'value': 'post_fee', 'sortable': true, 'width': 100 },
    { 'title': '快递成本', 'value': 'logisticsCost', 'sortable': true, 'width': 100 },
    { 'title': '订单号', 'value': 'tao_tid', 'width': 200 },
    { 'title': '下单时间', 'value': 'created', 'sortable': true, 'width': 200 },
    { 'title': '付款时间', 'value': 'pay_time', 'sortable': true, 'width': 200 }
]

export {columnArr,AddressBallon};

// let column_arr =
// [{'title':'异常','value':'error_response','cell':this.showValue,'checked':true,'sortable':false,'filters':error_response_filters,'filterMode':"multiple",'width':200},
// {'title':'旗子','value':'seller_flag','cell':this.getFlagIcon,'checked':true,'sortable':false,'filters':seller_flag_filters,'filterMode':"multiple",'width':200},
// {'title':'备注','value':'seller_memo','cell':this.editCell.bind(this),'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':200},
// {'title':'留言','value':'buyer_message','cell':this.showValue,'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':200},
// {'title':'物流匹配','value':'logistics_company','cell':this.showValue,'checked':true,'sortable':false,'filters':logistics_name_filters,'filterMode':"multiple",'width':200},
// {'title':'买家ID','value':'buyer_nick','cell':this.showValue,'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':200},
// {'title':'收件人','value':'receiver_name','cell':this.showValue,'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':200},
// {'title':'收件电话','value':'receiver_mobile','cell':this.showValue,'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':200},
// {'title':'收件地址','value':'receiver_address','cell':this.receiverAddressCell,'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':200},
// {'title':'实付','value':'payment','cell':this.showValue,'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':200},
// {'title':'店铺','value':'store_id','cell':this.getStoreIcon,'checked':true,'sortable':false,'filters':store_id_filters,'filterMode':"multiple",'width':200},
// {'title':'优惠','value':'discount','cell':this.showValue,'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':200},
// {'title':'邮费','value':'post_fee','cell':this.showValue,'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':200},
// {'title':'快递成本','value':'logisticsCost','cell':this.showValue,'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':200},
// {'title':'订单号','value':'tao_tid','cell':this.showValue,'checked':true,'sortable':false,'filters':false,'filterMode':"multiple",'width':200},
// {'title':'下单时间','value':'created','cell':this.showValue,'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':200},
// {'title':'付款时间','value':'pay_time','cell':this.showValue,'checked':true,'sortable':true,'filters':false,'filterMode':"multiple",'width':200}];
