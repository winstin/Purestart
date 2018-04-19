import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'qnui/lib/dialog';
import Feedback from 'qnui/lib/feedback';
import Button from 'qnui/lib/button';
import MatchSkuTable from './MatchSkuTable'

const Toast = Feedback.toast;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            align: 'cc cc',
            footerAlign: 'right',
            style: {
                width: '500px'
            }
        }
    }
    setPosition() {
        this.setState({
            align: false,
            style: {
                top: '10px',
            }
        })
    }

    onClose=()=> this.setState({ visible: false })

    skip(){
        this.setState({visible: false})
    }

    render() {
        const footer = <div className="h-center">
            <Button className="btn-common" type="secondary" component="a"  target="_blank" onClick={this.skip.bind(this)}>跳过</Button>
            &nbsp;&nbsp;&nbsp;
            <Button className="btn-common" type="primary" onClick={this.props.match}>
                开始匹配
            </Button>
        </div>
        return (
            <Dialog visible={this.state.visible} footer={footer} style={this.state.style} align={this.state.align} onClose = {this.onClose} footerAlign = {this.state.footerAlign}>
                <div style={{height:180}} className="init-step5">
                    <div style={{float:'left'}}>
                        <img src="http://q.aiyongbao.com/item/web/img/nodata.png" alt="" width="150" />
                    </div>
                    <div style={{width:'60%',float:'left',paddingTop:10,marginLeft:20}}>
                        <h3>在您绑定的3家店铺中,以为您找到23对疑似相同的商品,是否要进行商品匹配</h3>
                        <p style={{color:'#ff0000'}}>*标记为同一件商品,在列表中展示一条信息</p>
                        <br/>
                        <br/>
                    </div>
                </div>
            </Dialog>
        )
    }
}

class ItemList extends React.Component{
    render(){
        return(
            <div className="init-step5-item">
                <h4 className="item-title">
                    <span><img src={'image/taobao.png'} alt=""/>森马小店</span>
                    <span>货号: 5566-KBS</span>
                    <span>编码: KBS-5983</span>
                </h4>
                1123
                <ul className="img-wrap">
                    <li><img src="http://cbu01.alicdn.com/img/ibank/2016/413/199/3176991314_1606139362.310x310.jpg" width="120" height="120"/></li>
                    <li><img src="http://cbu01.alicdn.com/img/ibank/2016/413/199/3176991314_1606139362.310x310.jpg" width="120" height="120"/></li>
                    <li><img src="http://cbu01.alicdn.com/img/ibank/2016/413/199/3176991314_1606139362.310x310.jpg" width="120" height="120"/></li>
                    <li><img src="http://cbu01.alicdn.com/img/ibank/2016/413/199/3176991314_1606139362.310x310.jpg" width="120" height="120"/></li>
                    <li><img src="http://cbu01.alicdn.com/img/ibank/2016/413/199/3176991314_1606139362.310x310.jpg" width="120" height="120"/></li>
                    <li><img src="http://cbu01.alicdn.com/img/ibank/2016/413/199/3176991314_1606139362.310x310.jpg" width="120" height="120"/></li>
                </ul>
                <div>
                    <Button style={{padding:'0 10px',marginLeft:5}} type="normal">x</Button>
                    <Button style={{padding:'0 10px',marginLeft:5}} type="normal">x</Button>
                    <Button style={{padding:'0 10px',marginLeft:5}} type="normal">x</Button>
                    <Button style={{padding:'0 10px',marginLeft:5}} type="normal">x</Button>
                    <Button style={{padding:'0 10px',marginLeft:5}} type="normal">x</Button>
                </div>
                <ul className="img-wrap-small">
                    <li><img src="http://cbu01.alicdn.com/img/ibank/2016/413/199/3176991314_1606139362.310x310.jpg" width="30"/></li>
                    <li><img src="http://cbu01.alicdn.com/img/ibank/2016/413/199/3176991314_1606139362.310x310.jpg" width="30"/></li>
                    <li><img src="http://cbu01.alicdn.com/img/ibank/2016/413/199/3176991314_1606139362.310x310.jpg" width="30"/></li>
                </ul>
                <p>天天特价。。。。。。。。。。。。。。。。。。。。。。。。</p>
            </div>
        )
    }
}

export default class GoodsMatch extends React.Component{
    constructor(){
        super()
        this.state = {
            first : true
        }
    }
    match(){
        this.setState({first: false})
        Toast.success('匹配成功')
    }
    render(){
        return(
            <div className="init-step5">
                {this.state.first?<App match={this.match.bind(this)}/>:<div style={{display:'flex'}}><ItemList /><ItemList /></div>}
                <MatchSkuTable />
            </div>
        )
    }
}
