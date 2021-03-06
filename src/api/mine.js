import axios from 'axios';

// 获取用户信息
export const getUserInfo = function(id) {
    const url = '/api/get_user_info';
    const params = {
        user_id: id,
    };
    return axios.get(url, {
        params
    })
}

// 上传图片
export const uploadAvatar = function(binaryFile) {
    const url = '/api/upload/avatar/bybase64';
    const params = {
        imgStr: binaryFile
    };
    return axios.post(url, params, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

// 上传视频
export const uploadVideo = function(params) {
    const url = '/api/video/add';
    return axios.post(url, params, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

// 更新用户信息
export const updateUserInfo = function(params) {
    const url = '/api/update_user_info';
    return axios.post(url, params)
}

// 获取用户上传的视频
export const getUserVideo = function(userId, page, pageSize) {
    const url = '/api/video/get_user_videos';
    const params = {
        user_id: userId,
        current_page: page,
        page_size: pageSize
    };
    return axios.get(url, {
        params
    });
}

// 获取用户收藏的视频
export const getUserCollect = function(userId, page, pageSize) {
    const url = '/api/video/collect/get';
    const params = {
        user_id: userId,
        current_page: page,
        page_size: pageSize
    };
    return axios.get(url, {
        params
    });
}

// 获取我的关注列表
export const getMySubscribe = function(userId) {
    const url = '/api/get_subscribes';
    const params = {
        user_id: userId
    };
    return axios.get(url, {
        params
    })
}

// 获取我的粉丝列表
export const getMyFollow = function(userId) {
    const url = '/api/get_follows';
    const params = {
        user_id: userId
    };
    return axios.get(url, {
        params
    })
}

// 判断一个用户是否关注另外一个用户
export const getIsSubscribe = function(userId, upId) {
    const url = '/api/follow/has_subscribe';
    const params = {
        user_id: userId,
        up_id: upId
    }
    return axios.get(url, {
        params
    })
}