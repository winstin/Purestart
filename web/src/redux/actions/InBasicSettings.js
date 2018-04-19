export const GET_BASIC_LIST = "GET_BASIC_LIST";
import {api,ajax} from "./AY_API";

/**
 * condition
 * search_value 搜索值
 * filter_value 过滤值
 * sort_value 排序值
 * page_num 页码
 */
export function getBasicList(condition){

    return (dispatch)=>{
        ajax("/iytrade2/gettype",{type:'load'},"",function(e){
        	console.log("--------拦截概况的数据-------")
            console.log(e);
            if(e.addbiew!==""){
              if (e.addbiew== 'on'){
                e.addbiew= true;
              }else{
                e.addbiew= false;
              }
            }

            if(e.addblack!=""){
              if(e.addblack == 'on'){
                e.addblack = true;
              }else{
                e.addblack = false;
              }
            }
            
            let val1=e.babynum;/*宝贝数量*/
            if(val1!==''){
                let value1=val1.split(';');
                if(value1[0]=='on'){
                  value1[0]=true;
                }else{
                  value1[0]=false;
                }
               /* if(val1.split(';')[1]!=''|| val1.split(';')[1]!=null||val1.split(';')[1]!=undefined){
                    value1[1]=""
                }*/
                e.babynum=value1;
            }
           
          /**/
           if(e.badon!==""){
            if(e.badon == 'on'){
               e.badon =true;
            }else{
               e.badon =false;
            }
           }
           
            let val2=e.bigmoney;/*最大金额*/
            if(val2!==""){
                let value2=val2.split(';');
                if(value2[0]=='on'){
                  value2[0]=true;
                }else{
                  value2[0]=false;
                }
              /*  if(val2.split(';')[1]!=''|| val2.split(';')[1]!=null||val2.split(';')[1]!=undefined){
                    value2[1]=""
                }*/
                console.log("---bigmoney")
                console.log(value2)
                e.bigmoney=value2;
            }
           

            let val3=e.carnum;/*购物车宝贝*/
            if(val3!==""){
              let value3=val3.split(';');
              if(value3[0]=='on'){
                value3[0]=true;
              }else{
                value3[0]=false;
              }
             /* if(val3.split(';')[1]!=''|| val3.split(';')[1]!=null||val3.split(';')[1]!=undefined){
                  value3[1]=""
              }*/
              e.carnum=value3;
            }
            
            
           
            let val4=e.conditions;/*关键字*/
            if(val4!==""){
              let value4=val4.split('|Y|');
              if(value4[0]=='on'){
                value4[0]=true;
              }else{
                value4[0]=false;
              }
             /* if(val4.split('|Y|')[1]!=''|| val4.split('|Y|')[1]!=null||val4.split('|Y|')[1]!=undefined){
                  value4[1]=""
              }*/
              e.conditions=value4;
            }

            let val5=e.goodrate;/*好评率*/
            if(val5!==""){
              let value5=val5.split(';');
              if(value5[0]=='on'){
                value5[0]=true;
              }else{
                value5[0]=false;
              }
              /*if(val5.split(';')[1]!=''|| val5.split(';')[1]!=null||val5.split(';')[1]!=undefined){
                  value5[1]=""
              }*/
              e.goodrate=value5;
            }

            let val6=e.credit;/*信用分数*/
            if(val6!==""){
              let value6=val6.split(';');
              if(value6[0]=='on'){
                value6[0]=true;
              }else{
                value6[0]=false;
              }
              /*if(val6.split(';')[1]!=''|| val6.split(';')[1]!=null||val6.split(';')[1]!=undefined){
                  value6[1]=""
              }*/
              e.credit=value6;
            }
           
           let val7=e.regdays;/*注册天数*/
           console.log(val7)
           if(val7!==""){
              let value7=val7.split(';');
              if(value7[0]=='on'){
                value7[0]=true;
              }else{
                value7[0]=false;
              }
              /*if(val7.split(';')[1]!=''|| val7.split(';')[1]!=null||val7.split(';')[1]!=undefined){
                  value7[1]=""
              }*/
              console.log("----------注册天数")
              console.log(value7)
              e.regdays=value7;
            }
           
           let val8=e.smallmoney;/*最小金额*/
           console.log(val8)
           if(val8!==""){
              let value8=val8.split(';');
              if(value8[0]=='on'){
                value8[0]=true;
              }else{
                value8[0]=false;
              }
              /*if(val8.split(';')[1]!=''|| val8.split(';')[1]!=null||val8.split(';')[1]!=undefined){
                  value8[1]=""
              }*/
              e.smallmoney=value8;
            }
           
           if(e.neutralon!==""){
            if(e.neutralon == 'on'){
               e.neutralon =true;
            }else{
               e.neutralon =false;
            }
           }
           
          if(e.noalipay!==""){
            if(e.noalipay == 'on'){
               e.noalipay =true;
           }else{
               e.noalipay =false;
           }
          }
           console.log("--------000000000000000000000-------")
           console.log(e)
        let checkboxValue = [];
        if (e.neutralon) {
            checkboxValue.push('neutralon')
        }
        if (e.badon) {
            checkboxValue.push('badon')
        }
        if (e.goodrate) {
            checkboxValue.push('goodrate')
        }
        if (e.addbiew) {
            checkboxValue.push('addbiew')
        }
        if (e.addblack) {
            checkboxValue.push('addblack')
        }
        if (e.babynum[0]) {
            checkboxValue.push('babynum')
        }
        if (e.neutralon) {
            checkboxValue.push('neutralon')
        }
        if (e.bigmoney[0]) {
            checkboxValue.push('bigmoney')
        }
        if (e.carnum[0]) {
            checkboxValue.push('carnum')
        }
        if (e.conditions[0]) {
            checkboxValue.push('conditions')
        }
        if (e.credit[0]) {
            checkboxValue.push('credit')
        }
        if (e.noalipay[0]) {
            checkboxValue.push('noalipay')
        }
        if (e.regdays[0]) {
            checkboxValue.push('regdays')
        }
        if (e.smallmoney[0]) {
            checkboxValue.push('smallmoney')
        }
      console.log("{{{{{{{{{{{{{{{{{{{{{{{{")
      console.log(e)
      console.log(checkboxValue)
           dispatch({
              type:GET_BASIC_LIST,
              orderData:e,
              checkboxValue:checkboxValue
          });
         })
    }
}