import axios from 'axios';

// 获取评论信息
export const getComment = function(videoId, page, pageSize) {
    const url = '/api/comment/get';
    const params = {
        video_id: videoId,
        current_page: page,
        page_size: pageSize
    };
    return axios.get(url, {
        params
    });
}

// 评论
export const addComment = function(commentMsg, pId, replyUserId, userId, videoId) {
    const url = '/api/comment/add';
    const params = {
        commentMsg,
        pId,
        replyUserId,
        userId,
        videoId
    };
    return axios.post(url, params);
}