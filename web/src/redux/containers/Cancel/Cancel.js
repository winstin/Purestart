import React,{Component,PropTypes} from 'react'
import {Link} from 'react-router'

export default class Cancel extends Component {
  render(){
    return(
      <div>
          <h1>售后</h1>
          <ul>
              <li> <Link to="http://localhost:3000/refund/todo">待处理</Link></li>
              <li>  <Link to="http://localhost:3000/refund/search">售后查询</Link></li>
              <li>  <Link to="http://localhost:3000/refund/inStock">退货入库</Link></li>
          </ul>
      </div>
    )
  }
}
