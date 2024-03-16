import request from "../utils"

export function listSkill(params) {
    return request({
        url: 'api/v1/skill',
        method: 'get',
        params
    })
}
