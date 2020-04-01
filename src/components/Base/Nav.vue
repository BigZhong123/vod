<template>
  <div class="nav-wrapper">
    <transition name="nav">
      <div
        class="nav"
        v-if="fromTop === 0 || moveY > 0"
      >
        <div class="left-wrapper">
          <Icon
            type="logo-youtube"
            color="red"
            size="30"
            style="margin-right: 15px;"
          />
          <logo></logo>
        </div>
        <div class="right-wrapper">
          <Icon
            type="md-search"
            size="30"
            @click="search"
            style="margin-right: 10px;"
          />
          <img
            src="@/assets/images/avatar.jpg"
            class="image"
          >
          <div
            @click="showMenu"
            :class="['more', { 'active': isMenu }]"
            v-click-outside="hideMenu"
          >
            <span></span>
          </div>
        </div>
      </div>
    </transition>
    <div
      class="menu"
      :class="{'showMenu': isMenu}"
    >
      <div class="language-wrapper">
        <span>{{$t('nav.switchLanguage')}}：</span>&nbsp;
        <i
          class="iconfont icon-yingwen"
          @click="ZH"
          v-if="currentLocale === 'en'"
        ></i>
        <i
          class="iconfont icon-zhongwen"
          @click="EN"
          v-else
        ></i>
      </div>
      <div class="theme-wrapper">
        <div class="fast-theme">
          <div class="theme-title">{{$t('nav.themeTitle')}}：</div>&nbsp;
          <div
            class="theme-opts"
            @click="showMenu"
          >
            <Icon
              type="ios-sunny-outline"
              class="light"
              :class="{'selected-border': theme === 'light'}"
              @click="switchTheme('light')"
              size="30"
            />
            <Icon
              type="ios-moon-outline"
              class="night"
              :class="{'selected-border': theme === 'night'}"
              @click="switchTheme('night')"
              size="30"
            />
            <div
              class="pink"
              :class="{'selected-border': theme === 'pink'}"
              @click="switchTheme('pink')"
            ></div>
            <div
              class="green"
              :class="{'selected-border': theme === 'green'}"
              @click="switchTheme('green')"
            ></div>
          </div>
        </div>
      </div>
      <div class="btn-wrapper">
        <div class="register-btn">
          <router-link to="/login">登录</router-link>
        </div>
        <div class="login-btn">
          <router-link to="/registration">注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from './Logo';
import mixins from '@/utils/mixins';
import { setLocale, getTheme, setTheme } from '@/utils/localStorage.js';
import ClickOutside from 'vue-click-outside';
export default {
  data() {
    return {
      theme: getTheme() || 'light',
    }
  },
  mixins: [mixins],
  directives: {
    ClickOutside
  },
  components: {
    Logo
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
  },
  methods: {
    search() {
      this.setIsSearch(true)
    },
    ZH() {
      this.$i18n.locale = 'zh'
      setLocale('zh')
    },
    EN() {
      this.$i18n.locale = 'en'
      setLocale('en')
    },
    switchTheme(value) {
      this.theme = value
      window.document.documentElement.setAttribute('data-theme', value)
      setTheme(value)
    },
    showMenu() {
      const isMenu = !this.isMenu;
      this.setIsMenu(isMenu)
    },
    hideMenu() {
      this.setIsMenu(false)
    }
  },
  created() {
    window.document.documentElement.setAttribute('data-theme', this.theme)
  }
}
</script>

<style lang="scss">
.nav-wrapper {
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 0 0 10px;
    position: fixed;
    top: 0;
    width: 100%;
    @include color_primary($bg-color-light);
    box-shadow: 0 3px 2px -2px rgba(0, 0, 0, 0.2);
    z-index: 999;
    .left-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .right-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      .image {
        height: 40px;
        border-radius: 50%;
      }
      .more {
        display: inline-block;
        width: 40px;
        height: 30px;
        cursor: pointer;
        position: relative;
        margin-right: 20px;
        &::before,
        span,
        &::after {
          display: block;
          content: "";
          width: 30px;
          height: 2px;
          position: absolute;
          top: 5px;
          left: 50%;
          background: #434341;
          transition: all .3s linear;
        }
        span {
          top: 15px;
        }
        &::after {
          top: 25px;
        }
      }
      .active {
        span {
          opacity: 0;
        }
        &::before {
          top: 15px;
          transform: rotate(45deg);
        }
        &::after {
          top: 15px;
          transform: rotate(-45deg);
        }
      }
    }
  }
  .menu {
    height: 200px;
    width: 100%;
    position: fixed;
    top: -500px;
    left: 0;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    z-index: 500;
    transition: all 0.4s linear;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px 0;
    align-items: center;
    .language-wrapper {
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      i {
        font-size: 30px;
      }
    }
    .theme-wrapper {
      font-size: 14px;
      margin-bottom: 25px;
      .fast-theme {
        display: flex;
        align-items: center;
        .theme-titlte {
        }
        .theme-opts {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .selected-border {
            border: 1px solid #17233d;
          }
          .light {
            box-sizing: border-box;
            height: 30px;
            width: 30px;
            line-height: 30px;
            margin-right: 10px;
          }
          .night {
            box-sizing: border-box;
            height: 30px;
            width: 30px;
            line-height: 30px;
            margin-right: 10px;
          }
          .pink {
            background-color: pink;
            height: 30px;
            width: 30px;
            margin-right: 10px;
            box-sizing: border-box;
          }
          .green {
            background-color: lightgreen;
            height: 30px;
            width: 30px;
            box-sizing: border-box;
          }
        }
      }
    }
    .btn-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      .register-btn,
      .login-btn {
        height: 30px;
        width: 80px;
        line-height: 30px;
        text-align: center;
        @include color_primary($bg-color-light);
        a {
          font-size: 14px;
        }
      }
      .login-btn {
        margin-left: 20px;
      }
    }
  }
  .showMenu {
    top: 50px;
  }
}
</style>
