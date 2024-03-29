import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router/routes'
import store from './store/index'
import './assets/styles/index.css'
import './router/index'
import 'animate.css';

Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

router.afterEach((to, from, next) => {
    setTimeout(() => {
        //百度统计
        let _hmt = _hmt || [];
        (function () {
            let hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?2692b01844d06770b605112ddfbcf1df";
            let s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    }, 0);
});
