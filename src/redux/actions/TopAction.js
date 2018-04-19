/**************************格式化时间*******************/
Date.prototype.format = function (format) {
    /*
     * eg:format="yyyy-MM-dd hh:mm:ss";
     */
    if (!format) {
        format = "yyyy-MM-dd hh:mm:ss";
    }
    var o = {
        "M+": this.getMonth() + 1, /* month*/
        "d+": this.getDate(), /* day*/
        "h+": this.getHours(), /* hour*/
        "m+": this.getMinutes(), /* minute*/
        "s+": this.getSeconds(), /* second*/
        "q+": Math.floor((this.getMonth() + 3) / 3), /* quarter*/
        "S": this.getMilliseconds()

    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

/*******************日期时间转换unix时间戳****************/
function datetime_to_unix(datetime) {
    var tmp_datetime = datetime.replace(/:/g, '-');
    tmp_datetime = tmp_datetime.replace(/ /g, '-');
    var arr = tmp_datetime.split("-");
    var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
    return parseInt(now.getTime() / 1000);
}

/**
 * 计算时间差
 * @param {string} startdate 开始时间[日期时间格式]
 * @param {string} enddate 结束时间[日期时间格式]
 */
function calculatestrss(startdate, enddate) { /*     计算时间差          */
    console.log(startdate+"---1--------------1--"+enddate);
    var newenddate = new Date(Date.parse(enddate.replace(/-/g, "/")));
    newenddate = newenddate.getTime();
    var newstartdate = new Date(Date.parse(startdate.replace(/-/g, "/")));
    newstartdate = newstartdate.getTime();
    var ms = newenddate - newstartdate;
    let h = Math.ceil(ms / (3600 * 1000 * 24));
    return h;
}

/**
 * 公共方法判断某变量是否为空
 * @author Duanhq
 **/
function isEmpty(keys) {
    if (typeof keys === "string") {
        keys = keys.replace(/(^\s*)|(\s*$)/g, "");
        if (keys == "" || keys == null || keys == 'null' || keys == undefined || keys == 'undefined') {
            return true
        } else {
            return false
        }
    } else if(keys==undefined){
        return true
    } else {
        if (typeof keys == "object") {
            if ($.isEmptyObject(keys)) {
                return true
            } else {
                return false
            }
        }
    }
};

/**
 *获取时间,0为今天,-1为一天前
 *
 **/
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);
    /*获取AddDayCount天后的日期*/
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;
    /*获取当前月份的日期*/
    var d = dd.getDate();
    return dd.format();
}

 /**
  * @author chenlonge
  * @param activityday 获取某日期距离今天的日期
  */
 function getTimeDiff(activityday) {
     var s2 = new Date(Date.parse(activityday.replace(/-/g, "/"))).getTime();
     var s1 = new Date(Date.parse(serviceTime.replace(/-/g, '/'))).getTime();
     var ms = s1 - s2;
     var h = Math.floor(ms / (3600 * 1000 * 24));
     if (h < 0) {
         return Math.abs(h);
     } else {
         return '-' + h;
     }
 }

/*******viper友情提醒************上面是工具方法****************分割线*************下面是不知道什么方法自己看注释吧************************/

/**
 *获取用户版本
 * by viper
 */
function getusertype(){
    QN.top.invoke({
        "cmd": "taobao.user.seller.get",
        "param":{
            fields:'nick,user_id,type'
        },
        "method": "POST",
        "success" : function(rsp) {
            if(typeof rsp === 'string'){
                var rsp = JSON.parse(rsp);
            }else{
                var rsp= rsp;
            }
            window.user_type =rsp.user_seller_get_response.user.type;
            console.log(window.user_type);
            if(window.user_type == "C"){
                console.log(window.user_type);
            }
        },
        error: function(msp){
        }
    });
}

function HashMap() {
    var size = 0;
    var entry = new Object();
    this.put = function (key, value) {
        if (!this.containsKey(key)) {
            size++
        }
        entry[key] = value
    };
    this.get = function (key) {
        if (this.containsKey(key)) {
            return entry[key]
        } else {
            return null
        }
    };
    this.remove = function (key) {
        if (delete entry[key]) {
            size--
        }
    };
    this.containsKey = function (key) {
        return (key in entry)
    };
    this.containsValue = function (value) {
        for (var prop in entry) {
            if (entry[prop] == value) {
                return true
            }
        }
        return false
    };
    this.values = function () {
        var values = new Array(size);
        for (var prop in entry) {
            values.push(entry[prop])
        }
        return values
    };
    this.keys = function () {
        var keys = new Array(size);
        for (var prop in entry) {
            keys.push(prop)
        }
        return keys
    };
    this.size = function () {
        return size
    }
};

