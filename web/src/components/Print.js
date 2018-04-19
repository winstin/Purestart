import React from 'react'
import {needCLodop, getLodop} from '../static/LodopFuncs'
import ContentDiv from './ContentDiv'
import Checkbox from 'qnui/lib/checkbox'
import './main.css'


let Print = React.createClass({
    getInitialState:function(){
        let print_modal = "啊手段地,50,50,50,50,20,宋体,border,false;群文件呢呀山东矿机,150,50,100,100,18,宋体,normal,false;期间走我们,300,100,100,50,20,黑体,border,false";
        let print_modal_arr = print_modal.split(";").map(function(value){
            let print_modal_item = value.split(",").map(data=>data);
            print_modal_item.push(true);
            return print_modal_item;
        });
        console.log(print_modal_arr);
        return {print_modal_arr:print_modal_arr};
    },
    printDemo:function(){
        let LODOP = getLodop();
		LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
        LODOP.ADD_PRINT_TABLE(128,"5%","90%",314,strStyle+document.getElementById("delivery_page_table").innerHTML);
		LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
		LODOP.ADD_PRINT_HTM(26,"5%","90%",109,document.getElementById("delivery_page_head").innerHTML);
		LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
		LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
	    LODOP.ADD_PRINT_HTM(444,"5%","90%",54,document.getElementById("delivery_page_foot").innerHTML);
		LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
		LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
        LODOP.PREVIEW();
        // LODOP.PRINT();
    },
    render:function(){
        return (
            <div style={{border: "2px solid",padding:"10px",display:"inline-block"}}>
                <div style={{width: "200px",height: "500px",float: "left",border: "1px solid",margin: "5px"}}>
                {
                    this.state.print_modal_arr.map((value,index)=>{
                        return (
                            <div>
                                <Checkbox defaultChecked={value[9]} onChange={(checked)=>{
                                    let new_print_modal_arr = [...this.state.print_modal_arr];
                                    new_print_modal_arr[index][9] = checked;
                                    this.setState({print_modal_arr:new_print_modal_arr});
                                }}>{value[0]}</Checkbox>
                            </div>
                        );
                    })
                }
                </div>
                <div id="print_div" style={{width: "500px",height: "500px",float: "left",border: "1px solid",margin: "5px"}}>
                    <div style={{width: "500px",height: "500px",position:"relative"}}>
                        {
                            this.state.print_modal_arr.map((value)=>{
                                if(value[9]){
                                    return (
                                        <ContentDiv con_width={500} con_height={500} top={parseInt(value[1])} left={parseInt(value[2])} height={parseInt(value[3])} width={parseInt(value[4])} fontSize={value[5]+"px"} fontFamily={value[6]} fontWeight={value[7]} content={value[0]}/>
                                    );
                                }
                            })
                        }
                    </div>
                </div>
                <button onClick={this.printDemo}>打印</button>
            </div>
        );
    }
});

export default Print
