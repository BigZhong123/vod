import axios from 'axios';

export const getPartVideoLists = function(id, page) {
    const url = '/res/video/get_partition_videos';
    const partition_id = id;
    const params = {
        partition_id,
        current_page: page,
        page_size: 10
    };
    return axios.get(url, {
        params
    })
}