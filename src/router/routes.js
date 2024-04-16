import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '首页',
        component: () => import('~/components/Index'),
        children: [
            {
                path: 'pal',
                name: '帕鲁',
                component: () => import('~/components/Pal/PalIndex'),
                children: [
                    {
                        path: 'list',
                        name: '帕鲁列表',
                        props: true,
                        component: () => import('~/components/Pal/PalList'),
                    },
                    {
                        path: ':id(\\d+)',
                        name: '帕鲁详情',
                        props: true,
                        component: () => import('~/components/Pal/PalInfo'),
                    },
                ]
            },
            {
                path: 'skills',
                name: '技能查询',
                component: () => import('~/components/Skill/SkillList'),
            },
            {
                path: 'goods',
                name: '物品图鉴',
                component: () => import('~/components/Goods/GoodsList'),
            },
            {
                path: 'pal-mating',
                name: '帕鲁配种查询',
                component: () => import('~/components/PalMate/PalMateList'),
            },
            {
                path: 'technology-tree',
                name: '科技树',
                component: () => import('~/components/TechnologyTree/Technology'),
            },
            {
                path: '/admin',
                name: '/后台管理',
                component: () => import('~/components/Admin/Admin'),
                children: [
                    {
                        path: 'pal',
                        name: '帕鲁管理',
                        component: () => import('~/components/Admin/Pal/PalManager'),
                    },
                    {
                        path: 'skill',
                        name: '技能管理',
                        component: () => import('~/components/Admin/Skill/SkillManager'),
                    },
                    {
                        path: 'goods',
                        name: '物品管理',
                        component: () => import('~/components/Admin/Goods/GoodsManager'),
                    },
                    {
                        path: 'technology-tree',
                        name: '科技树管理',
                        component: () => import('~/components/Admin/Tree/TreeManager'),
                    },
                    {
                        path: 'containers',
                        name: '容器管理',
                        component: () => import('~/components/Admin/Container/ContainerList'),
                        children: [
                            {
                                path: 'logs',
                                name: '容器日志详情',
                                component: () => import('~/components/Admin/Container/ContainerLog'),
                            },
                        ]
                    },
                    {
                        path: 'users',
                        name: '用户管理',
                        component: () => import('~/components/Admin/User/UserManager')
                    },
                ]
            },
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
