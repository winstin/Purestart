import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Tab from 'qnui/lib/tab';
import Form from 'qnui/lib/form';
import Radio from 'qnui/lib/radio';
import Button from 'qnui/lib/button';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import moment from 'qnui/lib/moment';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Icon from 'qnui/lib/icon';
import Table from 'qnui/lib/table';
import Pagination from 'qnui/lib/pagination';
import Search from 'qnui/lib/search';
import Dialog from 'qnui/lib/dialog';
import Feedback from 'qnui/lib/feedback';
import {ajax} from "../../../actions/AY_API";

import * as WangBlacklistActions from '../../../actions/WangBlacklist'

const Toast = Feedback.toast
const onRowClick = function(record, index, e){
    console.log(record, index, e);
  },
  getData = () => { 
    let result = [];
    for(let i = 0; i< 5; i++){
      result.push({
          title:{
            name: `Quotation for 1PCS Nano ${3+i}.0 controller compatible`,
            },
          id:100306660940+i,
          time: 2000 + i
        })
    }
    return result;
};

const change = function(value) {
    console.log(value);
};




class WangBlacklist extends Component{
   
   
   componentDidMount(){
        this.props.wangblacklist({
           'buyernicklist':'',
            'optime':'',
            'reason':'',
            'page_sum':1,
            'search_value':'',

        }); 
        console.log("------componentDidMount---------")
        console.log(window.user_nick)
    }
    
    constructor(props){
        super(props);
        this.state = {
          isShow: false,
          value: '',
          delRevVisible:false,
          recId:''
        };
        this.getWangBlackList(1);
    }
   
    onSearch(search_value){/*搜索*/
        this.props.wangblacklist({
            ...this.props.selectCondition,
            search_value
        })
    }

    makeDialogShow = () => {
        this.setState({isShow:true});
    }

    makeDialogHide = () => {
        this.setState({isShow:false});
    }

     /*是否删除弹框*/
    openDelWangBlackDialog = (id) => {
        console.log("edit");
        console.log(id);
        console.log(this);
        this.setState({
            delRevVisible: true,
            recId: id
        })
    }
    /*关闭删除弹框*/
    closeDelWangBlackDialog(){
        this.setState({
          delRevVisible: false,
          recId:''
        })
    }

	

    /*获取旺旺黑名单*/
    getWangBlackList(pageNo){
        console.log("进来了");
        console.log(pageNo);
        const {wangblacklist} = this.props;
        wangblacklist({
            'buyernicklist':'',
            'optime':'',
            'reason':'',
            'page_num':pageNo
        });
    }

    render(){
      let self=this;
        console.log("-------获取旺旺黑名单--------")
        const wangBlockChange = function(value) {
            console.log(value);
            self.getWangBlackList(value);
        };
        const { orderData, total,sum,page,selectCondition} = this.props;
        console.log("--------wangblacklist******************-")
        console.log(selectCondition);

        const WangBlackDialogTitle = <b>温馨提示</b>;
        const renderOper = (value, index, record) => {
            
            return <a onClick={this.openDelWangBlackDialog.bind(this, record.id)}  style={{color:'#4990E2'}}>删除({record.id})</a>;
        }

        return (  
        	    <div>
        	    	<Row style={{marginLeft:'-12px'}}>
                  <Search type="normal" searchText='' placeholder="请输入买家旺旺" onSearch={(value)=>{this.onSearch(value.key);}}/>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{paddingTop:'5px'}}>拉黑时间：</span>
                  <RangePicker />&nbsp;&nbsp;&nbsp;&nbsp; 
                  <Button type="primary">搜索</Button> &nbsp;&nbsp; 
                  <Button type="primary" onClick={this.makeDialogShow}>添加黑名单</Button>       
                </Row>
                <Dialog style={{width:"800px"}} visible = {this.state.isShow}
                    onOk = {()=>{}}
                    onCancel = {this.makeDialogHide}
                    onClose = {this.makeDialogHide}
                    title = {<span style={{fontWeight:'700',fontSize:'16px'}}>添加黑名单</span>}
                    >
                  <div>
                     <div style={{height:'30px',backgroundColor:'#FEF1E8',marginTop:'10px',paddingTop:'8px'}}>
                       &nbsp;&nbsp;<Icon  style={{color:'orange'}} type="warning" size="xs"/>&nbsp;&nbsp;  
                       <span>1.拉黑后的买家再次购买将会自动关闭他的订单 2.每次最多拉黑10名买家</span>
                     </div>
                     <div style={{marginTop:'20px'}}>
                       <span  style={{fontWeight:'600'}}>输入要拉黑的买家旺旺</span><br/>
                       <Input multiple placeholder="支持同时拉黑多个旺旺，一行一个" style={{width:'100%',marginTop:'10px'}}/>
                     </div>
                    <div style={{marginTop:'20px'}}>
                       <span  style={{fontWeight:'600'}}>请输入拉黑原因(卖家可见)</span><br/>
                       <Input placeholder="输入拉黑原因，比如'他是差评师'，最多20个字符。" style={{width:'100%',marginTop:'10px'}}/>
                    </div>
                  </div>
                </Dialog>
                <Dialog visible = {this.state.delRevVisible}
                  onOk = {this.onRemove.bind(this)}
                  onCancel = {this.closeDelWangBlackDialog.bind(this)}
                  onClose = {this.closeDelWangBlackDialog.bind(this)}
                  title = {WangBlackDialogTitle}
                  style = {{width:'500px'}}
              >
                <div style={{marginBottom:"10px"}}>你确定要删除这条拦截记录吗？</div>
            </Dialog>
                <div style={{marginTop:'20px'}}>
                   <Table dataSource={orderData} onRowClick={onRowClick} style={{fontWeight:'600'}}>
                        <Table.Column title="买家旺旺" dataIndex="buyernicklist"/>
                        <Table.Column title="拉黑时间" dataIndex="optime"/>
                        <Table.Column title="拉黑原因" dataIndex="reason"/>
                        <Table.Column title="操作" cell={renderOper} width="20%"/>
                    </Table>
                </div>
                <div style={{marginTop:'15px',float:'right'}}>
                        <Pagination  onChange={wangBlockChange}  pageSizeSelector={false} pageSize={20} total={total}/>,
                </div>
        	    </div>
        	 )
    } 

     onRemove(){
        let self=this;
        console.log("======================onRemove")
        console.log(self.state.recId)
        ajax("/iytrade2/delblackbynick",{nicks:self.state.recId,type:""},"POST",function(e){
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
            self.props.wangblacklist({
                   'buyernicklist':'',
                    'optime':'',
                    'reason':'',
                    'page_num':1
            });
            self.closeDelWangBlackDialog();
        });
   }
}



function mapStateToProps(state, ownProps){

    return {
        orderData:state.WangBlacklist.orderData,
        page:state.WangBlacklist.page,
        total:state.WangBlacklist.total,
        selectCondition:state.WangBlacklist.selectCondition
    }
}
function mapDispatchToProps(dispatch,ownProps){
  return bindActionCreators(WangBlacklistActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WangBlacklist)

