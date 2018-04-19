import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from 'qnui/lib/checkbox';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Search from 'qnui/lib/search';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import {onload_viptime} from '../../actions/TopAction';
import TradeListOne from '../../components/TradeListOne/TradeListOne';
import './TradeIndex.css';
import * as TradeList from '../../actions/TradeListOne'

const TabPane = Tab.TabPane;

function tabState(key) {
    console.log(key);
}

let dataSource = [{
        price:'US $2.45',
        status: 0,
        id: 1,
        product:[{
          title:'2014 New Fashion Novelty Tank Slim Women\'s Fashion Dresses With Lace',
          avatar: 'https://sc01.alicdn.com/kf/HTB1ravHKXXXXXccXVXXq6xXFXXXJ/Chinese-Style-Fashion-Custom-Digital-Print-Silk.jpg_100x100.jpg',
          sku:'颜色分类：巧克力色',
          price:'378.00',
          num:'2',
          stopReason:'金额小于40元'
        }]
    },{
      price:'US $2.5',
      status: 1,
      id: 2,
      product:[{
        title:'Free shipping women Casual dresses lady dress plus size 2014',
        avatar: 'https://sc02.alicdn.com/kf/HTB1efnNLVXXXXbtXpXXq6xXFXXXN/Light-100-acrylic-fashionabe-snood-shawl-weight.jpg_100x100.jpg'
      }]
    },{
      price:'US $2.5',
      status: 1,
      id: 3,
      product:[{
        title:'Free shipping women Casual dresses lady dress plus size 2014',
        avatar: 'https://sc02.alicdn.com/kf/HTB1efnNLVXXXXbtXpXXq6xXFXXXN/Light-100-acrylic-fashionabe-snood-shawl-weight.jpg_100x100.jpg'
      }]
    },{
      price:'US $2.5',
      status: 1,
      id: 4,
      product:[{
        title:'Free shipping women Casual dresses lady dress plus size 2014',
        avatar: 'https://sc02.alicdn.com/kf/HTB1efnNLVXXXXbtXpXXq6xXFXXXN/Light-100-acrylic-fashionabe-snood-shawl-weight.jpg_100x100.jpg'
      }]
    }]

class TradeIndex extends Component {
  constructor(props) {
        super(props);

        this.state = {
            value: ['orange'],
            flag:false,
            data:undefined,
            total:undefined
        };

    }

  onSearch(value) {
      console.log(value);
  }

  loadTradeList(){
    let self = this;
    let list = [];
    //gettbtime();

    const {getTradeList} = this.props;
    getTradeList();

  }

  componentDidMount(){
    setTimeout(()=>{
      onload_viptime();
    },1000);
    this.loadTradeList();
  }

  render() {
      var aaa = '(123)';
      const {dataSource} = this.props;

      return (
        <div style={{paddingTop:'20px'}}>
            <Checkbox id="flag0" style={{marginRight:'5px'}}/><img style={{marginRight:'5px'}} src="//cdn.zzgdapp.com/trade/web/images/op_memo_0.png?qntag=2"/>
            <Checkbox id="flag1" style={{marginRight:'5px'}}/><img style={{marginRight:'5px'}} src="//cdn.zzgdapp.com/trade/web/images/op_memo_1.png?qntag=2"/>
            <Checkbox id="flag2" style={{marginRight:'5px'}}/><img style={{marginRight:'5px'}} src="//cdn.zzgdapp.com/trade/web/images/op_memo_2.png?qntag=2"/>
            <Checkbox id="flag3" style={{marginRight:'5px'}}/><img style={{marginRight:'5px'}} src="//cdn.zzgdapp.com/trade/web/images/op_memo_3.png?qntag=2"/>
            <Checkbox id="flag4" style={{marginRight:'5px'}}/><img style={{marginRight:'5px'}} src="//cdn.zzgdapp.com/trade/web/images/op_memo_4.png?qntag=2"/>
            <RangePicker style={{marginLeft:'10px'}} defaultValue={['2015-06-02', '2015-06-11']} />
            <div style={{marginTop:'10px'}}>
              <Search type='secondary' inputWidth={320} size='large' onSearch={this.onSearch.bind(this)} dataSource={this.state.dataSource} placeholder={"顾超js"} />
            </div>
            <div style={{marginTop:'10px'}}>
              <Tab defaultActiveKey="1" onChange={tabState}>
                  <TabPane tab={"近三个月"+aaa} key="1">
                    <Button type="primary">批量免邮</Button>
                    <Button type="primary" style={{marginLeft:'10px'}}>批量备注</Button>
                    <div style={{marginTop:'10px'}}>
                      {/* IMPORTANT！*/}
                      <TradeListOne data={dataSource}></TradeListOne>
                    </div>
                  </TabPane>
                  <TabPane tab="待付款" key="2" style={{marginLeft:'-16px'}}>待付款</TabPane>
                  <TabPane tab="待发货" key="3" style={{marginLeft:'-16px'}}>待发货</TabPane>
                  <TabPane tab="已发货" key="4" style={{marginLeft:'-16px'}}>已发货</TabPane>
                  <TabPane tab="退款中" key="5" style={{marginLeft:'-16px'}}>退款中</TabPane>
                  <TabPane tab="需要评价" key="6" style={{marginLeft:'-16px'}}>需要评价</TabPane>
                  <TabPane tab="已成功" key="7" style={{marginLeft:'-16px'}}>已成功</TabPane>
                  <TabPane tab="已关闭" key="8" style={{marginLeft:'-16px'}}>已关闭</TabPane>
                  <TabPane tab="三个月前" key="9" style={{marginLeft:'-16px'}}>三个月前</TabPane>
              </Tab>

            </div>
        </div>
      );
  }
}

function mapStateToProps(state, ownProps){
    return {
        dataSource:state.TradeListOne.dataSource
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( TradeList , dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeIndex)
