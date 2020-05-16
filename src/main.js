import Vue from "vue";
import App from "./App.vue";
import router from "./router"; // 路由
import './router/permission'; // 加载路由权限控制
import store from "./store";
import 'babel-polyfill' // 解决ie兼容问题
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import "./css/public.less"; // 公共css样式

Vue.use(ViewUI);


// 工具
import {backPage, isNotNull, isBlank} from "./utils/util";
// 按钮组件级别权限校验
import checkPermission from "./utils/permission";
// 配置文件
import {indexPage, loginPage} from "./config/config";

// 引入mock文件 目前登录使用的是在线mock
// require('./mock/index') // mock 方式，正式发布时，注释掉该处即可

Vue.prototype.$backPage = backPage
Vue.prototype.$isNotNull = isNotNull
Vue.prototype.$isBlank = isBlank
Vue.prototype.$indexPage = indexPage
Vue.prototype.$loginPage = loginPage
Vue.prototype.$checkPermission = checkPermission

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
