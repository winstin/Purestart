import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Button from 'qnui/lib/button'
import Search from 'qnui/lib/search'
import Table from 'qnui/lib/table'
import Dialog from 'qnui/lib/dialog'
import Input from 'qnui/lib/input'
import Icon from 'qnui/lib/icon'
import Checkbox from 'qnui/lib/checkbox'
import Select, {Option} from 'qnui/lib/select'
import ContentDiv from '../../../../components/ContentDiv'
import ContentDivPre from '../../../../components/ContentDivPre'
import Feedback from 'qnui/lib/feedback'
import * as LogisticModalActions from '../../../actions/LogisticModal'


/**
 * private 个人
 * public 公共
 */
class LogisticModal extends Component {
    componentDidMount(){
        const {getModalByType} = this.props;
        getModalByType("private");
    }
    changeModal(modalType){
        const {getModalByType} = this.props;
        getModalByType(modalType);
    }
    changeDialogShow(isShow){
        const {setDialogShow} = this.props;
        setDialogShow(isShow);
    }
    changeImageShow(isShow){
        const {setImageShow} = this.props;
        setImageShow(isShow);
    }
    itemIsChecked(item_id){
        let checked = false;
        const {mouldContent} = this.props;
        mouldContent.mould.map((value)=>{
            if(value[0] == item_id){
                checked = true;
            }
        });
        return checked
    }
    itemChangeChecked(item_id,checked){
        const {mouldContent, setNewMould} = this.props;
        let mould_arr = mouldContent.mould;
        if(checked){
            mould_arr.push([item_id,"50","100","16","80","20","宋体","normal","false"]);
        }else {
            for(let index in mould_arr){
                if(mould_arr[index][0] == item_id){
                    mould_arr.splice(index,1);
                    break;
                }
            }
        }
        setNewMould({...mouldContent,mould:mould_arr});
    }
    /**
     * 改变格式
     * [item_id,"50","100","16","80","20","宋体","normal","false"]
     * id,top,left,fontSize,width,height,fontFamily,fontWeight,换行
     *type 改变的项
     *value 改变的值
     *fontSize 字号
     *fontFamily 字体
     *fontWeight 加粗
     *delete 删除
     */
    itemChangeStatus(type,value){
        const {selectedItem, mouldContent,setNewMould,deleteMouldItem} = this.props;
        if(selectedItem != ""){
            let mould_arr = mouldContent.mould;
            let selected_index;
            for(let index in mould_arr){
                if(mould_arr[index][0] == selectedItem){
                    selected_index = index;
                    break;
                }
            }
            switch (type) {
                case "fontSize":
                    mould_arr[selected_index][3] = value;
                    setNewMould({...mouldContent,mould:mould_arr});
                    break;
                case "fontFamily":
                    mould_arr[selected_index][6] = value;
                    setNewMould({...mouldContent,mould:mould_arr});
                    break;
                case "fontWeight":
                    if(mould_arr[selected_index][7] == "normal"){
                        mould_arr[selected_index][7] = "bolder";
                    }else {
                        mould_arr[selected_index][7] = "normal";
                    }
                    setNewMould({...mouldContent,mould:mould_arr});
                    break;
                case "delete":
                    mould_arr.splice(selected_index,1);
                    deleteMouldItem({...mouldContent,mould:mould_arr});
                    break;
                default:

            }
        }
    }

    /**
     * 存储每项的位置和大小
     * [item_id,"50","100","16","80","20","宋体","normal","false"]
     * id,top,left,fontSize,width,height,fontFamily,fontWeight,换行
     */
    setItemPositionAndSize(item_id,top,left,width,height){
        const {mouldContent,setNewMould} = this.props;
        let mould_arr = mouldContent.mould;
        for(let index in mould_arr){
            if(mould_arr[index][0] == item_id){
                mould_arr[index][1] = top;//top
                mould_arr[index][2] = left;//left
                mould_arr[index][4] = width;//width
                mould_arr[index][5] = height;//height
                break;
            }
        }
        setNewMould({...mouldContent,mould:mould_arr});
    }

