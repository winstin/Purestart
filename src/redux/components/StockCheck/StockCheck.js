import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React,{Component,PropTypes} from 'react'
import Tab from 'qnui/lib/tab'
import Button from 'qnui/lib/button'
import Notice from 'qnui/lib/notice'
import Dialog from 'qnui/lib/dialog'
import StockCheckTable from './StockCheckTable/StockCheckTable'
import StockScanCodeCheck from './StockScanCodeCheck/StockScanCodeCheck'
import StockDetail from './StockScanCodeCheck/StockDetail'
import StockOperJournal from './StockOperJournal/StockOperJournal'
import StockDetailOperJournal from './StockOperJournal/StockDetailOperJournal'
import * as StockCheckAction from '../../actions/StockCheck'
import './StockCheck.css'

class StockCheck extends Component{
    callback(key){
        const {tabChage, changePage} = this.props;
        tabChage(key);
        if(key == 1){
            changePage("stockchecklist");
        }else{
            changePage("operlog");
        }
    }
    //点击扫码盘库存储的开始时间
    getStartTime(){
        const {changePage, startAndEndTime} = this.props;
        // let time = new Date;
        // let starttime = time.toLocaleString();
        // starttime = starttime.replace(/上午/,'');
        // startAndEndTime(starttime, '');
        changePage('scancodestock');
    }
    //点击列表保存当前盘点的结束时间
    getEndTime(){
        const {onOpen, startAndEndTime} = this.props;
        // let time = new Date;
        // let endtime = time.toLocaleString();
        // endtime = endtime.replace(/上午/,'');
        // startAndEndTime('', endtime);
        onOpen();
    }

    render(){
        const TabPane = Tab.TabPane;
        const {isactive, changePage, visible, onOpen, onClose, activeKey, tabChage, tabAndPageChage, startAndEndTime} = this.props;
        // 扫描盘点的页面内容
        let html = '<div/>';
        //操作日志的页面内容
        let htmllog = '<div/>';
        //库存盘点弹窗内容
        let stockcheckhtml = '<div/>';
        stockcheckhtml = (<div><Button type="normal" onClick={onClose}>取消</Button><Button type="primary" onClick={onClose}><span>保存</span></Button></div>);
        switch (isactive) {
            case 'stockchecklist':
                html = (
                    <div style={{height:"100%"}}>
                        <Button type="secondary" style={{position:"absolute", zIndex:"1000"}} onClick={this.getStartTime.bind(this)} >扫描盘点</Button>
                        <StockCheckTable/>
                        <Button type="primary" style={{position:"fixed", bottom:"50px", left:"45%", zIndex:'1000'}} onClick={this.getEndTime.bind(this)}>保存当前盘点内容</Button>
                        <Dialog visible={visible} onClose={onClose} title="库存盘点" footer={stockcheckhtml} className="stockchenck-dialog">
                            <Notice title="当前共盘点12件商品，确认无误后保存盘点记录" type="warning">
                            </Notice>
                        </Dialog>
                    </div>
                )
                break;
            case 'scancodestock':
                html = (
                    <div>
                        <Button type="secondary" onClick={()=>{changePage('stockchecklist')}}><span>返回列表</span></Button>
                        <StockScanCodeCheck changePage={()=>{changePage('stockdetail')}}/>
                    </div>
                )
                break;
            case 'stockdetail':
                html = (
                    <div>
                        <Button type="secondary" onClick={()=>{changePage('stockchecklist')}}><span>返回列表</span></Button>
                        <StockDetail tabAndPageChage={()=>{tabAndPageChage("operdetaillog",'2')}} startAndEndTime={()=>{startAndEndTime();}}/>
                    </div>
                )
                break;
            case 'operlog':
                htmllog = (<StockOperJournal changePage={()=>{changePage('operdetaillog')}}/>);
                break;
            case 'operdetaillog':
                htmllog = (<StockDetailOperJournal changePage={()=>{changePage('operlog')}}/>);
                break;
            default:
        }
        return (
            <Tab activeKey={activeKey} onTabClick={this.callback.bind(this)}>
                <TabPane tab="库存盘点" key="1" style={{width:"100%", height:"100%"}}>
                    {html}
                </TabPane>
                <TabPane tab="盘库日志" key="2">
                    {htmllog}
                </TabPane>
            </Tab>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        isactive:state.StockCheck.isactive,  //控制库存盘点页面显示的内容
        visible:state.StockCheck.visible,    //控制保存当前盘点按钮弹窗的显示隐藏
        activeKey:state.StockCheck.activeKey //控制库存盘点页面的tab组件的切换
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( StockCheckAction , dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(StockCheck)
