<template>
  <div class="login">
    <div class="form-wrapper">
      <p>{{$t('login.title')}}</p>
      <form>
        <div class="item">
          <input
            class="item-input"
            :style="{'border-color': !isEmailRight || isEmailNone ? 'red' : ''}"
            v-model.trim="loginInfo.email"
            @focus="inputEmail"
            @blur="validateEmail"
          />
          <div class="input-icon">
            <Icon type="ios-mail" size="80" />
          </div>
          <div
            class="move-label"
            :class="{'is-move': focusInput === 'email' || loginInfo.email.length > 0}"
          >{{$t('login.email')}}</div>
          <div class="tip" v-if="isEmailNone">{{$t('login.emailEmpty')}}</div>
          <div class="tip" v-if="!isEmailRight">{{$t('login.emailError')}}</div>
        </div>
        <div class="item">
          <input
            :type="isPasswdSee ? 'text' : 'password'"
            class="item-input"
            :style="{'border-color': isPasswdNone ? 'red' : ''}"
            v-model.trim="loginInfo.passwd"
            @focus="inputPwd"
            @blur="validatePwd"
          />
          <div class="input-icon icon-eye">
            <Icon type="md-eye" size="60" v-if="isPasswdSee" @click="isPasswdSee = !isPasswdSee" />
            <Icon type="md-eye-off" size="60" v-if="!isPasswdSee" @click="isPasswdSee = !isPasswdSee" />
          </div>
          <div
            class="move-label"
            :class="{'is-move': focusInput === 'passwd' || loginInfo.passwd.length > 0}"
          >{{$t('login.password')}}</div>
          <div class="tip" v-if="isPasswdNone" :style="{'color': isPasswdNone ? '#ed4014' : ''}">{{$t('login.passwordEmpty')}}</div>
        </div>
        <div class="register-btn-wrapper">
          <div class="register-btn" @click="toLogin">{{$t('login.title')}}</div>
        </div>
        <div class="to-login" style="float: right;">
          <span>{{$t('login.noneAccount')}}</span>
          <span><router-link style="color: 5872f1;" to="/registration">{{$t('login.toRegister')}}</router-link></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { toLogin } from '@/api/login.js';
import mixins from '@/utils/mixins';
export default {
  mixins: [mixins],
  data () {
    return {
      loginInfo: {
        email: '',
        passwd: ''
      },
      focusInput: '',
      isPasswdSee: false,
      isEmailRight: true,
      isEmailNone: false,
      isPasswdNone: false,
    }
  },
  components: {
  },
  methods: {
    inputEmail() {
      this.focusInput = 'email';
    },
    validateEmail() {
      this.focusInput = '';
      const reg = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (this.loginInfo.email === '') {
        this.isEmailNone = true;
        this.isEmailRight = true;
        return;
      } else if (!reg.test(this.loginInfo.email)) {
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
    validatePwd() {
      this.focusInput = '';
      if (this.loginInfo.passwd === '') {
        this.isPasswdNone = true;
      }  else {
        this.isPasswdNone = false;
      }
    },
    toLogin() {
      if (this.loginInfo.email.length === 0) {
        this.isEmailNone = true;
      }
      if (this.loginInfo.passwd.length === 0) {
        this.isPasswdNone = true;
      }
      const istoLogin = !this.isEmailNone && this.isEmailRight && !this.isPasswdNone;
      if (!istoLogin) {
        return;
      } else {
        toLogin(this.loginInfo).then(res => {
          if (res.data.status === 1) {
            const data = res.data.data;
            const userId = data.id;
            this.setUserId(userId);
            this.setIsLogin(true);
            this.$router.push('/home');  
          } else {
            return new Promise((resolve, reject) => {
              reject()
            })
          }
        }).catch(() => {
          this.$Message.error(this.$t('login.errTip'))
        })
      }
    }
  }
}
</script>

<style lang="scss">
.login {
  margin-top: px2rem(100);
  padding: px2rem(50) px2rem(60);
  .form-wrapper {
    p {
      font-size: px2rem(50);
      text-align: center;
      margin-bottom: px2rem(30);
    }
    .item {
      position: relative;
      width: 100%;
      margin: 0 auto;
      height: px2rem(120);
      &:nth-child(n + 2) {
        margin-top: px2rem(50);
      }
      .item-input {
        display: inline-block;
        width: 100%;
        height: px2rem(80);
        line-height: px2rem(80);
        padding: px2rem(20) px2rem(20);
        border: 1px solid #dcdee2;
        border-radius: 4px;
        color: #515a6e;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
        font-size: px2rem(35);
        transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
        &:focus {
          outline: 0;
          border-color: #5872f1;
        }
      }
      .input-icon {
        position: absolute;
        top: px2rem(15);
        right: px2rem(15);
        i {
          color: #aaa;
        }
      }
      .icon-eye {
        top: px2rem(20);
        right: px2rem(25);
      }
      .input-btn {
        position: absolute;
        top: 0;
        right: 0;
        width: px2rem(150);
        height: px2rem(80);
        line-height: px2rem(80);
        text-align: center;
        background-color:#5872f1;
        font-size: px2rem(26);
        a {
          color: white;
        }
      }
      .move-label {
        font-size: px2rem(34);
        color: #c5c8ce;
        position: absolute;
        top: px2rem(25);
        left: px2rem(10);
        padding: 0 px2rem(10);
        background: white;
        height: px2rem(35);
        line-height: px2rem(35);
        transition: all .2s linear;
      }
      .is-move {
        color: #515a6e;
        top: px2rem(-20);
      }
      .tip {
        font-size: px2rem(26);
        color: #ed4014;
        margin: px2rem(10) px2rem(5);
      }
    }
    .register-btn-wrapper {
      margin-top: px2rem(40);
      .register-btn {
        width: 100%;
        height: px2rem(70);
        line-height: px2rem(70);
        background: #5872f1;
        color: white;
        font-size: px2rem(26);
        text-align: center;
      }
    }
    .to-login {
      font-size: px2rem(26);
      margin-top: px2rem(10);
      a {
        color: #5872f1;
      }
    }
  }
}
</style>
