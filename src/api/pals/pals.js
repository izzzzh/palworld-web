import request from "../utils"

export function listPal(params) {
    return request({
        url: 'api/pal',
        method: 'get',
        params
    })
}
