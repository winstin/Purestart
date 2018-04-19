import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import {api} from '../../../actions/AY_API'
import Table from 'qnui/lib/table'
import Dialog from 'qnui/lib/dialog'
import Checkbox from 'qnui/lib/checkbox'
import Input from 'qnui/lib/input'
import Button from 'qnui/lib/button'
import * as ElecFaceModalAction from '../../../actions/ElecFaceModal'
import getUUID from '../../../../static/getUUID'

class ElecFaceModal extends Component {
    /**
     * 切换显示的模板
     */
    changeModal(type){
        const {getEFModalByType} = this.props;
        getEFModalByType(type);
    }

    saveModalContent(){
        const {showModalContent,saveElecFaceModal} = this.props;
        let item_str = "";
        Object.keys(showModalContent.zdy_content).map((value)=>{
            if(showModalContent.zdy_content[value]){
                item_str += "," + value;
            }
        });

        let modal_content_arr = showModalContent.modal_content.split(",");

        let contentToSave = {
            modal_content:modal_content_arr[0] + "," + modal_content_arr[1] + item_str,
            modal_cp_name:showModalContent.modal_cp_name,
            modal_name:showModalContent.modal_name
        };
        saveElecFaceModal(contentToSave);
    }

    componentDidMount(){
        const {getEFModalByType} = this.props;
        getEFModalByType("private");
    }

