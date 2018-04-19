import {api} from './AY_API'
import getUUID from '../../static/getUUID'
export const GET_EFMODAL_BY_TYPE = "GET_EFMODAL_BY_TYPE"
export const SET_EDIT_SHOW = "SET_EDIT_SHOW"
export const GET_MODAL_CONTENT = "GET_MODAL_CONTENT"
export const SET_ZDY_ITEM = "SET_ZDY_ITEM"
export const CHANGE_MODAL_NAME = "CHANGE_MODAL_NAME"
export const SAVE_ELECFACE_MODAL = "SAVE_ELECFACE_MODAL"


/**
 * 切换显示的模板
 * 获取对应模板信息
 * private 个人 public 公共
 */
export function getEFModalByType(modalType){
    return (dispatch)=>{
        if(modalType == "public"){/*公共*/
            api("ebs.ElecFace.getPublicEFTemplates",{},function(e){
                /*BESTQJT*/
                let modalData = e.resp.result.datas.standard_template_result.map((value)=>{
                    if(value.cp_code == "BESTQJT"){
                        return {
                            modal_name:value.standard_templates.standard_template_do[1].standard_template_name,
                            modal_cp_name:marchCP(value.cp_code),
                            modal_content:value.cp_code+","+value.standard_templates.standard_template_do[1].standard_template_url
                        };
                    }else {
                        return {
                            modal_name:value.standard_templates.standard_template_do[0].standard_template_name,
                            modal_cp_name:marchCP(value.cp_code),
                            modal_content:value.cp_code+","+value.standard_templates.standard_template_do[0].standard_template_url
                        };
                    }

                });
                dispatch({
                    type:GET_EFMODAL_BY_TYPE,
                    modalType:modalType,
                    modalData:modalData
                });
            });
        }else{/*个人*/
            const user_nick = "财宝宝588";
            let modalData = [];
            let efModal = localStorage.getItem("efModal"+user_nick);
            if(efModal == null){
                api("ebs.ElecFace.getPrivateEFModal",{},function(e){
                    localStorage.setItem("efModal"+user_nick, JSON.stringify(e.result));
                    modalData = e.result;
                    dispatch({
                        type:GET_EFMODAL_BY_TYPE,
                        modalType:modalType,
                        modalData:modalData
                    });
                });
            }else {
                modalData = JSON.parse(efModal);
                dispatch({
                    type:GET_EFMODAL_BY_TYPE,
                    modalType:modalType,
                    modalData:modalData
                });
            }
        }
    };
}

export function saveElecFaceModal(condition){
    return (dispatch)=>{
        api("ebs.ElecFace.saveElecFaceModal",condition,function(e){
            const user_nick = "财宝宝588";
            localStorage.setItem("efModal"+user_nick, JSON.stringify(e.result));
            dispatch({
                type:SAVE_ELECFACE_MODAL,
                modalData:e.result
            })
        });
    };
}

export function publicSetDefault(condition){
    return (dispatch)=>{
        api("ebs.ElecFace.pubSetDefaultModal",condition,function(e){
            const user_nick = "财宝宝588";
            localStorage.setItem("efModal"+user_nick, JSON.stringify(e.result));
            dispatch({
                type:SAVE_ELECFACE_MODAL,
                modalData:e.result
            })
        });
    };
}

export function privateSetDefault(condition){
    return (dispatch)=>{
        api("ebs.ElecFace.priSetDefaultModal",condition,function(e){
            const user_nick = "财宝宝588";
            localStorage.setItem("efModal"+user_nick, JSON.stringify(e.result));
            dispatch({
                type:SAVE_ELECFACE_MODAL,
                modalData:e.result
            })
        });
    };
}

export function setEditShow(isEditShow){
    return {
        type:SET_EDIT_SHOW,
        isEditShow:isEditShow
    };
}

