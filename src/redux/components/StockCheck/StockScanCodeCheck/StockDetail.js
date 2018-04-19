import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Button from 'qnui/lib/button'
import * as StockCheckTableActions from '../../../actions/StockCheckTable'
import * as StockCheckAction from '../../../actions/StockCheck'

const actions = {
    ...StockCheckTableActions,
    ...StockCheckAction
}

class StockDetail extends Component{
    componentDidMount(){
        this.refs.stockDetail.focus();
    }
    //继续盘点
    keepCheckStock(){
        const {changePage, changeOnStock, stockDetailData} = this.props;
        let inputvalue = document.getElementsByClassName('inputvalue')[0].value;
        changePage("scancodestock");
        changeOnStock(stockDetailData.pic_path, stockDetailData.sku_product_id, stockDetailData.name, stockDetailData.outer_id,stockDetailData.prop_name, stockDetailData.defect_num, inputvalue);
    }
    //保存结束,并跳转到操作详情日志
    saveAndGoJournal(){
        const {changeOnStock, stockDetailData, tabAndPageChage, startAndEndTime} = this.props;
        let inputvalue = document.getElementsByClassName('inputvalue')[0].value;
        changeOnStock(stockDetailData.pic_path, stockDetailData.sku_product_id, stockDetailData.name, stockDetailData.outer_id,stockDetailData.prop_name, stockDetailData.defect_num, inputvalue);
        tabAndPageChage("operdetaillog",'2');
    }

    render(){
        const {changePage, stockDetailData, changeOnStock} = this.props;
        return(
            <div className="stock-detail">
                <div className="detail-title">商品条形码：<span>{stockDetailData.sub_barcode}</span></div>
                <div className="detail-content">
                    <h3>{stockDetailData.name}</h3>
                    <img src={stockDetailData.pic_path}/>
                    <div className="detail-type">
                        <span>mm-7657:</span><span>{stockDetailData.prop_name}</span>
                    </div>
                    <div className="detail-num">原有数量：<span>{stockDetailData.defect_num}</span></div>
                </div>
                <div className="detail-input">
                    盘点数量：<input ref="stockDetail" className="inputvalue"/>
                </div>
                <div className="detail-button"><Button type="secondary" onClick={this.keepCheckStock.bind(this)} style={{marginRight:"20px"}}>继续盘点</Button><Button type="primary" onClick={this.saveAndGoJournal.bind(this)}>保存结束</Button></div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        stockDetailData:state.StockCheckTable.stockDetailData  //扫码后获取的单条数据详情
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( StockCheckTableActions, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(StockDetail)
