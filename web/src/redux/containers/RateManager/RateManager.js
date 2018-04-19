import React,{Component,PropTypes} from 'react'
import Table from 'qnui/lib/table'
import Checkbox from 'qnui/lib/checkbox'
import Button from 'qnui/lib/button';
import Feedback from 'qnui/lib/feedback';

import RateManagerContent from '../../components/RateManager/RateManager'

export default class RateManager extends Component {
  render(){
        return(
              <RateManagerContent />
        );
    }
}
