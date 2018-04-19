import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react';
import * as GoodsMatchActions from '../../../actions/GoodsMatch'
import Feedback from 'qnui/lib/feedback';
import MatchSkuTable from './MatchSkuTable'
import MatchItem from './MatchItem'
import Button from 'qnui/lib/button';


class MatchApp extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
        <div>
            <div style={{display:'flex'}}>
                <MatchItem/> <MatchItem/>
            </div>
            <MatchSkuTable />
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

export default connect(mapStateToProps,mapDispatchToProps)(MatchApp)
