import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Icon from 'qnui/lib/icon';
import Checkbox from 'qnui/lib/checkbox';
const { Group: CheckboxGroup } = Checkbox;
import * as MatchCheckActions from '../../../../actions/MatchCheck'

var Gchina = {};

class Mycheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDIYCShow:"none",
            DIY_column_btn_class:"mycheckbox_style_false",
        };
    }
    DIYColumnShow(){
        this.setState({isDIYCShow:"block",DIY_column_btn_class:"mycheckbox_style_true"});
    }
    DIYColumnHide(){
        this.setState({isDIYCShow:"none",DIY_column_btn_class:"mycheckbox_style_false"});
    }
    render(){
        let number = 4;
        const {area, value, name, checked, checkid, checkkey, checkArr, changeS, listCheckArr, IDX} = this.props;
        let check = true; //市级是否全选
        let list = [];//所有地区级checkbox集合
        let sum = 0;//计数器
        area[value].map(
            (c,index)=>{
                if(typeof(c)==='string'){
                    var ishas = false;
                    if(IDX){
                        for(var i in listCheckArr[IDX][name]){
                            var city = listCheckArr[IDX][name][i];
                            if(c.indexOf(city)>-1){
                                ishas = true;
                            }
                        }
                    }
                    if(ishas){
                        c = {check:true,name:c};
                    }else{
                        c = {check:false,name:c};
                    }
                }
                area[index] = c;
                c.check ? sum++:'';
                let checkbox = (
                    <span style={{flexGrow:"2"}}><Checkbox key={`mycheckbox_list_${index}_${c.check}`}
                        defaultChecked ={c.check}
                        onChange={(a,b)=>{changeS(a,b,'a',{id:value,key:index,sid:checkid},IDX)}}
                        value = {value}
                    >{c.name}</Checkbox></span>
                )
                list.push(checkbox);
            }
        )
        let Icheck = sum > 0 ? (checked ? false : true) : false;// 市级半选状态
        return (
            <div onMouseLeave={this.DIYColumnHide.bind(this)}  style={{height:"20px",width:"100px",display:"inline-block",position: "relative",textAlign: "left"}}>
                <div className={this.state.DIY_column_btn_class}>
                    <Checkbox key={`checkbox${name}${checked}${Icheck}`}
                        defaultChecked = {checked}
                        defaultIndeterminate = {Icheck}
                        onChange={(a,b)=>{changeS(a,b,'c',{id:checkid,key:checkkey},IDX)}}
                        value={value}
                        name={name}
                        style={{marginLeft:"10px"}}>{name}</Checkbox>
                    <span style={{display:"none"}}>({this.state.number})</span>
                    <Icon onMouseOver={this.DIYColumnShow.bind(this)}  type="arrow-down" size="xxs" />
                </div>
                <div     style={{border: "1px solid #e1e1e1",padding: "5px",position:"absolute",top: "25px",zIndex: "3",backgroundColor: "white",width: "220px",left: "-100px",display:this.state.isDIYCShow}}>
                    <div style={{display:"flex",flexWrap: "wrap"}}>
                        {list}
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps){
    return {
        area:state.MatchCheck.area,
        listCheckArr:state.LogisticsMatch.listCheckArr
    }
}
function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(MatchCheckActions, dispatch) //把state方法绑定到props
}

export default connect(mapStateToProps,mapDispatchToProps)(Mycheckbox)