/***
 * 同步订购
 * @author Duanhq
 *Last Editor viper918
 */
function refshvip() {
    try {
        QN.top.invoke({
            cmd: "taobao.vas.subscribe.get",
            param: {
                nick: window.user_nick,
                article_code: "FW_GOODS-1827490"
            },
            method: "post",
            success: function (rsp) {
                if (rsp.vas_subscribe_get_response) {
                    var subscribe = rsp.vas_subscribe_get_response.article_user_subscribes.article_user_subscribe;
                    var vip = subscribe[0];
                    if (vip.item_code == 'FW_GOODS-1827490-1') {/*初级版用户*/
                        $("#goodgods").attr("style", "display:none;");
                        var url = '//cdn.zzgdapp.com/yunying/pcjiaoyidinggouye.html';
                        var vipuserz = false;
                        var diff = '';
                        /*if(actviptime!='off'&&getTimeDiff(actviptime)>0){
                         vipuser=1;
                         vipuserz=true;
                         diff=getTimeDiff(actviptime);
                         }else{
                         vipuser=0;
                         diff=getTimeDiff(vip.deadline);
                         }*/
                        if (actflag == "mz") {
                            vipuserz = true;
                            window.vipuser= 1;
                            diff = getTimeDiff(window.viptime);
                        } else if (actflag == "refunde") {
                            window.vipuser= 0;
                            diff = getTimeDiff(window.viptime);
                        } else {
                            window.vipuser= 0;
                            diff = getTimeDiff(vip.deadline);
                            localStorage.setItem("viptime" + window.user_nick, vip.deadline);
                        }
                        if (Number(diff) <= 0) {
                            vipuserz = false;
                            window.vipuser= 0;
                        }
                        localStorage.setItem("vipuser" + window.user_nick, window.vipuser);

                        if (!vipuserz)$('#kfrx').hide();

                        /*这里同步服务平台的TOP订购时间*/
                        var isSync = false;
                        var syncUser = localStorage.getItem("syncUser" + window.user_nick);
                        var syncTime = localStorage.getItem("syncTime" + window.user_nick);
                        if (!isEmpty(syncUser)) {
                            localStorage.removeItem("syncUser" + window.user_nick);
                            localStorage.removeItem("syncTime" + window.user_nick);
                            if (syncUser != 0) {
                                isSync = true;
                            }
                            if (!isSync) {
                                if (isEmpty(syncTime) || syncTime == 'off') {
                                    isSync = true;
                                } else if (datetime_to_unix(vip.deadline) != datetime_to_unix(syncTime)) {
                                    console.log('需要更新同步');
                                    isSync = true;
                                }
                            }
                            console.log("actflag =>"+vip.item_code+"="+actflag);
                            if (isEmpty(actflag)) {
                                actflag = localStorage.getItem("actflag" + window.user_nick)|| null;
                            }
                            console.log("actflag =>"+vip.item_code+"="+actflag);
                            if (isSync && actflag != "refunde" && actflag != "mz") {
                                $.ajax({
                                    url: APP_WEB_INDEX_ROOT + "/iytrade2/Synctime",
                                    dataType: 'jsonp',
                                    data: {
                                        viptime: vip.deadline,
                                        type: 0
                                    }
                                });
                            }
                        }
                    } else if (vip.item_code == 'FW_GOODS-1827490-v2') {
                        window.vipuser= 1;
                        url = '//cdn.zzgdapp.com/yunying/pcjiaoyidinggouye.html';
                        vipuserz = true;
                        diff = '';
                        /*if(actviptime!='off'&&getTimeDiff(actviptime)>0){
                         diff=getTimeDiff(actviptime);
                         }else{
                         diff=getTimeDiff(vip.deadline);
                         }*/
                        if (actflag == "mz") {
                            window.vipuser= 1;
                            /*MZ用户之前的top到期时间 actviptime */
                            if (vip.deadline > actviptime) {
                                /*MZ用户自己又新订了高级版。*/
                                $.ajax({
                                    url: APP_WEB_INDEX_ROOT + "/iytrade2/mzremind",
                                    dataType: "jsonp",
                                    data: {
                                        "toptime": vip.deadline,
                                        "oldtoptime": actviptime
                                    }
                                });
                            }
                            diff = getTimeDiff(window.viptime);
                        } else if (actflag == "refunde") {
                            vipuserz = false;
                            window.vipuser= 0;
                            diff = getTimeDiff(window.viptime);
                        } else {
                            diff = getTimeDiff(vip.deadline);
                            localStorage.setItem("viptime" + window.user_nick, vip.deadline);
                        }
                        localStorage.setItem("vipuser" + window.user_nick, vipuser);
                       /* $('#mfb1').empty().append('<span style="color:#FFF">' + (vipuserz ? "高级版" : "初级版") + '</span>');*/

                        if (!vipuserz){
                            $('#kfrx').hide();
                        }
                        /*这里同步服务平台的TOP订购时间*/
                        isSync = false;
                        syncUser = localStorage.getItem("syncUser" + window.user_nick);
                        syncTime = localStorage.getItem("syncTime" + window.user_nick);
                        if (!isEmpty(syncUser)) {
                            localStorage.removeItem("syncUser" + window.user_nick);
                            localStorage.removeItem("syncTime" + window.user_nick);
                            if (syncUser != 1) {
                                isSync = true;
                            }
                            if (!isSync) {
                                if (isEmpty(syncTime) || syncTime == 'off') {
                                    isSync = true;
                                } else if (datetime_to_unix(vip.deadline) != datetime_to_unix(syncTime)) {
                                    console.log('需要更新同步');
                                    isSync = true;
                                }
                            }
                            console.log("actflag =>"+vip.item_code+"="+actflag);
                            if (isEmpty(actflag)) {
                                actflag = localStorage.getItem("actflag" + window.user_nick)|| null;
                            }
                            console.log("actflag =>"+vip.item_code+"="+actflag);
                            if (isSync && actflag != "refunde" && actflag != "mz") {
                                $.ajax({
                                    url: APP_WEB_INDEX_ROOT + "/iytrade2/Synctime",
                                    dataType: 'jsonp',
                                    data: {
                                        viptime: vip.deadline,
                                        type: 1
                                    }
                                });
                            }
                        }
                    }
                }
            },
            error: function (msp) {
                /* $("#hints_vip").html('<p>订购日期同步失败，可能导致您无法使用高级版功能，您可以发送错误至后台或者联系客服</p>');
                 $("#hints_vips").html('<p>'+JSON.stringify(msp)+'</p>');
                 ('hint_vip');*/
                console.error(msp);
            }
        });
    } catch (e) {
        console.error(e);
    }
}
/**
 * 同步订购：调用TOP获取window.user_nick
 * @author Duanhq
 */
