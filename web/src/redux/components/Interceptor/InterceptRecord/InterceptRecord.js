import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Tab from 'qnui/lib/tab';
import Table from 'qnui/lib/table';
import Button from 'qnui/lib/button';
import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import Checkbox from 'qnui/lib/checkbox';
import Select, {Option} from 'qnui/lib/select';
import Icon from 'qnui/lib/icon';
import { Row, Col } from 'qnui/lib/grid';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Pagination from 'qnui/lib/pagination';
import Search from 'qnui/lib/search';
import 'qnui/lib/table/index.css';
import * as InterceptRecordActions from '../../../actions/InterceptRecord'


const TabPane = Tab.TabPane;
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



class InterceptRecord extends Component {

  componentDidMount(){
        this.props.interceptRecordlist({
           'buyernicklist':'',
            'optime':'',
            'reason':'',
            'pageno':1,
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
        }
        this.pageRecordChange(1);
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
   
   pageRecordChange(value){/*翻页*/
      const {interceptRecordlist} = this.props;
      console.log(interceptRecordlist)
      interceptRecordlist({
         'buyernicklist':'',
         'optime':'',
         'reason':'',
         'pageno':value
      });
    }

    render(){
      let self=this;
        const { orderData, total,sum,page} = this.props;
        const pageRecordChange=function(value){
            self.pageRecordChange(value)
        }
        console.log("----------------00000000------")
        console.log(total)
        return ( 
          <div>
          	<Row style={{marginLeft:'-12px'}}>
              <Search onSearch={this.onSearch.bind(this)} onChange={this.onChange.bind(this)} placeholder="请输入买家旺旺" inputWidth="250px" searchText='搜索'/>
	          </Row>
           <div style={{marginTop:'20px'}}>
             <Table dataSource={orderData}>
                  <Table.Column title="买家旺旺" dataIndex="buyernick"/>
                  <Table.Column title="拦截时间" dataIndex="optime"/>
                  <Table.Column title="订单号" dataIndex="tid"/>
                  <Table.Column title="拦截原因" dataIndex="msg"/>
              </Table>
          </div>
          <div style={{marginTop:'15px',float:'right'}}>
                  <Pagination onChange={pageRecordChange}  pageSizeSelector={false} pageSize={20} total={total}/>,
          </div>
        </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        orderData:state.InterceptRecord.orderData,
        page:state.InterceptRecord.page,
        total:state.InterceptRecord.total
    }
}
function mapDispatchToProps(dispatch,ownProps){
  return bindActionCreators(InterceptRecordActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InterceptRecord)
