import Cookies from 'js-cookie'

let TokenKey = 'token'
let UserInfo = 'user_info'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token, expire) {
    return Cookies.set(TokenKey, token, {expires: expire})
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getUserInfo() {
    return Cookies.get(UserInfo)
}

export function setUserInfo(userInfo, expire) {
    return Cookies.set(UserInfo, userInfo, {expires: expire})
}
