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
