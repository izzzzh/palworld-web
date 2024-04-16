import request from "../utils"

export function listCont() {
    return request({
        url: 'api/v1/containers',
        method: 'get',
    })
}
