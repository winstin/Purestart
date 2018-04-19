import React from 'react'
import ReactDOM from 'react-dom'

//import routes from './routes'
import {Router, browserHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';


import { Provider } from 'react-redux'
import configureStore from './redux/stores/configureStore'
import {api} from './redux/actions/AY_API'

class App extends React.Component {
    render(){
    const {history,routes, store} = this.props

    return (
      <Provider store={store}>
          <Router history={history} children={routes} />
      </Provider>
    )
    }
}

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('app')



let render = () => {
    const routes = require('./routes').default()
  ReactDOM.render(

      <App store={store} history={history} routes = {routes}/>,
    MOUNT_NODE
  )
}


// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}
window.Gcn_success = 0;/*菜鸟组件是否连接成功*/
window.webSocket;
/*备注：webSocket 是全局对象，不要每次发送请求丢去创建一个，做到webSocket对象重用，和打印组件保持长连接。*/
/**
 * 和菜鸟组件进行连接
 * @author zdh
 */
function doConnect()
{
    window.webSocket = new WebSocket('wss://localhost:13529');
    /*如果是https的话，端口是13529*/
    /*window.webSocket = new WebSocket('wss://localhost:13529');*/
    /* 打开Socket*/
    window.webSocket.onerror =function(event){
        Gcn_success = 0;
    	console.log("没有安装新版菜鸟组件或者新版菜鸟组件没有打开",event);
        window.webSocket.close();
    }

    window.webSocket.onopen = function(event)
    {
        Gcn_success = 1;
        console.log("千牛组件连接成功！");
        // getElecFacePrinter();
        /*监听消息*/
        window.webSocket.onmessage = function(event)
        {
            console.log('Client received a message',event);
            var result = JSON.parse(event.data);
            console.log(result);
            if(result.cmd == "print"){
                if(result.status == "success"){
                    if(result.requestID == "preview_ef_modal"){
                        $("#preview_ef_img").attr("src",result.previewImage[0]);
                    }
                    if(result.requestID == "edit_ef_modal"){
                        console.log("webSocket",result.previewImage[0]);
                        // return result.previewImage[0];
                        // $("#elecFaceImg").attr("src",result.previewImage[0]);
                    }
                    if(result.requestID == "print_ef"){/*打印成功*/
                        for(var i in Gselect_arr){
                            savePrintStatus(Gselect_arr[i]);
                        }

                        if(gstatus == "dfh"){
                            if(Gprint_and_send == 0){/*打印后不自动发货*/
                                efSavePreDeliver();
                            }else{/*打印后自动发货*/
                                elecFaceSend();
                            }
                        }else{
                            var as = $("#allselect");
                            if(as.attr("class") == "checkbox-pretty inline checked"){
                                as.checkbox('uncheck');
                                as.checkbox('uncheck');
                            }
                            $(".checkbox-pretty.inline.plcb.checked").each(function(){
                                $(this).checkbox('uncheck');
                                $(this).checkbox('uncheck');
                            });
                            Gselect_arr = [];
                            layer.closeAll();
                            $("#electronic").modal("hide");
                        }
                    }
                }else{
                    if(result.requestID == "print_ef"){/*打印失败*/
                        layer.closeAll();
                        layer.msg("打印出错！",1,3);
                    }
                }
            }
            if(result.cmd == "getPrinters"){
                if(result.status == "success"){
                    for(var i in result.printers){
                        if(result.printers[i].type == "thermal"){
                            Gef_printer_arr.push(result.printers[i].name);
                        }
                    }
                }
            }

        };
        /*监听Socket的关闭*/
        window.webSocket.onclose = function(event)
        {
            console.log('Client notified webSocket has closed',event);
        };
    };
}

/**
 * 初始化打印模板信息
 * by zdh
 */
function initPrintDate(){
    const user_nick = "财宝宝588";
    let printModal = localStorage.getItem("printModal"+user_nick);
    if(printModal == null){
        api("ebs.printData.getPrintModal",{},function(e){
            let printModalData = {
                public:e.public,
                private:e.private
            };
            localStorage.setItem("printModal"+user_nick, JSON.stringify(printModalData));
        });
    }/*快递单模板*/

    let deliveryModal = localStorage.getItem("deliveryModal"+user_nick);
    if(deliveryModal == null){
        api("ebs.printData.getDeliveryMould",{},function(e){
            localStorage.setItem("deliveryModal"+user_nick, e.deliveryMould.buyerop);
        });
    }/*发货单模板*/

    let efModal = localStorage.getItem("efModal"+user_nick);
    if(efModal == null){
        api("ebs.ElecFace.getPrivateEFModal",{},function(e){
            localStorage.setItem("efModal"+user_nick, JSON.stringify(e.result));
        });
    }/*电子面单模板*/
}

window.user_nick;
window.user_type;
window.activetimes;
window.vipuser;
window.viptime;
window.tbtime;
window.serviceTime;
// ========================================================
// Go!
// ========================================================
initPrintDate()
doConnect()
render()
