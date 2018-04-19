import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from 'qnui/lib/button';
import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import Checkbox from 'qnui/lib/checkbox';
import Select, {Option} from 'qnui/lib/select';
import Icon from 'qnui/lib/icon';
import { Row, Col } from 'qnui/lib/grid';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Table from 'qnui/lib/table';
import Pagination from 'qnui/lib/pagination';
import Search from 'qnui/lib/search';
import Radio from 'qnui/lib/radio';
import {ajax} from "../../../actions/AY_API";
import Dialog from 'qnui/lib/dialog';
import Feedback from 'qnui/lib/feedback';

import * as ReceiverInterceptActions from '../../../actions/ReceiverIntercept'

const Toast = Feedback.toast

const onRowClick = function(record, index, e){
    console.log(record, index, e);
}

class ReceiverIntercept extends Component {

      componentDidMount(){
        this.props.getReceiverlist({
           'buyernicklist':'',
            'optime':'',
            'reason':'',
            'page_num':1
        }); 
    }

	constructor(props){
        super(props);
        this.state = {
          value: '',
          delRevVisible:false,
          recId:''
        };
        this.pageReceiverChange(1);
    }
   
   onChange(value) {

        console.log('input is:' + value);

        this.setState({
            value: value
        });
    }

   onSearch(value) {
        console.log(value);
    }
  
    pageReceiverChange(value){/*翻页*/
        const {getReceiverlist} = this.props;
        getReceiverlist({
            'pic_url':'',
            'num_iid':'',
            'title':'',
            'page_num':value
        });
    }
    /*是否删除弹框*/
    openDelReceiverDialog = (id) => {
        console.log("edit");
        console.log(id);
        console.log(this);
        this.setState({
            delRevVisible: true,
            recId: id
        })
    }
    /*关闭删除弹框*/
    closeDelReceiverDialog(){
        this.setState({
          delRevVisible: false,
          recId:''
        })
    }

