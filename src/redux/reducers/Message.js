import { ADD,LOAD,SMSLOG,CZ,FP } from '../actions/Message'

const initialState = {
	smsspan: "",
	smsnum:"",
	slogdata:'',
	smsdata:'',
	Vipnum:'',
	cz:'',
	bingtu:'',
	fp:''
}

export default function Message(state = initialState, action) {
		console.log(action.smsnum)
	    switch (action.type) {
	        case "load":
	          	return Object.assign({},state,{
	          		...state,
	               smsspan:action.smsspan,
	               smsnum:action.smsnum,
	               smsdata:action.smsdata,
	               Vipnum:action.Vipnum,
	               bingtu:action.bingtu
	            });
	        case 'smslog':
	        	return Object.assign({},state,{
	        		...state,
	               slogdata:action.data
	            });
	        case 'cz':
	        	return Object.assign({},state,{
	        		...state,
	               cz:action.cz
	            });
            case 'fp':
	        	return Object.assign({},state,{
	        		...state,
	               fp:action.fp
	            });
	        default:
	          return state
	    }
	}

