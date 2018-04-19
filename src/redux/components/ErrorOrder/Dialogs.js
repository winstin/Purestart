import React from 'react'
import Select from 'qnui/lib/select';
import Checkbox from 'qnui/lib/checkbox';
import Input from 'qnui/lib/input';
import Button from 'qnui/lib/button';
import Dialog from 'qnui/lib/dialog';
import Field from 'qnui/lib/field'
import Form from 'qnui/lib/form';
import { Group as RadioGroup } from 'qnui/lib/radio';
import FlagIcon from '../../../components/FlagIcon'
import logistics from '../../../static/logistics'

// 表头 旗子过滤
const flaglist = [
    { value: '1', label: <FlagIcon type="1"/> },
    { value: '2', label: <FlagIcon type="2"/> },
    { value: '3', label: <FlagIcon type="3"/> },
    { value: '4', label: <FlagIcon type="4"/> },
    { value: '5', label: <FlagIcon type="5"/> },
];

/**
 * 得到物流公司名
 * @param  {Number} id [物流公司id]
 * @return {String}    [物流公司name]
 */
export const getLogistics_name=(id)=>{
    let log_name = ""
    logistics.forEach((item)=>{
        if (id === item.log_id) {
            log_name = item.log_name
        }
    })
    return log_name;
}

export class DialogTrade extends React.Component {
    render() {
        let currentDialog = null;
        switch (this.props.name) {
            case 'remark':
                currentDialog = <DialogRemark title="修改备注"  onClose={this.props.onClose} onOk={this.props.onOk}/>
                break;
            case 'remarks':
                currentDialog = <DialogRemark title="批量修改备注" onClose={this.props.onClose} onOk={this.props.onOk}/>
                break;
            case 'logistics':
                currentDialog = <DialogLogistics onClose={this.props.onClose} onOk={this.props.onOk} />
                break;
            case 'error':
                currentDialog = <DialogException onClose={this.props.onClose} onOk={this.props.onOk}/>
                break;
            case 'address':
                currentDialog = <DialogAddress onClose={this.props.onClose} onOk={this.props.onOk}/>
                break;
        }

        return(
            <div>
                {currentDialog}
            </div>
        )
    }
}


// 修改备注 dialog
class DialogRemark extends React.Component {
    state = { value: '1',textarea:'' };

    onChange = (value)=> {
        this.setState({value });
    }

    onOk = ()=>{
        this.props.onOk({
            remark : this.state.textarea,
            flagType : this.state.value
        });
    }

    handleInput =(value)=>{
        this.setState({ textarea:value});
    }

    render() {
        return (
            <Dialog visible={true} className="dialog-custom" title={this.props.title} style={{minHeight: 300}}
                onClose = {this.props.onClose}
                onCancel = {this.props.onClose}
                onOk = {this.onOk}
                >
                <span>
                    标记旗子:&nbsp;&nbsp;
                    <RadioGroup dataSource={flaglist} value={this.state.value} onChange={this.onChange} />
                </span>
                 <p>
                     选择备注:&nbsp;&nbsp;
                     <Select defaultValue="无" style={{verticalAlign: 'middle',width:200}}>
                          <li value="jack">jack</li>
                          <li value="lucy">lucy</li>
                          <li value="disabled" disabled>disabled</li>
                          <li value="hugo">hugo</li>
                     </Select>&nbsp;&nbsp;&nbsp;
                     <a href="#">设置常用备注</a>

                 </p>
                 <p>
                     <span>
                          　　备注:&nbsp;&nbsp;
                     </span>
                      <Input id="error_remark" onChange={this.handleInput} style={{verticalAlign:'top',width: 300}} multiple placeholder="随便写" value={this.state.textarea}/>
                 </p>
            </Dialog>
        );
    }
}

// 物流弹出层
class DialogLogistics extends React.Component {

    state = {
        log_id: '123',
        log_name: '中通物流'
    }

    onChange=(value)=>{
        this.setState({
            log_id:value,
            log_name: getLogistics_name(value)
        })
    }

    onOk = ()=>{
        this.props.onOk({logistics_company:this.state.log_name})
    }


    render() {
        return (
            <Dialog visible={true} className="dialog-custom" title="批量修改物流"
                onClose = {this.props.onClose}
                onCancel = {this.props.onClose}
                onOk = {this.onOk}
                >
                <p>
                    选择物流:&nbsp;&nbsp;
                    <Select value={this.state.log_name} onChange={this.onChange} style={{verticalAlign: 'middle',width:200}}>
                       {logistics.map((data)=>(
                           <li key={data.log_id} value={data.log_id}>{data.log_name}</li>
                       ))}
                    </Select>&nbsp;&nbsp;&nbsp;
                 </p>
            </Dialog>
        );
    }
}

const ebs_error_obj = {
    "延时发货":"延",
    "自提":"自",
    "需要拆单发货":"拆",
    "申请换货":"换",
    "补货中":"补",
    "申请退款":"退"
};

