import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { select,active } from '../actions/Myitem'
import _ from 'lodash';



class Myitem extends Component {
    constructor(props) {
        super(props);
    }
    init(){
        const { kind } = this.props;
        let myItem = kind == 'navigation_min'?this.showItem_min():this.showItem_max();
        return myItem;
    }
    showItem_min(){
        const { kind, icon, text, link, itemId, router, selectType, activeId, activeType, itemMouseOver, itemActive, itemUnline } = this.props;
        //是否处于激活状态
        let active = selectType ? 'nav_link_active next-navigation-item-content-inner ' : 'nav_link next-navigation-item-content-inner';
        //是否包含2级目录
        let sub_activeType = false;
        React.Children.map(this.props.children,function(c){
            React.Children.map(c.props.children,function(e){
                if(e.props.link == router.pathname){
                    return active ='nav_link_active next-navigation-item-content-inner ';
                }
            });
        });

        let sub_img = _.isEmpty(icon)?"":(<i className={`next-icon next-icon-${icon} next-icon-medium next-navigation-item-icon next-navigation-item-custom-icon-ay-min`} >
        </i>);//isEmpty,lodash库函数

        let copy_actvieType = activeId == itemId ? activeType : false;
        //父级导航栏
        let activeType_div = (<div   className={active} >
            {sub_img}
        </div>)
        return (
            <li className={`next-navigation-item`} >
                <div className="next-navigation-item-content">
                        {activeType_div}
                </div>
            </li>
        );
    }
    showItem_max(){
        const { kind, icon, text, link, itemId, router, selectType, activeId, activeType, itemMouseOver, itemActive, itemUnline } = this.props;
        //是否处于激活状态
        let active = selectType ? 'nav_link_active next-navigation-item-content-inner ' : 'nav_link next-navigation-item-content-inner';
        let color = selectType ? '#4EA2E7' : '#3189DC';
        //是否包含2级目录
        let ishavachildren = false;
        let sub_activeType = false;

        React.Children.map(this.props.children,function(c){
            React.Children.map(c.props.children,function(e){
                ishavachildren =true
                if(e.props.link == router.pathname){
                    return sub_activeType =true;
                }
            });
        });

        //子目录
        let children = ishavachildren?(<div className="next-navigation-item-children">{this.props.children}</div>):'';

        let sub_img = _.isEmpty(icon)?"":(<i style={{color:'#ffffff'}} className={`next-icon next-icon-${icon} next-icon-medium next-navigation-item-icon next-navigation-item-custom-icon-ay`} >
            {/* <img style={{width: "12px",color:" #3089dc"}} src={`image/${icon}.png`}/> */}
        </i>);//isEmpty,lodash库函数

        let copy_actvieType = activeId == itemId ? activeType : false;
        //父级导航栏
        let activeType_div = (sub_activeType || selectType)?(
            <div style={{backgroundColor:'#3189DC'}} className="nav_link_unlink next-navigation-item-content-inner" >
                {sub_img}
                <span style={{color:'#ffffff'}} className="next-navigation-item-text">{text}</span>
                <i style={{color:'#ffffff'}} className="next-icon next-icon-arrow-down next-icon-medium next-navigation-item-icon next-navigation-item-leaf-icon"></i>
            </div>):(
                <div style={{backgroundColor:'#3189DC'}} onClick={()=>{itemActive(copy_actvieType)}}  className={active} >
                    {sub_img}
                    <span  style={{color:'#ffffff'}} className="next-navigation-item-text">{text}</span>
                    <i style={{color:'#ffffff'}} className="next-icon next-icon-arrow-down next-icon-medium next-navigation-item-icon next-navigation-item-leaf-icon"></i>
                </div>);
        //子级导航栏
        let sub_activeType_div = (sub_activeType || selectType)?(
            <div  style={{backgroundColor:color}}  className={active} >
                {sub_img}
                <span style={{color:'#ffffff'}} className="next-navigation-item-text"> {text}</span>
            </div>):(
                <Link to={link} onClick={itemMouseOver} className={active} style={{backgroundColor:'#3189DC'}}>
                    {sub_img}
                    <span style={{color:'#ffffff'}} className="next-navigation-item-text"> {text}</span>
                </Link>);
        //合成导航栏 父+子
        let span_sub_icon=(ishavachildren)=>{
            return ishavachildren?activeType_div:sub_activeType_div;
        };

        /**
        activeId：
            当前nav的活跃状态，true即打开中，false即收起中
        copy_actvieType:
            当前的活跃的目录栏是否是操作的活跃目录，true则正常判定，false则已处于活跃的目录收起
        sub_activeType:
            当前nav是否访问2级子目录，为true即正处于子目录，父级目录需打开，反之则收起
        selectType:
            当前的nav‘link是否和router相匹配
        **/
        let next_navigation_item_open = copy_actvieType || sub_activeType || selectType? 'next-navigation-item-opened':'';
        // console.log(itemId+'当前活跃状态：'+copy_actvieType+'   是否子目录:'+sub_activeType +' 是否含有子目录：'+ishavachildren)
        return (
            <li style={{backgroundColor:'#3189DC'}} className={`next-navigation-item ${next_navigation_item_open}`} >
                <div className="next-navigation-item-content">
                        {span_sub_icon(ishavachildren)}
                </div>
                {children}
            </li>
        );
    }
    render(){
        return this.init();
    }
}

function mapStateToProps(state, ownProps){
    return {
        activeType:state.Myitem.active,
        activeId:state.Myitem.id,
        router:state.routing.locationBeforeTransitions,
        selectType:state.routing.locationBeforeTransitions.pathname === ownProps.link
    }
}
function mapDispatchToProps(dispatch,ownProps){
    return {
        itemMouseOver:() => {
            dispatch(select(ownProps.itemId));
        },
        itemActive:(activetype)=>{
            dispatch(active(ownProps.itemId,activetype));
        },
        itemUnline:()=>{
            dispatch(active(ownProps.itemId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Myitem)
