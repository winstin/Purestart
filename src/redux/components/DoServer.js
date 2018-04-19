import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import * as DoServerActions from '../actions/DoServer'  //ajax调用方法引入

class DoServer extends Component {
    //异步处理
    componentDidMount(){
        const {doserver} = this.props;
        let args = {
            'name' : 'qcc',
            'sex' : 'nan'
        };
        doserver('https://api.github.com/users/octocat/gists',args);
    }
    render(){
        const { data } = this.props;
        console.log(data);
        return (
            <div>
                {JSON.stringify(...data)}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        data:state.DoServer //把state属性绑定到props
    }
}
function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(DoServerActions, dispatch) //把state方法绑定到props
}

export default connect(mapStateToProps,mapDispatchToProps)(DoServer)