// 提交异常
class DialogException extends React.Component {
    state = {
        ebs_value:  "延时发货",
        ebs_error_arr: [ "延时发货", "自提", "需要拆单发货", "申请换货", "补货中", "申请退款"],
        user_reason: "",  // 用户自定义reason
        syncRemark: true  // 是否同步备注
    }

    onChange = (value)=>{
        this.setState({ebs_value:  value})
    }

    addReason=()=>{
        let new_ebs_error_arr = [...this.state.ebs_error_arr]
        new_ebs_error_arr.push(this.state.user_reason);
        this.setState({
            user_reason: "",
            ebs_error_arr: new_ebs_error_arr
        })
    }

    handleChange=(value)=>{
        this.setState({ user_reason:value })
    }

    onOk=()=>{
        const {syncRemark,ebs_value,ebs_error_arr} = this.state;
        this.props.onOk({
            syncRemark: syncRemark?1:0,
            error_response: ebs_value,
            error_status: ebs_error_obj[ebs_value] || (ebs_error_arr.indexOf(ebs_value) -5 )
        })
    }

    render() {
        const {onClose, onClick} = this.props;
        return (
            <Dialog visible={true} className="dialog-custom" title="提交异常"
                onClose = {this.props.onClose}
                onCancel = {this.props.onClose}
                onOk = {this.onOk}
                >
                <p>
                    选择异常原因:&nbsp;&nbsp;
                    <Select defaultValue={this.state.ebs_value} style={{verticalAlign: 'middle',width:200}} onChange={this.onChange}>
                        {this.state.ebs_error_arr.map((error,i)=><Option key={i} value={error}>{error}</Option>)}
                    </Select>&nbsp;&nbsp;&nbsp;
                    <DialogReason onOk = {this.addReason} value={this.state.user_reason} onChange={this.handleChange}/>
                 </p>
                 <p>
                     <Checkbox checked={this.state.syncRemark} onChange={(checkValue)=>{this.setState({syncRemark:checkValue})}}>
                         将异常原因同步到卖家备注
                     </Checkbox>
                 </p>
            </Dialog>
        );
    }
}

//异常原因
class DialogReason extends React.Component {
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
        this.props.onOk();
        this.onClose()
    }

    render() {
        return (
            <span>
                <Button type="secondary" onClick={this.onOpen}>添加更多原因</Button>
                <Dialog className="dialog-custom" title="添加异常原因" visible={this.state.visible}
                    onClose = {this.onClose}
                    onCancel = {this.onClose}
                    onOk = {this.onOk}
                    >
                    <Input style={{verticalAlign:'top',width: '100%'}} multiple placeholder="随便写" value={this.props.value} onChange={this.props.onChange}/>
                </Dialog>
            </span>
        );

    }
}



// 收件地址弹框
class DialogAddress extends React.Component {
    constructor(props) {
        super(props);
        this.field = new Field(this);
    }


    handleSubmit=()=>{
        console.log('收到表单值：', this.field.getValues());
        const fields = this.field.getValues();
        let receiver_address = "";
        for (let key in fields) {
            receiver_address += fields[key] || ''
        }
        this.props.onClose();
        this.props.onOk({receiver_address})
    }

    render() {
        const FormItem = Form.Item;
        const init = this.field.init;

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 16},
        };
        return (
            <Dialog visible={true} className="dialog-custom" title="修改收件地址"
                onOk = {this.handleSubmit}
                onClose = {this.props.onClose}
                onCancel = {this.props.onClose}
                >
                <Form style={{maxWidth: '500px'}}>
                    <FormItem {...formItemLayout} label="省份：">
                        <Select {...init('province')} defaultValue="上海" style={{width: '100%'}}>
                            <div value="上海">上海</div>
                            <div value="北京">北京</div>
                            <div value="深圳">深圳</div>
                        </Select>
                    </FormItem>

                    <FormItem {...formItemLayout} label="城市：">
                        <Select {...init('city')} defaultValue="上海市" style={{width: '100%'}}>
                            <div value="上海">上海</div>
                            <div value="北京">北京</div>
                            <div value="深圳">深圳</div>
                        </Select>
                    </FormItem>

                    <FormItem {...formItemLayout} label="地区：">
                        <Select {...init('area')} defaultValue="宝山区" style={{width: '100%'}}>
                            <div value="上海">上海</div>
                            <div value="北京">北京</div>
                            <div value="深圳">深圳</div>
                        </Select>
                    </FormItem>

                    <FormItem {...formItemLayout} label="地址：">
                        <Input {...init('address')} placeholder="请输入地址" id="address" name="address"/>
                    </FormItem>

                    <FormItem {...formItemLayout} label="邮编：">
                        <Input {...init('postcode')} placeholder="请输入邮编" id="postcode" name="postcode"/>
                    </FormItem>
                </Form>
            </Dialog>
        )
    }
}

export {DialogRemark,DialogLogistics,DialogException,DialogReason,DialogAddress}
