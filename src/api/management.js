import axios from 'axios';

export const deleteVideo = function(userId, videoArr) {
    const url = '/api/video/delete';
    const params = {
        videoIds: videoArr,
        userId: userId
    };
    return axios.post(url, params)
}