    setDefaultModal(record,modalType){
        const {publicSetDefault,privateSetDefault} = this.props;
        let condition = {};
        if(modalType == "private"){
            condition = {
                modal_name:record.modal_name
            };
            privateSetDefault(condition);
        }else {
            condition = {
                modal_name:record.modal_cp_name + "自定义模板",
                modal_cp_name:record.modal_cp_name,
                modal_content:record.modal_content
            };
            publicSetDefault(condition);
        }
    }
    /**
     * modalType:"private",显示类型
     * modalData:[],显示数据
     * isEditShow:false,编辑是否显示
     * showModalContent:{}编辑显示内容
     */
    render(){
        const { modalType, modalData, isEditShow, setEditShow, showModalContent, getModalContent, setZdyItem, changeModalName } = this.props;
        console.log(modalData);
        let dialogTitle = modalType == "private"?"编辑模板":"生成个人模板";
        let dialogSure = modalType == "private"?"保存":"生成个人模板";
        let private_color = "#333333";
        let public_color = "#333333";
        if(modalType == "private"){
            private_color = "#2192d9";
        }else {
            public_color = "#2192d9";
        }

        let efmDate_checked = false; /*打单日期*/
        let efmNum_checked = false; /*商品总数*/
        let efmTid_checked = false; /*订单号*/
        let efmAttr_checked = false; /*货号+属性*/
        let efmShortAndAttr_checked = false; /*商品简称+属性*/
        let efmRemark_checked = false; /*备注*/

        let efmDate_html = ""; /*打单日期*/
        let efmNum_html = ""; /*商品总数*/
        let efmTid_html = ""; /*订单号*/
        let efmAttr_html = ""; /*货号+属性*/
        let efmShortAndAttr_html = ""; /*商品简称+属性*/
        let efmRemark_html = ""; /*备注*/

        if(showModalContent.zdy_content != undefined){
            if(showModalContent.zdy_content.efmDate == true){
                efmDate_checked = true;
                efmDate_html = (<span style={{marginRight: "10px"}}>
                    2016-XX-XX XX:XX:XX
                </span>);
            }

            if(showModalContent.zdy_content.efmNum == true){
                efmNum_checked = true;
                efmNum_html = (<span style={{marginRight: "10px"}}>
                    共XX件
                </span>);
            }

            if(showModalContent.zdy_content.efmTid == true){
                efmTid_checked = true;
                efmTid_html = (<span style={{marginRight: "10px"}}>
                    订单号
                </span>);
            }

            if(showModalContent.zdy_content.efmAttr == true){
                efmAttr_checked = true;
                efmAttr_html = (<div>
                    货号+属性 货号+属性 货号+属性 货号+属性 ......
                </div>);
            }

            if(showModalContent.zdy_content.efmShortAndAttr == true){
                efmShortAndAttr_checked = true;
                efmShortAndAttr_html = (<div>
                    商品简称+属性 商品简称+属性 ......
                </div>);
            }

            if(showModalContent.zdy_content.efmRemark == true){
                efmRemark_checked = true;
                efmRemark_html = (<div>
                    备注
                </div>);
            }
        }

        return (
            <div style={{height: "100%"}}>
                <div>
                    <a style={{color:private_color}} href="javascript:void(0);" onClick={()=>{this.changeModal("private")}}>个人快递单模板</a>&nbsp;&nbsp;/&nbsp;&nbsp;
                    <a style={{color:public_color}} href="javascript:void(0);" onClick={()=>{this.changeModal("public")}}>公共快递单模板</a>
                </div>
                <Table className="print-modal-table" hasBorder={false} dataSource={modalData}>
                    <Table.Column title="序号" width={70} cell={(value, index)=>{
                        return index+1;
                    }}/>
                    <Table.Column title="模板名称" dataIndex="modal_name" />
                    <Table.Column title="快递公司" dataIndex="modal_cp_name"/>
                    <Table.Column title="操作" cell={(value, index, record)=>{
                        let setMould = (<a href="javascript:void(0);" onClick={()=>{this.setDefaultModal(record,modalType);}} style={{marginRight:"10px",color:"#2192d9"}}>设为默认</a>);
                        if(modalType == "private"){
                            if(record.default_modal == 1){
                                setMould = (<a href="javascript:void(0);" style={{marginRight:"10px",color:"#333333"}}>默认模板</a>);
                            }
                        }
                        return (
                            <div>
                                {setMould}
                                <a href="javascript:void(0);" onClick={()=>{getModalContent(record,modalType);}} style={{marginRight:"10px",color:"#2192d9"}}>编辑模板</a>
                            </div>
                        );
                    }}/>
                </Table>

                <Dialog style={{width:"600px",height:"630px"}} visible = {isEditShow}
                    onOk = {()=>{}}
                    onCancel = {()=>{setEditShow(false);}}
                    onClose = {()=>{setEditShow(false);}}
                    title = {<span>{dialogTitle}</span>}
                    footer = {
                        <div>
                            <Button type="normal" component="a" onClick={()=>{setEditShow(false);}} target="_blank">取消</Button>
                            <Button type="primary" component="a" onClick={this.saveModalContent.bind(this)} target="_blank">{dialogSure}</Button>
                        </div>
                    }>

                    <div style={{width:"500px",height:"500px",margin:"0 auto"}}>
                        <div style={{width:"200px",height:"100%",float:"left"}}>
                            <span>模版名称：</span>
                            <Input onChange={(value)=>{
                                changeModalName(value,showModalContent);
                            }} value={showModalContent.modal_name} style={{width:"180px"}}/><br/><br/>
                            <Checkbox key={`efm_efmDate_${efmDate_checked}`} defaultChecked={efmDate_checked} onChange={(value)=>{setZdyItem("efmDate",value,showModalContent);}}>打单日期</Checkbox><br/>
                            <Checkbox key={`efm_efmNum_${efmNum_checked}`} defaultChecked={efmNum_checked} onChange={(value)=>{setZdyItem("efmNum",value,showModalContent);}}>商品总数</Checkbox><br/>
                            <Checkbox key={`efm_efmTid_${efmTid_checked}`} defaultChecked={efmTid_checked} onChange={(value)=>{setZdyItem("efmTid",value,showModalContent);}}>订单号</Checkbox><br/>
                            <Checkbox key={`efm_efmAttr_${efmAttr_checked}`} defaultChecked={efmAttr_checked} onChange={(value)=>{setZdyItem("efmAttr",value,showModalContent);}}>货号+属性</Checkbox><br/>
                            <Checkbox key={`efm_efmShortAndAttr_${efmShortAndAttr_checked}`} defaultChecked={efmShortAndAttr_checked} onChange={(value)=>{setZdyItem("efmShortAndAttr",value,showModalContent);}}>商品简称+属性</Checkbox><br/>
                            <Checkbox key={`efm_efmRemark_${efmRemark_checked}`} defaultChecked={efmRemark_checked} onChange={(value)=>{setZdyItem("efmRemark",value,showModalContent);}}>备注</Checkbox><br/>
                        </div>
                        <div style={{width:"300px",height:"100%",float:"left",position:"relative"}}>
                            <div style={{width: "272px",height: "381px",position: "absolute",backgroundColor: "#000000",opacity: "0.7",top: "1px",left: "1px"}}>
                                <span style={{color: "white",fontSize: "35px",display: "block",marginTop: "57%",textAlign: "center"}}>非自定义区域</span>
                            </div>
                            <div style={{position: "absolute",top: "382px",left: "1px",height: "110px",width: "272px"}}>
                                <div>
                                    {efmDate_html}
                                    {efmNum_html}
                                    {efmTid_html}
                                    {efmAttr_html}
                                    {efmShortAndAttr_html}
                                    {efmRemark_html}
                                </div>

                            </div>
                            <img style={{height:"490px",borderWidth: "1px",borderStyle: "dotted"}} src={showModalContent.previewImage}/>
                        </div>
                    </div>

                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        modalType:state.ElecFaceModal.modalType,
        modalData:state.ElecFaceModal.modalData,
        isEditShow:state.ElecFaceModal.isEditShow,
        showModalContent:state.ElecFaceModal.showModalContent
    }
}

function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(ElecFaceModalAction, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ElecFaceModal)
