import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Dialog from 'qnui/lib/dialog';
import Button from 'qnui/lib/button';
import MatchDialog from './MatchDialog';
import * as MatchTableActions from '../../../../actions/MatchTable'


class MatchTable extends React.Component{
    save(checked){
        const {createLogistics,message,createMatchOpen} = this.props;
        let num = message.length;
        message[num]={
            placeArr:"",
            usevalue:"开启",
            wuliuArr:checked
        }
        createLogistics();
        createMatchOpen(false)
    }
    render() {
        const {dataSource,setModal,editModal,createMatch,createMatchOpen,saveMessage,isupdate} = this.props
        return (
            <div>
                <h2 style={{textAlign:'center',color:'#FF660A'}}>设置自动匹配物流，根据订单收件地址自动匹配物流公司</h2>
                <Button  type="primary" onClick={()=>{createMatchOpen(true)}}>新建匹配模板</Button>
                <table >
                    <tr>
                        <th className="sppp-td" >
                        <span >目的地</span>
                        <span >物流公司</span>
                        <span >运单模版</span>
                        <span >操作</span>
                        </th>
                    </tr>
                    {
                        dataSource.map(
                            function(index){
                                    return(
                                        <tr >
                                        <td className="sppp-td">
                                            <span >{index.placeArr}</span>
                                            <span >{index.wuliuArr}</span>
                                            <span >{index.wuliuArr}</span>
                                            <span >
                                                <a onClick={() => {editModal(index.id)}}>编辑</a>
                                                <a style={{marginLeft:"1rem"}} onClick={() => {setModal(index.id)}}>设置运费模版</a>
                                                <a key={"usevalue"+isupdate+index.id} style={{marginLeft:"1rem"}} onClick={() => {saveMessage(index.id,index.usevalue)}}>{index.usevalue}</a>
                                            </span>
                                        </td>
                                        </tr>
                                    );
                            }
                        )
                    }
                </table>
                <MatchDialog visible = {createMatch}
                        onOk = {this.save.bind(this)}
                        onCancel = {()=>{createMatchOpen(false)}}
                        onClose = {()=>{createMatchOpen(false)}}
                        wuliustr = "中国邮政小包"
                        style = {{width:"80%",height:"50%"}} title = "添加新物流" id="createMatch" />
            </div>
        );
    }
}
function mapStateToProps(state, ownProps){
    return {
        message:state.LogisticsMatch.message,
        createMatch:state.MatchTable.createMatch,
        isupdate:state.LogisticsMatch.isupdate
    }
}
function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(MatchTableActions, dispatch) //把state方法绑定到props
}

export default connect(mapStateToProps,mapDispatchToProps)(MatchTable)
