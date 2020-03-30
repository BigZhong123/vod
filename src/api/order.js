import axios from 'axios';

// 获取订阅内容未阅读数
export const getNotRead = function(userId) {
    const url = '/api/notify/get/unread_count';
    const user_id = userId;
    return axios.get(url, {
        params: {
            user_id
        }
    })
}

// 获取是否有订阅人
export const getSubscribes = function(userId) {
    const url = '/api/get_subscribes';
    const user_id = userId;
    return axios.get(url, {
        params: {
            user_id
        }
    })
}

// 获取订阅内容
export const getOrderVideo = function(userId) {
    const user_id = userId;
    const url = '/api/notify/get';
    return axios.get(url, {
        params: {
            user_id
        }
    })
}