function refshvip_top() {
    try {
        QN.application.invoke({
            cmd: "getLoginuser",
            success: function (e) {
                if (typeof  e === 'string') {
                    e = JSON.parse(e);
                }
                window.user_nick = decodeURI(e.window.user_nick);
                localStorage.setItem("loginnick", window.user_nick);
                /**获取到期时间**/
                if (isEmpty(window.viptime) || window.viptime == 'off') {
                    window.viptime = localStorage.getItem("viptime" + window.user_nick);
                    if (window.viptime == null || window.viptime == '' || window.viptime == 'null') {
                        window.viptime = 'off';
                    }
                } else {
                    localStorage.setItem("viptime" + window.user_nick, window.viptime);
                }
                /**获取身份信息**/
                if (isEmpty(vipuser)) {
                    window.vipuser= localStorage.getItem("vipuser" + window.user_nick);
                    if (window.vipuser!= 1 && window.vipuser!= 0) {
                        window.vipuser= 0;
                    }
                } else {
                    localStorage.setItem("vipuser" + window.user_nick, vipuser);
                }
                /*MZ用户之前的top到期时间 actviptime*/
                if (isEmpty(actviptime)) {
                    actviptime = localStorage.getItem("actviptime" + window.user_nick);
                    if (isEmpty(actviptime)) {
                        actviptime = 'off';
                    }
                } else {
                    localStorage.setItem("actviptime" + window.user_nick, actviptime);
                }
                /*运营活动用户时间*/
                /*if(actviptime==null||actviptime==''||actviptime=="null"){
                 actviptime=localStorage.getItem("actviptime"+user_nick);
                 if(actviptime==null||actviptime=='null'||actviptime==''){
                 actviptime='off';
                 }
                 }else{
                 localStorage.setItem("actviptime"+user_nick,actviptime);
                 }*/
                /*同步Top到期时间*/
                refshvip();
            },
            error: function (msg) {
                window.vipuser= 0;
                window.viptime = 'off';
            }
        });
    } catch (e) {
        window.vipuser= 0;
        window.viptime = 'off';
    }
}

function getLoginuser() {
    QN.application.invoke({
        "cmd": "getLoginuser",
        "success": function(e) {
            console.error(e);
            window.user_nick = e.user_nick;
            window.sessionStorage.setItem('itemloginnick',e.user_nick);
            window.sessionStorage.setItem('Loginuser_id',e.user_id);
        }
    });
}

function getServerTime (callback){
    QN.application.invoke({
        cmd: 'getServerTime',
        error: function(msg) {
            console.error(msg);
        },
        success: function(rsp) {
            callback(rsp);
        }
    });
}

