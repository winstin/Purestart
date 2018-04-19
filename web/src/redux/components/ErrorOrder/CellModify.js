import React from 'react';
import Input from 'qnui/lib/input';
import Select from 'qnui/lib/select';
import Dropdown from 'qnui/lib/dropdown';
import Menu from 'qnui/lib/menu';
import logistics from '../../../static/logistics'
import {getLogistics_name} from './Dialogs'


// 收件电话修改
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
                    defaultValue={this.state.InputValue}
                    onBlur = {this.onSave}
                    onPressEnter={this.onSave}
                    onChange = {this.onChange}
                />
            </div>
        );
    }
}



//行内编辑 物流
class ModifyLogistics extends React.Component {
    state = {
        modify: false,
        value: this.props.value
    }

    // handleClick=()=>{
    //     this.setState({modify: true})
    // }

    onChange=(value)=>{
        // this.setState({
        //     modify: false,
        //     value: this.props.value
        // })
        this.props.onSave(getLogistics_name(Number(value)))
    }

    render() {
        return(

            <div>
                <Dropdown
                    trigger={<span>{this.props.value}</span>}
                    triggerType="click"
                    align = "tl bl"
                    afterOpen={()=>{console.log(123);}}
                    >
                    <Menu style={{width:150}} onClick={this.onChange}>
                        {logistics.map((data)=>(
                            <Menu.Item key={data.log_id} value={data.log_id}>{data.log_name}</Menu.Item>
                        ))}
                    </Menu>
                </Dropdown>
            </div>
            //
            //
            // <div onBlur={()=>{console.log(1);}}>
            //     <span style={{display:this.state.modify?"none":"block"}} onClick={this.handleClick}>{this.props.value}</span>
            //     <Select
            //         defaultValue={this.props.value}
            //         style={{width:120,marginLeft:-9,display:this.state.modify?"block":"none"}}
            //         onChange={this.onChange}
            //         onBlur ={()=>{console.log(22222);}}
            //     >
            //         {logistics.map((data)=>(
            //             <li key={data.log_id} value={data.log_id}>{data.log_name}</li>
            //         ))}
            //     </Select>
            // </div>
        )
    }
}

export {ModifyInput,ModifyLogistics};
