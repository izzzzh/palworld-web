import request from "../utils"

export function list(params) {
    return request({
        url: 'api/v1/goods',
        method: 'get',
        params
    })
}
