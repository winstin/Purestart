import React from 'react'
import Radio,{ Group as RadioGroup } from 'qnui/lib/radio';
import Dialog from 'qnui/lib/dialog';
import Form from 'qnui/lib/form';
import Button from 'qnui/lib/button';
import Select from 'qnui/lib/select';
import Field from 'qnui/lib/field'
import Tab from 'qnui/lib/tab'
import Table from 'qnui/lib/table'
import {Icon,Search,Input} from 'qnui'

import logistics from '../../../static/logistics'

const TabPane = Tab.TabPane;
const FormItem = Form.Item;

const refundType = [
    { value: '退款', label: "退款" },
    { value: '退货且退款', label: "退货且退款" },
    { value: '换货', label: "换货" },
    { value: '补发', label: "补发" },
    { value: '开发票', label: "开发票" },
    { value: '维修', label: "维修" },
    { value: '退差价', label: "退差价" }
];

const invoiceType = [
    { value: '增值税普通发票', label: "增值税普通发票" },
    { value: '增值税专用发票', label: "增值税专用发票" },
    { value: '电子发票', label: "电子发票" }
];


// 新建售后单 dialog
export class DialogRefund extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '1',
            textarea:'',
            visible:false,  // 弹窗是否显示
            wangwang: '',
            buyer_name: '',
            addType: '', // 添加信息 用户名 或 wangwang
            invoice: false,
            reason: ['七天无理由退货','尺码拍错']
         };
        this.field = new Field(this);
    }

    // 改变售后类型
    changeType = (value)=> {
        this.setState({invoice: value=="开发票"?true:false})
    }

    onOk = ()=>{
        console.log(JSON.stringify(this.field.getValues(), true, 2));
        const params = this.field.getValues();
        const {invoice_type,invoice_title,invoice_bank,tax_code} = params;
        const {store_id, province,city,area,address} = params;
        this.props.onOk({
            ...params,
            invoice_response:JSON.stringify({invoice_type,invoice_title,invoice_bank,tax_code}),
            buyer_response:JSON.stringify({store_id, province,city,area,address})
        });
    }

    onClose = ()=>{
        this.props.onClose();
    }

    handleInput =(value)=>{
        this.setState({ textarea:value});
    }

    render() {
        const init = this.field.init;

        const formItemLayout = { labelCol: {span: 5}, wrapperCol: {span: 16} };
        const formItemLayout1 = { labelCol: {span: 8}, wrapperCol: {span: 12} };

        return (
            <Dialog visible={this.props.visible} style={{minWidth:750,minHeight: 500}} className="dialog-custom" title={this.props.title}
                onOk = {this.onOk}
                onClose = {this.onClose}
                onCancel = {this.onClose}
                >
                <Form style={{maxWidth: '810px'}}>
                    <FormItem {...{labelCol: {span: 4}, wrapperCol: {span: 18}}} label="售后类型：" style={{width:600, marginLeft: '-16px'}}>
                        <RadioGroup {...init('refund_type')} dataSource={refundType} defaultValue="退款" onChange={this.changeType} />
                    </FormItem>


                    <div style={{display:this.state.invoice?'none':'flex', flexDirection: 'row',flexWrap:'wrap'}}>
                        <FormItem {...formItemLayout} label="售后原因：" style={{width:400}}>
                            <div style={{display:'flex'}}>
                                <Select {...init('refund_reason')} defaultValue="" style={{width:150}}>
                                    {this.state.reason.map(reason=><Option key={reason} value={reason}>{reason}</Option>)}
                                    {/* <Option value="七天无理由退货">七天无理由退货</Option>
                                    <Option value="尺码拍错">尺码拍错</Option> */}
                                </Select>&nbsp;
                                <RefundReason value={this.state.user_reason} onChange={this.handleChange} onOk={(text)=>{
                                    const reason_added = text.split(/\n/);
                                    const reasons = this.state.reason.concat(reason_added);
                                    this.setState({reason: reasons})
                                }}/>
                            </div>
                        </FormItem>

                        <FormItem {...{labelCol: {span: 8}, wrapperCol: {span: 10}}} label="问题描述：" style={{width:300}}>
                            <Input {...init('refund_memo')} style={{width:280}}/>
                        </FormItem>

                        <FormItem {...formItemLayout} label="订单号：" style={{width:400}}>
                            <Input {...init('tao_tid')} style={{width:150}}/>
                        </FormItem>

                        <FormItem {...{labelCol: {span: 8}, wrapperCol: {span: 10}}} label="退款金额：" style={{width:300}}>
                            <Input {...init('refund_fee')} style={{width:200}}/>
                        </FormItem>

                        <FormItem {...formItemLayout} label="退回物流：" style={{width:400}}>
                            <Select {...init('logistics_company')} defaultValue="" style={{width:150}}>
                                {logistics.map((data,i)=><Option value={data.log_name} key={i}>{data.log_name}</Option>)}
                            </Select>&nbsp;
                        </FormItem>

                        <FormItem {...{labelCol: {span: 8}, wrapperCol: {span: 10}}} label="物流单号：" style={{width:300}}>
                            <Input {...init('invoice_no')} style={{width:200}} />
                        </FormItem>
                    </div>

                    <div style={{display:this.state.invoice?'flex':'none', flexDirection: 'row',flexWrap:'wrap'}}>
                        <FormItem {...{labelCol: {span: 4}, wrapperCol: {span: 18}}} label="发票类型：" style={{width:600, marginLeft: '-16px'}}>
                            <RadioGroup {...init('invoice_type')} dataSource={invoiceType} defaultValue="增值税普通发票" />
                        </FormItem>

                        <FormItem {...formItemLayout} label="发票抬头：" style={{width:400}}>
                            <Input {...init('invoice_title')} style={{width:200}}/>
                        </FormItem>

                        <FormItem {...{labelCol: {span: 8}, wrapperCol: {span: 10}}} label="开票银行：" style={{width:300}}>
                            <Input {...init('invoice_bank')} style={{width:200}}/>
                        </FormItem>

                        <FormItem {...formItemLayout} label="纳税编码：" style={{width:400}}>
                            <Input {...init('tax_code')} style={{width:200}}/>
                        </FormItem>

                        <FormItem {...{labelCol: {span: 8}, wrapperCol: {span: 10}}} label="开户帐号：" style={{width:300}}>
                            <Input {...init('account')} style={{width:200}}/>
                        </FormItem>

                        <FormItem {...formItemLayout} label="发票内容：" style={{width:400}}>
                            <Input {...init('invoice_content')} style={{width:200}}/>
                        </FormItem>

                        <FormItem {...{labelCol: {span: 8}, wrapperCol: {span: 10}}} label="开票金额：" style={{width:300}}>
                            <Input {...init('invoice_fee')} style={{width:200}}/>
                        </FormItem>

                        <FormItem {...formItemLayout} label="订单号：" style={{width:400}}>
                            <Input {...init('invoice_order')} style={{width:200}}/>
                        </FormItem>
                    </div>


                    {/* 分割线 */}
                    <div className="refund-line" style={{display:'flex'}}>
                        <span style={{display:"inlineBlock",width:'10%',height:1,backgroundColor:'#ccc',marginTop:7}}></span>
                        <span>&nbsp;&nbsp;买家信息&nbsp;&nbsp;</span>
                        <span style={{display:"inlineBlock",width:'80%',height:1,backgroundColor:'#ccc',marginTop:7}}></span>
                    </div>


                    <div className="refund-buyerMsg" style={{display:'flex', flexDirection: 'row',flexWrap:'wrap',marginTop:30}}>

                        <FormItem {...formItemLayout1} style={{width:162}} label="店铺：">
                            <Select {...init('store_id')} defaultValue="" style={{width: '100%'}}>
                                <div value="JD">JD</div>
                                <div value="TAO">TAO</div>
                                <div value="1688">1688</div>
                            </Select>
                        </FormItem>
                        <FormItem {...formItemLayout1} style={{width:162}} label="旺旺：">
                            <Input {...init('wangwang')} value={this.state.wangwang} className="input-after" style={{width:100}} addonAfter={<Icon type="add" size="xs" onClick={()=>{
                                this.setState({visible:true,addType:"wangwang"})}
                            } />}>
                            </Input>
                        </FormItem>
                        <FormItem {...formItemLayout1} style={{width:162}} label="姓名：">
                            <Input {...init('buyer_name')} value={this.state.buyer_name} className="input-after" style={{width:100}} addonAfter={<Icon type="add" size="xs" onClick={()=>{
                                this.setState({visible:true,addType:"buyer_name"})}
                            }/>}>
                            </Input>
                        </FormItem>
                        <FormItem {...formItemLayout1} style={{width:162}} label="手机：">
                            <Input {...init('mobile')} style={{width:100}}/>
                        </FormItem>

                        <FormItem {...formItemLayout1} style={{width:162}} label="固话：">
                            <Input {...init('telephone')} style={{width:100}}/>
                        </FormItem>


                        <FormItem {...formItemLayout1} style={{width:162}} label="省份：">
                            <Select {...init('province')} defaultValue="" style={{width: '100%'}}>
                                <div value="上海">上海</div>
                                <div value="北京">北京</div>
                                <div value="深圳">深圳</div>
                            </Select>
                        </FormItem>

                        <FormItem {...formItemLayout1} style={{width:162}} label="市(区)：">
                            <Select {...init('city')} defaultValue="" style={{width: '100%'}}>
                                <div value="上海">上海</div>
                                <div value="北京">北京</div>
                                <div value="深圳">深圳</div>
                            </Select>
                        </FormItem>

                        <FormItem {...formItemLayout1} style={{width:162}} label="区(县)：">
                            <Select {...init('area')} defaultValue="" style={{width: '100%'}}>
                                <div value="上海">上海</div>
                                <div value="北京">北京</div>
                                <div value="深圳">深圳</div>
                            </Select>
                        </FormItem>

                        <FormItem {...formItemLayout1} style={{width:162}} label="地址：">
                            <Input {...init('address')} style={{width:100}}/>
                        </FormItem>

                        <FormItem {...formItemLayout1} style={{width:162}} label="邮编：">
                            <Input {...init('postcode')} style={{width:100}}/>
                        </FormItem>

                    </div>

                    <DialogBuyer
                        visible={this.state.visible}
                        onOk={(data)=>{
                            this.setState({[this.state.addType]:data[this.state.addType]})
                            console.log(data);
                            console.log({[this.state.addType]:data[this.state.addType]});
                        }}
                        onClose={()=>{this.setState({visible:false})}}
                    />

                    <Tab defaultActiveKey={"1"}>
                        <TabPane tab="返回商品明细" key="1">
                            <Table>
                                <Table.Column title="商品信息" width={200} dataIndex="title" cell={(value)=>{
                                    return (<Balloon closable={false} trigger={<Button style={{width:"268px"}} className="btrigger">{value}</Button>} triggerType="hover">
                                                {value}
                                            </Balloon>);
                                }}/>
                                <Table.Column title="商品规格" width={100} dataIndex=""/>
                                <Table.Column title="商品编码" width={100} dataIndex="num" />
                                <Table.Column title="单价" width={100} dataIndex="num" />
                                <Table.Column title="数量" width={100} dataIndex="num" />
                                <Table.Column title="实收金额" width={100} dataIndex="payment"/>
                                <Table.Column title="操作"  width={100} cell={()=>{
                                    return (
                                        <span>
                                            <a className="order-details-table-a">修改属性</a>
                                            <a className="order-details-table-a">更换商品</a>
                                        </span>
                                    );
                                }}/>
                            </Table>
                        </TabPane>
                    </Tab>
                </Form>
            </Dialog>
        );
    }
}

