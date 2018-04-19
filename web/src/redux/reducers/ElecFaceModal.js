import {GET_EFMODAL_BY_TYPE,SET_EDIT_SHOW,GET_MODAL_CONTENT,SET_ZDY_ITEM,CHANGE_MODAL_NAME,SAVE_ELECFACE_MODAL} from '../actions/ElecFaceModal'

/**
 * private 个人
 * public 公共
 */
const initState = {
    modalType:"private",/*显示类型*/
    modalData:[],/*显示数据*/
    isEditShow:false,/*编辑是否显示*/
    showModalContent:{}/*编辑显示内容*/
}

export default function ElecFaceModal(state = initState, action){
    switch (action.type) {
        case GET_EFMODAL_BY_TYPE:
            return {
                ...state,
                modalType:action.modalType,
                modalData:action.modalData
            };
            break;
        case SET_EDIT_SHOW:
            return {
                ...state,
                isEditShow:action.isEditShow
            };
            break;
        case GET_MODAL_CONTENT:
            return {
                ...state,
                showModalContent:action.showModalContent,
                isEditShow:true
            };
            break;
        case SET_ZDY_ITEM:
            return {
                ...state,
                showModalContent:action.showModalContent,
            };
            break;
        case CHANGE_MODAL_NAME:
            return {
                ...state,
                showModalContent:action.showModalContent,
            };
            break;
        case SAVE_ELECFACE_MODAL:
            return {
                modalType:"private",
                modalData:action.modalData,
                isEditShow:false,
                imageUrl:"",
                showModalContent:{}
            };
            break;

        default:
            return state;
    }
}
