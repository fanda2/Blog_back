import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import axios from "axios";
import router from './router'
import "./assets/css/base.css";

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)


Vue.config.productionTip = false
Vue.prototype.$http = axios;

// 请求拦截器,其余请求头加上token
axios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (config.url == "/user/login") {
        return config;
    } else {
        config.headers.Authorization = token;
    }

    return config;
});
//响应封装处理
axios.interceptors.response.use((response) => {
    return response.data
})
Vue.prototype.openLoading = function() {
    const loading = this.$loading({
        // 声明一个loading对象
        lock: true, // 是否锁屏
        text: "加载中...", // 加载动画的文字
        spinner: "el-icon-loading", // 引入的loading图标
        background: "rgba(0, 0, 0, 0.5)", // 背景颜色
        target: ".sub-main", // 需要遮罩的区域
        body: true,
        customClass: "mask", // 遮罩层新增类名
    });
    setTimeout(function() {
        // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
        loading.close(); // 关闭遮罩层
    }, 5000);
    return loading;
};


// axios.defaults.baseURL = "http://192.168.1.103:3000";
axios.defaults.baseURL = "http://www.fjtbkyc.net:3000";

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')