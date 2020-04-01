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
    const url = '/api/upload/avatar';
    const params = {
        file: binaryFile
    };
    return axios.post(url, params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

// 更新用户信息
export const updateUserInfo = function(params) {
    const url = '/api/update_user_info';
    return axios.post(url, params)
}