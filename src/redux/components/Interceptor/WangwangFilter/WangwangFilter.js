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
import Dialog from 'qnui/lib/dialog';
import * as WangwangFilterActions from '../../../actions/WangwangFilter'


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



class WangwangFilter extends Component {

     componentDidMount(){
        this.props.getWangFilterlist({
           'buyernicklist':'',
            'optime':'',
            'reason':'',
            'page_num':1
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
          isShow: false
        }
        this.pageWangFilterChange(1);
}
  
    makeDialogShow = () => {
        this.setState({isShow:true});
    }

    makeDialogHide = () => {
        this.setState({isShow:false});
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
   
    pageWangFilterChange(value){/*翻页*/
        const {getWangFilterlist} = this.props;
        /*if(value==null||value==''||value=='null'||value==undefined){
              value=1;
        }*/
        console.log(getWangFilterlist)
        getWangFilterlist({
            'buyernicklist':'',
            'optime':'',
            'reason':'',
            'page_num':value
        });
    }

    render(){
      let self=this;
       const { orderData, total,sum,page} = this.props;
      
    	 const renderOper = (value, index, record) => {
            return <a onClick={this.onRemove.bind(this, record.id)}  style={{color:'#4990E2'}}>删除({record.id})</a>;
        }
        
        const pageWangFilterChange=function(value){
          self.pageWangFilterChange(value)
       }
        console.log("----------------pageWangFilterChange------")
        console.log(total)
        return ( 
          <div>
          	<Row style={{marginLeft:'-12px'}}>
            <Search size={this.state.size} onSearch={this.onSearch.bind(this)} onChange={this.onChange.bind(this)} dataSource={this.state.dataSource} placeholder="请输入买家旺旺"  inputWidth="250px" searchText='搜索'/>	
            <Button type="primary" style={{marginLeft:'20px',fontSize:'7px',fontWeight:'600'}}  onClick={this.makeDialogShow}>添加旺旺白名单</Button>       
	        </Row>
          <Dialog style={{width:"800px"}} visible = {this.state.isShow}
                    onOk = {()=>{}}
                    onCancel = {this.makeDialogHide}
                    onClose = {this.makeDialogHide}
                    title = {<span style={{fontWeight:'700',fontSize:'16px'}}>添加白名单</span>}
                    >
                  <div>
                     <div style={{height:'30px',backgroundColor:'#FEF1E8',marginTop:'10px',paddingTop:'8px'}}>
                       &nbsp;&nbsp;<Icon  style={{color:'orange'}} type="warning" size="xs"/>&nbsp;&nbsp;  
                       <span>1.白名单买家直接执行，不会进行拦截 2.每次做多添加10名买家。</span>
                     </div>
                     <div style={{marginTop:'20px'}}>
                       <span  style={{fontWeight:'600'}}>输入要拉黑的买家旺旺</span><br/>
                       <Input multiple placeholder="支持同时拉黑多个旺旺，一行一个" style={{width:'100%',marginTop:'10px'}}/>
                     </div>
                    <div style={{marginTop:'20px'}}>
                       <span  style={{fontWeight:'600'}}>请输入拉黑原因(卖家可见)</span><br/>
                       <Input  placeholder="输入原因，比如'他是回头客',最多20个字符。" style={{width:'100%',marginTop:'10px'}}/>
                    </div>
                  </div>
                </Dialog>
	        <div style={{marginTop:'10px'}}>
	             <Table dataSource={orderData} onRowClick={onRowClick}>
	                  <Table.Column title="买家旺旺" dataIndex="mjwangwang"/> 
	                  <Table.Column title="添加时间" dataIndex="time"/>
                      <Table.Column title="添加原因" dataIndex="reason"/>
	                  <Table.Column title="操作" cell={renderOper} width="20%"/>
	              </Table>
	        </div>
            <div style={{marginTop:'10px',float:'left'}}>
              <span style={{fontFamily: 'PingFangSC-Regular',fontSize:'14px',color:'#D0011B'}}>注：白名单中的买家符合任一拦截规则也不会进行拦截！</span>
            </div>
	        <div style={{marginTop:'20px',float:'right'}}>
	                  <Pagination onChange={pageWangFilterChange}  pageSizeSelector={false} pageSize={20} total={total}/>,
	        </div>
          </div>
        )
    }

    onRemove = (id) => {
        const {dataSource} = this.state;
        let index = -1;
        dataSource.forEach((item, i) => {
            if (item.id == id) {
                index = i;
            }
        })
        if (index != -1) {
            dataSource.splice(index, 1);
            this.setState({
                dataSource
            })
        }
    }
}

function mapStateToProps(state, ownProps){
    return {
        orderData:state.WangwangFilter.orderData,
        total:state.WangwangFilter.total,
        page:state.WangwangFilter.page
    }
}
function mapDispatchToProps(dispatch,ownProps){
  return bindActionCreators(WangwangFilterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WangwangFilter)
