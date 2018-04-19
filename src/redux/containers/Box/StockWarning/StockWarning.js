import React,{Component,PropTypes} from 'react'
import Table from 'qnui/lib/table'
import Checkbox from 'qnui/lib/checkbox'
import StockWarningContent from '../../../components/StockWarning/StockWarning'

export default class StockWarning extends Component {
  render(){
        return(
              <StockWarningContent />
        );
    }
}
