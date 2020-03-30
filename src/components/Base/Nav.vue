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
            size="100"
            style="margin-right: 15px;"
          />
          <logo></logo>
        </div>
        <div class="right-wrapper">
          <Icon
            type="md-search"
            size="100"
            @click="search"
            style="margin-right: 20px;"
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
              size="80"
            />
            <Icon
              type="ios-moon-outline"
              class="night"
              :class="{'selected-border': theme === 'night'}"
              @click="switchTheme('night')"
              size="80"
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
    height: px2rem(100);
    padding: 0 px2rem(20);
    position: fixed;
    top: 0;
    width: 100%;
    @include color_primary($bg-color-light);
    box-shadow: 0 8px 2px -2px rgba(0, 0, 0, 0.2);
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
        height: px2rem(80);
        border-radius: 50%;
      }
      .more {
        display: inline-block;
        width: px2rem(60);
        height: px2rem(60);
        cursor: pointer;
        position: relative;
        margin-right: px2rem(20);
        &::before,
        span,
        &::after {
          display: block;
          content: "";
          width: px2rem(50);
          height: px2rem(4);
          position: absolute;
          top: px2rem(10);
          left: 50%;
          background: #434341;
          transition: all .2s linear;
        }
        span {
          top: px2rem(25);
        }
        &::after {
          top: px2rem(40);
        }
      }
      .active {
        span {
          opacity: 0;
        }
        &::before {
          top: px2rem(30);
          transform: rotate(45deg);
        }
        &::after {
          top: px2rem(30);
          transform: rotate(-45deg);
        }
      }
    }
  }
  .menu {
    height: px2rem(400);
    width: 100%;
    position: fixed;
    top: px2rem(-500);
    left: 0;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    z-index: 500;
    transition: all 0.2s linear;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: px2rem(60) 0;
    align-items: center;
    .language-wrapper {
      font-size: px2rem(24);
      height: px2rem(60);
      display: flex;
      align-items: center;
      margin-bottom: px2rem(20);
      i {
        font-size: px2rem(50);
      }
    }
    .theme-wrapper {
      font-size: px2rem(24);
      margin-bottom: px2rem(25);
      .fast-theme {
        display: flex;
        align-items: center;
        height: px2rem(60);
        .theme-titlte {
        }
        .theme-opts {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .selected-border {
            border: 2px solid #17233d;
          }
          .light {
            box-sizing: border-box;
            height: px2rem(50);
            width: px2rem(50);
          }
          .night {
            box-sizing: border-box;
            height: px2rem(50);
            width: px2rem(50);
            margin-right: px2rem(10);
          }
          .pink {
            background-color: pink;
            height: px2rem(50);
            width: px2rem(50);
            margin-right: px2rem(10);
            box-sizing: border-box;
          }
          .green {
            background-color: lightgreen;
            height: px2rem(50);
            width: px2rem(50);
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
        height: px2rem(60);
        width: px2rem(150);
        line-height: px2rem(60);
        text-align: center;
        @include color_primary($bg-color-light);
        a {
          font-size: px2rem(20);
        }
      }
      .login-btn {
        margin-left: px2rem(20);
      }
    }
  }
  .showMenu {
    top: px2rem(98);
  }
}
</style>
