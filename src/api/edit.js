import axios from 'axios';

export const editVideo = function(params) {
    const url = 'api/video/update';
    return axios.post(url, params)
}