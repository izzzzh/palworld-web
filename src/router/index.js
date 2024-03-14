import router from './routes'
import NProgress from 'nprogress'
import store from "../store/index";

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.path === '/') {
        next({path: '/pals'})
        store.dispatch('updateActiveRoute', '/pals');
    } else {
        store.dispatch('updateActiveRoute', to.path); // 调用 Vuex action 更新 activeRoute
        next()
    }
    NProgress.done()
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})
