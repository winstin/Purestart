import React from 'react';
import Tab from 'qnui/lib/tab'
import Notice from 'qnui/lib/notice'
import Checkbox from 'qnui/lib/checkbox'
import Table from 'qnui/lib/table'
import Icon from 'qnui/lib/icon'
import Button from 'qnui/lib/button'
import Balloon from 'qnui/lib/balloon';

import FlagIcon from '../../../components/FlagIcon'
import {api} from '../../actions/AY_API'

const TabPane = Tab.TabPane;

class TableDetail extends React.Component {
    render() {
        const data = this.props.dataSource;
        return (
            <Tab defaultActiveKey={"1"}>
                <TabPane tab="售后详情" key="1">
                    <div className="order-details-div">订单信息：{data.tao_tid}</div>
                    <div className="order-details-div">退款单号：{data.tao_refund_id}</div>
                    <div className="order-details-div">客服介入：{data.cs_status}</div>
                    <div className="order-details-div">先行垫付：{data.advance_status}</div>
                    <div className="order-details-div">问题描述：{data.refund_memo}</div> {/*卖家操作*/}
                    <div className="order-details-div">退回物流：{data.logistics_company}</div>
                    <div className="order-details-div">物流单号：{data.invoice_no}</div>
                    <div className="order-details-div">退款说明：{data.refund_desc}</div> {/*买家操作*/}
                    <div className="order-details-div">图片凭证：{data.pic}</div>
                    <div className="order-details-div">收货信息：{data.address}</div>
                </TabPane>
                <TabPane tab="退回宝贝" key="2">
                    <div>123123</div>
                </TabPane>
                <TabPane tab="换出宝贝" key="3">

                </TabPane>
                <TabPane tab="操作记录" key="4">

                </TabPane>
            </Tab>
        );
    }

}

export default TableDetail;
