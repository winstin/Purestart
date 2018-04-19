import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Table from 'qnui/lib/table'
import Checkbox from 'qnui/lib/checkbox'
import Pagination from 'qnui/lib/pagination'
import Icon from 'qnui/lib/icon'
import Search from 'qnui/lib/search'
import './main.css'

/**
 * 自定义组件 Ordertabl相关介绍
 * dataSource  数组  表格展示的数据源
 * ItemsSelectedArr 数组 与dataSource内容一一对应 记录的是每条记录的选中状态
 * columnArr  json对象  用于设置表格每列显示内容
 * primaryKey string  dataSource当中数据的主键 设置了才可以实现正确扩展
 * 				{
 * 					title string 标题
 * 					value string 显示的数据对应dataSource中的key
 * 					cell Function(value, index, record, context), ReactElement 行渲染的逻辑 请默认设置为value=>value
 * 					checked bool 默认是否显示
 * 					sortable bool 是否支持排序
 * 					filters Array 生成标题过滤的菜单,格式为[{label:'xxx', value:'xxx'}]
 * 					filterMode string 过滤的模式是单选还是多选,可选值为single,multiple
 * 					width number 设置单元格宽度
 * 				}
 * 	current num 当前页码
 * 	pageSize num 每页显示条数
 * 	total num 总条数
 * 	pageOnChange function 当前页码发生改变时的回调函数，接受修改后的页码值和点击事件对象两个参数， function(value, e) {}
 * 	itemsCheckedOnChange function 当勾选的条目发生变化时的回调函数，接受修改后对应数据源的每条数据对应的勾选状况组成的数组 function(ItemsSelected_arr) {}
 * 	expandedRowRender function 额外渲染的行的函数 同qnui
 * 	onSort function 点击列排序触发的事件 Function(dataIndex, order, sort) 同qnui
 * 	onFilter function 点击过滤触发的事件 Function(filterKeys) 同qnui
 * 	onSearch function 点击搜索或在搜索框内输出回车触发的回调函数 Function(searchValue) searchValue搜索框内的值
 * 	leftBottomComponent function 自定义左下角显示内容 函数返回值应为一个组件
 * 	by zdh
 */

Table.Column.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    })),
}

let Ordertable = React.createClass({
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
    componentWillReceiveProps:function(nextProps){
        let ItemsSelected_arr = nextProps.dataSource.map(function(){
            return false;
        });
        this.setState({ItemsSelected:ItemsSelected_arr});
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
    render:function(){
        let isLoading = this.props.isLoading;
        if(!isLoading){
            isLoading = false;
        }
        let allSelected = true;
        if (this.props.ItemsSelectedArr) {
            if(this.props.ItemsSelectedArr.length == 0){
                allSelected = false;
            }else {
                this.props.ItemsSelectedArr.map(function(value){
                    if(!value){
                        allSelected = false;
                    }
                });
            }
        }
        return (
            <div style={{height:"100%",position:"relative"}}>
                <div style={{textAlign: "right",position: "absolute",right: "0"}}>
                    <Search inputWidth="300px" placeholder="订单号，买家ID，收货信息..." searchText="" onSearch={(value)=>{this.props.onSearch(value.key);}} className="search-style"/>
                    <div onMouseEnter={this.DIYColumnShow} onMouseLeave={this.DIYColumnHide} style={{height:"30px",width:"100px",display:"inline-block",position: "relative",textAlign: "left"}}>
                        <div className={this.state.DIY_column_btn_class}>
                            <img style={{height: "21px",marginBottom: "-6px"}} src="/image/zdyl.png"/>
                            <a href="javascript:void(0);" style={{textDecoration: "initial",color:"#333"}} >自定义列</a>
                        </div>
                        <div style={{border: "1px solid #e1e1e1",padding: "10px",position:"absolute",top: "29px",zIndex: "3",backgroundColor: "white",width: "200px",left: "-100px",display:this.state.isDIYCShow}}>
                        <ul>
                            {
                                this.state.columnArr.map(function(value, index){
                                    return (
                                        <li key={`DIYCheckbox_${index}_${value.checked}`} ><Checkbox defaultChecked={value.checked} onChange={function(checked, e){
                                            if(checked){
                                                this.MakeColumnShow(index);
                                            }else {
                                                this.MakeColumnHide(index);
                                            }
                                        }.bind(this)}>{value.title}</Checkbox>
                                        <span style={{float: "right"}}>
                                            <Icon onClick={function(){this.moveColumnDown(index);}.bind(this)} style={{marginRight: "5px"}} type="arrow-down" size="xs" />
                                            <Icon onClick={function(){this.moveColumnUp(index);}.bind(this)} type="arrow-up"  size="xs"/>
                                        </span></li>
                                    );
                                }.bind(this))
                            }
                        </ul>
                        </div>
                    </div>
                </div>
                <div style={{height: "100%",padding: "50px 0px"}}>
                <Table className="orderTable" dataSource={this.props.dataSource} onSort={this.props.onSort} onFilter={this.itemFilters} expandedRowRender = {this.props.expandedRowRender} isLoading = {isLoading} hasBorder = {false} primaryKey={this.props.primaryKey}>
                    {this.props.ItemsSelectedArr?<Table.Column title={
                        <Checkbox key={`allCheckbox${allSelected}`} defaultChecked={allSelected} onChange={this.setItemsCheckAll} /> } cell={ function(value, index){ return ( <Checkbox key={`itemCheckbox_${index}_${this.props.ItemsSelectedArr[index]}`} defaultChecked={this.props.ItemsSelectedArr[index]}
                            onChange={this.setItemCheck.bind(this,index)}/>); }.bind(this)
                        } width={50}
                    />:null}
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
                <div style={{position: "absolute",bottom: "0",left: "0"}}>
                    {
                        this.props.leftBottomComponent()
                    }
                </div>
                <Pagination style={{position: "absolute",bottom: "0",right: "0"}} current={this.props.current} pageSize={this.props.pageSize} total={this.props.total} onChange={this.props.pageOnChange} />
            </div>
        );
    }
});

export default Ordertable
