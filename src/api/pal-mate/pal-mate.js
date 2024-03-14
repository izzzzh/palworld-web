import request from "../utils"

export function listPalMate(params) {
    return request({
        url: 'api/pal-mate',
        method: 'get',
        params
    })
}
