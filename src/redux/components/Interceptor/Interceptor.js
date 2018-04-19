import React,{Component,PropTypes} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Tab from 'qnui/lib/tab';
import InGeneralSituation from './InGeneralSituation/InGeneralSituation';
import InBasicSettings from './InBasicSettings/InBasicSettings';
import InCloudBlacklist from './InCloudBlacklist/InCloudBlacklist';
import WangBlacklist from './WangBlacklist/WangBlacklist';
import DistrictIntercept from './DistrictIntercept/DistrictIntercept';
import ReceiverIntercept from './ReceiverIntercept/ReceiverIntercept';
import WangwangFilter from './WangwangFilter/WangwangFilter';
import BabyFilter from './BabyFilter/BabyFilter';
import InterceptRecord from './InterceptRecord/InterceptRecord';

const TabPane = Tab.TabPane;
class Interceptor extends Component {
    render() {

        return (
            <div  style={{backgroundColor:'white',font:'PingFangSC-Light',fontSize:'14px'}}>
               <Tab type="bar" defaultActiveKey="1" style={{width:'100%'}}>
                    <TabPane tab="拦截概况" key="1" style={{width:'100%'}}>
                       <InGeneralSituation />
                    </TabPane> 
                    <TabPane tab="基础设置" key="2" style={{width:'100%'}}>
                       <InBasicSettings />
                    </TabPane>
                    <TabPane tab="云黑名单" key="3" style={{width:'100%'}}>
                      <InCloudBlacklist />
                    </TabPane>
                    <TabPane tab="旺旺黑名单" key="4">
                      <WangBlacklist />
                    </TabPane>
                    <TabPane tab="区域拦截" key="5">
                      <DistrictIntercept />
                    </TabPane>
                    <TabPane tab="收件人栏截" key="6">
                      <ReceiverIntercept />
                    </TabPane>
                    <TabPane tab="旺旺过滤" key="7">
                      <WangwangFilter />
                    </TabPane>
                    <TabPane tab="宝贝过滤" key="8">
                      <BabyFilter />
                    </TabPane>
                    <TabPane tab="拦截记录" key="9">
                      <InterceptRecord />
                    </TabPane>
               </Tab>
            </div>
        );
    }

}

export default Interceptor
