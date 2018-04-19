import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Button from 'qnui/lib/button';
import 'qnui/lib/grid/index.css';
import { Row, Col } from 'qnui/lib/grid';
import './Message.css';
import Messagecon from '../../components/Messagecon'
class Mes extends Component {
	constructor(props, context){
        super(props, context);
    }
    render(){
        return (
        	<Messagecon/>
        );
    }
}

export default Mes
