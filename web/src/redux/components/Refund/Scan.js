import React from 'react';
import {Input} from 'qnui';
import {browserHistory} from 'react-router'

class Scan extends React.Component {

    render() {
        const style = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flexDirection : 'column'
        }
        return (
            <div style={style}>
                <div>
                    <span style={{fontWeight:900,fontSize:'16px'}}>请扫描物流单号：</span>
                    <Input size="large" onPressEnter={()=>{browserHistory.push('/refund/detail')}} placeholder="请扫描物流单号" />
                </div>
                <div style={{marginTop:100}}>
                    <img src="/image/storage.png" alt="" height={200} />
                </div>
            </div>
        );
    }

}

export default Scan;
