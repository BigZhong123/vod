## 邮箱注册改为手机号码注册
<template>
  <div class="register">
    <div class="form-wrapper">
      <p>{{$t('register.title')}}</p>
      <form>
        <div class="item">
          <input
            class="item-input"
            :style="{'border-color': !isEmailRight || isEmailNone ? 'red' : ''}"
            v-model.trim="registerInfo.email"
            @focus="inputEmail"
            @blur="validateEmail"
          />
          <div class="input-icon">
            <Icon type="ios-mail" size="30" />
          </div>
          <div
            class="move-label"
            :class="{'is-move': focusInput === 'email' || registerInfo.email.length > 0}"
          >{{$t('register.phone')}}</div>
          <div class="tip" v-if="isEmailNone">{{$t('register.phoneEmpty')}}</div>
          <div class="tip" v-if="!isEmailRight">{{$t('register.phoneError')}}</div>
        </div>
        <div class="item">
          <input
            :type="isPasswdSee ? 'text' : 'password'"
            class="item-input"
            :style="{'border-color': !isPasswdRight ? 'red' : ''}"
            v-model.trim="registerInfo.passwd"
            @focus="inputPwd"
            @blur="validatePwd"
          />
          <div class="input-icon icon-eye">
            <Icon type="md-eye" size="20" v-if="isPasswdSee" @click="isPasswdSee = !isPasswdSee" />
            <Icon type="md-eye-off" size="20" v-if="!isPasswdSee" @click="isPasswdSee = !isPasswdSee" />
          </div>
          <div
            class="move-label"
            :class="{'is-move': focusInput === 'passwd' || registerInfo.passwd.length > 0}"
          >{{$t('register.password')}}</div>
          <div class="tip" :style="{'color': isPasswdRight ? '#7d7c7c' : ''}">{{$t('register.passwordTip')}}</div>
        </div>
        <div class="item">
          <input
            :type="isPasswdCheckSee ? 'text' : 'password'"
            class="item-input"
            :style="{'border-color': !isPasswdCheckRight || isPasswdCheckNone ? 'red' : ''}"
            v-model.trim="registerInfo.passwdCheck"
            @focus="inputPasswdCheck"
            @blur="validatePasswdCheck"
          />
          <div class="input-icon icon-eye">
            <Icon type="md-eye" size="20" v-if="isPasswdCheckSee" @click="isPasswdCheckSee = !isPasswdCheckSee" />
            <Icon type="md-eye-off" size="20" v-if="!isPasswdCheckSee" @click="isPasswdCheckSee = !isPasswdCheckSee" />
          </div>
          <div
            class="move-label"
            :class="{'is-move': focusInput === 'passwdCheck' || registerInfo.passwdCheck.length > 0}"
          >{{$t('register.passwordCheck')}}</div>
          <div class="tip" v-if="!isPasswdCheckRight">{{$t('register.passwordCheckError')}}</div>
          <div class="tip" v-if="isPasswdCheckNone">{{$t('register.passwordCheckEmpty')}}</div>
        </div>
        <div class="item">
          <input
            class="item-input"
            :style="{'border-color': isCodeNone ? 'red' : ''}"
            v-model.trim="registerInfo.code"
            @focus="inputCode"
            @blur="leaveCode"
          />
          <div class="input-btn">
            <a href="javascript:void(0);" @click="getCode" v-if="!isGetCode">{{$t('register.getCode')}}</a>
            <span v-if="isGetCode" style="color: white">{{second}} S</span>
          </div>
          <div
            class="move-label"
            :class="{'is-move': focusInput === 'code' || registerInfo.code.length > 0}"
          >{{$t('register.code')}}</div>
          <div class="tip" v-if="isCodeNone">{{$t('register.codeEmpty')}}</div>
        </div>
        <div class="register-btn-wrapper">
          <div class="register-btn" @click="toRegister">{{$t('register.title')}}</div>
        </div>
        <div class="to-login" style="float: right;">
          <span>{{$t('register.haveAccount')}}</span>
          <span><router-link style="color: 5872f1;" to="/login">{{$t('register.toLogin')}}</router-link></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getCode, toRegister } from '@/api/register.js';

