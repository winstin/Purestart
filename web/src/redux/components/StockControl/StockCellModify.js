import React from 'react';
import Input from 'qnui/lib/input';
import Select from 'qnui/lib/select';
import Menu from 'qnui/lib/menu';

// 行内修改（实际库存，成本价）
class ModifyInput extends React.Component {
    state = {
        modify: false,
        InputValue : this.props.value,
    }

    // 单击 span 显示 Input
    handleClick=()=>{
        this.setState({modify: true});
        const Input = this.refs.Input.refs.input;
        setTimeout(function () {
            Input.focus()
        },300)
    }

    componentWillReceiveProps(props,prevProps){
        if (props.value !== prevProps.value) {
            this.setState({InputValue:props.value});
        }
    }

    onChange = (e) =>{
        this.setState({InputValue:this.refs.Input.refs.input.value});
    }

    // 失去焦点或者 onPressEnter 把当前value值传回父组件
    onSave = (e)=>{
        this.setState({modify: false});
        this.props.onSave(e.target.value)
    }

    render() {
        return (
            <div style={{height:32,display:'flex',alignItems:'center'}}>
                <span style={{cursor:'pointer',marginLeft:10,display:this.state.modify?"none":"block"}} onClick={this.handleClick}>{this.state.InputValue}</span>
                <Input ref="Input"
                    size="large"
                    style={{cursor:'pointer',width:120,display:this.state.modify?"block":"none"}}
                    value={this.state.InputValue}
                    onBlur = {this.onSave}
                    onPressEnter={this.onSave}
                    onChange = {this.onChange}
                />
            </div>
        );
    }
}

export {ModifyInput};
