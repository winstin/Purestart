export const GET_MODAL_BY_TYPE = "GET_MODAL_BY_TYPE"
export const SET_DIALOG_SHOW = "SET_DIALOG_SHOW"
export const SET_IMAGE_SHOW = "SET_IMAGE_SHOW"
export const SET_NEW_MOULD = "SET_NEW_MOULD"
export const SET_SELECT_ITEM = "SET_SELECT_ITEM"
export const DELETE_MOULD_ITEM = "DELETE_MOULD_ITEM"
export const SET_ZDY_SHOW = "SET_ZDY_SHOW"
export const ADD_ZDY_ITEM = "ADD_ZDY_ITEM"
export const SAVE_TEMPLATE = "SAVE_TEMPLATE"
export const EDIT_TEMPLATE = "EDIT_TEMPLATE"
export const SET_PRE_SHOW = "SET_PRE_SHOW"
export const PREVIEW_MOULD = "PREVIEW_MOULD"
export const SET_DEFAULT_PRI = "SET_DEFAULT_PRI"
import {api} from "./AY_API"

const companie = "中通快递,ZTO,500";
const moprice = "zhongtong01.jpg";
const size = {
    width:230,
    height:127
};
export function setDialogShow(isShow){
    return {
        type:SET_DIALOG_SHOW,
        isShow:isShow,
        mouldContent:{
            companie:companie,
            moprice:moprice,
            mould:[],
            mouldname:"",
            offset:{
                v:0,
                h:0
            },
            size:size
        }
    };
}

export function setZdyShow(isShow){
    return {
        type:SET_ZDY_SHOW,
        isZdyShow:isShow
    }
}

export function setImageShow(isShow){
    return {
        type:SET_IMAGE_SHOW,
        isImageShow:isShow
    };
}

export function setNewMould(mouldContent){
    return {
        type:SET_NEW_MOULD,
        mouldContent:mouldContent
    };
}

export function addZdyItem(mouldContent){
    return {
        type:ADD_ZDY_ITEM,
        mouldContent:mouldContent,
        isZdyShow:false,
    }
}

export function setSelectedItem(selectedItem){
    return {
        type:SET_SELECT_ITEM,
        selectedItem:selectedItem
    };
}

export function deleteMouldItem(mouldContent){
    return {
        type:DELETE_MOULD_ITEM,
        mouldContent:mouldContent
    };
}

export function editTemplate(mouldContent){
    return {
        type:EDIT_TEMPLATE,
        mouldContent:mouldContent
    };
}

export function setPreShow(isShow){
    return {
        type:SET_PRE_SHOW,
        isPreShow:isShow
    };
}

export function previewMould(mouldContent){
    return {
        type:PREVIEW_MOULD,
        mouldContent:mouldContent
    };
}

export function setDefaultPri(mouldname){
    return (dispatch)=>{
        const user_nick = "财宝宝588";
        let condition = {
            mouldname:mouldname
        };
        api("ebs.printData.setDefaultFromPrivate",condition,function(e){
                let printModal = JSON.parse(localStorage.getItem("printModal"+user_nick));
                printModal.private = e.private;
                localStorage.setItem("printModal"+user_nick, JSON.stringify(printModal));
                dispatch({
                    type:SAVE_TEMPLATE,
                    modalData:printModal.private,
                });
            }
        );
    };
}

export function setDefaultPub(mouldname){
    return (dispatch)=>{
        const user_nick = "财宝宝588";
        let condition = {
            mouldname:mouldname
        };
        api("ebs.printData.setDefaultFromPublic",condition,function(e){
                let printModal = JSON.parse(localStorage.getItem("printModal"+user_nick));
                printModal.private = e.private;
                localStorage.setItem("printModal"+user_nick, JSON.stringify(printModal));
                dispatch({
                    type:SAVE_TEMPLATE,
                    modalData:printModal.private,
                });
            }
        );
    };
}

export function saveTemplate(mouldContent){
    return (dispatch)=>{
        const user_nick = "财宝宝588";
        let mould = "";
        let mitem = "";
        let size = mouldContent.size.width + "X" + mouldContent.size.height;
        let offset = mouldContent.offset.v + "X" + mouldContent.offset.h;
        for(let i in mouldContent.mould){
            if(i == 0){
                mitem = "";
                for(let j in mouldContent.mould[i]){
                    if(j == 0){
                        mitem += mouldContent.mould[i][j];
                    }else{
                        mitem += "," + mouldContent.mould[i][j];
                    }
                }
                mould += mitem;
            }else{
                mitem = "";
                for(let j in mouldContent.mould[i]){
                    if(j == 0){
                        mitem += mouldContent.mould[i][j];
                    }else{
                        mitem += "," + mouldContent.mould[i][j];
                    }
                }
                mould += ";"+mitem;
            }
        }//拼接模版内容

        let condition = {
            companie:mouldContent.companie,
            mouldname:mouldContent.mouldname,
            size:size,
            offset:offset,
            mould:mould,
            moprice:mouldContent.moprice
        };
        api("ebs.printData.savePrintTemplate",condition,function(e){
            let printModal = JSON.parse(localStorage.getItem("printModal"+user_nick));
            printModal.private = e.private;
            localStorage.setItem("printModal"+user_nick, JSON.stringify(printModal));
            dispatch({
                type:SAVE_TEMPLATE,
                modalData:printModal.private,
            });
            }
        );
    };
}

export function getModalByType(modalType){
    return (dispatch)=>{
        const user_nick = "财宝宝588";
        let result = [];
        for(let i = 0; i< 5; i++){
            result.push({
                title:{
                    name: `${modalType}中通速度${3+i}`,
                },
                id:`${modalType}230x127` + i,
                time: `${modalType}中通速度` + i
            })
        }
        let printModal = localStorage.getItem("printModal"+user_nick);
        if(printModal == null){
            api("ebs.printData.getPrintModal",{},function(e){
                let printModalData = {
                    public:e.public,
                    private:e.private
                };
                localStorage.setItem("printModal"+user_nick, JSON.stringify(printModalData));
                if(modalType == "private"){
                    dispatch({
                        type:GET_MODAL_BY_TYPE,
                        modalData:e.private,
                        modalType:modalType
                    });
                }else {
                    dispatch({
                        type:GET_MODAL_BY_TYPE,
                        modalData:e.public,
                        modalType:modalType
                    });
                }
            });
        }else {
            printModal = JSON.parse(printModal);
            if(modalType == "private"){
                dispatch({
                    type:GET_MODAL_BY_TYPE,
                    modalData:printModal.private,
                    modalType:modalType
                });
            }else {
                dispatch({
                    type:GET_MODAL_BY_TYPE,
                    modalData:printModal.public,
                    modalType:modalType
                });
            }
        }
    };
}
