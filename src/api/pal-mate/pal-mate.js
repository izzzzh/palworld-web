import request from "../utils"

export function listPalMate(params) {
    return request({
        url: 'api/v1/pal-mate',
        method: 'get',
        params
    })
}
