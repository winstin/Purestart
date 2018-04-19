import Dialog from 'qnui/lib/dialog';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react';
import Button from 'qnui/lib/button';
import Checkbox from 'qnui/lib/checkbox';
import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import Select, {Option, OptionGroup} from 'qnui/lib/select';
import {Row, Col} from 'qnui/lib/grid';
import Field from 'qnui/lib/field'; //在需要校验、获取多个表单数据的时候使用，可以提高数据获取效率。
import * as PrintDialogActions from '../../actions/PrintDialog'
import './PrintDialog.css'
const FormItem = Form.Item;
import PrintDialogModal from './Modal/PrintDialogModal'
import {needCLodop, getLodop} from '../../../static/LodopFuncs'

class PrintDialog extends Component {
    constructor() {
        super();
        this.field = new Field(this);
    }

    popupConfirm(){
          Dialog.confirm({
            content:'confirm',
            onOk: () => {
              return new Promise(resolve => {
                  setTimeout(resolve, 2000);
              });
            }
          })
    }
    showDialog(fn){
        switch (this.props.id) {
            case 'print':
                fn();
                break;
            case 'pass':
                this.popupConfirm();
                break;
            case 'error':
                this.popupConfirm()
                break;
            default:
        }
    }

    render(){
        const user_nick = "财宝宝588";
        const init = this.field.init; //如果使用简写不能缺少bind
        const {text, type, visible, pageSize, onClose,onOpen,onSelect,ItemsSelected_arr,orderData} = this.props;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16}
        };
        const PrintKdd = (<Checkbox {...init('kddCheckbox', {valueName: 'checked'})}>打印物流单：</Checkbox>);
        const PrintFhd = (<Checkbox {...init('fhdCheckbox', {valueName: 'checked'})}>打印发货单：</Checkbox>);
        let selected_order_arr = [];
        ItemsSelected_arr.map((value,index)=>{
            if(value){
                selected_order_arr.push(orderData[index]);
            }
        });
        let defaultMould = "";
        let printMould = JSON.parse(localStorage.getItem("printModal"+user_nick));
        let printMould_pri = printMould.private.map((value,index)=>{
            if(index == 0){
                defaultMould = "private;"+value.mouldname;
            }
            return (<Option value={"private;"+value.mouldname}>{value.mouldname}</Option>);
        });/*个人*/
        let printMould_pub = printMould.public.map((value)=>{
            if(defaultMould == ""){
                defaultMould = "public;"+value.mouldname;
            }
            return (<Option value={"public;"+value.mouldname}>{value.mouldname}</Option>);
        });/*公共*/
        let efModal_arr = JSON.parse(localStorage.getItem("efModal"+user_nick));
        let efModal_items = efModal_arr.map((value)=>{
            return (<Option value={"efModal;"+value.modal_name}>{value.modal_name}</Option>);
        });/*电子面单模板*/
        let printer_arr = [(<Option value={0}>实达</Option>)];
        // let LODOP = getLodop();
        // let iPrinterCount=LODOP.GET_PRINTER_COUNT();
        // for(let i=0;i<iPrinterCount;i++){
        //     let printer_item = (<Option value={i}>{LODOP.GET_PRINTER_NAME(i)}</Option>);
        //     printer_arr.push(printer_item);
        // };
        return(
            <span>
                <Button type={type} onClick = {()=>{this.showDialog(onOpen)}} style={{marginRight:"10px"}}>
                    <span>{text}</span>
                </Button>
               <Dialog visible = {visible}
                       onOk = {onClose}
                       onCancel = {onClose}
                       onClose = {onClose} footer = {(<font></font>)} title = "批量打印" style = {{width:"800px",minHeight:"540px",overflow: "hidden"}}>
                        <Form direction="ver">
                            <div className="PrintDiaglog_div">
                               <Row style={{marginTop:"20px"}}>
                                    <Col style={{padingTop:"10px"}}>
                                        <FormItem {...formItemLayout}
                                            label={PrintKdd}
                                            >
                                            <Select style={{ width: 200 }}
                                                {...init('kddModal',{initValue:defaultMould})}>
                                                <OptionGroup label="个人模板">
                                                    {printMould_pri}
                                               </OptionGroup>
                                               <OptionGroup label="公共模板">
                                                    {printMould_pub}
                                               </OptionGroup>
                                               <OptionGroup label="电子面单模板">
                                                    {efModal_items}
                                               </OptionGroup>
                                            </Select>
                                        </FormItem>
                                        <FormItem {...formItemLayout}
                                            label={PrintFhd}
                                            >
                                            <Select style={{ width: 200 }}
                                                {...init('fhdModal',{initValue:'发货单模板'})}>
                                                <Option value="发货单模板">发货单模板</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem {...formItemLayout}
                                            label={(<font style={{color:"#333"}}>快递起始单号：</font>)}
                                            >
                                            <Input style={{ width: 200 }} placeholder="请输入快递单起始单号" {...init('kddNumber')}/>
                                        </FormItem>
                                    </Col>
                                    <Col style={{padingTop:"10px"}}>
                                        <FormItem {...formItemLayout}
                                            label={(<font style={{color:"#333"}}>快递单打印机：</font>)}

                                            >
                                            <Select style={{ width: 200 }}
                                                {...init('kddPrintRobot',{initValue:'0'})}>
                                                {printer_arr}
                                            </Select>
                                        </FormItem>
                                        <FormItem {...formItemLayout}
                                            label={(<font style={{color:"#333"}}>发货单打印机：</font>)}

                                            >
                                            <Select style={{ width: 200 }}
                                                {...init('fhdPrintRobot',{initValue:'0'})}>
                                                {printer_arr}
                                            </Select>
                                        </FormItem>
                                        <FormItem {...formItemLayout}
                                            label={(<font style={{color:"#333"}}>选择批次数量：</font>)}

                                            >
                                            <Select style={{ width: 200 }} onChange={onSelect} value={pageSize}>
                                                <Option value="20">每批次20单</Option>
                                                <Option value="40">每批次40单</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                        <PrintDialogModal getFromValues={()=>{
                            return this.field.getValues();
                        }} pageSize={pageSize} dataSource={selected_order_arr}/>
               </Dialog>
         </span>
        )
    }
}
function mapStateToProps(state, ownProps){
    return {
        visible:state.PrintDialog.visible,
        pageSize:state.PrintDialog.pageSize,
        ItemsSelected_arr:state.WaitPrintOrderTable.ItemsSelected_arr,
        orderData:state.WaitPrintOrderTable.orderData
    }
}

function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(PrintDialogActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintDialog)
