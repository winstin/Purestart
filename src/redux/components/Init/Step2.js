import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from 'qnui/lib/checkbox';
import Item from './Item';
import Title from './Title';

export default function Step2() {
    const types = [
        {
            type: '物流信息',
            options: [
                { option:'付', tip: '货到付款的订单' }
            ]
        },
        {
            type: '订单信息',
            options: [
                { option:'留',tip:'有买家留言的订单'},
                { option:'备',tip:'有客服备注的订单'},
                { option:'赠',tip:'有多条赠品规则的订单'},
                { option:'合',tip:'已合并的订单'},
                { option:'票',tip:'需要开发票的订单'}
            ]
        },
        {
            type: '买家信息',
            options: [
                { option:'退',tip:'有部分退款的订单'},
                { option:'改',tip:'修改过地址或者规格的订单'},
                { option:'负',tip:'利润为负的订单'}
            ]
        }
    ]
    return (
        <div className="init-step2">
            <Title title="请选择您需要审核的订单类型:"/>
            {
                types.map((item,i)=>(
                    <div className="switch-line" key={i}>
                        <div className="switch-title">{item.type}</div>
                        <Item item={item.options}/>
                    </div>
                ))
            }
            <br/>
            <br/>
            <Title title="请选择订单展示方式:"/>
            <div style={{marginTop:30,marginLeft:100}}>
                <Checkbox>
                    收获信息一致的多笔订单自动合并
                </Checkbox>
            </div>
            <br/>
            <br/>
        </div>
    )
}