//售后原因
class RefundReason extends React.Component {
    state = {
        visible: false
    }

    onOpen = () => {
        this.setState({
            visible: true
        })
    }

    onClose = () => {
        this.setState({
            visible: false
        })
    }

    onOk = ()=>{
        this.props.onOk(this.input.state.value);
        this.onClose();
    }

    render() {
        return (
            <span>
                <Button type="secondary" style={{padding: '0 10px'}} onClick={this.onOpen}>添加售后原因</Button>
                <Dialog className="dialog-custom" title="添加售后原因" visible={this.state.visible}
                    onClose = {this.onClose}
                    onCancel = {this.onClose}
                    onOk = {this.onOk}
                    >
                    <Input
                        ref = {(input)=>{this.input=input}}
                        style={{verticalAlign:'top',width: '100%',height:'150'}}
                        multiple
                        placeholder="请输入售后原因, 换行即视为添加多条..."
                        // value={this.props.value}
                        // defaultValue
                        onChange={this.props.onChange}/>
                </Dialog>
            </span>
        );

    }
}

// 入库弹框
export class DialogStorage extends React.Component{
    constructor(){
        super();
        this.field = new Field(this);
    }

    onClose = ()=>{
        this.props.onClose()
    }

    onOk = ()=>{
        this.props.onOk();
        this.props.onClose()
    }
    render(){
        const init = this.field.init;
        return(
            <Dialog className="dialog-custom" title={this.props.title} visible={this.props.visible}
                onClose = {this.onClose}
                onCancel = {this.onClose}
                onOk = {this.onOk}
                >
                <Form style={{maxWidth: 600}}>
                    <FormItem {...{labelCol: {span: 8}, wrapperCol: {span: 12}}} label="选择商品退回仓库：">
                        <RadioGroup {...init('refund_type')} defaultValue={1} dataSource={[{value:1,label:'退货仓'},{value:2,label:'残次品仓'}]} />
                    </FormItem>
                    <FormItem {...{labelCol: {span: 8}, wrapperCol: {span: 12}}} label="是否提交财务退款：">
                        <RadioGroup {...init('refund_type')} defaultValue={3} dataSource={[{value:3,label:'是'},{value:4,label:'否'}]} />
                    </FormItem>
                </Form>

            </Dialog>
        )
    }
}

