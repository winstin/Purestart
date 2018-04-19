import Dialog from 'qnui/lib/dialog';
import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from 'qnui/lib/checkbox';
import * as MatchCheckActions from '../../../../actions/MatchCheck'
import Mycheckbox from './Mycheckbox';

class MatchCheck extends React.Component{
    constructor(props) {
        super(props);
    }
    changeSS(checked,e){
        console.log(checked);
        console.log(e.target.value);
    }
    render(){
        console.log('渲染check');
        const { area, id, changeS, checkArr, number, listCheckArr} = this.props;
        const areaIndex = ['huadong','huabei','huazhong','huanan','dongbei','xibei','xinan','gangaotai','haiwai2'];
        let ItemArr = [];
        area[id].map(
            (index,key)=>{
                if(index.first == "1"){
                    if(index.value == "gangaotai"){
                        ItemArr.push(
                            <span style={{marginRight: "6px"}}><Checkbox
                                key = {`matchcheck_${index.value}_${index.check}`}
                                 value={index.value} name={index.name}  onChange={(a,b)=>{changeS(a,b,'s',{},number)}}
                            defaultChecked = {index.check}
                            style={{marginLeft:"10px"}} >{index.name}</Checkbox></span>
                        );
                    }else{
                        ItemArr.push(
                            <span style={{marginRight: "20px"}}><Checkbox
                                key = {`matchcheck_${index.value}_${index.check}`}
                                 value={index.value} name={index.name}  onChange={(a,b)=>{changeS(a,b,'s',{},number)}}
                            defaultChecked = {index.check}
                            isCity = {false}
                            style={{marginLeft:"10px"}} >{index.name}</Checkbox></span>
                        );
                    }
                }else{
                    ItemArr.push(
                        <Mycheckbox
                            style={{marginLeft:"10px"}}
                            value={index.value}
                            name={index.name}
                            checkArr={checkArr}
                            checkid={id}
                            checkkey={key}
                            checked = {index.check}
                            IDX = {number}></Mycheckbox>
                    );
                }
            }
        )
        return (
            <div style={{width:"100%"}}>
            {ItemArr}
            </div>
        );
    }
}
function mapStateToProps(state, ownProps){
    return {
        area:state.MatchCheck.area,
        checkArr:state.MatchCheck.checkArr,
        isupdate:state.MatchCheck.isupdate,
        listCheckArr:state.LogisticsMatch.listCheckArr
    }
}
function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(MatchCheckActions, dispatch) //把state方法绑定到props
}

export default connect(mapStateToProps,mapDispatchToProps)(MatchCheck)
