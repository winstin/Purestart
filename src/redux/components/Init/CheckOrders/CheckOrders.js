import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from 'qnui/lib/checkbox';
import Switch from 'qnui/lib/switch';
import Title from '../Title';
import * as CheckOrdersActions from '../../../actions/CheckOrders'
class CheckOrders extends React.Component {
    onChange(item_i,ele_i) {
        const {changeTypes} = this.props;
        changeTypes(item_i,ele_i);
    }
    componentDidMount(){
        const {getTypes} = this.props;
        getTypes();
    }
    render() {
        const {types} = this.props;
        return (
            <div className="init-step2">
                <Title title="请选择您需要审核的订单类型:"/>
                {
                    types.map((item,item_i)=>(
                        <div className="switch-line" key={item_i}>
                            <div className="switch-title">{item.type}</div>
                            <div className="switch-content">
                                {
                                    item.options.map((ele,ele_i)=>(
                                        <div className="switcher" key={ele_i}>
                                            <Switch defaultChecked={ele.checked} onClick={this.onChange.bind(this,item_i,ele_i)} size="small" style={{marginTop: 10, marginBottom: 10}}/>
                                            <div className="switch-text" key={ele_i}>
                                                <b><span className="text-yellow">{ele.option}</span></b>
                                                &nbsp;
                                                &nbsp;
                                                <span>{ele.tip}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
                <br/>
                <br/>
                <Title title="请选择订单展示方式:"/>
                <div style={{marginTop:30,marginLeft:100}}>
                    <Checkbox>
                        收货信息一致的多笔订单自动合并
                    </Checkbox>
                </div>
                <br/>
                <br/>
            </div>
        )
    }

}
function mapStateToProps(state, ownProps){
    return {
        types:state.CheckOrders.types
    }
}
function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(CheckOrdersActions, dispatch) //把state方法绑定到props
}

export default connect(mapStateToProps,mapDispatchToProps)(CheckOrders)
