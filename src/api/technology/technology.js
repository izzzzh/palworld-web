import request from "../utils"

export function getTechnologyTree() {
    return request({
        url: 'api/v1/technology-tree',
        method: 'get',
    })
}