export function getModalContent(showModalContent,modalType){
    return (dispatch)=>{
        let zdy_content = {
            efmDate:false, /*打单日期*/
            efmNum:false, /*商品总数*/
            efmTid:false, /*订单号*/
            efmAttr:false, /*货号+属性*/
            efmShortAndAttr:false, /*商品简称+属性*/
            efmRemark:false /*备注*/
        };
        let cp_code = "";
        let url = "";
        showModalContent.modal_content.split(",").map((value, index)=>{
            if(index == 0){
                cp_code = value;
            }else if (index ==1) {
                url = value;
            }else if (value == "efmDate") {
                zdy_content.efmDate = true;
            }else if (value == "efmNum") {
                zdy_content.efmNum = true;
            }else if (value == "efmTid") {
                zdy_content.efmTid = true;
            }else if (value == "efmAttr") {
                zdy_content.efmAttr = true;
            }else if (value == "efmShortAndAttr") {
                zdy_content.efmShortAndAttr = true;
            }else if (value == "efmRemark") {
                zdy_content.efmRemark = true;
            }
        });
        let request =   {
                            "cmd": "print",
                            "requestID": "edit_ef_modal",
                            "version": "1.0",
                            "task": {
                                "taskID": getUUID(8,16),
                                "preview": true,  //如果为true，则是预览模式，为false，则直接打印
                                "previewType":"image",//如果是预览模式，是以pdf还是image方式预览，二选一，此属性不是必选，默认以pdf预览。
                                "printer":  {
                    		        "name": "",
                                    "needTopLogo":true,
                                    "needBottomLogo":true
                    		    },
                                "notifyMode":"allInOne",//打印结果通知模式，是逐个document通知还是批量一次通知最终打印结果
                                "documents": [
                                    {
                                        "documentID": "9890000106027",
                                        "contents": [
                                            {
                                                "data": {
                                                    "recipient": {
                                                        "address": {
                                                            "city": "北京市",
                                                            "detail": "花家地社区卫生服务站三层楼我也不知道是哪儿了",
                                                            "district": "朝阳区",
                                                            "province": "北京",
                                                            "town": "望京街道"
                                                        },
                                                        "mobile": "1326443654",
                                                        "name": "张三",
                                                        "phone": "057123222"
                                                    },
                                                    "routingInfo": {
                                                        "consolidation": {
                                                            "name": "杭州",
                                                            "code": "hangzhou"
                                                        },
                                                        "origin": {
                                                            "code": cp_code
                                                        },
                                                        "sortation": {
                                                            "name": "杭州"
                                                        },
                                                        "routeCode": "380D-56-04"
                                                    },
                                                    "sender": {
                                                        "address": {
                                                            "city": "北京市",
                                                            "detail": "花家地社区卫生服务站二层楼我也不知道是哪儿了",
                                                            "district": "朝阳区",
                                                            "province": "北京",
                                                            "town": "望京街道"
                                                        },
                                                        "mobile": "1326443654",
                                                        "name": "秦疏",
                                                        "phone": "057123222"
                                                    },
                                                    "shippingOption": {
                                                        "code": "STANDARD_EXPRESS",
                                                        "title": "标准快递"
                                                    },
                                                    "cpCode":cp_code,
                                                    "waybillCode": "9890000160004"
                                                },
                                                "signature": "19d6f7759487e556ddcdd3d499af087080403277b7deed1a951cc3d9a93c42a7e22ccba94ff609976c5d3ceb069b641f541bc9906098438d362cae002dfd823a8654b2b4f655e96317d7f60eef1372bb983a4e3174cc8d321668c49068071eaea873071ed683dd24810e51afc0bc925b7a2445fdbc2034cdffb12cb4719ca6b7",
                                                "templateURL": url
                                            }

                                          ]
                                      }
                                ]
                            }
                        };
        window.webSocket.onmessage = function(event)
        {
            console.log('Client received a message',event);
            let result = JSON.parse(event.data);
            console.log(result);
            if(result.cmd == "print"){
                if(result.status == "success"){
                    if(result.requestID == "edit_ef_modal"){
                        if(modalType == "public"){
                            showModalContent.modal_name = showModalContent.modal_cp_name + "自定义模板";
                        }
                        showModalContent.previewImage = result.previewImage[0];
                        showModalContent.zdy_content = zdy_content;
                        dispatch({
                            type:GET_MODAL_CONTENT,
                            showModalContent:showModalContent
                        });
                    }
                }else{
                    if(result.requestID == "print_ef"){/*打印失败*/
                    }
                }
            }
        };
        window.webSocket.send(JSON.stringify(request));
    };
}

/**
 * 设置自定义项勾选状态
 */
export function setZdyItem(item_id, checked, showModalContent){
    let new_showModalContent = {...showModalContent};
    new_showModalContent.zdy_content[item_id] = checked;
    return {
        type:SET_ZDY_ITEM,
        showModalContent:new_showModalContent
    };
}

/**
 * 改变模板名称
 */
export function changeModalName(modal_name, showModalContent){
    return {
        type:CHANGE_MODAL_NAME,
        showModalContent:{
            ...showModalContent,
            modal_name:modal_name
        }
    };
}





/**
 * 匹配物流公司
 * @author zdh
 *
 */
/*顺丰(SF)（暂时不支持新接入，之前接入的可以正常使用）、EMS标准快递(EMS)、EMS经济快
件(EYB)、宅急送(ZJS)、圆通(YTO)、中通(ZTO)、百世汇通(HTKY)、优速(UC)、申通(STO)、
天天快递 (TTKDEX)、全峰(QFKD)、快捷(FAST)、邮政小包(POSTB)、国通(GTO)、韵达(YUNDA)
、德邦快递(DBKD)。百世快运  BESTQJT  如风达  RFD 中国邮政国内标快 POST_5000000007756*/
function marchCP(code){
    let cpName = "";
    switch (code) {
        case  "SF":cpName ="顺丰快递";break;
        case  "EMS":cpName ="EMS标准快递";break;
        case  "EYB":cpName ="EMS经济快件";break;
        case  "ZJS":cpName ="宅急送";break;
        case  "YTO":cpName ="圆通快递";break;
        case  "ZTO":cpName ="中通快递";break;
        case  "HTKY":cpName ="百世汇通";break;
        case  "UC":cpName ="优速快递";break;
        case  "STO":cpName ="申通快递";break;
        case  "TTKDEX":cpName ="天天快递";break;
        case  "QFKD":cpName ="全峰快递";break;
        case  "FAST":cpName ="快捷快递";break;
        case  "POSTB":cpName ="邮政小包";break;
        case  "GTO":cpName ="国通快递";break;
        case  "YUNDA":cpName ="韵达快递";break;
        case  "DBKD":cpName ="德邦快递";break;
        case  "BESTQJT":cpName ="百世快运";break;
        case  "RFD":cpName ="如风达快递";break;
        case  "5000000007756":cpName ="中国邮政国内标快";break;
        case  "100004928":cpName ="如风达";break;
        default:cpName = code;
    }
    return cpName;
}
