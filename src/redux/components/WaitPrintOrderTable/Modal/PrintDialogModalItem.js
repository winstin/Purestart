
import React, { Component, PropTypes } from 'react';
import Button from 'qnui/lib/button';
import PrintPreview from '../../../../components/PrintPreview'
import PrintLogistic from '../../../../components/PrintLogistic'
import DeliveryPreview from '../../../../components/DeliveryPreview'
import DeliveryPrint from '../../../../components/DeliveryPrint'
import ElecFacePreview from '../../../../components/ElecFacePreview'
import ElecFacePrint from '../../../../components/ElecFacePrint'

let PrintDialogModalItem = React.createClass ({
    // getInitialState:function(){
    //     const {getFromValues} = this.props;
    //     let fromValues = getFromValues();
    //     return {kddSpan:fromValues.kddModal,fhdSpan:fromValues.fhdModal};
    // },
    setKddSpan:function(value){
        this.refs.kddSpan.innerText = value;
    },
    render:function(){
        const {title,key,dataSource,getFromValues} = this.props;
        const user_nick = "财宝宝588";
        let fromValues = getFromValues();
        let kddModal = fromValues.kddModal;
        let kddModal_arr = kddModal.split(";");
        let kddSpanValue = "";
        let kddBtns = (<td style={{textAlign:"center"}} width="32%">
            <PrintLogistic setKddSpan={this.setKddSpan} getFromValues={getFromValues} dataSource={dataSource}/>
            <PrintPreview getFromValues={getFromValues} dataSource={dataSource}/>
        </td>);
        if(kddModal_arr[0] == "efModal"){
            kddBtns = (<td style={{textAlign:"center"}} width="32%">
                <ElecFacePrint getFromValues={getFromValues} dataSource={dataSource}/>
                <ElecFacePreview getFromValues={getFromValues} dataSource={dataSource}/>
            </td>);
        }else {
            let printMouldObj = JSON.parse(localStorage.getItem("printModal"+user_nick));
            if(kddModal_arr[0] == "private"){
               printMouldObj.private.map((value)=>{
                   if(value.mouldname == kddModal_arr[1]){
                       kddSpanValue = value.companie.split(",")[0];
                   }
               });
            }else {
               printMouldObj.public.map((value)=>{
                   if(value.mouldname == kddModal_arr[1]){
                       kddSpanValue = value.companie.split(",")[0];
                   }
               });
            }
        }
        return(
            <table key={key} className="PrintDiaglog_table" >
                <tbody>
                <tr>
                    <td rowSpan={2} >
                        {title}
                    </td>
                    <td ref="kddSpan" className="printok" width="50%">
                        {`请放入${kddSpanValue}快递单......`}
                    </td>
                    {kddBtns}
                </tr>
                <tr>
                    <td ref="ffdSpan" className="printok" width="50%">
                        请放入发货单打印纸
                    </td>
                    <td  width="32%">
                        <DeliveryPrint getFromValues={getFromValues} dataSource={dataSource}/>
                        <DeliveryPreview getFromValues={getFromValues} dataSource={dataSource}/>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
});

export default PrintDialogModalItem
