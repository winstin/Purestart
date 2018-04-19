import React,{Component,PropTypes} from 'react'
import Checkbox from 'qnui/lib/checkbox'
import Button from 'qnui/lib/button';
import Feedback from 'qnui/lib/feedback';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Table from 'qnui/lib/table';
import Pagination from 'qnui/lib/pagination';
import ManVip from '../../../components/Messagecon/ManVip'


export default class MVip extends Component {
  render(){
        return(
           <ManVip/>
        );
    }
}
