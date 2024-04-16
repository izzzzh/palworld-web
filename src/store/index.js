// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: {

        },
        logDrawer: false,
        breadcrumb: true,
        isCollapse: false,
        sidebarWidth: 200,
        allPal: [],
        filterPal: [],
        dialogVisible: false,
        goodsTypes: '',
        goodsQuality: 0,
        goodsName: '',
        qualityMap: ['普通', '少见', '稀有', '史诗', '传说'],
        qualityColor: ['#1f2b3e', '#224326', '#0E4E6A', '#630884', '#b77e0c'],
        attributeColor: ['', '#a2877e', '#9f0f4a', '#a54bc6', '#19b2c0', '#d65531', '#66a800', '#8f5523', '#cead00', '#1872d6'],
    },
});



