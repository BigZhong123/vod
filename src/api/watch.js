import axios from 'axios';

// 获取视频信息
export const getVideoInfo = function(id) {
    const url = '/api/video/get';
    return axios.get(url, {
        params: {
            video_id: id
        }
    })
}

// 获取分区视频
export const getPartitionVideo = function(partId, page, pageSize) {
    const url = '/api/video/get_partition_videos';
    const params = {
        partition_id: partId,
        current_page: page,
        page_size: pageSize
    };
    return axios.get(url, {
        params
    })
}

// 收藏视频
export const collectVideo = function(userId, videoId) {
    const url = '/api/video/collect';
    const params = {
        user_id: userId,
        video_id: videoId
    }
    return axios.get(url, {
        params
    })
}
// 取消收藏
export const cancelCollectVideo = function(userId, videoId) {
    const url = '/api/video/collect/cancel';
    const params = {
        user_id: userId,
        video_id: videoId
    }
    return axios.get(url, {
        params
    })
}
// 点赞视频
export const likeVideo = function(userId, videoId) {
    const url = '/api/video/like';
    const params = {
        user_id: userId,
        video_id: videoId
    }
    return axios.get(url, {
        params
    })
}
// 取消点赞
export const cancelLikeVideo = function(userId, videoId) {
    const url = '/api/video/like/cancel';
    const params = {
        user_id: userId,
        video_id: videoId
    }
    return axios.get(url, {
        params
    })
}

// 用户是否收藏，点赞视频
export const getUserOperation = function(userId, videoId) {
    const url = '/api/video/get_user_operation';
    const params = {
        user_id: userId,
        video_id: videoId
    }
    return axios.get(url, {
        params
    })
}

// 订阅
export const addFollow = function(followerId, followedId) {
    const url = '/api/follow/add';
    const params = {
        followedId,
        followerId
    }
    return axios.post(url, params);
}

// 取消订阅
export const cancelFollow = function(followerId, followedId) {
    const url = '/api/follow/cancel';
    const params = {
        followedId,
        followerId
    }
    return axios.post(url, params);
}