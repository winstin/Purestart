import React,{Component,PropTypes} from 'react'
import Checkbox from 'qnui/lib/checkbox';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';


export default class TradeIndex extends Component {

  componentDidMount(){


  }

  render() {
      console.debug("3______THREE_______数据传进组件了")
      console.log(this.props.data);
      var data = this.props.data;
      return (
        <div style={{paddingTop:'20px'}}>
            订单列表组件xavier918
        </div>
      );
  }
}
