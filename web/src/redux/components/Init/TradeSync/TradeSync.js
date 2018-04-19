import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from 'qnui/lib/checkbox';
import { Item as StepItem } from 'qnui/lib/step';
import Icon from 'qnui/lib/icon';
import Feedback from 'qnui/lib/feedback';
import * as TradeSyncActions from '../../../actions/TradeSync'

class TradeSync extends React.Component {
    check(item){//添加和去除需要同步的店铺
        const {changeShops} = this.props;
        changeShops(item.key);
    }
    componentDidMount(){
        const {getShops} = this.props;
        getShops();
    }
    render() {
        const {shops,checked,unchecked} = this.props;
        return (
            <div className="init-step1">
                <h5>系统将为以下店铺开启订单管理等功能</h5>
                <br/>
                <ol>
                    {shops.map((item)=>
                        {
                            let li = item.checked? (
                                <li key={item.key}>
                                    <img style={{verticalAlign:'middle'}} src={`./image/${item.icon}.png`} alt=""/>
                                    {item.title}　　
                                    <Icon type="close" size="small" className="btn-close" onClick={this.check.bind(this,item)} />
                                </li>
                            ):'';
                            return li;
                        }
                    )}
                </ol>
                <br/>
                <hr/>
                <h5>可添加店铺</h5>
                <ul id={0} ref="ul">
                    {shops.map((item)=>{
                        let li = item.checked? '':(
                            <li key={item.key}>
                                <label onClick={this.check.bind(this,item)}>
                                    <Checkbox />
                                    <span className="next-checkbox-label" style={{marginLeft:40}}>
                                        <img style={{verticalAlign:'middle'}} src={`./image/${item.icon}.png`} alt=""/>
                                        {item.title}
                                    </span>
                                </label>
                            </li>
                        );
                        return li;
                    }

                    )}
                </ul>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps){
    return {
        isLoading:state.TradeSync.isLoading,
        shops:state.TradeSync.shops, //把state属性绑定到props
        ischange:state.TradeSync.ischange
    }
}
function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(TradeSyncActions, dispatch) //把state方法绑定到props
}

export default connect(mapStateToProps,mapDispatchToProps)(TradeSync)
