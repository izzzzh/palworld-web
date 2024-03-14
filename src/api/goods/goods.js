import request from "../utils"

export function list(params) {
    return request({
        url: 'api/goods',
        method: 'get',
        params
    })
}
