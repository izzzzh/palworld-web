import request from "../utils"

export function listPal(params) {
    return request({
        url: 'api/v1/pal',
        method: 'get',
        params
    })
}
