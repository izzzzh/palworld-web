// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        activeRoute: '/pals', // 当前激活的路由
        activeMenu: '帕鲁图鉴',
        menuItems: [
            {path: '/pals', name: '帕鲁图鉴', icon: 'el-icon-menu'},
            {path: '/pal-mating', name: '帕鲁配种查询', icon: 'el-icon-menu',},
            {path: '/goods', name: '物品图鉴', icon: 'el-icon-menu',},
            {path: '/skills', name: '技能查询', icon: 'el-icon-menu',},
            {path: '/news', name: '帕鲁资讯', icon: 'el-icon-menu',}
        ],
        attributeMap: ['全部属性', '无', '暗', '龙', '冰', '火', '草', '土', '雷', '水'],
        palSearchName: "",
        allAttribute: true,
        attributeId: 0,
        qualityMap: ['普通', '少见', '稀有', '史诗', '传说'],
        qualityColor: ['#1F3A4F', '#224326', '#0E4E6A', '#630884', '#b77e0c'],
        goodsTypes: 0,
        goodsQuality: 0,
        goodsName: "",
        palMate: [],
    },
    mutations: {
        setActiveRoute(state, to) {
            state.activeRoute = to;
        },
    },
    actions: {
        // 当路由变化时，更新 activeRoute 状态
        updateActiveRoute({commit}, to) {
            commit('setActiveRoute', to);
        },
    },
});
