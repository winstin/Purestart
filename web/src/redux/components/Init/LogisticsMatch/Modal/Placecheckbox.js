import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Checkbox from 'qnui/lib/checkbox';
import Mycheckbox from './Mycheckbox';


var Gchina = {};
Gchina.huadong=[{"value":"huadong","name":"华东","check":false,"first":"1"},{"value":"shanghai","name":"上海","check":false,"first":"0"},{"value":"jiangsu","name":"江苏","check":false,"first":"0"},{"value":"zhejiang","name":"浙江","check":false,"first":"0"},{"value":"anhui","name":"安徽","check":false,"first":"0"},{"value":"jiangxi","name":"江西","check":false,"first":"0"}];
Gchina.huabei=[{"value":"huabei","name":"华北","check":false,"first":"1"},{"value":"beijing","name":"北京","check":false,"first":"0"},{"value":"tianjin","name":"天津","check":false,"first":"0"},{"value":"shanxi","name":"山西","check":false,"first":"0"},{"value":"shandong","name":"山东","check":false,"first":"0"},{"value":"hebei","name":"河北","check":false,"first":"0"},{"value":"neimenggu","name":"内蒙古","check":false,"first":"0"}];
Gchina.huazhong=[{"value":"huazhong","name":"华中","check":false,"first":"1"},{"value":"hunan","name":"湖南","check":false,"first":"0"},{"value":"hubei","name":"湖北","check":false,"first":"0"},{"value":"henan","name":"河南","check":false,"first":"0"}];
Gchina.huanan=[{"value":"huanan","name":"华南","check":false,"first":"1"},{"value":"guangdong","name":"广东","check":false,"first":"0"},{"value":"guangxi","name":"广西","check":false,"first":"0"},{"value":"fujian","name":"福建","check":false,"first":"0"},{"value":"hainan","name":"海南","check":false,"first":"0"}];
Gchina.dongbei=[{"value":"dongbei","name":"东北","check":false,"first":"1"},{"value":"liaoning","name":"辽宁","check":false,"first":"0"},{"value":"jilin","name":"吉林","check":false,"first":"0"},{"value":"heilongjiang","name":"黑龙江","check":false,"first":"0"}];
Gchina.xibei=[{"value":"xibei","name":"西北","check":false,"first":"1"},{"value":"shanxi","name":"陕西","check":false,"first":"0"},{"value":"xinjiang","name":"新疆","check":false,"first":"0"},{"value":"gansu","name":"甘肃","check":false,"first":"0"},{"value":"ningxia","name":"宁夏","check":false,"first":"0"},{"value":"qinghai","name":"青海","check":false,"first":"0"}];
Gchina.xinan=[{"value":"xinan","name":"西南","check":false,"first":"1"},{"value":"chongqing","name":"重庆","check":false,"first":"0"},{"value":"yunnan","name":"云南","check":false,"first":"0"},{"value":"guizhou","name":"贵州","check":false,"first":"0"},{"value":"xizang","name":"西藏","check":false,"first":"0"},{"value":"sichuan","name":"四川","check":false,"first":"0"}];
Gchina.gangaotai=[{"value":"gangaotai","name":"港澳台","check":false,"first":"1"},{"value":"xianggang","name":"香港","check":false,"first":"0"},{"value":"aomen","name":"澳门","check":false,"first":"0"},{"value":"taiwan","name":"台湾","check":false,"first":"0"}];
Gchina.haiwai2=[{"value":"haiwai","name":"海外","check":false,"first":"1"},{"value":"haiwai","name":"海外","check":false,"first":"0"}];
class Placecheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            area:Gchina,
            checked:false
        };
    }
    onChange(){
        this.state.checked = !this.state.checked;
        this.setState(this.state);

    }

    render(){
        const { value } = this.props;
        return (
            <div>
            {
                this.state.area[value].map(
                    function(index){
                        if(index.first == "1"){
                            if(value == "gangaotai"){
                                return(
                                    <span style={{marginRight: "6px"}}><Checkbox  checked = {this.state.checked} style={{marginLeft:"10px"}} onChange={this.onChange.bind(this)}>{index.name}</Checkbox></span>
                                );
                            }else{
                                return(
                                    <span style={{marginRight: "20px"}}><Checkbox  checked = {this.state.checked} style={{marginLeft:"10px"}} onChange={this.onChange.bind(this)} >{index.name}</Checkbox></span>
                                );
                            }
                        }else{
                            return(
                                <Mycheckbox  style={{marginLeft:"10px"}} value={index.value} name={index.name} checked={this.state.checked}></Mycheckbox>
                            );
                        }
                    }.bind(this)
                )
            }
            </div>
        );
    }
}
export default Placecheckbox
