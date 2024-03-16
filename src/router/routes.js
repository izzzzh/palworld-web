import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index'
import PalList from '../components/Pal/PalList'
import SkillList from '../components/Skill/SkillList'
import GoodsList from '../components/Goods/GoodsList'
import NewsList from '../components/News/NewsList'
import PalMateList from '../components/PalMate/PalMateList'
import PalInfo from "~/components/Pal/PalInfo";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '首页',
        component: Index,
        children: [
            {
                path: '/pals',
                name: '帕鲁图鉴',
                component: PalList,
            },
            {
                path: '/pal/:id',
                name: '帕鲁详情',
                component: PalInfo,
                props: true,
            },
            {
                path: '/skills',
                name: '技能查询',
                component: SkillList,
            },
            {
                path: '/goods',
                name: '物品图鉴',
                component: GoodsList,
            },
            {
                path: '/pal-mating',
                name: '帕鲁配种查询',
                component: PalMateList,
            },
            {
                path: '/news',
                name: '帕鲁资讯',
                component: NewsList,
            }
        ]
    },
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes
})

export default router
