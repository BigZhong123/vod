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