/**
*主页组件，'/'根路由默认页面

主页组件，默认根路由显示的页面
**/
import React,{Component,PropTypes} from 'react'
import Table from 'qnui/lib/table'
import Checkbox from 'qnui/lib/checkbox'
import SendErrorOrderTable from '../../../components/SendErrorOrderTable/SendErrorOrderTable'

export default class SendError extends Component {
    render(){
        return(
             <SendErrorOrderTable />
        );
    }
}
