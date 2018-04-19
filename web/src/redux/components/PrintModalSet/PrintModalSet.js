import React,{ Component } from 'react'
import Tab from 'qnui/lib/tab'
import LogisticModal from './LogisticModal/LogisticModal'
import ElecFaceModal from './ElecFaceModal/ElecFaceModal'
import DeliveryModal from './DeliveryModal/DeliveryModal'

class PrintModalSet extends Component {
    render(){
        const TabPane = Tab.TabPane;
        return (
            <Tab style={{height:"100%",display:"flex",flexFlow:"column"}} defaultActiveKey="1">
                <TabPane tab="快递单模板" key="1"><LogisticModal/></TabPane>
                <TabPane tab="电子面单模板" key="2"><ElecFaceModal/></TabPane>
                <TabPane tab="发货单模板" key="3"><DeliveryModal/></TabPane>
            </Tab>
        );
    }
}

export default PrintModalSet
