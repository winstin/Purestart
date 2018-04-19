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
import * as BabyFilterActions from '../../../actions/BabyFilter'


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



class BabyFilter extends Component {

   componentDidMount(){
        this.props.getBabyFilterlist({
           'search_value':'',
            'filter_value':'',
            'sort_value':'',
            'pic_url':'',
            'num_iid':'',
            'title':'',
            'page_num':1
        }); 
        this.props.getWhiteFilterlist({
            'pic_url':'',
            'num_iid':'',
            'title':'',
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
          dataSource: getData()
        }
        this.pageBabyChange(1);
        this.pageOnWhiteChange(1)
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
   
  /* onSearch(searchValue){
        const {selectCondition, getBabyFilterlist} = this.props;
        getBabyFilterlist({
            'search_value':searchValue,
            'filter_value':selectCondition.filter_value,
            'sort_value':selectCondition.sort_value,
            'page_num':1
        });
    }*/

    pageBabyChange(value){/*翻页*/
        const {getBabyFilterlist} = this.props;
        getBabyFilterlist({
            'pic_url':'',
            'num_iid':'',
            'title':'',
            'page_num':value
        });
    }
    
    pageOnWhiteChange(value){/*翻页*/
        const {getWhiteFilterlist} = this.props;
        console.log(getWhiteFilterlist)
        getWhiteFilterlist({
            'pic_url':'',
            'num_iid':'',
            'title':'',
            'page_num':value
        });
    }

    render(){
       let self=this;
       const { orderData, total,orderWhiteData,totalWhite,page_no,page} = this.props;
       const pageBabyChange=function(value){
            self.pageBabyChange(value)
        }
        const pageWhiteChange=function(value){
            self.pageOnWhiteChange(value)
        }
       console.log("=============范爷")
       console.log(totalWhite)
       console.log(orderWhiteData)

    	 const renderOper = (value, index, record) => {
            return <Button type="primary" size='small'>添加到白名单</Button>
        }
       const imgSellOper=(value, index, record) => {
          return <div><img src={value} style={{width:'80px',height:'80px'}}/></div>
       }
       const imgWhiteOper=(value ,index, record) => {
          return <div><img src={value} style={{width:'80px',height:'80px'}}/></div>
       }

        return ( 

          <div>
          	<Row style={{marginLeft:'-12px'}}>
              <Search onSearch={this.onSearch.bind(this)} onChange={this.onChange.bind(this)} placeholder="请输入宝贝名称" inputWidth='250px' searchText='搜索'/>	&nbsp;&nbsp;&nbsp;&nbsp;
              <div style={{marginTop:'5px'}}>
                 <Checkbox id="ljhmdmj" />&nbsp;&nbsp;<label htmlFor='ljhmdmj'>拦截黑名单买家(如不选择，黑名单买家依旧可以购买白名单宝贝!)</label>
              </div>
	          </Row>
            <Tab type="bar" defaultActiveKey="1" style={{marginTop:'10px'}}>
                    <TabPane tab="出售中的宝贝" key="1">
                       <div style={{marginTop:'20px'}}>
                          <Table dataSource={orderData}>
                              <Table.Column title="宝贝图片" cell={imgSellOper} dataIndex="pic_url" width='300'/>
                              <Table.Column title="宝贝标题" dataIndex="title"/>
                              <Table.Column title="操作" cell={renderOper} width="20%"/>
                          </Table>
                        </div>
                        <div style={{marginTop:'15px',float:'right'}}>
                                <Pagination  onChange={pageBabyChange}  pageSizeSelector={false} pageSize={20} total={total}/>,
                        </div>
                    </TabPane> 
                    <TabPane tab="白名单的宝贝" key="2">
                        <div style={{marginTop:'20px'}}>
                          <Table dataSource={orderWhiteData}>
                              <Table.Column title="宝贝图片" cell={imgWhiteOper} dataIndex="pic_url" width='300'/>
                              <Table.Column title="宝贝标题" dataIndex="title"/>
                              <Table.Column title="添加时间" dataIndex="optime"/>
                              <Table.Column title="操作" cell={renderOper} width="20%"/>
                          </Table>
                        </div>
                        <div style={{marginTop:'15px',float:'right'}}>
                                <Pagination onChange={pageWhiteChange} pageSizeSelector={false} pageSize={20} total={totalWhite}/>,
                        </div>             
                    </TabPane> 
               </Tab>
          </div>
        )
    }

    onRemove = (id) => {
        const {orderData} = this.state;
        let index = -1;
        orderData.forEach((item, i) => {
            if (item.id == id) {
                index = i;
            }
        })
        if (index != -1) {
            orderData.splice(index, 1);
            this.setState({
                orderData
            })
        }
    }
}


function mapStateToProps(state, ownProps){
    return {
        orderData:state.BabyFilter.orderData,
        orderWhiteData:state.BabyFilter.orderWhiteData,
        total:state.BabyFilter.total,
        page_no:state.BabyFilter.page,
        page:state.BabyFilter.page,
    }
}
function mapDispatchToProps(dispatch,ownProps){
  return bindActionCreators(BabyFilterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BabyFilter)
