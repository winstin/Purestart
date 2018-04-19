import Dialog from 'qnui/lib/dialog';
import React from 'react';
import Placecheckbox from './Placecheckbox';
import Form from 'qnui/lib/form';
import Select from 'qnui/lib/select';
import MatchCheck from './MatchCheck'
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: {span: 21}
};



export default class MatchDialog extends React.Component{
    init(){
        const id = this.props;
        switch (id) {
            case 'createMatch':
                let html = this.createMatch();
                return html;
                break;
            default:
                return this.createMatch();

        }
    }
    constructor() {
        super();
        this.state = {
            new_logistics_value : '中国邮政小包'
        };
    }
    onChange(checked){
        this.setState({
            new_logistics_value:checked
        });
    }
    clickOk(){
        const {onOk} = this.props;
        onOk(this.state.new_logistics_value);
    }
    createMatch(){
        const {title, visible, onOk, onCancel, onClose, id, index} = this.props;
        return(
            <Dialog visible = {visible}
                            onOk = {this.clickOk.bind(this)}
                            onCancel = {onCancel}
                            onClose = {onClose}
                             style = {{width:"900px"}} title = {title}>
                <Form direction="ver" size="medium">
                   <FormItem label="选择物流：" {...formItemLayout}>
                       <Select className="next-checkbox-label" onChange={this.onChange.bind(this)} value={this.state.new_logistics_value}>
                           <Option value="中国邮政小包">中国邮政小包</Option>
                           <Option value="圆通快递">圆通快递</Option>
                       </Select>
                   </FormItem>
                   <FormItem label="选择地区：" {...formItemLayout}>
                        <MatchCheck id="huadong" number = {index}/>
                        <MatchCheck id="huabei" number = {index}/>
                        <MatchCheck id="huazhong" number = {index}/>
                        <MatchCheck id="huanan" number = {index}/>
                        <MatchCheck id="dongbei" number = {index}/>
                        <MatchCheck id="xibei" number = {index}/>
                        <MatchCheck id="xinan" number = {index}/>
                        <MatchCheck id="gangaotai" number = {index}/>
                        <MatchCheck id="haiwai2" number = {index}/>
                   </FormItem>
               </Form>
            </Dialog>
        )
    }
    render(){
        return this.init();
    }
}
