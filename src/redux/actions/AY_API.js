export const GET_LIST = "GET_LIST"
export const GET_ARGS = "GET_ARGS"

/**
 * uri => 后端地址
 * url => 控制器地址
 * args => 传入参数
 * type => POST|GET
 * callback => 回调方法
*/
export function ajax(url,args={},type="POST",callback){
    // /ajax
    // ajax("itemdb2/getkfnick",{},"",function(e){}); 调用示例
    const uri = "https://web.xjpay.cc"+url;
    let data = {};
    data.url = uri;
    // data.headers={
    //     cookie:"OUTFOX_SEARCH_USER_ID_NCOO=888035989.1628028; rememberMe=CKYh9BUoXDrOauG4dcRjVtpXL2rzsJXC42IhGRczuWWBZSlaJdVt5myTB68cHSm9VUeTqk6SCBazbGi0a9Kj4ygx4vz0GBeKKU34WZkxL4BcxsKt3sJYBIhIkcVtXBtZperxzbJaxNBIIIE2GVhrtu8sFjaamSo0yX/Paegd2rloKmFRN9WYmPgvdWE3e6JfEaIDfiRPr3Ju1wOPhB581lIIhe6Xt7FQuTfzYyJUpI8disBQ3/BctWYQtkDn23Ywsw2O4LWiMDYD51tqCi9rKgZiWu5IsWMUXGHIjQpOso+DwI0T56vZgx2dGxEexdkNwPScv1dtAsggMv/4YS3LuszMMZC7muOKyqbUBaVWdAcoNDDGOqdcLtEBonigZMbAss8itwFLCMQEoXkJS8EcjL05UsgNfDq0icQ5m03ZG1SL4QhECqKQyvCWp9o+AzHrqdoAVzRqFeKl50f3D4gOAauLzjaLmvdIVRSoD46r+V47RgbxKGqsrbxKK1hiGITqcGHEQGe0qkZWv/gw9NZ2troa2ir98vJ8z8O0sqVfmQIpgYysW/8CaxzwqEk2aLKIhlq1AuMwg6CMhzNndAGnugDvZOVKbojmdRXAHuVdf6bpBcthYbUR6zlYYsz+VoLqkyXryiP6P3fIVfxrsm0F7p+2IrJz/jSJMrr464eoJXC7IXQeLPMagN5ME4P6AwFThnHE03ASLN2dgLJISJdsQ5xxwu6iJjGUD2X/rXo3jcNussw+yXeN/RzhHE8ZI7Pd1srkqy4ll5FNGiIuOsrTBTRn7l148EpMghuMD/LYlSFhP7eC5Dy+Xa97KqK4wWkBSa4HkPSzp3jijxOhVDOeVR/xOZ/FpnKYaGp1tUVz0+wZVVHhGMGX6rBeU7sxDSArlo68VjdVPQnNBQ/HmsFO5W8671zpf816gEfhmaE95kOQVpBuXg978chRzF+e42Dq4XtHMoCsEuhssw4IO0M5wrzq5vU4lJSAmuG6MEIKtbHxO/1w9bDc5aD4FnvS8M1t2cD7xfonXzoI/rtCo4frfmKocEJdOMcvl1RRuW+UZgWgetoiTksXrJzhYkUDJydX2G+qq6vAaJMJPepcdCorAw==; shiroCookie=e0329a9a-f604-49c3-a1a6-497f42e20052; OUTFOX_SEARCH_USER_ID_NCOO=888035989.1628028; rememberMe=CKYh9BUoXDrOauG4dcRjVtpXL2rzsJXC42IhGRczuWWBZSlaJdVt5myTB68cHSm9VUeTqk6SCBazbGi0a9Kj4ygx4vz0GBeKKU34WZkxL4BcxsKt3sJYBIhIkcVtXBtZperxzbJaxNBIIIE2GVhrtu8sFjaamSo0yX/Paegd2rloKmFRN9WYmPgvdWE3e6JfEaIDfiRPr3Ju1wOPhB581lIIhe6Xt7FQuTfzYyJUpI8disBQ3/BctWYQtkDn23Ywsw2O4LWiMDYD51tqCi9rKgZiWu5IsWMUXGHIjQpOso+DwI0T56vZgx2dGxEexdkNwPScv1dtAsggMv/4YS3LuszMMZC7muOKyqbUBaVWdAcoNDDGOqdcLtEBonigZMbAss8itwFLCMQEoXkJS8EcjL05UsgNfDq0icQ5m03ZG1SL4QhECqKQyvCWp9o+AzHrqdoAVzRqFeKl50f3D4gOAauLzjaLmvdIVRSoD46r+V47RgbxKGqsrbxKK1hiGITqcGHEQGe0qkZWv/gw9NZ2troa2ir98vJ8z8O0sqVfmQIpgYysW/8CaxzwqEk2aLKIhlq1AuMwg6CMhzNndAGnugDvZOVKbojmdRXAHuVdf6bpBcthYbUR6zlYYsz+VoLqkyXryiP6P3fIVfxrsm0F7p+2IrJz/jSJMrr464eoJXC7IXQeLPMagN5ME4P6AwFThnHE03ASLN2dgLJISJdsQ5xxwu6iJjGUD2X/rXo3jcNussw+yXeN/RzhHE8ZI7Pd1srkqy4ll5FNGiIuOsrTBTRn7l148EpMghuMD/LYlSFhP7eC5Dy+Xa97KqK4wWkBSa4HkPSzp3jijxOhVDOeVR/xOZ/FpnKYaGp1tUVz0+wZVVHhGMGX6rBeU7sxDSArlo68VjdVPQnNBQ/HmsFO5W8671zpf816gEfhmaE95kOQVpBuXg978chRzF+e42Dq4XtHMoCsEuhssw4IO0M5wrzq5vU4lJSAmuG6MEIKtbHxO/1w9bDc5aD4FnvS8M1t2cD7xfonXzoI/rtCo4frfmKocEJdOMcvl1RRuW+UZgWgetoiTksXrJzhYkUDJydX2G+qq6vAaJMJPepcdCorAw==; shiroCookie=e0329a9a-f604-49c3-a1a6-497f42e20052"
    // }
    data.data = args;
    data.dataType = "json";
    data.type = type;
    // data.credentials='include';

    data.xhrFields = {
        withCredentials: true
    },
    data.crossDomain = true,
    // data.contentType = "jsonp";
    // data.jsonp  = 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
    // data.callback = '', //设置回调函数名
    $.ajax(data).done(function(rsp) {
        callback(rsp);
    }).fail(function(data,status,xhr) {
        console.error(data);
        // document.getElementById('app').innerHTML = data.responseText;
        console.error(status);
        console.error(xhr);
    });

   

    // $.ajax({
    //     url: 'http://query.yahooapis.com/v1/public/yql',
    //     dataType: 'jsonp',
    //     data: {
    //         q: "select * from json where url=\"http://www.w3dev.cn/json.asp\"",
    //         format: "json"
    //     },
    //     success: function (d) {
    //        alert(JSON.stringify(d))//远程json数据放在query.results下
    //     }
    // });
}

/**
 * uri => 后端地址
 * args => 传入参数
*/
export function api(method,args="",callback){
    // /api
    // method=aiyong.foreigntrade.ft.getinformation&version=xxxx&category_id=abc
    // api("ebs.orders.list",1,args,demo()) 调用示例
    // const uri = "http://ebs.aiyongbao.com/api";
    // const version = 1;
    // args = toQueryString(args);
    // if(args!=""){
    //     args = "&"+args;
    // }
    // fetch(uri,{
    //         method: "POST",
    //         mode: "cros",
    //         credentials: 'include',
    //         headers: {
    //             "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    //         },
    //         body: "method="+method+"&version="+version+args
    //     })
    // .then((response) => response.json())//返回数据类型json
    // .then((responseText) => {
    //     callback(responseText);
    // })
    // .catch((error) => {
    //     console.warn(error);//错误处理，待补充
    // });
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
