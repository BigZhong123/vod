import axios from 'axios';

export const clickVideo = function(userId, videoId) {
    const url = '/api/video/click';
    const params = {
        user_id: userId,
        video_id: videoId
    }
    return axios.get(url, {
        params
    })
}