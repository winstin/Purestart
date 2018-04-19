/**
*APP组件，整个应用顶级路由

这是整个APP的顶层路由页面，所有的路由都会加载这个页面组件，然后根据路由来匹配this.props.children子页面路由


**/

import React,{Component, PropTypes} from 'react'
import Myitem from '../../components/Myitem'

import Navigation,{Item, Group} from 'qnui/lib/navigation';
import Icon from 'qnui/lib/icon';
import Menu from 'qnui/lib/menu';
import './app.css'

/**
<li> <IndexLink to="/dist/" activeStyle={{color:'red'}}>Home</IndexLink> </li>-->

**/
var App = React.createClass({

    render(){
        return(
            <div id="container">
                <div id="navigation" style={{backgroundColor:"#3189DC"}} className="navigation_max">

                    <Navigation
                    style={{height:'100%',borderWidth:1, borderStyle:"solid ", borderColor:"#3189DC"}}
                    type="tree"
                    activeDirection="right"
                    >
                        <div className="qn-navigation-vertical" style={{background:"#3189DC"}}>
                          <Icon type ="account" />
                          <span>爱用交易</span>
                        </div>
                        <Myitem
                            kind = "navigation_max"
                            itemId="Trade"
                            icon="form"
                            link="/dist"
                            text="商品管理"
                        >
                            <Navigation>
                                  <Myitem
                                      itemId="Trade"
                                      kind = "navigation_max"
                                      link="/dist/TradeIndex"
                                      text="商品管理"
                                      ></Myitem>
                              </Navigation>
                        </Myitem>
                        <Myitem
                            kind = "navigation_max"
                            itemId="Item"
                            icon="store"
                            link="/dist/SendError"
                            text="交易管理"
                        >
                            <Navigation>
                                  <Myitem
                                      itemId="Item"
                                      kind = "navigation_max"
                                      link="/dist/waitWeigh"
                                      text="交易流水查询"
                                      ></Myitem>
                                  {/*<Myitem
                                      itemId="Item"
                                      kind = "navigation_max"
                                      link="/dist/Cancel"
                                      text="自定义打印"
                                      ></Myitem>
                                  <Myitem
                                      itemId="Item"
                                      kind = "navigation_max"
                                      link="/dist/refund/todo"
                                      text="快递模板"
                                      ></Myitem>
                                  <Myitem
                                      itemId="Item"
                                      kind = "navigation_max"
                                      link="/dist/refund/search"
                                      text="发货模板"
                                      ></Myitem>
                                  <Myitem
                                      itemId="Item"
                                      kind = "navigation_max"
                                      link="/dist/refund/storage"
                                      text="商品简称"
                                      ></Myitem>
                                  <Myitem
                                      itemId="Item"
                                      kind = "navigation_max"
                                      link="/dist/Box"
                                      text="打印设置"
                                      ></Myitem>
                                  <Myitem
                                      itemId="Item"
                                      kind = "navigation_max"
                                      link="/dist/stockControl"
                                      text="打印日志"
                                      ></Myitem>*/}
                            </Navigation>
                        </Myitem>
                        <Myitem
                            kind = "navigation_max"
                            itemId="Box"
                            icon="box"
                            link="/dist/Interceptor"
                            text="结算管理"
                        >
                            <Navigation>
                                  <Myitem
                                      itemId="Box"
                                      kind = "navigation_max"
                                      link="/dist/stockControl"
                                      text="商品手续统计"
                                      ></Myitem>
                                  <Myitem
                                      itemId="Box"
                                      kind = "navigation_max"
                                      link="/dist/stockControl"
                                      text="渠道分润统计"
                                      ></Myitem>
                                  <Myitem
                                      itemId="Box"
                                      kind = "navigation_max"
                                      link="/dist/batcheva"
                                      text="收益管理"
                                      ></Myitem>
                            </Navigation>
                        </Myitem>
                        <Myitem
                            itemId="AutoEva"
                            kind = "navigation_max"
                            icon="set"
                            link="/dist/autoeva"
                            text="服务商管理"
                        ></Myitem>
                        <Myitem
                            kind = "navigation_max"
                            itemId="EvaMan"
                            icon="bags"
                            link="/dist/stockCheck"
                            text="服务商费率"
                        >
                        {/*<Navigation>
                              <Myitem
                                  itemId="EvaMan"
                                  kind = "navigation_max"
                                  link="/dist/ratemanager"
                                  text="评价管理"
                                  ></Myitem>
                              <Myitem
                                  itemId="EvaMan"
                                  kind = "navigation_max"
                                  link="/dist/batcheva"
                                  text="批量评价"
                                  ></Myitem>
                          </Navigation>*/}
                        </Myitem>
                        {/*<Myitem
                            kind = "navigation_max"
                            itemId="SmsCare"
                            icon="dollar"
                            link="/dist/Message"
                            text="短信关怀"
                        >
                        </Myitem>
                        <Myitem
                            kind = "navigation_max"
                            itemId="MultiShop"
                            icon="dollar"
                            link="/dist/multishop"
                            text="多店铺管理"
                        >
                        </Myitem>*/}
                        <Myitem
                            kind = "navigation_max"
                            itemId="Setting"
                            icon="set"
                            link="/dist/itemList"
                            text="个人中心"
                        >
                        </Myitem>
                        <Myitem
                            kind = "navigation_max"
                            itemId="Settings"
                            icon="set"
                            link="/dist/itemMatch"
                            text="设置"
                        >
                        </Myitem>
                    </Navigation>
                </div>
                <div id="module_data"  style={{backgroundColor:"white"}}>
                    <div id="initSet" style={{minHeight:"100%",height:"100%",overflow:'auto',backgroundColor:"white"}}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
})
export default App
