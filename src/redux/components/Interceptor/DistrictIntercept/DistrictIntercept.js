import React,{Component,PropTypes} from 'react';
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
import City from './City';
import {ajax} from "../../../actions/AY_API";
import Dialog from 'qnui/lib/dialog';
import Feedback from 'qnui/lib/feedback';
import * as DistrictInterceptActions from '../../../actions/DistrictIntercept'

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

class DistrictIntercept extends Component {

     componentDidMount(){
        this.props.getDistrictList({
           'id':'',
            'optime':'',
            'qu':'',
            'shen':'',
            'shi':'',
            'pageno':1
        }); 
        console.log("------componentDidMount---------")
        console.log(this.props);
      
    }

	 constructor(props){
        super(props);
        this.state = {
          data: [],
          disabled: true,
          dataSource: getData(),
          value: '',
          delRevVisible:false,
          recId:''
        };
        this.pageDistrictChange(1);
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
  
    pageDistrictChange(value){/*翻页*/
        const {getDistrictList} = this.props;
        getDistrictList({
            'pic_url':'',
            'num_iid':'',
            'title':'',
            'pageno':value
        });
    }
    
     /*是否删除弹框*/
    openDelDistrictDialog = (id) => {
        console.log("edit");
        console.log(id);
        console.log(this);
        this.setState({
            delRevVisible: true,
            recId: id
        })
    }
    /*关闭删除弹框*/
    closeDelDistrictDialog(){
        this.setState({
          delRevVisible: false,
          recId:''
        })
    }


    render(){
          let self=this;
         const { orderData, total,sum,page} = this.props;
         const pageDistrictChange=function(value){
             self.pageDistrictChange(value)
         }
         const DistrictDialogTitle = <b>温馨提示</b>;
    	 const renderOper = (value, index, record) => {
            return <a onClick={this.openDelDistrictDialog.bind(this, record.id)}  style={{color:'#4990E2'}}>删除</a>;
        }
    
        return ( 
          <div>
          	<Row style={{marginLeft:'-12px'}}>
	            <span style={{paddingTop:'5px'}}>收件人区域：</span>
                <City />
	            <Button type="primary">添加拦截规则</Button>       
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
                <Search size={this.state.size} onSearch={this.onSearch.bind(this)} onChange={this.onChange.bind(this)} dataSource={this.state.dataSource} inputWidth="250px" searchText='搜索' placeholder='请输入你要搜索的内容'/>   
            </Row>
	        <div style={{marginTop:'10px'}}>
	             <Table dataSource={orderData} onRowClick={onRowClick}>
	                  <Table.Column title="省份" dataIndex="shen"/>
	                  <Table.Column title="城市" dataIndex="shi"/>
	                  <Table.Column title="区县" dataIndex="qu"/>
	                  <Table.Column title="街道" dataIndex="street"/>
	                  <Table.Column title="添加时间" dataIndex="optime"/>
	                  <Table.Column title="操作" cell={renderOper} width="20%"/>
	              </Table>
	        </div>
             <Dialog visible = {this.state.delRevVisible}
                onOk = {this.onRemove.bind(this)}
                onCancel = {this.closeDelDistrictDialog.bind(this)}
                onClose = {this.closeDelDistrictDialog.bind(this)}
                title = {DistrictDialogTitle}
                style = {{width:'500px'}}
            >
              <div style={{marginBottom:"10px"}}>你确定要删除这条拦截记录吗？</div>
            </Dialog>
	        <div style={{marginTop:'15px',float:'right'}}>
	                  <Pagination onChange={pageDistrictChange}  pageSizeSelector={false} pageSize={20} total={total}/>,
	        </div>
          </div>
        )
    }

    onRemove = (id) => {
        let self=this;
        ajax("/iytrade2/delblackbynick",{nicks:self.state.recId,type:'area'},"POST",function(e){
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
            self.props.getDistrictList({
                   'buyernicklist':'',
                    'optime':'',
                    'reason':'',
                    'page_num':1
                });
            self.closeDelDistrictDialog();
        });
    }
}



function mapStateToProps(state, ownProps){
    return {
        orderData:state.DistrictIntercept.orderData,
        total:state.DistrictIntercept.total,
        page:state.DistrictIntercept.page
    }
}
function mapDispatchToProps(dispatch,ownProps){
  return bindActionCreators(DistrictInterceptActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DistrictIntercept)