    changeCompanie(value){
        const {mouldContent,setNewMould} = this.props;
        setNewMould({...mouldContent,companie:value});
    }
    /**
     * 改变模板大小和偏移量
     * type offset  size
     * item type下对应的项
     * value 值
     */
    changeSizeAndMove(type,item,value){
        const {mouldContent,setNewMould} = this.props;

        if(type == "offset"){/*offset*/
            if(item == "v"){/*v 垂直*/
                setNewMould({...mouldContent,offset:{...mouldContent.offset,v:value}});
            }else {/*h 水平*/
                setNewMould({...mouldContent,offset:{...mouldContent.offset,h:value}});
            }
        }else {/*size*/
            if(item == "width"){/*width*/
                setNewMould({...mouldContent,size:{...mouldContent.size,width:value}});
            }else {/*height*/
                setNewMould({...mouldContent,size:{...mouldContent.size,height:value}});
            }
        }
    }
    changeMouldName(value){
        const {mouldContent,setNewMould} = this.props;
        setNewMould({...mouldContent,mouldname:value});
    }
    /**
     * 设置偏离量
     */
    changeOffsetByBtn(btn_id){
        const {mouldContent} = this.props;
        switch (btn_id) {
            case "up":
                let up_v = mouldContent.offset.v;
                this.changeSizeAndMove("offset","v",--up_v);
                break;
            case "down":
                let down_v = mouldContent.offset.v;
                this.changeSizeAndMove("offset","v",++down_v);
                break;
            case "left":
                let left_h = mouldContent.offset.h;
                this.changeSizeAndMove("offset","h",--left_h);
                break;
            case "right":
                let right_h = mouldContent.offset.h;
                this.changeSizeAndMove("offset","h",++right_h);
                break;
            default:

        }
    }

    /**
     * id换名称
     */
    getNameByItemId(item_id){
        let item_name = "";
        switch (item_id) {
            case "s_shi":item_name = "目的地";break;
            case "sname":item_name = "收货人";break;
            case "saddress":item_name = "收货地址";break;
            case "scompany":item_name = "收货公司";break;
            case "sphone":item_name = "收货方电话";break;
            case "smobile":item_name = "收货方手机";break;
            case "SpostCode":item_name = "收货方邮编";break;
            case "to_province":item_name = "收货方省";break;
            case "to_city":item_name = "收货方市";break;
            case "to_district":item_name = "收货方区";break;
            case "buyerNick":item_name = "买家旺旺";break;
            case "buyerMessage":item_name = "买家留言";break;
            case "btitle":item_name = "货品名称";break;
            case "totalPrices":item_name = "货品总价";break;
            case "reallyMoney":item_name = "实付价格";break;
            case "goods_number":item_name = "货号";break;
            case "gNumAndbPro":item_name = "货号+属性";break;
            case "f_shi":item_name = "始发地";break;
            case "fname":item_name = "发货人";break;
            case "faddress":item_name = "发货地址";break;
            case "fcompany":item_name = "发货公司";break;
            case "fphone":item_name = "发货方电话";break;
            case "fmobile":item_name = "发货方手机";break;
            case "FpostCode":item_name = "发货方邮编";break;
            case "names":item_name = "发货方签名";break;
            case "date":item_name = "发货日期";break;
            case "ballnum":item_name = "货品总量";break;
            case "bproperty":item_name = "货品属性";break;
            case "orderNumber":item_name = "订单编号";break;
            case "benefit":item_name = "优惠";break;
            case "sellerRemark":item_name = "备注";break;
            case "goods_short_name":item_name = "商品简称";break;
            case "gShortNamAndbPro":item_name = "商品简称+属性";break;
            default:item_name = "zdy_item";

        }
        return item_name;
    }

    /**
     * 添加自定义内容
     * [item_id,"50","100","16","80","20","宋体","normal","false",""]
     */
    addZdyItem(zdy_value){
        const {mouldContent,addZdyItem} = this.props;
        let zdy_num = 0;
        let mould_arr = mouldContent.mould;
        mould_arr.map((value)=>{
            if(value.length == 10){
                zdy_num++;
            }
        });
        zdy_num++;
        mould_arr.push([`zdy_div_${zdy_num}`,"50","100","16","80","20","宋体","normal","false",zdy_value]);
        addZdyItem({...mouldContent,mould:mould_arr});
    }