    render(){
        let self=this;
         const { orderData, total,sum,page} = this.props;
         const pageReceiverChange=function(value){
              self.pageReceiverChange(value)
         }
         console.log("--------------total-变不变")
         console.log(total)
    	 const renderOper = (value, index, record) => {
            return <a onClick={this.openDelReceiverDialog.bind(this, record.id)}  style={{color:'#4990E2'}}>删除</a>;
        }
         const ReceiverDialogTitle = <b>温馨提示</b>;
        return ( 
          <div>
          	<Row style={{marginLeft:'-12px'}}>
	           <span style={{paddingTop:'5px'}}>收件人姓名:</span>&nbsp;&nbsp;&nbsp;&nbsp;
	           <Input placeholder="请输入收件人姓名" />&nbsp;&nbsp;&nbsp;&nbsp;
	           <span style={{paddingTop:'5px'}}>收件人电话:</span>&nbsp;&nbsp;&nbsp;&nbsp;
	           <Input placeholder="请输入收件人固定电话"/>&nbsp;&nbsp;&nbsp;&nbsp;  
	           <span style={{paddingTop:'5px'}}>收件人手机:</span>&nbsp;&nbsp;&nbsp;&nbsp;
	           <Input placeholder="请输入收件人手机号" />&nbsp;&nbsp;&nbsp;&nbsp;
	           <span style={{paddingTop:'5px'}}>收件人地址:</span>&nbsp;&nbsp;&nbsp;&nbsp;
	           <Input placeholder="请输入收件人地址" style={{ width:'25%'}}/>  
	        </Row>
	        <Row style={{marginLeft:'-12px',marginTop:'10px'}}>
	           <Radio id="one" value='one'/><label htmlFor='one'>符合任一拦截项时拦截</label>&nbsp;&nbsp;&nbsp;&nbsp;{/*通过state来控制value使得单选*/}
	           <Radio id="all" value='one'/><label htmlFor='all'>符合所有拦截项时拦截</label>{/*通过state来控制value使得单选*/}
	        </Row>
            <Row style={{marginTop:'10px',marginLeft:'-12px'}}>
                <select style={{borderColor:'#3189DD',borderWidth:'2px',borderRightStyle:'none',width:'80px'}}>
                    <option value='default'>省</option>
                    <option value='beijing'>北京市</option>
                    <option value='tianjin'>天津市</option>
                    <option value='shanghai'>上海市</option>
                    <option value='chongqing'>重庆市</option>
                    <option value='hebei'>河北省</option>
                    <option value='henan'>河南省</option>
                    <option value='yunnan'>云南省</option>
                    <option value='liaoning'>辽宁省</option>
                    <option value='heilongj'>黑龙江省</option>
                    <option value='hunan'>湖南省</option>
                    <option value='anhui'>安徽省</option>
                    <option value='shandong'>山东省</option>
                    <option value='xinjiang'>新疆维吾尔</option>
                    <option value='jiangsu'>江苏省</option>
                    <option value='zhejiang'>浙江省</option>
                    <option value='jiangxi'>江西省</option>
                    <option value='hubei'>湖北省</option>
                    <option value='guangxi'>广西壮族</option>
                    <option value='gansu'>甘肃省</option>
                    <option value='shanxi'>山西省</option>
                    <option value='neimeng'>内蒙古</option>
                    <option value='shanxi'>陕西省</option>
                    <option value='jilin'>吉林省</option>
                    <option value='fujian'>福建省</option>
                    <option value='guizhou'>贵州省</option>
                    <option value='guangdong'>广东省</option>
                    <option value='qinghai'>青海省</option>
                    <option value='xizang'>西藏</option>
                    <option value='sichuan'>四川省</option>
                    <option value='ningxia'>宁夏回族</option>
                    <option value='hainan'>海南省</option>
                    <option value='taiwan'>台湾省</option>
                    <option value='xianggang'>香港特别行政区</option>
                    <option value='aomen'>澳门特别行政区</option>
                </select>
                <Search onSearch={this.onSearch.bind(this)} onChange={this.onChange.bind(this)} dataSource={this.state.dataSource} inputWidth="250px" searchText='搜索'  placeholder='请输入你要搜索的内容'/>	 
            </Row>
	        <div style={{marginTop:'10px'}}>
	             <Table dataSource={orderData} onRowClick={onRowClick}>
	                  <Table.Column title="姓名" dataIndex="bname"/>
	                  <Table.Column title="手机" dataIndex="phone"/>
	                  <Table.Column title="电话" dataIndex="tell"/>
	                  <Table.Column title="地址" dataIndex="addr"/>
	                  <Table.Column title="拦截方式" dataIndex="rule"/>
	                  <Table.Column title="添加时间" dataIndex="optime"/>
	                  <Table.Column title="操作" cell={renderOper} width="20%"/>
	              </Table>
	        </div>
             <Dialog visible = {this.state.delRevVisible}
                onOk = {this.onRemove.bind(this)}
                onCancel = {this.closeDelReceiverDialog.bind(this)}
                onClose = {this.closeDelReceiverDialog.bind(this)}
                title = {ReceiverDialogTitle}
                style = {{width:'500px'}}
            >
              <div style={{marginBottom:"10px"}}>你确定要删除这条拦截记录吗？</div>
            </Dialog>
	        <div style={{marginTop:'15px',float:'right'}}>
	                  <Pagination onChange={pageReceiverChange} pageSizeSelector={false} pageSize={20} total={total}/>,
	        </div>
          </div>
        )
    }

    onRemove(){
        let self=this;
        ajax("/iytrade2/delblackbynick",{nicks:self.state.recId,type:'con'},"POST",function(e){
            console.log("BlackList", e);
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
            self.props.getReceiverlist({
                   'buyernicklist':'',
                    'optime':'',
                    'reason':'',
                    'page_num':1
                });
            self.closeDelReceiverDialog();
        });
    }
}

function mapStateToProps(state, ownProps){
    return {
        orderData:state.ReceiverIntercept.orderData,
        total:state.ReceiverIntercept.total,
        page:state.ReceiverIntercept.page
    }
}
function mapDispatchToProps(dispatch,ownProps){
  return bindActionCreators(ReceiverInterceptActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverIntercept)

