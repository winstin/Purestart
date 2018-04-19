import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Input from 'qnui/lib/input'
import * as StockCheckTableActions from '../../../actions/StockCheckTable'

class StockScanCodeCheck extends Component{

    componentDidMount(){
        this.refs.myInput.focus();
        window.addEventListener('keydown', this.selectKeyDown.bind(this));
    }

    selectKeyDown(e){
        let isScanCode = e.target.value;
        if(isScanCode){
            if(e.keyCode == 13){
                const { changePage, getBarcodeDetail } = this.props;
                getBarcodeDetail(isScanCode); //商品条形码(sub_barcode)
                setTimeout(function(){
                    changePage();
                }, 200);
            }
        }
    }

    render() {
        const {changePage} = this.props;
        return (
            <div className="scancode-info">
                <div className="scancode-title">请扫描商品条形码:{' '}<input placeholder="请扫描商品条形码" ref="myInput" className="weigh-input"/></div>
                <div className="scancode-img">
                    <img src="./image/stockcheck.png"/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        stockDetailData:state.StockCheckTable.stockDetailData
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( StockCheckTableActions, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(StockScanCodeCheck)
