import axios from 'axios';

// 获取用户信息
export const getUserInfo = function(id) {
    const url = '/res/get_user_info';
    const user_id = id;
    return axios.get(url, {
        params: {
            user_id
        }
    });
};

// 更新用户信息
export const setUserInfo = function(id, instroduction, name) {
    const url = '/res/update_user_info';
    const params = {
        id,
        instroduction,
        nickname: name,
    };
    return axios.get(url, {
        params
    });
};

// 上传用户头像
export const upLoadavatar = function() {
    
}