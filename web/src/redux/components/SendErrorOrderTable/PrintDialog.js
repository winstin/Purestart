import Dialog from 'qnui/lib/dialog';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react';
import Button from 'qnui/lib/button';
import Checkbox from 'qnui/lib/checkbox';
import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import Select from 'qnui/lib/select';
import {Row, Col} from 'qnui/lib/grid';
import Field from 'qnui/lib/field'; //在需要校验、获取多个表单数据的时候使用，可以提高数据获取效率。
import * as PrintDialogActions from '../../actions/PrintDialog'
import './PrintDialog.css'
const FormItem = Form.Item;
import PrintDialogModal from './Modal/PrintDialogModal'

class PrintDialog extends Component {
    constructor() {
        super();
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

    field = new Field(this);
    render(){
        const init = this.field.init; //如果使用简写不能缺少bind
        const {text, type, visible, pageSize, onClose,onOpen,onSelect} = this.props;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16}
        };
        const PrintKdd = (<Checkbox {...init('kddCheckbox', {valueName: 'checked'})}>打印物流单：</Checkbox>);
        const PrintFhd = (<Checkbox {...init('fhdCheckbox', {valueName: 'checked'})}>打印发货单：</Checkbox>);

            console.log(pageSize);
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
                                                {...init('kddModal',{initValue:'中通快递单'})}>
                                                <Option value="中通快递单">中通快递单</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem {...formItemLayout}
                                            label={PrintFhd}
                                            >
                                            <Select style={{ width: 200 }}
                                                {...init('fhdModal',{initValue:'发货单模板001'})}>
                                                <Option value="发货单模板001">发货单模板001</Option>
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
                                                {...init('kddPrintRobot',{initValue:'FX'})}>
                                                <Option value="FX">FX</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem {...formItemLayout}
                                            label={(<font style={{color:"#333"}}>发货单打印机：</font>)}

                                            >
                                            <Select style={{ width: 200 }}
                                                {...init('fhdPrintRobot',{initValue:'实达610K'})}>
                                                <Option value="实达610K">实达610K</Option>
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
                        <PrintDialogModal  pageSize={pageSize} total={78}/>
               </Dialog>
         </span>
        )
    }
}
function mapStateToProps(state, ownProps){
    return {
        visible:state.PrintDialog.visible,
        pageSize:state.PrintDialog.pageSize
    }
}

function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(PrintDialogActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintDialog)
