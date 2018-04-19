
import React, { Component, PropTypes } from 'react';
import Button from 'qnui/lib/button';
import PrintDialogModalItem from './PrintDialogModalItem'
export default class PrintDialogModal extends Component {

    render(){
        const {pageSize, total} = this.props;
        //const {text, type, visible,onClose,onOpen} = this.props;
        let pageSum = Math.ceil(total/pageSize);
        var tbodyArr = [];
        for(let page = 1 ; page <= pageSum ; page++){
            
            let title = page == pageSum?(
                <font>第{page}批次<br/>({(page-1)*pageSize+1} - {total})</font>
            ):(
                <font>第{page}批次<br/>({(page-1)*pageSize+1} - {page*pageSize})</font>
            )
            let tbody = (
                <PrintDialogModalItem title={title}  key={page}/>
            )
            tbodyArr.push(tbody);
        }
        return(
            <div style={{maxHeight:'400px',overflowY:'scoll',overflowX:'hidden',marginTop:'10px'}} className="scrollbar-small">
                {tbodyArr}
            </div>
        )
    }
}
