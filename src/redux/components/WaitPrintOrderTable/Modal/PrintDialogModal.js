
import React, { Component, PropTypes } from 'react';
import Button from 'qnui/lib/button';
import PrintDialogModalItem from './PrintDialogModalItem'
export default class PrintDialogModal extends Component {

    render(){
        const {pageSize, dataSource, getFromValues} = this.props;
        let total = dataSource.length;
        //const {text, type, visible,onClose,onOpen} = this.props;
        let pageSum = Math.ceil(total/pageSize);
        var tbodyArr = [];
        for(let page = 1 ; page <= pageSum ; page++){
            let start = (page-1)*pageSize+1;
            let end = page == pageSum? total: page*pageSize;
            let itemData_arr = [];
            for(let index = start - 1; index <= end - 1; index++){
                itemData_arr.push(dataSource[index]);
            }
            let title = (
                <font>第{page}批次<br/>({start} - {end})</font>
            );
            let tbody = (
                <PrintDialogModalItem getFromValues={getFromValues} title={title} dataSource={itemData_arr} key={page}/>
            );
            tbodyArr.push(tbody);
        }
        return(
            <div style={{maxHeight:'400px',overflowY:'scoll',overflowX:'hidden',marginTop:'10px'}} className="scrollbar-small">
                {tbodyArr}
            </div>
        )
    }
}
