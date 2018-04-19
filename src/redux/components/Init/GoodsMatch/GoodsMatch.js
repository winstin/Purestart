import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'qnui/lib/dialog';
import Button from 'qnui/lib/button';
import Loading from 'qnui/lib/loading';
import * as GoodsMatchActions from '../../../actions/GoodsMatch'
import MatchApp from './MatchApp'



class GoodsMatch extends React.Component{
    constructor(){
        super();
    }
    componentDidMount(){
        const {goodsMatch} = this.props;
        goodsMatch();
    }
    render(){
        const {isLoading, visible, onClose} = this.props;
        const footer = <div className="h-center">
            <Button className="btn-common" type="secondary" component="a"  target="_blank" onClick={onClose}>跳过</Button>
            &nbsp;&nbsp;&nbsp;
            <Button className="btn-common" type="primary" onClick={onClose}>
                开始匹配
            </Button>
        </div>
        const content = isLoading ?
        (
            <Loading color="#e6e6e6" size="large"  type="basic"/>
        )
        :
        (
            <MatchApp />
        )
        return(
            <div className="init-step5">
                {content}
                <Dialog visible={visible}
                        footer={footer}
                        style={{width:"500px"}} onClose = {this.onClose}
                        footerAlign = "right">
                        <div style={{height:180}} className="init-step5">
                            <div style={{float:'left'}}>
                                <img src="http://q.aiyongbao.com/item/web/img/nodata.png" alt="" width="150" />
                            </div>
                            <div style={{width:'60%',float:'left',paddingTop:10,marginLeft:20}}>
                                <h3>在您绑定的3家店铺中,以为您找到23对疑似相同的商品,是否要进行商品匹配</h3>
                                <p style={{color:'#ff0000'}}>*标记为同一件商品,在列表中展示一条信息</p>
                                <br/>
                                <br/>
                            </div>
                        </div>
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        isLoading:state.GoodsMatch.isLoading,
        visible:state.GoodsMatch.visible
    }
}
function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(GoodsMatchActions, dispatch) //把state方法绑定到props
}

export default connect(mapStateToProps,mapDispatchToProps)(GoodsMatch)
