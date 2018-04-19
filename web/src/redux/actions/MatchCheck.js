export const CHECK_CHANGE_S = "CHANGE_S"
import {api} from "./AY_API"

function mapAreaPush(area, id, checkArr){
    area[id].map(
        (c)=>{
            typeof(c)==='string'?'':c.check = true;
            typeof(c)==='string'?
            checkArr.push(c)    //区级，直接选中
            :
            c.first == 0 ? //省级，需要再次遍历
            checkArr = mapAreaPush(area, c.value, checkArr)
            :'';
        }
    )
    return checkArr;
}
function mapAreaPop(area, id, checkArr){
    area[id].map(
        (c)=>{
            typeof(c)==='string'?'':c.check = false;
            typeof(c)==='string'?
            checkArr = spliceMap(checkArr,c)//区级，直接删除
            :
            c.first == 0 ? //省级，需要再次遍历
            checkArr = mapAreaPop(area, c.value, checkArr)
            :'';
        }
    )
    return checkArr;
}
function spliceMap(checkArr,c){
    let index = checkArr.findIndex(function(value, index, arr) {
        return value == c;
    })
    index > -1 ?
    checkArr.splice(index,1)
    :'';
    return checkArr;
}
function mapArea(area, id, checked,listCheckArr,IDX,shen=""){
    area[id].map(
        (c,index)=>{
            if(c.first == 0){
                shen = c.name;
            }
            typeof(c)==='string' ? c = {check:checked,name:c}:c.check = checked;
            if(shen != "" && c.first != 0){
                if(!listCheckArr[IDX]){
                    listCheckArr[IDX] = [];
                }
                if(!listCheckArr[IDX][shen]){
                    listCheckArr[IDX][shen] = [];
                }
                if(listCheckArr[IDX][shen].indexOf(c.name) == -1){
                    listCheckArr[IDX][shen].push(c.name);
                }else{
                    if(!checked){
                        let nowArr = [];
                        for(let i in listCheckArr[IDX][shen]){
                            if(listCheckArr[IDX][shen][i] != c.name){
                                nowArr.push(listCheckArr[IDX][shen][i]);
                            }
                        }
                        listCheckArr[IDX][shen] = nowArr;
                    }
                }
            }
            area[id][index] = c;
            c.value ?
            c.first == 0 ? mapArea(area, c.value, checked,listCheckArr,IDX,shen):''//省级，需要再次遍历
            : '';
        }
    )
}
function mapAreaCity(area,data,checked,listCheckArr,IDX){
    area[data.id][data.key].check = checked;//市级别选中与否
    let addr = area[data.id][data.key].value;//获取市级别id，方便遍历获得区县级别
    let shen = area[data.id][data.key].name;//获取省中文名称
    area[addr].map(
        (c,index)=>{
            typeof(c)==='string' ? c = {check:checked,name:c}:c.check = checked;
            area[addr][index] = c;
            if(!listCheckArr[IDX]){
                listCheckArr[IDX] = [];
            }
            if(!listCheckArr[IDX][shen]){
                listCheckArr[IDX][shen] = [];
            }
            if(listCheckArr[IDX][shen].indexOf(c.name) == -1){
                listCheckArr[IDX][shen].push(c.name);
            }else{
                if(!checked){
                    let nowArr = [];
                    for(let i in listCheckArr[IDX][shen]){
                        if(listCheckArr[IDX][shen][i] != c.name){
                            nowArr.push(listCheckArr[IDX][shen][i]);
                        }
                    }
                    listCheckArr[IDX][shen] = nowArr;
                }
            }
        }
    )
    //console.log(area[data.id][data.key]);
    let index = area[data.id].findIndex(function(v,l,a){
        return v.first == 1;
    })//获取方向大区域级别索引
    if(checked){
        area[data.id][index].check = true;
        area[data.id].map(
            (c)=>{
                c.first == 0 ?
                (c.check ? '' : area[data.id][index].check = false)
                :'';
                if(!area[data.id][index].check)return//发现大区域下存在市级为未选中，直接终止遍历
            }
        )
    }else{
        area[data.id][index].check = false;
    }
}
function mapAreaAddr(area,data,checked,listCheckArr,IDX){
    if(typeof(area[data.id][data.key]) === 'string'){
        area[data.id][data.key] = {check:checked,name:area[data.id][data.key]}
    }
    area[data.id][data.key].check = checked;//区县级别选中与否
    //console.log(area[data.id][data.key])

    let index = area[data.sid].findIndex(function(v,l,a){
        return v.value == data.id;
    })//获取区域下市级别索引

    let shen = area[data.sid][index].name;//获取省的中文
    let city = area[data.id][data.key].name;//获取市的中文
    let ischeck = area[data.sid][index].check;  //选中状态
    if(!listCheckArr[IDX]){
        listCheckArr[IDX] = [];
    }
    if(!listCheckArr[IDX][shen]){
        listCheckArr[IDX][shen] = [];
    }
    if(listCheckArr[IDX][shen].indexOf(city) == -1){
        listCheckArr[IDX][shen].push(city);
    }else{
        if(!checked){
            let nowArr = [];
            for(let i in listCheckArr[IDX][shen]){
                if(listCheckArr[IDX][shen][i] != city){
                    nowArr.push(listCheckArr[IDX][shen][i]);
                }
            }
            listCheckArr[IDX][shen] = nowArr;
        }
    }
    let key = area[data.sid].findIndex(function(v,l,a){
        return v.first == 1;
    })//获取方向大区域级别索引
    if(checked){
        area[data.sid][index].check = true;
        area[data.id].map(
            (c)=>{
                c.check ? '' : area[data.sid][index].check = false;
                if(!area[data.sid][index].check) return area[data.sid][key].check = false;
            }
        )
        if(area[data.sid][index].check){//当市级开始为选中状态时，开始判断区域是否应该为选中
            area[data.sid][key].check = true;
            area[data.sid].map(
                (c)=>{
                    if(c.first == 0){
                        c.check ? '' :area[data.sid][key].check = false;
                        if(!area[data.sid][key].check) return
                    }
                }
            )
        }
    }else{
        area[data.sid][index].check = false;
        area[data.sid][key].check = false;
    }
}
export function changeS(checked,e,type,data,IDX){
    return (dispatch,getState)=>{
        let listCheckArr = getState().LogisticsMatch.listCheckArr;
        if(!IDX){
            IDX = listCheckArr.length;
        }
        let area = getState().MatchCheck.area;
        let checkArr = getState().MatchCheck.checkArr;
        let isupdate = getState().MatchCheck.isupdate;
        let hascheck = 1;
        let id = e.target.value;
        isupdate = isupdate?false:true;
        switch (type) {
            case 's':
                mapArea(area,id,checked,listCheckArr,IDX)
                break;
            case 'c':
                mapAreaCity(area,data,checked,listCheckArr,IDX)
                break;
            case 'a':
                mapAreaAddr(area,data,checked,listCheckArr,IDX)
                break;
            default:

        }
        dispatch({
            type:CHECK_CHANGE_S,
            newS:{area:area,checkArr:checkArr,isupdate:isupdate,listCheckArr:listCheckArr,hascheck:hascheck}
        })
    }
}
