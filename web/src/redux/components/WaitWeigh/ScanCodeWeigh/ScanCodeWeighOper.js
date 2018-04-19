import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Input from 'qnui/lib/input'
import Dialog from 'qnui/lib/dialog'
import * as scanCodeWeighActions from '../../../actions/ScanCodeWeigh'

const popupConfirm = ()=>{
  Dialog.confirm({
    content:'扫码后才能进行商品称重，请扫码',
    onOk: () => {
      return new Promise(resolve => {
          setTimeout(resolve, 500);
      });
    }
  })
}

class ScanCodeWeighOper extends Component{

    componentDidMount(){
        this.refs.myInput.focus();
        window.addEventListener('keydown', this.selectKeyDown.bind(this));
    }

    selectKeyDown(e){
        let isScanCode = e.target.value;
        if(isScanCode){
            if(e.keyCode == 13){
                //取消当前的input焦点，不然会影响下一个组件的input，导致页面多次渲染
                this.refs.myInput.blur();
                let singleOrder = [];
                const {changePage,scanCodeWeigh} = this.props;
                scanCodeWeigh(isScanCode); //物流单号（现列表中没有真实数据，用tao_tid代替：2984571496999177）
                setTimeout(function(){
                    changePage();
                }, 200);
            }
        }
    }

    render() {
        const {changePage, singleOrderData} = this.props;
        return (
            <div className="scancode-info">
                <div className="scancode-title">请扫描物流单号:{' '}<input placeholder="请扫描物流单号" ref="myInput" className="weigh-input"/></div>
                <div className="scancode-img">
                    <img src="./image/weight.png"/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        singleOrderData:state.ScanCodeWeigh.singleOrderData
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( scanCodeWeighActions , dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanCodeWeighOper)

// export default ScanCodeWeighOper
