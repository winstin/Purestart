import React,{Component,PropTypes} from 'react'
import Table from 'qnui/lib/table'
import Checkbox from 'qnui/lib/checkbox'
import StockControl from '../../components/StockControl/StockControl'

export default class Box extends Component {
  render(){
        return(
              <StockControl />
        );
    }
}
