import React from 'react'
//IndexRoute就是根路由默认显示的
import {Router, Route, IndexRoute} from 'react-router'
//从src/containers/index.js导入


import {Nextstep,ManVip,AllSend,ZcpSetting,HpSetting,ShSetting,FhSetting,EcSet,CfSet,MultiShop, BatchEva, RateManager, Messagecon, TradeIndex, Interceptor, AutoEva, App, Form} from './redux/containers/'

// import ErrorOrder from './redux/components/ErrorOrder'

//这里IndexRoute入在根app下后，就是在App页面组件的props.children
//匹配规则参考官方文档
// const routerConfig = [
//     {
//         path          : '/',
//         component     : Main,
//         childrenRoutes: [
//             {path: 'about', component: About},
//             {path: 'inbox', component: Inbox}
//         ]
//     },
//     {
//         path: '*',
//         component: Not
//     }
// ];
export const createRoutes = () => ({
    path: '/dist',
    component: App,
    indexRoute: {component: Form},
    childRoutes: [
        {path:'/dist/autoeva',component:AutoEva},
        {path: '/dist/Interceptor', component:Interceptor},
        {path: '/dist/Message', component: Messagecon},
        {path: '/dist/ratemanager', component: RateManager},
        {path: '/dist/batcheva', component: BatchEva},
        {path:'/dist/TradeIndex',component:TradeIndex},
        {path: '/dist/Message/cf', component: CfSet},
        {path: '/dist/Message/ec', component: EcSet},
        {path: '/dist/Message/fh', component: FhSetting},
        {path: '/dist/Message/sh', component: ShSetting},
        {path: '/dist/Message/hp', component: HpSetting},
        {path: '/dist/Message/zcp', component: ZcpSetting},
        {path: '/dist/Message/send', component: AllSend},
        {path: '/dist/Message/manvip', component: ManVip},
        {path: '/dist/Message/next', component: Nextstep},
        {path:'/dist/multishop',component:MultiShop},
        {path:'/dist/dsd',component:Form},
    // PageNotFound(),
    // Redirect
  ]
})
export default createRoutes

// export default (
//   <Route name='app' path='/' component={App}>
//     <IndexRoute component={Form} />
//     <Route path="/Goods" component={Goods} />
//     <Route path="/Box" component={Box} />
//     <Route path="/Trade" component={Trade} />
//     <Route path="/Table" component={Table} />
//     <Route path="/Cancel" component={Cancel} />
//     <Route path="/Setting" component={Setting} />
//   </Route>
// )
