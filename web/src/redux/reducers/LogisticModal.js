import { GET_MODAL_BY_TYPE,SET_DIALOG_SHOW,SET_IMAGE_SHOW,SET_NEW_MOULD,SET_SELECT_ITEM,DELETE_MOULD_ITEM,SET_ZDY_SHOW,ADD_ZDY_ITEM,SAVE_TEMPLATE,EDIT_TEMPLATE,SET_PRE_SHOW,PREVIEW_MOULD } from '../actions/LogisticModal'

/**
 * private 个人
 * public 公共
 */
const initState = {
    modalData:[],/*所有模板*/
    modalType:"private",/*模板类型*/
    isShow:false,/*编辑模板是否显示*/
    isImageShow:false,/*上传图片是否显示*/
    mouldContent:{/*正在编辑的模板内容*/
        companie:"",
        moprice:"",
        mould:[],
        mouldname:"",
        offset:{},
        size:{}
    },
    selectedItem:"",/*编辑模板选中项*/
    isZdyShow:false,/*添加自定义项显示*/
    isPreShow:false/*预览显示*/
}

export default function LogisticModal(state = initState, action){
    switch (action.type) {
        case GET_MODAL_BY_TYPE:
            return {
                ...state,
                modalData:action.modalData,
                modalType:action.modalType
            };
            break;
        case SET_DIALOG_SHOW:
            return {
                ...state,
                isShow:action.isShow,
                mouldContent:action.mouldContent
            };
            break;
        case SET_IMAGE_SHOW:
            return {
                ...state,
                isImageShow:action.isImageShow
            };
            break;
        case SET_NEW_MOULD:
            return {
                ...state,
                mouldContent:action.mouldContent
            };
            break;
        case SET_SELECT_ITEM:
            return {
                ...state,
                selectedItem:action.selectedItem
            };
            break;
        case DELETE_MOULD_ITEM:
            return {
                ...state,
                mouldContent:action.mouldContent,
                selectedItem:"",
            };
            break;
        case SET_ZDY_SHOW:
            return {
                ...state,
                isZdyShow:action.isZdyShow
            };
            break;
        case ADD_ZDY_ITEM:
            return {
                ...state,
                mouldContent:action.mouldContent,
                isZdyShow:action.isZdyShow
            };
            break;
        case SAVE_TEMPLATE:
            return {
                modalData:action.modalData,
                modalType:"private",
                isShow:false,
                isImageShow:false,
                mouldContent:{
                    companie:"",
                    moprice:"",
                    mould:[],
                    mouldname:"",
                    offset:{},
                    size:{}
                },
                selectedItem:"",
                isZdyShow:false,
                isPreShow:false
            };
            break;
        case EDIT_TEMPLATE:
            return {
                ...state,
                mouldContent:action.mouldContent,
                isShow:true,
                selectedItem:""
            };
            break;
        case SET_PRE_SHOW:
            return {
                ...state,
                isPreShow:action.isPreShow
            };
            break;
        case PREVIEW_MOULD:
            return {
                ...state,
                mouldContent:action.mouldContent,
                isPreShow:true
            };
            break;
        default:
            return state;
    }
}
