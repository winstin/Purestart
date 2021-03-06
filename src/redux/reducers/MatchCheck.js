import { CHECK_CHANGE_S } from '../actions/MatchCheck'

var Gchina = {};
Gchina.huadong=[{"value":"huadong","name":"华东","check":false,"first":"1"},{"value":"shanghai","name":"上海","check":false,"first":"0"},{"value":"jiangsu","name":"江苏省","check":false,"first":"0"},{"value":"zhejiang","name":"浙江省","check":false,"first":"0"},{"value":"anhui","name":"安徽省","check":false,"first":"0"},{"value":"jiangxi","name":"江西省","check":false,"first":"0"}];
Gchina.huabei=[{"value":"huabei","name":"华北","check":false,"first":"1"},{"value":"beijing","name":"北京","check":false,"first":"0"},{"value":"tianjin","name":"天津","check":false,"first":"0"},{"value":"shanxi","name":"山西省","check":false,"first":"0"},{"value":"shandong","name":"山东省","check":false,"first":"0"},{"value":"hebei","name":"河北省","check":false,"first":"0"},{"value":"neimenggu","name":"内蒙古","check":false,"first":"0"}];
Gchina.huazhong=[{"value":"huazhong","name":"华中","check":false,"first":"1"},{"value":"hunan","name":"湖南省","check":false,"first":"0"},{"value":"hubei","name":"湖北省","check":false,"first":"0"},{"value":"henan","name":"河南省","check":false,"first":"0"}];
Gchina.huanan=[{"value":"huanan","name":"华南","check":false,"first":"1"},{"value":"guangdong","name":"广东省","check":false,"first":"0"},{"value":"guangxi","name":"广西省","check":false,"first":"0"},{"value":"fujian","name":"福建省","check":false,"first":"0"},{"value":"hainan","name":"海南省","check":false,"first":"0"}];
Gchina.dongbei=[{"value":"dongbei","name":"东北","check":false,"first":"1"},{"value":"liaoning","name":"辽宁省","check":false,"first":"0"},{"value":"jilin","name":"吉林省","check":false,"first":"0"},{"value":"heilongjiang","name":"黑龙江省","check":false,"first":"0"}];
Gchina.xibei=[{"value":"xibei","name":"西北","check":false,"first":"1"},{"value":"xibeishanxi","name":"陕西省","check":false,"first":"0"},{"value":"xinjiang","name":"新疆省","check":false,"first":"0"},{"value":"gansu","name":"甘肃省","check":false,"first":"0"},{"value":"ningxia","name":"宁夏省","check":false,"first":"0"},{"value":"qinghai","name":"青海省","check":false,"first":"0"}];
Gchina.xinan=[{"value":"xinan","name":"西南","check":false,"first":"1"},{"value":"chongqing","name":"重庆省","check":false,"first":"0"},{"value":"yunnan","name":"云南省","check":false,"first":"0"},{"value":"guizhou","name":"贵州省","check":false,"first":"0"},{"value":"xizang","name":"西藏","check":false,"first":"0"},{"value":"sichuan","name":"四川省","check":false,"first":"0"}];
Gchina.gangaotai=[{"value":"gangaotai","name":"港澳台","check":false,"first":"1"},{"value":"xianggang","name":"香港","check":false,"first":"0"},{"value":"aomen","name":"澳门","check":false,"first":"0"},{"value":"taiwan","name":"台湾","check":false,"first":"0"}];
Gchina.haiwai2=[{"value":"haiwai2","name":"海外","check":false,"first":"1"},{"value":"haiwai","name":"海外","check":false,"first":"0"}];
Gchina.shanghai=["上海上海市"];
Gchina.jiangsu=["南京市","无锡市","徐州市","常州市","苏州市","镇江市","南通市","扬州市","泰州市","盐城市","淮安市","宿迁市","连云港市"];
Gchina.zhejiang=["杭州市","嘉兴市","湖州市","绍兴市","宁波市","台州市","温州市","金华市","衢州市","丽水市","舟山市"];
Gchina.anhui=["合肥市","亳州市","淮北市","宿州市","阜阳市","蚌埠市","淮南市","滁州市","六安市","巢湖市","芜湖市","安庆市","池州市","铜陵市","宣城市","黄山市","马鞍山市"];
Gchina.jiangxi=["南昌市","九江市","萍乡市","新余市","鹰潭市","赣州市","宜春市","上饶市","吉安市","抚州市","景德镇市"];
Gchina.beijing=["北京北京市"];
Gchina.tianjin=["天津天津市"];
Gchina.shanxi=["太原市","大同市","阳泉市","长治市","晋城市","朔州市","晋中市","运城市","忻州市","临汾市","吕梁市"];
Gchina.shandong=["菏泽市","济南市","青岛市","淄博市","枣庄市","东营市","烟台市","潍坊市","济宁市","泰安市","威海市","日照市","滨州市","德州市","聊城市","临沂市","莱芜市"];
Gchina.hebei=["唐山市","邯郸市","保定市","承德市","廊坊市","沧州市","张家口市","衡水市","邢台市","秦皇岛市","石家庄市"];
Gchina.neimenggu=["呼和浩特市","鄂尔多斯市","呼伦贝尔市","巴彦淖尔市","乌兰察布市","锡林郭勒盟","阿拉善盟","包头市","乌海市","赤峰市","通辽市","兴安盟"];
Gchina.hunan=["长沙市","株洲市","湘潭市","衡阳市","邵阳市","岳阳市","常德市","张家界市","益阳市","郴州市","永州市","怀化市","娄底市"];
Gchina.hubei=["武汉市","宜昌市","黄石市","十堰市","荆州市","襄樊市","鄂州市","荆门市","孝感市","黄冈市","咸宁市","随州市","仙桃市","天门市","潜江市","恩施市","神农架林区"];
Gchina.henan=["漯河市","郑州市", "洛阳市","商丘市","安阳市","南阳市","驻马店市","开封市","焦作市","新乡市","鹤壁市","濮阳市","许昌市","信阳市","周口市","济源市","三门峡市","平顶山市"];
Gchina.guangdong=["广州市","深圳市","珠海市","汕头市","韶关市","佛山市","江门市","湛江市","茂名市","肇庆市","梅洲市","汕尾市","河源市","阳江市","清远市","东莞市","中山市","潮州市","揭阳市","云浮市"];
Gchina.guangxi=["南宁市","柳州市","桂林市","梧州市","北海市","钦州市","贵港市","玉林市","百色市","贺州市","河池市","来宾市","崇左市","防城港市"];
Gchina.fujian=["莆田市","福州市","泉州市","龙岩市","南平市","漳州市","厦门市","宁德市","三明市"];
Gchina.hainan=["海口市","三亚市","三沙市","琼海市","儋州市","文昌市","万宁市","东方市","澄迈县","定安县","屯昌县","临高县","白沙黎族自治县","昌江黎族自治县","乐东黎族自治县","陵水黎族自治县","保亭黎族苗族自治县","琼中黎族苗族自治县","五指山市"];
Gchina.liaoning=["沈阳市","大连市","鞍山市","抚顺市","本溪市","丹东市","锦州市","营口市","阜新市","辽阳市","盘锦市","铁岭市","朝阳市","葫芦岛市"];
Gchina.jilin=["长春市","吉林市","四平市","辽源市","松原市","通化市","白山市","白城市","延边朝鲜族自治州"];
Gchina.heilongjiang=["哈尔滨市","齐齐哈尔市","佳木斯市","鹤岗市","大庆市","鸡西市","双鸭山市","伊春市","牡丹江市","黑河市","七台河市","绥化市","大兴安岭地区"];
Gchina.xibeishanxi=["西安市","铜川市","宝鸡市","咸阳市","渭南市","汉中市","商洛市","安康市","延安市","榆林市"];
Gchina.xinjiang=["乌鲁木齐市","克拉玛依市","石河子市","阿拉尔市","图木舒克市","五家渠市","哈密地区","吐鲁番市","阿克苏地区","喀什地区","和田地区","塔城地区","阿勒泰地区","昌吉回族自治州","博尔塔拉蒙古自治州","巴音郭楞蒙古自治州","克孜勒苏柯尔克孜自治州","伊犁哈萨克自治州"];
Gchina.gansu=["兰州市","嘉峪关市","金昌市","白银市","天水市","武威市","张掖市","酒泉市","平凉市","庆阳市","定西市","陇南市","临夏回族自治州","甘南藏族自治州"];
Gchina.ningxia=["银川市","石嘴山市","吴忠市","中卫市","固原市"];
Gchina.qinghai=["西宁市","海东市","海西蒙古族藏族自治州","海北藏族自治州","黄南藏族自治州","海南藏族自治州","果洛藏族自治州","玉树藏族自治州"];
Gchina.chongqing=["重庆重庆市"];
Gchina.yunnan=["昆明市","曲靖市","玉溪市","保山市","昭通市","丽江市","普洱市","临沧市","楚雄彝族自治州","红河哈尼族彝族自治州","文山壮族苗族自治州","西双版纳傣族自治州","大理白族自治州","德宏傣族景颇族自治州","怒江傈僳族自治州","迪庆藏族自治州"];
Gchina.guizhou=["贵阳市","遵义市","六盘水市","安顺市","铜仁市","黔西南布依族苗族自治州","黔南布依族苗族自治州","黔东南苗族侗族自治州","毕节市"];
Gchina.xizang=["拉萨市","昌都市","日喀则市","山南地区","那曲地区","阿里地区","林芝市"];
Gchina.sichuan=["成都市","自贡市","攀枝花市","泸州市","德阳市","绵阳市","广元市","遂宁市","内江市","乐山市","南充市","宜宾市","广安市","达州市","眉山市","雅安市","巴中市","资阳市","甘孜藏族自治州","凉山彝族自治州","阿坝藏族羌族自治州"];
Gchina.xianggang=["香港岛","九龙","新界"];
Gchina.aomen=["澳门半岛","离岛"];
Gchina.taiwan=["台北市","桃园县","新竹市","宜兰县","花莲县","南投县","苗栗县","台南市","彰化县","云林县","嘉义市","屏东县","澎湖县","金门县","高雄市","台中市","台东县","连江县","基隆市","新北市","新竹县"];
Gchina.haiwai=["海外"];

//初始化状态
const initialState = {
    'area':Gchina,
    'checkArr':[],
    'isupdate':true
}

export default function MatchCheck(state = initialState, action){
    switch (action.type) {

        case CHECK_CHANGE_S:
            return action.newS;
        default:
            return state;
    }
}
