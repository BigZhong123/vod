import axios from 'axios';
import { Base64 } from 'js-base64';

export const toLogin = function(params) {
    const { passwd, email} = params;
    const password = Base64.encode(passwd);
    const url = '/api/login';
    return axios.get(url, {
        params: {
            permit: email,
            password
        }
    })
}