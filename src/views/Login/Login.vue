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
            <Icon type="ios-mail" size="30" />
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
            <Icon type="md-eye" size="20" v-if="isPasswdSee" @click="isPasswdSee = !isPasswdSee" />
            <Icon type="md-eye-off" size="20" v-if="!isPasswdSee" @click="isPasswdSee = !isPasswdSee" />
          </div>
          <div
            class="move-label"
            :class="{'is-move': focusInput === 'passwd' || loginInfo.passwd.length > 0}"
          >{{$t('login.password')}}</div>
          <div class="tip" v-if="isPasswdNone" :style="{'color': isPasswdNone ? '#ed4014' : ''}">{{$t('login.passwordEmpty')}}</div>
        </div>
        <!-- <div class="keep-status">
          <Checkbox v-model="keppStatus">{{$t('login.keepStatus')}}</Checkbox>
        </div> -->
        <div class="register-btn-wrapper">
          <div class="register-btn" @click="toLogin">{{$t('login.title')}}</div>
        </div>
        <div class="to-login">
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
      keppStatus: false,
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
            // if(this.keppStatus) {
            //   const pp = {
            //     phone: this.loginInfo.email
            //   }
            // }
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
  margin: 50px 0;
  .form-wrapper {
    padding-top: 20px;
    width: 95%;
    margin: 0 auto;
    p {
      font-size: 26px;
      font-weight: 400;
      text-align: center;
      margin-bottom: 15px;
    }
    .item {
      position: relative;
      // padding: 0 10px;
      height: 70px;
      width: 100%;
      margin: 0 auto;
      &:nth-child(n + 2) {
        margin-top: 10px;
      }
      .item-input {
        display: inline-block;
        width: 100%;
        height: 40px;
        line-height: 40px;
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
        width: 150px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color:#5872f1;
        font-size: 26px;
        a {
          color: white;
        }
      }
      .move-label {
        font-size: 14px;
        color: #c5c8ce;
        position: absolute;
        top: 10px;
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
        // width: 95%;
        // margin: 0 auto;
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
      width: 95%;
      margin: 5px auto 0;
      text-align: right;
      a {
        color: #5872f1;
      }
    }
  }
}
</style>
