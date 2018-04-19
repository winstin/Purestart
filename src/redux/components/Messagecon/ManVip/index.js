import React,{Component,PropTypes} from 'react'
import Checkbox from 'qnui/lib/checkbox'
import Button from 'qnui/lib/button';
import Feedback from 'qnui/lib/feedback';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Table from 'qnui/lib/table';
import Pagination from 'qnui/lib/pagination';
const onChange = function(...args){
    console.log(...args);
},
getData = () =>{
    let result = [];
    for(let i = 0; i< 5; i++){
        result.push({
            title:{
                name: `Quotation for 1PCS Nano ${3+i}.0 controller compatible`,
            },
            id:100306660940+i,
            time: 2000 + i
        })
    }
    return result;
},
render= (value, index, record) => {
    return <a>Remove({record.id})</a>;
},
rowSelection = {
    onChange: onChange,
    getProps: (record) =>{
        return {
            disabled: record.id == 100306660942
        }
    }
}

export default class ManVip extends Component {
  render(){
        return(
            <div>
				<Row>
				    <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>查询条件：</span>
				     <Row>
						<Input placeholder="买家昵称/买家手机" className="textClsName"  size="small" style={{width:'120px',marginTop:'5px'}}/>
						<Input placeholder="买家姓名" className="textClsName"  size="small" style={{width:'66px',marginTop:'5px',marginLeft:'12px'}}/>
						<span style={{fontSize:'14px',marginTop:'7px',width:'70px',marginLeft:'12px'}}>时间选择：</span>
						<RangePicker /><Button type="primary" style={{width:'70px',marginLeft:'10px'}} >搜索</Button>
			        </Row>
				</Row>
				<div style={{marginTop:'15px'}}/>
				<Row>
					<Button type="primary" style={{width:'120px'}} >批量删除</Button>
					<Button type="primary" shape="warning" style={{width:'150px',marginLeft:'12px'}} >一键全店删除</Button>
					<span style={{height:'20px',color:'#4990E2',marginLeft:'12px',cursor:"pointer",marginTop:'7px'}} >设置</span> 
				</Row>
				<div style={{marginTop:'15px'}}/>
				<Row>
					<Table dataSource={getData()}
                       rowSelection={rowSelection}>
				    <Table.Column title="Id" dataIndex="id"/>
				    <Table.Column title="Title" dataIndex="title.name"/>
				    <Table.Column title="Time" dataIndex="time"/>
				    <Table.Column cell={render} width={200}/>
				</Table>
				</Row>
				<div style={{marginTop:'15px'}}/>
				<Pagination defaultCurrent={2} style={{float:'right'}}/>
            </div>
        );
    }
}