    editPrintTemplate(index){
        const {modalData, editTemplate} = this.props;
        let mould_arr = modalData[index].mould.split(";").map((value)=>{
            return value.split(",").map(value=>value);
        })
        let offset_arr = modalData[index].offset.split("X");
        let size_arr = modalData[index].size.split("X");

        let mouldContent = {
            companie:modalData[index].companie,
            moprice:modalData[index].moprice,
            mould:mould_arr,
            mouldname:modalData[index].mouldname,
            offset:{
                v:parseInt(offset_arr[0]),
                h:parseInt(offset_arr[1])
            },
            size:{
               width:parseInt(size_arr[0]),
               height:parseInt(size_arr[1])
            }
        };
        editTemplate(mouldContent);
    }

    previewMould(index){
        const {modalData, previewMould} = this.props;
        let mould_arr = modalData[index].mould.split(";").map((value)=>{
            return value.split(",").map(value=>value);
        })
        let offset_arr = modalData[index].offset.split("X");
        let size_arr = modalData[index].size.split("X");

        let mouldContent = {
            companie:modalData[index].companie,
            moprice:modalData[index].moprice,
            mould:mould_arr,
            mouldname:modalData[index].mouldname,
            offset:{
                v:parseInt(offset_arr[0]),
                h:parseInt(offset_arr[1])
            },
            size:{
               width:parseInt(size_arr[0]),
               height:parseInt(size_arr[1])
            }
        };
        previewMould(mouldContent);
    }

