import request from "../utils"

export function listGoods(params) {
    return request({
        url: 'api/v1/goods',
        method: 'get',
        params
    })
}
