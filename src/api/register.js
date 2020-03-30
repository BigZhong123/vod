import axios from 'axios';
import { Base64 } from 'js-base64';

// 获取验证码
export const getCode = function (email) {
  return axios({
    methods: 'GET',
    url: '/res/get_email_check_code',
    params: {
      email
    }
  })
}

// 注册
export const toRegister = function (params) {
  const { passwd, email, code } = params;
  const password = Base64.encode(passwd);
  const data = {
    email,
    emailCheckCode: code,
    password
  };
  const url = '/res/register';
  // return axios.post(url, data)
  return axios({
    url,
    method: 'post',
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  })
}