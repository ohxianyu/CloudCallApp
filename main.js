import Vue from 'vue'
import App from './App'
//数据管理中心
import store from '@/config/store'
Vue.prototype.$store = store;
//权限配置中心
import base from '@/config/baseUrl'
Vue.prototype.$base = base;
//挂载全局http请求
import $http from '@/config/requestConfig'
Vue.prototype.$http = $http;
Vue.config.productionTip = false
//判断是否登录
import { judgeLogin } from '@/config/login';
Vue.prototype.judgeLogin = judgeLogin;
Vue.config.productionTip = false;

//全局组件
import publicModule from "@/components/public_module.vue";
Vue.component("public-module", publicModule);

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
