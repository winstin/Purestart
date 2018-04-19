import React,{Component,PropTypes} from 'react'
import Table from 'qnui/lib/table'
import Checkbox from 'qnui/lib/checkbox'
import Button from 'qnui/lib/button';
import Feedback from 'qnui/lib/feedback';

import BatchEvaContent from '../../components/BatchEva/BatchEva'

export default class BatchEva extends Component {
  render(){
        return(
              <BatchEvaContent />
        );
    }
}
