import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Notice from 'qnui/lib/notice';
import Button from 'qnui/lib/button';
import { Group as RadioGroup } from 'qnui/lib/radio';
import Select, {Option} from 'qnui/lib/select';
import Field from 'qnui/lib/field';
import Title from './Title';
import {needCLodop, getLodop} from '../../../static/LodopFuncs'
import * as PrintSetActions from '../../actions/PrintSet'
class PrintSet extends React.Component {
    constructor() {
        super();
        this.state = {
            direction_options: [
                {
                    value: 0,
                    label: '纵向'
                }, {
                    value: 1,
                    label: '横向'
                }
            ],
            paper_options: [
                {
                    value: 0,
                    label: '多联(240x120)'
                }, {
                    value: 1,
                    label: 'A4'
                }, {
                    value: 2,
                    label: 'B5'
                }
            ],
            default_fhd_print:"请选择打印机",
            default_kdd_print:"请选择打印机",
            default_print_direction:0,
            default_print_paper:0,
            isshow : false,
            load_url : "http://q.aiyongbao.com/erp/ay_print_32.zip"
        };
    }
    componentDidMount(){
        const {getPrintSet} = this.props;
        getPrintSet((msg)=>{
            this.showPrinter(msg);
        });
    }
    showPrinter(msg){
        let LODOP = getLodop();
        if(LODOP == 32 || LODOP == 64){
            let notice = document.getElementsByClassName('next-notice')[0];
            let main = document.getElementsByClassName('step4-main')[0];
            notice.style.display = "block";
            main.style.display = "none";
            this.setState(
                {
                    load_url:"http://q.aiyongbao.com/erp/ay_print_"+LODOP+".zip"
                }
            );
        }else{
            this.setState(
                {
                    default_fhd_print:msg.invoice_printer,
                    default_kdd_print:msg.electronic_surface_printer,
                    default_print_direction:msg.invoice_printer_paper_orientation,
                    default_print_paper:msg.invoice_printer_paper_type
                }
            );
            let printer_arr = [];
            let iPrinterCount=LODOP.GET_PRINTER_COUNT();
            for(let i=0;i<iPrinterCount;i++){
                let printer_item = (<Option value={LODOP.GET_PRINTER_NAME(i)}>{LODOP.GET_PRINTER_NAME(i)}</Option>);
                printer_arr.push(printer_item);
            };
            this.setState(
                {
                    printer_arr:printer_arr
                }
            );
            let notice = document.getElementsByClassName('next-notice')[0];
            let main = document.getElementsByClassName('step4-main')[0];
            notice.style.display = "none";
            main.style.display = "block";
        }
    }
    print_test(type){
        let LODOP = getLodop();
        LODOP.PRINT_INIT("爱用打印测试页");
        if(type=="fhd"){
            LODOP.SET_PRINTER_INDEXA(this.state.default_fhd_print);
            LODOP.SET_PRINT_PAGESIZE(1, 0, 0,"A4");
    		LODOP.ADD_PRINT_HTM(26,"5%","90%",109,"当前测试的是发货单打印机<br />打印机:"+this.state.default_fhd_print);
        }else if(type=="kdd"){
            LODOP.SET_PRINTER_INDEXA(this.state.default_kdd_print);
    		LODOP.ADD_PRINT_HTM(26,"5%","90%",109,"当前测试的是电子面单打印机<br />打印机:"+this.state.default_kdd_print);
        }
        // LODOP.PREVIEW();
        LODOP.PRINT();
    }
    onChange(type,checked){
        const {savePrintSet} = this.props;
        if(type=="fhd"){
            this.setState(
                {
                    default_fhd_print:checked
                }
            );
            type = "invoice_printer";
        }else if(type=="kdd"){
            this.setState(
                {
                    default_kdd_print:checked
                }
            );
            type = "electronic_surface_printer";
        }else if(type=="direction"){
            this.setState(
                {
                    default_print_direction:checked
                }
            );
            type = "invoice_printer_paper_orientation";
        }else if(type=="paper"){
            this.setState(
                {
                    default_print_paper:checked
                }
            );
            type = "invoice_printer_paper_type";
        }
        savePrintSet(type,checked);
    }
    field = new Field(this);
    render() {
        const init = this.field.init;
        return (
            <div className="init-step4">
                <div className="next-notice">
                    <Notice type="warning" size="large" className="notice">
                        <p>您还没有安装打印组件，<a href={this.state.load_url}>点击安装</a></p>
                    </Notice>
                </div>
                <div className="step4-main">
                    <Title title="默认打印机" intro={this.state.isshow && '已经帮您同步爱用交易快递单、发货单模版'} />
                    <div>
                        <span className="select-title" style={{float: 'left', margin: '23px 0 0 50px'}}>选择打印机：</span>
                        <Select className="select-content" value={this.state.default_fhd_print} onChange={this.onChange.bind(this,"fhd")}>
                            {this.state.printer_arr}
                        </Select>
                    </div>
                    <div>
                        <div style={{float: 'left', margin: '45px 0 0 50px'}}>发货单</div>
                        <div className="radio-list">
                            <div>
                                <span>纸张方向：</span>
                                <RadioGroup dataSource={this.state.direction_options} value={this.state.default_print_direction} onChange={this.onChange.bind(this,"direction")}/>
                            </div>
                            <div>
                                <span>纸张类型：</span>
                                <RadioGroup dataSource={this.state.paper_options} value={this.state.default_print_paper} onChange={this.onChange.bind(this,"paper")}/>
                            </div>
                        </div>
                        <Button type="secondary" component="a" className="printer-button1" onClick={this.print_test.bind(this,"fhd")}>打印测试页</Button>
                    </div>
                    <Title title="默认面单打印机" intro={this.state.isshow && "已经帮您同步爱用交易面单模版"} />
                    <div>
                        <span className="select-title" style={{float: 'left', margin: '23px 0 0 50px'}}>选择打印机：</span>
                        <Select className="select-content" value={this.state.default_kdd_print} onChange={this.onChange.bind(this,"kdd")}>
                            {this.state.printer_arr}
                        </Select>
                    </div>
                    <Button type="secondary" component="a" className="printer-button2" onClick={this.print_test.bind(this,"kdd")}>打印测试页</Button>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps){
    return {
        printset:state.PrintSet.printset,
        isupdate:state.PrintSet.isupdate
    }
}
function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(PrintSetActions, dispatch) //把state方法绑定到props
}
export default connect(mapStateToProps,mapDispatchToProps)(PrintSet)
