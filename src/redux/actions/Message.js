export const ADD = "increase"
export const LOAD = "load"
export const SMSLOG = "smslog"
export const CZ = "cz"
export const FP = "fp"

import {api,ajax} from "./AY_API"
export function getOrderData(condition){
	return (dispatch)=>{
		ajax("/iytrade2/sms",{},"",function(e){
			console.error(e);
			ajax("/iytrade2/GetUsersShopvipNum",{},"",function(Vipnum){
					ajax("/iytrade2/smslog_selectsms",{},"",function(bingtu){
						dispatch({
							type:LOAD,
							smsspan:e.smsspan,
							smsnum:e.smsnum,
							smsdata:e,
							Vipnum:Vipnum,
							bingtu:bingtu
						})
					})					
				});
		});

	};
}

export function smslog(value){
	return (dispatch)=>{
		ajax("/iytrade2/smslog",{page: 1,type: value},"",function(e){
			console.log(e);
			dispatch({
				type:SMSLOG,
				data:e
			})
		});

	};
}
export function initcz(){
	console.log('=============充值记录==============')
	return (dispatch)=>{
		ajax("/iytrade2/smsbuy",{type: 'set'},"",function(e){
			console.log(e);
			dispatch({
				type:CZ,
				cz:e
			})
		});

	};
}
export function initfp(){
	console.log('=============开发票==============')
	return (dispatch)=>{
		ajax("/iytrade2/getinvoice",{type: 'all'},"",function(e){
			console.log(e);
			dispatch({
				type:FP,
				fp:e
			})
		});

	};
}