/**
 * 初始加载，获取各种用户信息
 * @author Duanhq
 * @last-editor viper
 */

export function onload_viptime(){

    //console.log("--------------开始获取hash")
    window.location.hash = "#&event=tradeList&nick=weiye021&sdkversion=107004&seller_id=790960053&sessionkey=80008300c08rfoAp1nri119a3e7cdzgxDnx9RvF9feU3m0tkgdPpzGUs9DZFTpEXLdj78sH1p&sign=B5CBE26608512CAC5B0B8412B6FA1968&slot=qianniu&timestamp=1486565743191&tradeStatus=TRADE_REFUND&user_id=790960053&version=5.03.03N&actflag=no&vipuser=1&vip_time=2017-12-08 00:00:00&activedt=2016-09-05 11:14:52&actvip_time=off&testUser=off&tmark=off&iswwcf=1&logincount_pc=0&mau_pc=0&isauth=no&isevent=false&isblackuser=no&wwkf=%E7%88%B1%E7%94%A8%E7%A7%91%E6%8A%80:%E9%AA%91%E5%A3%AB&kf_pic=qishi.jpg"
    var shash = window.location.hash.substr(1);
    /*if (type == 'index' && !isEmpty(shash)) {
        localStorage.setItem("authmap", shash);
    }*/
    var params = shash.split('&');
    var map = new HashMap(); /*储存各种用户信息*/
    for (var i in params) {
        var p = params[i].split("=");
        if (p.length == 2) {
            map.put(p[0], p[1]);
        }
    }
    //console.log(map);
    window.user_nick = map.get('nick');
    window.user_nick = decodeURIComponent(window.user_nick);
    window.user_nick = window.user_nick ? window.user_nick.split(":")[0] : null;
    window.vipuser= map.get("vipuser");/*身份信息*/
    window.viptime = map.get("vip_time");/*订购到期时间*/
    localStorage.setItem("syncUser" + window.user_nick, window.vipuser);
    localStorage.setItem("syncTime" + window.user_nick, window.viptime);

    window.actviptime = map.get("actvip_time");/*订购到期时间*/
    window.autorate = map.get('autorate');
    window.tmark = map.get('tmark');
    window.actflag = map.get("actflag");
    window.iswwcf = map.get('iswwcf');

    localStorage.setItem("iswwcf", iswwcf);

    if (isEmpty(window.user_nick)) {
        refshvip_top();
    }
    else {/**获取到期时间**/
        if (isEmpty(window.viptime) || window.viptime == 'off') {
            window.viptime = localStorage.getItem("viptime" + window.user_nick);
            if (isEmpty(window.viptime) || window.viptime == 'null') {
                window.viptime = 'off';
            }
        } else {
            localStorage.setItem("viptime" + window.user_nick, window.viptime);
        }
        if (isEmpty(window.vipuser)) {
            window.vipuser= localStorage.getItem("vipuser" + window.user_nick);
            if (window.vipuser!= 1 && window.vipuser!= 0) {
                window.vipuser= 0;
            }
        } else {
            localStorage.setItem("vipuser" + window.user_nick, window.vipuser);
        }
        /**获取特殊用户标识**/
        if (isEmpty(window.actflag)) {
            window.actflag = localStorage.getItem("actflag" + window.user_nick);
            if (actflag != "mz" && actflag != "refunde") {
                actflag = "no";
            }
        } else {
            localStorage.setItem("actflag" + window.user_nick, actflag);
        }
        /*MZ用户之前的top到期时间 actviptime*/
        if (isEmpty(window.actviptime)) {
            window.actviptime = localStorage.getItem("actviptime" + window.user_nick);
            if (window.actviptime == null || window.actviptime == 'null' || window.actviptime == '') {
                window.actviptime = 'off';
            }
        } else {
            localStorage.setItem("actviptime" + window.user_nick, actviptime);
        }
        refshvip();
    }

    getServerTime(function(rsp){/*同步淘宝时间*/
        console.log('同步淘宝时间');
        try {
            window.tbtime = rsp.time;
            window.serviceTime = new Date(Number(rsp.time)).format("yyyy-MM-dd hh:mm:ss");
        } catch (e) {
            window.serviceTime = GetDateStr(0);
        }
        var remalday = 0;
        let g_Tbtime = window.serviceTime;
        if (window.viptime != 'off') {
            console.debug('当前时间:' + g_Tbtime);
            if (!g_Tbtime) {
                g_Tbtime = new Date().getTime();
            }
        }
        window.localStorage.setItem(user_nick + "_g_Tbtime",g_Tbtime);
        remalday = calculatestrss(g_Tbtime, viptime); /*计算版本到期还有多少天*/
        console.debug('还剩多少天到期：' + remalday);
    });
}
