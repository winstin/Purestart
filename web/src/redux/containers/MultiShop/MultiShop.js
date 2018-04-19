import React,{Component,PropTypes} from 'react'
import Checkbox from 'qnui/lib/checkbox';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Search from 'qnui/lib/search';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';

// import StockWarningContent from '../../../components/StockWarning/StockWarning'
var aaa = ['店铺1','店铺2','店铺3','店铺4','店铺5','店铺6','店铺7','店铺8','店铺9','店铺10'];

export default class MultiShop extends Component {
  showWTF(){
    return aaa;
  }

  render() {

      return (
        <div style={{padding:'100px'}}>
          {this.showWTF()}
        </div>
      );
  }
}
