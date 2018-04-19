import React from 'react'
import {api} from '../redux/actions/AY_API'

let PrintPreviewItem = React.createClass({
    getInitialState:function(){
        return {printData:{}};
    },
    componentDidMount:function(){
        let condition = {
            tao_tid:""
        };
        api("ebs.order.childDataList",condition,function(e){
            
        });
    },
    render:function(){
        return (
            <div>PrintPreviewItem</div>
        );
    }
});

export default PrintPreviewItem
