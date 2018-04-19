
import React, { Component, PropTypes } from 'react';
import Button from 'qnui/lib/button';

export default class PrintDialogModalItem extends Component {

    render(){
        const {title,key} = this.props;

        return(
            <table key={key} className="PrintDiaglog_table" >
                <tbody>
                <tr>
                    <td rowSpan={2} >
                        {title}
                    </td>
                    <td className="printok" width="50%">
                        已成功打印20张圆通快递单
                    </td>
                    <td style={{textAlign:"center"}} width="32%">
                        <Button type="normal"  style={{marginRight:"10px"}}>
                            重新打印
                        </Button>
                        <Button type="normal"  >
                            查看订单
                        </Button>
                    </td>
                </tr>
                <tr>
                    <td className="printok" width="50%">
                        已成功打印20张发货单
                    </td>
                    <td  width="32%">
                        <Button type="normal"  style={{marginRight:"10px"}}>
                            重新打印
                        </Button>
                        <Button type="normal"  >
                            查看订单
                        </Button>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}
