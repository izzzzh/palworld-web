import {getToken} from "~/utils/auth";

const user = {
    namespaced: true,
    state: {
        userInfo: {
            username: "",
            isAdmin: false
        },
        token: getToken(),
        expire: 0,
        captcha: '',
        captchaId: ''
    },
    mutations: {
        SET_USER_INFO(state, userInfo) {
            state.userInfo = userInfo
        },
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_EXPIRE(state, expire) {
            state.expire = expire
        }
    }
}