// 买家选择弹窗
class DialogBuyer extends React.Component{
    state={
        dataSource :[
            {buyer_name:'sdfdsf',wangwang:45654,store_id:'tao',province:'上海',city:'上海',area:'宝山',address:'新二路',mobile:14234324242 },
            {buyer_name:'sdfdsf',wangwang:45654 }
        ],
        adding : false
    }

    onOk = ()=>{
        const checkedRow = this.state.dataSource[this.state.checkedIndex];
        this.props.onOk(checkedRow);
        this.props.onClose();
    }

    onClose =()=>{
        this.props.onClose();
    }

    saveBuyerMsg = ()=>{

    }

    closeAddMsg = ()=>{
        this.setState({adding: false})
    }

    addBuyerMsg = (obj)=>{
        let dataSource = this.state.dataSource;
        dataSource.push(obj);
        this.setState({
            dataSource,
            adding: false
        })
    }

    adding = ()=>{
        this.setState({adding: true})
    }

    render(){
        return(
            <Dialog
                className="dialog-custom"
                title="选择买家"
                visible={this.props.visible}
                onOk={this.onOk}
                onClose={this.onClose}
                onCancel={this.onClose}
                style={{width:800,minHeight:300}}
                >
                <Search className="aaa" size='medium' inputWidth={300}
                    value="lksdjf" onSearch={()=>{console.log(1);}}
                    placeholder="买家昵称..." searchText=""
                />
                <br/>

                <Table
                    hasBorder={false}
                    className="addBuyerMsg"
                    dataSource={this.state.dataSource}
                    onRowClick={(recode,i)=>{
                        let tableList = document.querySelectorAll(".addBuyerMsg .next-table-row");
                        tableList.forEach(row=>row.style.backgroundColor="#fff")
                        tableList[i].style.backgroundColor="#999";
                        this.setState({checkedIndex: i})
                    }}
                    >
                    <Table.Column title="买家姓名" dataIndex="buyer_name"/>
                    <Table.Column title="旺旺ID" dataIndex="wangwang"/>
                    <Table.Column title="平台" dataIndex="store_id" />
                    <Table.Column title="省份" dataIndex="province" />
                    <Table.Column title="市(区)" dataIndex="city" />
                    <Table.Column title="区(县)" dataIndex="area"/>
                    <Table.Column title="地址"  dataIndex="address" />
                    <Table.Column title="手机" width={120} dataIndex="mobile" />
                    <Table.Column title="固话" dataIndex="telephone" />
                </Table>
                <DialogAddBuyerMsg
                    visible={this.state.adding}
                    onClose={this.closeAddMsg}
                    onOk={this.addBuyerMsg}
                />
                <br/>
                <a href="#" onClick={this.adding}>+ 新增买家信息</a>

            </Dialog>
        )
    }
}

