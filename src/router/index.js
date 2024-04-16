import router from './routes'
import NProgress from 'nprogress'

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.path === '/') {
        next({path: '/pal/list'})
    } else {
        next()
    }
    NProgress.done()
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})
