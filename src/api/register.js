import axios from 'axios';
import { Base64 } from 'js-base64';

// 获取邮箱验证码
// export const getCode = function (email) {
//   return axios({
//     methods: 'GET',
//     url: '/api/get_email_check_code',
//     params: {
//       email
//     }
//   })
// }

// 获取手机验证码
export const getCode = function (phone_number) {
  return axios({
    methods: 'GET',
    url: '/api/get_phone_check_code',
    params: {
      phone_number
    }
  })
}

// 注册
export const toRegister = function (params) {
  const { passwd, email, code } = params;
  const password = Base64.encode(passwd);
  const data = {
    phoneNumber: email,
    checkCode: code,
    password
  };
  const url = '/api/register';
  return axios({
    url,
    method: 'post',
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  })
}