class DialogAddBuyerMsg extends React.Component {
    constructor(props) {
        super(props);
        this.field = new Field(this);
    }

    onClose = ()=>{
        this.props.onClose()
    }

    onOk = ()=>{
        this.props.onOk(this.field.getValues())
        this.props.onClose()
    }

    render() {
        const init = this.field.init;
        const layout1 = {labelCol: {span: 6}, wrapperCol: {span: 18}};
        const style1 = {width:300, marginLeft: '-16px'};
        const layout2 = {labelCol: {span: 9}, wrapperCol: {span: 18}};
        const style2 = {width:200, marginLeft: '-16px'};
        const layout3 = {labelCol: {span: 3}, wrapperCol: {span: 18}};
        const style3 = {width:600, marginLeft: '-16px'};

        return(
            <Dialog
                className="dialog-custom"
                title="新增买家信息   "
                visible={this.props.visible}
                onOk={this.onOk}
                onClose={this.onClose}
                onCancel={this.onClose}
                >
                <Form style={{maxWidth: '600px'}}>
                    <div style={{display:'flex', flexDirection: 'row', flexWrap:'wrap'}}>
                        <FormItem {...layout1} label="姓名：" style={style1}>
                            <Input {...init('buyer_name')} style={{width:184}}/>
                        </FormItem>
                        <FormItem {...layout1} label="旺旺ID：" style={style1}>
                            <Input {...init('wangwang')} style={{width:184}}/>
                        </FormItem>
                        <FormItem {...layout1} label="平台：" style={style1}>
                            <Input {...init('store_id')} style={{width:184}}/>
                        </FormItem>
                        <FormItem {...layout1} label="手机：" style={style1}>
                            <Input {...init('mobile')} style={{width:184}}/>
                        </FormItem>
                        <FormItem {...layout1} label="固话：" style={style1}>
                            <Input {...init('telephone')} style={{width:184}}/>
                        </FormItem>
                        <FormItem {...layout1} label="邮编：" style={style1}>
                            <Input {...init('postcode')} style={{width:184}}/>
                        </FormItem>

                        <FormItem {...layout2} label="省份：" style={style2}>
                            <Input {...init('province')} style={{width:100}}/>
                        </FormItem>
                        <FormItem {...layout2} label="市(区)：" style={style2}>
                            <Input {...init('city')} style={{width:100}}/>
                        </FormItem>
                        <FormItem {...layout2} label="区(县)：" style={style2}>
                            <Input {...init('area')} style={{width:100}}/>
                        </FormItem>

                        <FormItem {...layout3} label="地址：" style={style3}>
                            <Input {...init('address')} style={{width:468}}/>
                        </FormItem>
                    </div>

                </Form>
            </Dialog>
        )
    }
}
