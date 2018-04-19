import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Button from 'qnui/lib/button';
import 'qnui/lib/grid/index.css';
import { Row, Col } from 'qnui/lib/grid';
import './../CfSetting/cf.css';
import Select, {Option} from 'qnui/lib/select';
import Checkbox from 'qnui/lib/checkbox';
import Radio,{ Group as RadioGroup } from 'qnui/lib/radio';
import Feedback from 'qnui/lib/feedback';
import Step, { Item as StepItem } from 'qnui/lib/step';
import Input from 'qnui/lib/input';
import Table from 'qnui/lib/table';
import 'qnui/lib/table/index.css';
import 'qnui/lib/pagination/index.css';
import Pagination from 'qnui/lib/pagination';
import Send from '../../../components/Messagecon/Send'

const onRowClick = function(record, index, e){
    console.log(record, index, e);
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
}
class AllSend extends Component {
	
	render(){
		  return (
        	<Send/>
        );
	}
} 
      

export default AllSend
