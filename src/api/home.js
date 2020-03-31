import axios from 'axios';

axios.defaults.baseURL = 'http://101.133.165.169:8000/'

// 资源路径
export const baseUrl = 'http://101.133.165.169:8000/res/'

export const getVideoLists = function(page, pageSize) {
    // userId 本来打算写推荐的，但是没有写
    const user_id = '111';
    const url = '/api/video/get_index_videos';
    return axios.get(url, {
        params: {
            user_id,
            current_page: page,
            page_size: pageSize
        }
    })
}