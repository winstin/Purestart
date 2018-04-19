import React from 'react';
import Button from 'qnui/lib/button';


class MatchItem extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
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


export default MatchItem
