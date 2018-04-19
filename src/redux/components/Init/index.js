import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Step, { Item as StepItem } from 'qnui/lib/step';
import Button, { Group as ButtonGroup } from 'qnui/lib/button';
import Field from 'qnui/lib/field';
import './style.css';
import TradeSync from './TradeSync/TradeSync';
import CheckOrders from './CheckOrders/CheckOrders';
import LogisticsMatch from './LogisticsMatch/LogisticsMatch';
import PrintSet from './PrintSet';
import GoodsMatch from './GoodsMatch/GoodsMatch';
class Init extends React.Component {
    constructor() {
        super();
        this.state = {
            currentStep: 0,
        };
    }
    next() {
        const s = this.state.currentStep + 1;
        this.setState({
            currentStep: s > 4 ? 4 : s
        });
    }
    prev() {
        const s = this.state.currentStep - 1;
        this.setState({
            currentStep: s < 0 ? 0 : s
        });
    }
    onClick(currentStep) {
        this.setState({
            currentStep: currentStep
        });
    }
    field = new Field(this);
    render() {
        const {currentStep} = this.state;
        const init = this.field.init; //如果使用简写不能缺少bind
        const steps_title = ['订单同步','智能审单','物流匹配','打印机设置','商品匹配']
        const Steps = { 0: <TradeSync />, 1: <CheckOrders />,2: <LogisticsMatch />, 3: <PrintSet />,4: <GoodsMatch /> }

        return (
            <div className="init">
                <Step current={currentStep}>
                    {steps_title.map((item,i)=><StepItem title={item} key={i} onClick={this.onClick.bind(this)} />)}
                </Step>

                <div className="init-content">
                    {Steps[currentStep]}
                </div>

                <div className="btn-step">
                    <ButtonGroup>
                        <Button onClick={this.prev.bind(this)} type="primary" disabled={currentStep === 0}>上一步</Button>
                        <Button onClick={this.next.bind(this)} type="primary" disabled={currentStep === 4}>下一步</Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default Init