export default {
  data () {
    return {
      registerInfo: {
        email: '', // 这个换成手机号码了
        passwd: '',
        passwdCheck: '',
        code: ''
      },
      focusInput: '',
      isPasswdSee: false,
      isPasswdCheckSee: false,
      isEmailRight: true,
      isEmailNone: false,
      isPasswdRight: true,
      isPasswdCheckRight: true,
      isPasswdCheckNone: false,
      isCodeNone: false,
      second: 60,
      isGetCode: false,
      registerCode: ''
    }
  },
  components: {
  },
  methods: {
    inputEmail() {
      this.focusInput = 'email';
    },
    // 验证手机号码
    validateEmail() {
      this.focusInput = '';
      const reg = /^1[3456789]\d{9}$/;
      if (this.registerInfo.email === '') {
        this.isEmailNone = true;
        this.isEmailRight = true;
        return;
      } else if (!reg.test(this.registerInfo.email)) {
        this.isEmailNone = false;
        this.isEmailRight = false;
        return;
      } else {
        this.isEmailNone = false;
        this.isEmailRight = true;
      }
    },
    inputPwd() {
      this.focusInput = 'passwd';
    },
    // 验证密码
    validatePwd() {
      this.focusInput = '';
      const reg = /(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z~!@#$%^&*()/\\|,.<>?"'();:_+-=\\[\]{}]{8,20}$/;
      if (this.registerInfo.passwd === '') {
        this.isPasswdRight = false;
      } else if (!reg.test(this.registerInfo.passwd)) {
        this.isPasswdRight = false;
        return;
      } else {
        this.isPasswdRight = true;
      }
    },
    inputPasswdCheck() {
      this.focusInput = 'passwdCheck';
    },
    // 二次验证密码
    validatePasswdCheck() {
      this.focusInput = '';
      if (this.registerInfo.passwdCheck === '') {
        this.isPasswdCheckNone = true;
        this.isPasswdCheckRight = true;
        return;
      } else if (this.registerInfo.passwd !== this.registerInfo.passwdCheck) {
        this.isPasswdCheckRight = false;
        this.isPasswdCheckNone = false;
        return;
      } else {
        this.isEmailRight = true;
        this.isPasswdCheckNone = false;
      }
    },
    inputCode() {
      this.focusInput = 'code';
    },
    leaveCode() {
      this.focusInput = '';
      if (this.registerInfo.code === '') {
        this.isCodeNone = true;
      } else {
        this.isCodeNone = false;
      }
    },
    // 获取验证码
    getCode() {
      if (this.registerInfo.email.length === 0) {
        this.isEmailNone = true;
        return;
      }
      if (this.isEmailNone || !this.isEmailRight) {
        return;
      } else {
          getCode(this.registerInfo.email).then(() => {
            // 
        })
      }
      this.isGetCode = true;
      const time = setInterval(() => {
        this.second--
        if (this.second === 0) {
          this.isGetCode = false;
          clearInterval(time);
          this.second = 60;
        }
      }, 1000);
    },
    // 注册操作
    toRegister() {
      if (this.registerInfo.email.length === 0) {
        this.isEmailNone = true
      }
      if (this.registerInfo.passwd.length === 0) {
        this.isPasswdRight = false;
      }
      if (this.registerInfo.passwdCheck.length === 0) {
        this.isPasswdCheckNone = true;
      }
      if (this.registerInfo.code.length === 0) {
        this.isCodeNone = true;
      }
      const isToRegister = !this.isEmailNone && this.isEmailRight && this.isPasswdRight && !this.isPasswdCheckNone && this.isPasswdCheckRight && !this.isCodeNone;
      if (!isToRegister) {
        return;
      } else {
        toRegister(this.registerInfo).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success({
              content: '注册成功，去登录',
            });
            this.$router.push('/login')
          } else {
            return new Promise((resolve, reject) => {
              reject(res.data.message)
            })
          }
        }).catch((err) => {
          this.$Message.error(err);
        })
      }
    }
  }
}
</script>

<style lang="scss">
.register {
  margin: 50px 0;
  padding: 10px 0;
  .form-wrapper {
    width: 95%;
    margin: 0 auto;
    p {
      font-size: 26px;
      text-align: center;
      margin-bottom: 15px;
    }
    .item {
      position: relative;
      width: 100%;
      margin: 0 auto;
      height: 70px;
      // padding: 0 10px;
      &:nth-child(n + 2) {
        margin-top: 10px;
      }
      .item-input {
        display: inline-block;
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        padding-left: 10px;
        // line-height: 40px;
        line-height: 14px;
        display: flex;
        align-items: center;
        padding: 10px;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        color: #515a6e;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
        font-size: 12px;
        transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
        &:focus {
          outline: 0;
          border-color: #5872f1;
        }
      }
      .input-icon {
        position: absolute;
        top: 5px;
        right: 15px;
        i {
          color: #aaa;
        }
      }
      .icon-eye {
        top: 10px;
        right: 20px;
      }
      .input-btn {
        position: absolute;
        top: 0;
        right: 0;
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color:#5872f1;
        font-size: 12px;
        a {
          color: white;
        }
      }
      .move-label {
        font-size: 14px;
        color: #c5c8ce;
        position: absolute;
        top: 9px;
        left: 8px;
        padding: 0 8px;
        background: white;
        height: 25px;
        line-height: 25px;
        transition: all .2s linear;
      }
      .is-move {
        color: #515a6e;
        top: -12px;
      }
      .tip {
        font-size: 12px;
        color: #ed4014;
        margin: 10px 5px;
      }
    }
    .register-btn-wrapper {
      margin-top: 20px;
      .register-btn {
        width: 100%;
        padding: 10px 0;
        background: #5872f1;
        color: white;
        font-size: 14px;
        text-align: center;
      }
    }
    .to-login {
      font-size: 12px;
      margin-top: 10px;
      a {
        color: #5872f1;
      }
    }
  }
}
</style>