    setDefaultMould(type, value){
        console.log(type);
        const {setDefaultPri, setDefaultPub} = this.props;
        if(type == "private"){
            setDefaultPri(value);
        }else {
            setDefaultPub(value);
        }
    }
    render(){
        /**
         * modalData 当前模板类型的所有模板
         * modalType 模板类型
         * isShow 编辑模板是否显示
         * isImageShow 上传图片是否显示
         * mouldContent 正在编辑的模板内容
         * selectedItem 编辑模板选中项
         * setSelectedItem
         * isZdyShow 添加自定义项显示
         * isPreShow 预览显示
         * setZdyShow
         * saveTemplate
         */
        const {modalData, modalType, isShow, isImageShow, mouldContent, selectedItem, setSelectedItem, isZdyShow, setZdyShow, saveTemplate, isPreShow, setPreShow} = this.props;
        let selected_fontSize = null;
        let selected_fontFamily = null;
        for(let index in mouldContent.mould){
            if(mouldContent.mould[index][0] == selectedItem){
                selected_fontSize = mouldContent.mould[index][3];
                selected_fontFamily = mouldContent.mould[index][6];
                break;
            }
        }
        console.log(modalData);
        console.log(mouldContent);
        const SplitButton = Button.Split;
        const Toast = Feedback.toast;
        let private_color = "#333333";
        let public_color = "#333333";
        if(modalType == "private"){
            private_color = "#2192d9";
        }else {
            public_color = "#2192d9";
        }
        return (
            <div style={{height: "100%"}}>
                <div >
                    <Button type="secondary" component="a" onClick={()=>{this.changeDialogShow(true);}} target="_blank">添加新模板</Button>
                    <Dialog style={{width:"1300px",height:"700px"}} visible = {isImageShow}
                        onOk = {()=>{}}
                        onCancel = {()=>{this.changeImageShow(false);}}
                        onClose = {()=>{this.changeImageShow(false);}}
                        title = {<span style={{fontSize: "16px",color: "#333",fontWeight: "bolder"}}>添加新模板</span>}
                        footer = {
                            <div>
                                <Button type="normal" component="a" onClick={()=>{}} target="_blank">取消</Button>
                                <Button type="primary" component="a" onClick={()=>{
                                    let form = document.getElementById("picfile");
                            		let formData = new FormData(form);
                                    console.log(formData);
                                    const uri = "http://ebs.aiyongbao.com/api";
                                    const version = 1;
                                    const method = "ebs.printData.getPrintPicture";
                                    fetch(uri,{
                                            method: "POST",
                                            mode: "cros",
                                            credentials: 'include',
                                            headers: {
                                                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                                            },
                                            body: "method="+method+"&version="+version+"&file="+formData
                                        })
                                    .then((response) => response.json())//返回数据类型json
                                    .then((responseText) => {
                                        console.log(responseText);
                                    })
                                    .catch((error) => {
                                        console.warn(error);//错误处理，待补充
                                    });
                                }} target="_blank">确定</Button>
                            </div>
                        }>
                        <div className="print-modal-image">
                            请先上传一张图片，作为您新模板的快递单预览背景图
                        </div>
                        <div className="print-modal-image">
                            <form id="picfile" name="picfile">
                                <input name="nick" value="123"/>
                                <input type="file" id="file" name="file" onChange={()=>{
                                    let file = document.getElementById("file");
                                    let files=document.getElementById("file").value;
                                	if (/\.(gif|jpg|jpeg|png|JPG|PNG)$/.test(files)) {
                                		if (file.files[0].size >= 600000) {
                                			console.log('上传的图片过大，必须小于600KB');
                                		 }else{
                                			let reader = new FileReader();
                                			reader.onload =function(evt){
                                				document.getElementById("logopic").src = evt.target.result;
                                			}
                                			reader.readAsDataURL(file.files[0]);
                                		}
                                	 }else {
                                        console.log('上传的文件不是图片！(格式必须是jpg,png或gif)');
                                	}
                                }}/>
                            </form>
                            <Button type="primary" component="a" onClick={()=>{}} target="_blank">预览本地图片</Button>
                        </div>
                        <div className="print-modal-image">
                            <img id="logopic" src="" style={{width: "100%",height: "200px"}}/>
                        </div>
                        <div className="print-modal-image">
                            图片的宽高:
                        </div>
                        <div className="print-modal-image">
                            <Input style={{width: "50px"}}/>
                            <span>x</span>
                            <Input style={{width: "50px"}}/>
                            (毫米)请输入实际图片的宽高
                        </div>
                        <div className="print-modal-image">
                            请选择此模板对应的快递公司:
                            <Select style={{verticalAlign: "middle",lineHeight: "24px"}} placeholder="快递公司">
                                <Option value="small">Small</Option>
                                <Option value="medium">Medium</Option>
                                <Option value="large">Large</Option>
                            </Select>
                        </div>
                    </Dialog>

                    <Dialog style={{width:"1000px",height:"630px"}} visible = {isPreShow}
                        onOk = {()=>{}}
                        onCancel = {()=>{setPreShow(false);}}
                        onClose = {()=>{setPreShow(false);}}
                        title = {<span>模板预览</span>}
                        footer = {()=>{}}>
                        <div style={{margin:"0 auto",width:mouldContent.size.width+"mm",height:mouldContent.size.height+"mm",backgroundSize: "100% 100%",backgroundImage:`url(http://itradeprint.oss.aliyuncs.com/${mouldContent.moprice})`,position:"relative"}}>
                            {
                                mouldContent.mould.map((value,index)=>{
                                    let content = "";
                                    content = this.getNameByItemId(value[0]);
                                    if(content == "zdy_item"){
                                        content = value[9];
                                    }
                                    return (
                                        <ContentDivPre top={parseInt(value[1])} left={parseInt(value[2])} height={parseInt(value[5])} width={parseInt(value[4])} fontSize={value[3]+"px"} fontFamily={value[6]} fontWeight={value[7]} content={content}/>
                                    );
                                })
                            }
                        </div>
                    </Dialog>

                    <Dialog style={{width:"300px",height:"200px"}} visible = {isZdyShow}
                        onOk = {()=>{}}
                        onCancel = {()=>{setZdyShow(false);}}
                        onClose = {()=>{setZdyShow(false);}}
                        title = {<span>添加自定义内容</span>}
                        footer = {
                            <div>
                                <Button type="normal" component="a" onClick={()=>{setZdyShow(false);}} target="_blank">取消</Button>
                                <Button type="primary" component="a" onClick={()=>{
                                    let zdy_value = this.refs.print_mould_zdy.state.value;
                                    if(zdy_value == ""){
                                        Toast.error("内容不可为空！");
                                    }else {
                                        this.addZdyItem(zdy_value);
                                    }
                                }} target="_blank">确定</Button>
                            </div>
                        }>
                        <Input ref="print_mould_zdy" multiple placeholder="输入自定义内容"/>
                    </Dialog>

                    <Dialog style={{width:"1300px",height:"700px"}} visible = {isShow}
                        onOk = {()=>{}}
                        onCancel = {()=>{this.changeDialogShow(false);}}
                        onClose = {()=>{this.changeDialogShow(false);}}
                        title = {<span style={{fontSize: "16px",color: "#333",fontWeight: "bolder"}}>添加新模板</span>}
                        footer = {
                            <div>
                                <Button type="normal" component="a" onClick={()=>{this.changeDialogShow(false);}} target="_blank">取消</Button>
                                <Button type="primary" component="a" onClick={()=>{saveTemplate(mouldContent);}} target="_blank">生成个人模板</Button>
                            </div>
                        }>
                            <div>
                                <span className="print-modal-span">模板名称:</span>
                                <Input style={{width: "150px"}} size="large" onChange={this.changeMouldName.bind(this)} value={mouldContent.mouldname}/>
                                <span className="print-modal-span">快递公司:</span>
                                <Select style={{verticalAlign: "middle",height: "32px",lineHeight: "30px"}} placeholder="选择尺寸" onChange={(value)=>{this.changeCompanie(value)}} value={mouldContent.companie}>
                                    <Option value="中通快递,ZTO,500">中通快递</Option>
                                    <Option value="申通快递,STO,100">申通快递</Option>
                                    <Option value="全峰快递,QFKD,1216">全峰快递</Option>
                                </Select>
                                <span className="print-modal-span">模板宽高(毫米):</span>
                                <Input size="large" style={{width: "50px"}} onChange={(value)=>{this.changeSizeAndMove("size","width",value)}} value={mouldContent.size.width}/>
                                <span style={{margin:"0 10px"}}>x</span>
                                <Input size="large" style={{width: "50px"}} onChange={(value)=>{this.changeSizeAndMove("size","height",value)}} value={mouldContent.size.height}/>
                                <span className="print-modal-span">打印偏移(毫米):</span>
                                <Icon style={{margin:"0 5px"}} size="xs" type="arrow-up" onClick={()=>{this.changeOffsetByBtn("up")}} />
                                <Input size="large" style={{width: "50px"}} onChange={(value)=>{this.changeSizeAndMove("offset","v",value)}} value={mouldContent.offset.v}/>
                                <Icon style={{margin:"0 5px"}} size="xs" type="arrow-down" onClick={()=>{this.changeOffsetByBtn("down")}}/>
                                <Icon style={{margin:"0 5px"}} size="xs" type="arrow-left" onClick={()=>{this.changeOffsetByBtn("left")}}/>
                                <Input size="large" style={{width: "50px"}} onChange={(value)=>{this.changeSizeAndMove("offset","h",value)}} value={mouldContent.offset.h}/>
                                <Icon style={{margin:"0 5px"}} size="xs" type="arrow-right" onClick={()=>{this.changeOffsetByBtn("right")}}/>
                                <Button style={{float: "right",marginTop: "2px"}} type="secondary" component="a" onClick={()=>{}} target="_blank">更改背景图片</Button>
                            </div>
                            <div style={{height:"515px",marginTop: "20px"}}>
                                <div style={{height:"100%",width:"25%",float:"left"}}>
                                    <div style={{height:"100%",width:"50%",float:"left"}}>
                                        <Select placeholder="字体大小" value={selected_fontSize} onChange={(value)=>{this.itemChangeStatus("fontSize",value);}}>
                                            <Option value="6">6px</Option>
                                            <Option value="8">8px</Option>
                                            <Option value="10">10px</Option>
                                            <Option value="11">11px</Option>
                                            <Option value="12">12px</Option>
                                            <Option value="13">13px</Option>
                                            <Option value="14">14px</Option>
                                            <Option value="16">16px</Option>
                                            <Option value="18">18px</Option>
                                            <Option value="20">20px</Option>
                                            <Option value="22">22px</Option>
                                            <Option value="24">24px</Option>
                                            <Option value="36">36px</Option>
                                            <Option value="48">48px</Option>
                                        </Select>
                                        <Button type="normal" style={{width: "100px",margin: "10px 0"}} component="a" onClick={()=>{
                                            this.itemChangeStatus("fontWeight");
                                        }} target="_blank">加粗</Button><br/>
                                        <Checkbox key={`item_s_shi_${this.itemIsChecked("s_shi")}`} onChange={(value)=>{this.itemChangeChecked("s_shi",value);}} defaultChecked={this.itemIsChecked("s_shi")}>目的地</Checkbox><br/>
                                        <Checkbox key={`item_sname_${this.itemIsChecked("sname")}`} onChange={(value)=>{this.itemChangeChecked("sname",value);}} defaultChecked={this.itemIsChecked("sname")}>收货人</Checkbox><br/>
                                        <Checkbox key={`item_saddress_${this.itemIsChecked("saddress")}`} onChange={(value)=>{this.itemChangeChecked("saddress",value);}} defaultChecked={this.itemIsChecked("saddress")}>收货地址</Checkbox><br/>
                                        <Checkbox key={`item_scompany_${this.itemIsChecked("scompany")}`} onChange={(value)=>{this.itemChangeChecked("scompany",value);}} defaultChecked={this.itemIsChecked("scompany")}>收货公司</Checkbox><br/>
                                        <Checkbox key={`item_sphone_${this.itemIsChecked("sphone")}`} onChange={(value)=>{this.itemChangeChecked("sphone",value);}} defaultChecked={this.itemIsChecked("sphone")}>收货方电话</Checkbox><br/>
                                        <Checkbox key={`item_smobile_${this.itemIsChecked("smobile")}`} onChange={(value)=>{this.itemChangeChecked("smobile",value);}} defaultChecked={this.itemIsChecked("smobile")}>收货方手机</Checkbox><br/>
                                        <Checkbox key={`item_SpostCode_${this.itemIsChecked("SpostCode")}`} onChange={(value)=>{this.itemChangeChecked("SpostCode",value);}} defaultChecked={this.itemIsChecked("SpostCode")}>收货方邮编</Checkbox><br/>
                                        <Checkbox key={`item_to_province_${this.itemIsChecked("to_province")}`} onChange={(value)=>{this.itemChangeChecked("to_province",value);}} defaultChecked={this.itemIsChecked("to_province")}>收货方省</Checkbox><br/>
                                        <Checkbox key={`item_to_city_${this.itemIsChecked("to_city")}`} onChange={(value)=>{this.itemChangeChecked("to_city",value);}} defaultChecked={this.itemIsChecked("to_city")}>收货方市</Checkbox><br/>
                                        <Checkbox key={`item_to_district_${this.itemIsChecked("to_district")}`} onChange={(value)=>{this.itemChangeChecked("to_district",value);}} defaultChecked={this.itemIsChecked("to_district")}>收货方区</Checkbox><br/>
                                        <Checkbox key={`item_buyerNick_${this.itemIsChecked("buyerNick")}`} onChange={(value)=>{this.itemChangeChecked("buyerNick",value);}} defaultChecked={this.itemIsChecked("buyerNick")}>买家旺旺</Checkbox><br/>
                                        <Checkbox key={`item_buyerMessage_${this.itemIsChecked("buyerMessage")}`} onChange={(value)=>{this.itemChangeChecked("buyerMessage",value);}} defaultChecked={this.itemIsChecked("buyerMessage")}>买家留言</Checkbox><br/>
                                        <Checkbox key={`item_btitle_${this.itemIsChecked("btitle")}`} onChange={(value)=>{this.itemChangeChecked("btitle",value);}} defaultChecked={this.itemIsChecked("btitle")}>货品名称</Checkbox><br/>
                                        <Checkbox key={`item_totalPrices_${this.itemIsChecked("totalPrices")}`} onChange={(value)=>{this.itemChangeChecked("totalPrices",value);}} defaultChecked={this.itemIsChecked("totalPrices")}>货品总价</Checkbox><br/>
                                        <Checkbox key={`item_reallyMoney_${this.itemIsChecked("reallyMoney")}`} onChange={(value)=>{this.itemChangeChecked("reallyMoney",value);}} defaultChecked={this.itemIsChecked("reallyMoney")}>实付价格</Checkbox><br/>
                                        <Checkbox key={`item_goods_number_${this.itemIsChecked("goods_number")}`} onChange={(value)=>{this.itemChangeChecked("goods_number",value);}} defaultChecked={this.itemIsChecked("goods_number")}>货号</Checkbox><br/>
                                        <Checkbox key={`item_gNumAndbPro_${this.itemIsChecked("gNumAndbPro")}`} onChange={(value)=>{this.itemChangeChecked("gNumAndbPro",value);}} defaultChecked={this.itemIsChecked("gNumAndbPro")}>货号+属性</Checkbox><br/>
                                        <br/><br/>
                                        <a href="javascript:void(0);" onClick={()=>{setZdyShow(true);}}>+添加自定义内容</a>
                                    </div>
                                    <div style={{height:"100%",width:"50%",float:"left"}}>
                                        <Select placeholder="字体样式" value={selected_fontFamily} onChange={(value)=>{this.itemChangeStatus("fontFamily",value);}}>
                                            <Option value="宋体">宋体</Option>
                                            <Option value="楷体">楷体</Option>
                                            <Option value="微软雅黑">微软雅黑</Option>
                                        </Select>
                                        <Button type="normal" style={{width: "100px",margin: "10px 0"}} component="a" onClick={()=>{
                                            this.itemChangeStatus("delete");
                                        }} target="_blank">删除</Button><br/>
                                        <Checkbox key={`item_f_shi_${this.itemIsChecked("f_shi")}`} onChange={(value)=>{this.itemChangeChecked("f_shi",value);}} defaultChecked={this.itemIsChecked("f_shi")}>始发地</Checkbox><br/>
                                        <Checkbox key={`item_fname_${this.itemIsChecked("fname")}`} onChange={(value)=>{this.itemChangeChecked("fname",value);}} defaultChecked={this.itemIsChecked("fname")}>发货人</Checkbox><br/>
                                        <Checkbox key={`item_faddress_${this.itemIsChecked("faddress")}`} onChange={(value)=>{this.itemChangeChecked("faddress",value);}} defaultChecked={this.itemIsChecked("faddress")}>发货地址</Checkbox><br/>
                                        <Checkbox key={`item_fcompany_${this.itemIsChecked("fcompany")}`} onChange={(value)=>{this.itemChangeChecked("fcompany",value);}} defaultChecked={this.itemIsChecked("fcompany")}>发货公司</Checkbox><br/>
                                        <Checkbox key={`item_fphone_${this.itemIsChecked("fphone")}`} onChange={(value)=>{this.itemChangeChecked("fphone",value);}} defaultChecked={this.itemIsChecked("fphone")}>发货方电话</Checkbox><br/>
                                        <Checkbox key={`item_fmobile_${this.itemIsChecked("fmobile")}`} onChange={(value)=>{this.itemChangeChecked("fmobile",value);}} defaultChecked={this.itemIsChecked("fmobile")}>发货方手机</Checkbox><br/>
                                        <Checkbox key={`item_FpostCode_${this.itemIsChecked("FpostCode")}`} onChange={(value)=>{this.itemChangeChecked("FpostCode",value);}} defaultChecked={this.itemIsChecked("FpostCode")}>发货方邮编</Checkbox><br/>
                                        <Checkbox key={`item_names_${this.itemIsChecked("names")}`} onChange={(value)=>{this.itemChangeChecked("names",value);}} defaultChecked={this.itemIsChecked("names")}>发货方签名</Checkbox><br/>
                                        <Checkbox key={`item_date_${this.itemIsChecked("date")}`} onChange={(value)=>{this.itemChangeChecked("date",value);}} defaultChecked={this.itemIsChecked("date")}>发货日期</Checkbox><br/>
                                        <Checkbox key={`item_ballnum_${this.itemIsChecked("ballnum")}`} onChange={(value)=>{this.itemChangeChecked("ballnum",value);}} defaultChecked={this.itemIsChecked("ballnum")}>货品总量</Checkbox><br/>
                                        <Checkbox key={`item_bproperty_${this.itemIsChecked("bproperty")}`} onChange={(value)=>{this.itemChangeChecked("bproperty",value);}} defaultChecked={this.itemIsChecked("bproperty")}>货品属性</Checkbox><br/>
                                        <Checkbox key={`item_orderNumber_${this.itemIsChecked("orderNumber")}`} onChange={(value)=>{this.itemChangeChecked("orderNumber",value);}} defaultChecked={this.itemIsChecked("orderNumber")}>订单编号</Checkbox><br/>
                                        <Checkbox key={`item_benefit_${this.itemIsChecked("benefit")}`} onChange={(value)=>{this.itemChangeChecked("benefit",value);}} defaultChecked={this.itemIsChecked("benefit")}>优惠</Checkbox><br/>
                                        <Checkbox key={`item_sellerRemark_${this.itemIsChecked("sellerRemark")}`} onChange={(value)=>{this.itemChangeChecked("sellerRemark",value);}} defaultChecked={this.itemIsChecked("sellerRemark")}>备注</Checkbox><br/>
                                        <Checkbox key={`item_goods_short_name_${this.itemIsChecked("goods_short_name")}`} onChange={(value)=>{this.itemChangeChecked("goods_short_name",value);}} defaultChecked={this.itemIsChecked("goods_short_name")}>商品简称</Checkbox><br/>
                                        <Checkbox key={`item_gShortNamAndbPro_${this.itemIsChecked("gShortNamAndbPro")}`} onChange={(value)=>{this.itemChangeChecked("gShortNamAndbPro",value);}} defaultChecked={this.itemIsChecked("gShortNamAndbPro")}>商品简称+属性</Checkbox><br/>
                                    </div>
                                </div>
                                <div style={{height:"100%",width:"75%",float:"left"}}>
                                    <div id="add_new_mould_container" style={{width:mouldContent.size.width+"mm",height:mouldContent.size.height+"mm",backgroundSize: "100% 100%",backgroundImage:`url(http://itradeprint.oss.aliyuncs.com/${mouldContent.moprice})`,position:"relative"}}>
                                        {
                                            //[item_id,"50","100","16","80","20","宋体","normal","false"]
                                            //id,top,left,fontSize,width,height,fontFamily,fontWeight,换行
                                            mouldContent.mould.map((value,index)=>{
                                                let selected_color = "";
                                                let content = "";
                                                if(value[0] == selectedItem){
                                                    selected_color = "#cccccc";
                                                }
                                                content = this.getNameByItemId(value[0]);
                                                if(content == "zdy_item"){
                                                    content = value[9];
                                                }
                                                return (
                                                    <ContentDiv key={`ContentDiv_${value}_${index}`} con_id={value[0]} onselected={(value)=>{setSelectedItem(value);}} selected={selected_color} top={parseInt(value[1])} left={parseInt(value[2])} height={parseInt(value[5])} width={parseInt(value[4])} fontSize={value[3]+"px"} fontFamily={value[6]} fontWeight={value[7]} content={content} getPositionAndSize={(top,left,height,width)=>{this.setItemPositionAndSize(value[0],top,left,width,height)}}/>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                    </Dialog>
                    <div style={{width: "270px",float: "right"}}>
                        <Search inputWidth="200px" searchText="" placeholder="请输入快递公司名称..." onSearch={()=>{}}/>
                    </div>
                </div>
                <div style={{marginTop:"20px"}}>
                    <a style={{color:private_color}} href="javascript:void(0);" onClick={()=>{this.changeModal("private")}}>个人快递单模板</a>&nbsp;&nbsp;/&nbsp;&nbsp;
                    <a style={{color:public_color}} href="javascript:void(0);" onClick={()=>{this.changeModal("public")}}>公共快递单模板</a>
                </div>
                <Table className="print-modal-table" hasBorder={false} dataSource={modalData}>
                    <Table.Column title="序号" width={70} cell={(value, index)=>{
                        return index+1;
                    }}/>
                    <Table.Column title="模板名称" dataIndex="mouldname" />
                    <Table.Column title="模板尺寸" dataIndex="size"/>
                    <Table.Column title="快递公司" dataIndex="companie" cell={(value)=>{
                        return value.split(',')[0];
                    }}/>
                    <Table.Column title="操作" dataIndex="mouldname" cell={(value, index, record)=>{
                        let setMould = (<a href="javascript:void(0);" onClick={()=>{this.setDefaultMould(modalType,value);}} style={{marginRight:"10px",color:"#2192d9"}}>设为默认</a>);
                        if(modalType == "private"){
                            if(record.sign == 1){
                                setMould = (<a href="javascript:void(0);" style={{marginRight:"10px",color:"#333333"}}>默认模板</a>);
                            }
                        }
                        return (
                            <div>
                            {setMould}
                            <a href="javascript:void(0);" onClick={()=>{this.previewMould(index);}} style={{marginRight:"10px",color:"#2192d9"}}>预览</a>
                            <a href="javascript:void(0);" onClick={()=>{this.editPrintTemplate(index);}} style={{marginRight:"10px",color:"#2192d9"}}>编辑</a>
                            </div>
                        );
                    }}/>
                </Table>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        modalData:state.LogisticModal.modalData,
        modalType:state.LogisticModal.modalType,
        isShow:state.LogisticModal.isShow,
        isImageShow:state.LogisticModal.isImageShow,
        mouldContent:state.LogisticModal.mouldContent,
        selectedItem:state.LogisticModal.selectedItem,
        isZdyShow:state.LogisticModal.isZdyShow,
        isPreShow:state.LogisticModal.isPreShow
    }
}

function mapDispatchToProps(dispatch,ownProps){
    return bindActionCreators(LogisticModalActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LogisticModal)
