export const GET_LIST = "GET_LIST"
export const GET_ARGS = "GET_ARGS"

/**
 * uri => 后端地址
 * url => 控制器地址
 * args => 传入参数
 * type => POST|GET
 * callback => 回调方法
*/
export function ajax(url,args="",type="POST",callback){
    // /ajax
    // ajax("itemdb2/getkfnick",{},"",function(e){}); 调用示例
    const uri = "http://iytest.zzgdapp.com/"+url;
    let data = {};
    data.url = uri;
    data.data = args;
    data.dataType = "jsonp";
    data.type = type;
    $.ajax(data).done(function(rsp) {
        callback(rsp);
    }).fail(function(msg) {
        console.error(msg);
    });
}

/**
 * uri => 后端地址
 * args => 传入参数
*/
export function api(method,args="",callback){
    // /api
    // method=aiyong.foreigntrade.ft.getinformation&version=xxxx&category_id=abc
    // api("ebs.orders.list",1,args,demo()) 调用示例
    const uri = "http://ebs.aiyongbao.com/api";
    const version = 1;
    args = toQueryString(args);
    if(args!=""){
        args = "&"+args;
    }
    fetch(uri,{
            method: "POST",
            mode: "cros",
            credentials: 'include',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: "method="+method+"&version="+version+args
        })
    .then((response) => response.json())//返回数据类型json
    .then((responseText) => {
        callback(responseText);
    })
    .catch((error) => {
        console.warn(error);//错误处理，待补充
    });
}

/**
 * 组件参数传递
*/
export function getargs(args){
    return {
        type:GET_ARGS,
        data:args
    }
}

/*
把json格式解析为参数参数字符串
*/
function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}
