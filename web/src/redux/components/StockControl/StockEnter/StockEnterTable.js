import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Table from 'qnui/lib/table'
import Checkbox from 'qnui/lib/checkbox'
import Pagination from 'qnui/lib/pagination'
import Icon from 'qnui/lib/icon'
import Search from 'qnui/lib/search'
import Button from 'qnui/lib/button'
import '../../../../components/main.css'

Table.Column.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    })),
}

let StockEnterTable = React.createClass({

    getInitialState:function(){
        return {
            isDIYCShow:"none",
            DIY_column_btn_class:"DIY_column_btn_unselect",
            columnArr:this.props.columnArr,
            pageNum:1
        };
    },
    componentDidMount:function(){
        let tables = document.getElementsByClassName('next-table-body');
        for(let i in tables){
            if(typeof tables[i] == "object"){
                tables[i].onscroll = function(){
                    if(i == 0){
                        document.getElementsByClassName('next-table-header')[0].scrollLeft = tables[i].scrollLeft;
                    }
                }
            }
        }
    },

    DIYColumnShow:function(){
        this.setState({isDIYCShow:"block",DIY_column_btn_class:"DIY_column_btn_select"});
    },
    DIYColumnHide:function(){
        this.setState({isDIYCShow:"none",DIY_column_btn_class:"DIY_column_btn_unselect"});
    },
    MakeColumnShow:function(index){
        let new_columnArr = [...this.state.columnArr];
        new_columnArr[index].checked = true;
        this.setState({columnArr:new_columnArr});
    },
    MakeColumnHide:function(index){
        let new_columnArr = [...this.state.columnArr];
        new_columnArr[index].checked = false;
        this.setState({columnArr:new_columnArr});
    },
    setItemCheck:function(index,checked,e){
        let new_ItemsSelected = [...this.props.ItemsSelectedArr];
        new_ItemsSelected[index] = checked;
        this.props.itemsCheckedOnChange(new_ItemsSelected);
    },
    setItemsCheckAll:function (checked,e) {
        const new_ItemsSelected = this.props.ItemsSelectedArr.map(()=>checked)
        this.props.itemsCheckedOnChange(new_ItemsSelected);
    },
    moveColumnUp:function(index){
        let change_index = index - 1;
        if(change_index != -1){
            let new_columnArr = [...this.state.columnArr];
            let item = new_columnArr[index];
            new_columnArr[index] = new_columnArr[change_index];
            new_columnArr[change_index] = item;
            this.setState({columnArr:new_columnArr});
        }
    },
    moveColumnDown:function(index){
        let change_index = index + 1;
        if(change_index != this.state.columnArr.length){
            let new_columnArr = [...this.state.columnArr];
            let item = new_columnArr[index];
            new_columnArr[index] = new_columnArr[change_index];
            new_columnArr[change_index] = item;
            this.setState({columnArr:new_columnArr});
        }
    },
    itemFilters:function(filterKeys){
        this.props.onFilter(
            Object.keys(filterKeys).map(function(value){
                return {
                    'item':value,
                    'value':filterKeys[value]['selectedKeys']
                };
            })
        );
    },
    deleteTableArr:function(index){/*删除 index*/
        let dataSource = this.props.dataSource;
        dataSource.splice(index,1);
        this.setState({
            dataSource:dataSource
        })
    },

    render:function(){
        let isLoading = this.props.isLoading;
        if(!isLoading){
            isLoading = false;
        }
        let allSelected = true;
        if(this.props.ItemsSelectedArr.length == 0){
            allSelected = false;
        }else {
            this.props.ItemsSelectedArr.map(function(value){
                if(!value){
                    allSelected = false;
                }
            });
        }

        return (
            <div style={{height:"100%",position:"relative"}}>
                <div style={{textAlign: "right",position: "absolute",left: "0px"}}>
                    <Search inputWidth="300px" placeholder="简称，编码，关键字..." searchText="" onSearch={(value)=>{this.props.onSearch(value.key);}} className="search-style"/>
                </div>
                <div style={{height: "100%",padding: "50px 0px"}}>
                <Table style={{overflowY: "auto"}} className={`orderTable ${this.props.tableclassname}`} dataSource={this.props.dataSource} onSort={this.props.onSort} onFilter={this.itemFilters} expandedRowRender = {this.props.expandedRowRender} isLoading = {isLoading} hasBorder = {false} primaryKey={this.props.primaryKey}>
                <Table.Column
                    title={
                        <Checkbox key={`allCheckbox${allSelected}`} defaultChecked={allSelected} onChange={this.setItemsCheckAll} />
                    } cell={ function(value, index){
                        return ( <div>
                            <span onClick={()=>{this.deleteTableArr(index);}} className={this.props.cross}></span>
                            <Checkbox id={index} key={`itemCheckbox_${index}_${this.props.ItemsSelectedArr[index]}`} defaultChecked={this.props.ItemsSelectedArr[index]}
                            onChange={this.setItemCheck.bind(this,index)}/>
                            </div>);
                        }.bind(this)} width={70}
                    />
                    {
                        this.state.columnArr.map(function(value,index){
                            if(value.checked){
                                if(value.filters == false){
                                    return (
                                        <Table.Column key={`orderTableColumn${index}`} title={value.title} dataIndex={value.value} cell={value.cell} sortable={value.sortable} width={value.width}/>
                                    );
                                }else {
                                    return (
                                        <Table.Column key={`orderTableColumn${index}`} title={value.title} dataIndex={value.value} cell={value.cell} sortable={value.sortable} filters={value.filters} filterMode={value.filterMode} width={value.width}/>
                                    );
                                }
                            }
                        })
                    }
                </Table>
                </div>
            </div>
        );
    }
});

export default StockEnterTable
