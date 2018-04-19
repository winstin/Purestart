import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Button from 'qnui/lib/button';
import Feedback from 'qnui/lib/feedback';
import Radio, { Group as RadioGroup } from 'qnui/lib/radio';
import Table from 'qnui/lib/table';
import Dialog from 'qnui/lib/dialog';
import Input from 'qnui/lib/input';

import './EvaSettings.css';

import {ajax} from "../../../../actions/AY_API"
import * as AutoAction from "../../../../actions/AutoEva"

const onRowClick = function(record, index, e){
    console.log(record, index, e);
  };
const Toast = Feedback.toast

class EvaSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            addEvaVisible: false,
            delEvaVisible: false,
            editEvaVisible: false,
            editId: undefined
        }

    }

    closeAddEvaDialog(){
        this.setState({
          addEvaVisible: false
        })
    }
    closeDelEvaDialog(){
        this.setState({
          delEvaVisible: false,
          editId: undefined
        })
    }
    closeEditEvaDialog(){
        this.setState({
          editEvaVisible: false,
          editId: undefined
        })
    }
    openAddEvaDialog(){
        this.setState({
            addEvaVisible: true
        })
    }
    openDelEvaDialog = (id) => {
        console.log("delete");
        console.log(id);
        console.log(this);
        this.setState({
            delEvaVisible: true,
            editId: id
        })
    }
    openEditEvaDialog = (id) => {
        console.log("edit");
        console.log(id);
        console.log(this);
        this.setState({
            editEvaVisible: true,
            editId: id
        })
    }
    saveEva(){
        let t = /([a-zA-z]+:\/\/[^\s]*|[t,T][a,A][o,O][b,B][a,A][o,O]|.[c,C][o,O][m,M]|.[c,C][n,N]|.[n,N][e,E][t,T])/;
        let text = this.refs.evaInput.state.value;
        let self = this;
        if(text==''){
            Toast.error({
                content: '评价内容不能为空',
                duration: 2000,
                hasMask: true
            });
        }else if(text.length>=500){
            Toast.error({
                content: '评价内容不能超过500字',
                duration: 2000,
                hasMask: true
            });
        }else if(t.test(text)){
            Toast.error({
                content: '添加失败！回评内容中不能包含链接地址！',
                duration: 2000,
                hasMask: true
            });
        }else{
            if (self.props.dataSource.ratetexts.length >= 10) {
                Toast.error({
                    content: '回评短语只能填写10条，请您编辑其他不常用的短语哦~',
                    duration: 2000,
                    hasMask: true
                });
                return;
            }
            ajax("/iytrade2/add",{content: text},"POST",function(e){
                if(e=='fail'){
                    Toast.error({
                        content: '亲，您本次登陆失效或操作超时，为了安全，请先关闭插件，重新打开再操作。',
                        duration: 2000,
                        hasMask: true
                    });
                    return;
                }
                Toast.success({
                    content: '保存成功',
                    duration: 2000,
                    hasMask: true
                });
                // let data = self.props.dataSource;
                // data.ratetexts.push({content: text});
                // data.ratetexts = [{content: text}, ...data.ratetexts];
                // addEva(data)
                const {getInitData} = self.props;
                getInitData()
                self.closeAddEvaDialog();
            });
        }
    }
    delEva(){
        console.log('delete');
        let self = this;
        ajax("/iytrade2/del",{yooz:this.state.editId},"POST",function(e){
            if(e=='fail'){
                Toast.error({
                    content: '亲，您本次登陆失效或操作超时，为了安全，请先关闭插件，重新打开再操作。',
                    duration: 2000,
                    hasMask: true
                });
                return;
            }
            Toast.success({
                content: '删除成功',
                duration: 2000,
                hasMask: true
            });
            const {getInitData} = self.props;
            getInitData();
            self.closeDelEvaDialog();
        });
    }
    editEva(){
        console.log('edit');
        let t = /([a-zA-z]+:\/\/[^\s]*|[t,T][a,A][o,O][b,B][a,A][o,O]|.[c,C][o,O][m,M]|.[c,C][n,N]|.[n,N][e,E][t,T])/;
        let text = this.refs.evaInput.state.value;
        let self = this;
        if(text==''){
            Toast.error({
                content: '评价内容不能为空',
                duration: 2000,
                hasMask: true
            });
        }else if(text.length>=500){
            Toast.error({
                content: '评价内容不能超过500字',
                duration: 2000,
                hasMask: true
            });
        }else if(t.test(text)){
            Toast.error({
                content: '添加失败！回评内容中不能包含链接地址！',
                duration: 2000,
                hasMask: true
            });
        }else{
            ajax("/iytrade2/up",{yooz:this.state.editId, content:text},"POST",function(e){
                if(e=='fail'){
                    Toast.error({
                        content: '亲，您本次登陆失效或操作超时，为了安全，请先关闭插件，重新打开再操作。',
                        duration: 2000,
                        hasMask: true
                    });
                    return;
                }
                Toast.success({
                    content: '修改成功',
                    duration: 2000,
                    hasMask: true
                });
                const {getInitData} = self.props;
                getInitData();
                self.closeEditEvaDialog();
            });
        }

    }
    render(){
        let ratetexts = this.props.dataSource.ratetexts
        const renderOper = (value, index, record) => {
            return <div className="table-button-cell"><Button onClick={this.openEditEvaDialog.bind(this, record.id)} type="secondary" size="small">编辑</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button type="normal" size="small" onClick={this.openDelEvaDialog.bind(this, record.id)}>删除</Button></div>;
        }
        const addEvaDialogTitle = <b>添加回评短语</b>;
        const delEvaDialogTitle = <b>温馨提示</b>;
        const editEvaDialogTitle = <b>编辑回评短语</b>;
        return(
            <div className="evaSettings">
                <div className="table-head">
                    <b className="table-head-text">回评短语设置(自动评价时随机显示下面评价内容)：</b>
                    <div className="table-head-button">
                        <Button type="primary" onClick={this.openAddEvaDialog.bind(this)}>添加拦截规则</Button>
                    </div>
                </div>
                <Table dataSource={ratetexts} onRowClick={onRowClick} hasHeader={false}>
                    <Table.Column dataIndex="content"/>
                    <Table.Column cell={renderOper} width="20%"/>
                </Table>
                <Dialog visible = {this.state.addEvaVisible}
                        onOk = {this.saveEva.bind(this)}
                        onCancel = {this.closeAddEvaDialog.bind(this)}
                        onClose = {this.closeAddEvaDialog.bind(this)}
                        title = {addEvaDialogTitle}
                        style = {{width:'500px'}}
                        align = "cc cc"
                        >
                        <div style={{marginBottom:"10px"}}>请输入评价内容：</div>
                        <Input multiple style={{width:'100%'}} ref = 'evaInput'/>
                </Dialog>
                <Dialog visible = {this.state.delEvaVisible}
                        onOk = {this.delEva.bind(this)}
                        onCancel = {this.closeDelEvaDialog.bind(this)}
                        onClose = {this.closeDelEvaDialog.bind(this)}
                        title = {delEvaDialogTitle}
                        style = {{width:'500px'}}
                        align = "cc cc"
                        >
                  <div style={{marginBottom:"10px"}}>你确定要删除这条评价内容吗？</div>
                </Dialog>
                <Dialog visible = {this.state.editEvaVisible}
                        onOk = {this.editEva.bind(this)}
                        onCancel = {this.closeEditEvaDialog.bind(this)}
                        onClose = {this.closeEditEvaDialog.bind(this)}
                        title = {editEvaDialogTitle}
                        style = {{width:'500px'}}
                        align = "cc cc"
                        >
                        <div style={{marginBottom:"10px"}}>请输入重新编辑的评价内容：</div>
                        <Input multiple style={{width:'100%'}} ref = 'evaInput'/>
                </Dialog>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps){
    return {
        dataSource:state.AutoEva.dataSource
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( AutoAction , dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(EvaSettings)
