import request from "../utils"

export function listComments(params) {
    return request({
        url: 'api/v1/comments',
        method: 'get',
        params
    })
}

export function addComment(data) {
    return request({
        url: 'api/v1/comments',
        method: 'post',
        data: data
    })
}


