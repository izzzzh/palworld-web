import request from "../utils"

export function listPal(params) {
    return request({
        url: 'api/v1/pal',
        method: 'get',
        params
    })
}


export function getPal(id) {
    return request({
        url: 'api/v1/pal/' + id,
        method: 'get',
    })
}
