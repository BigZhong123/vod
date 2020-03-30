import axios from 'axios';

// 获取用户信息
export const getUserInfo = function(id) {
    const url = '/res/get_user_info';
    const params = {
        user_id: id,
    };
    return axios.get(url, {
        params
    })
}

// 更新用户信息
export const updateUserInfo = function(params) {
    const url = '/res/update_user_info';
    return axios.post(url, params)
}