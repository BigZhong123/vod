<template>
  <div class="center-info" :style="{'min-height': minHeight + 'px'}">
    <div class="bg-wrapper">
      <img src="http://101.133.165.169:8000/res/img/avatar/20200403165132_234.png">
    </div>
    <div class="info-wrapper">
      <div class="avatar-wrapper">
        <img :src="avatar">
      </div>
      <div class="info-text">
        <div class="name">{{name}}</div>
        <div class="center-introduce">{{introduction}}</div>
        <div class="follow-wrapper">
          <div @click="toMyFollow">
            <span>{{followCount}}</span>粉丝
          </div>
          <div @click="toMySubscribe">
            <span style="margin-left: 10px;">{{subscribeCount}}</span>关注
          </div>
        </div>
      </div>
    </div>
    <div class="router-opts">
      <div class="opt">
        <router-link :to="{path: `/centerInfo/myPage/${$route.params.id}`}" @click.native="type = 1">主页</router-link>
      </div>
      <div class="opt">
        <router-link :to="{path: `/centerInfo/myCollect/${$route.params.id}`}" @click.native="type = 2">收藏</router-link>
      </div>
      <div class="slider" :class="{'right': type === 2}"></div>
    </div>
    <div style="margin: 10px 0;">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/mine.js';
import { baseUrl } from '@/api/home.js';
export default {
  data () {
    return {
      type: 1,
      minHeight: 0,
      id: this.$route.params.id,
      avatar: '',
      name: '',
      introduction: '',
      followCount: 0,
      subscribeCount: 0
    }
  },
  created() {
    const height = document.documentElement.clientHeight || document.body.clientHeight;
    this.minHeight = height - 100;
    // 获取用户信息
    getUserInfo(this.id).then(res => {
      if(res.data.status === 1) {
        const data = res.data.data;
        this.avatar = baseUrl + data.avatar;
        this.name = data.nickname;
        this.introduction = data.introduction;
        this.followCount = data.followCount;
        this.subscribeCount = data.subscribeCount;
      }
    })
  },
  methods: {
    toMySubscribe() {
      this.$router.push({
        name: 'mySubscribe',
        params: {
          id: this.id
        }
      })
    },
    toMyFollow() {
      this.$router.push({
        name: 'myFollow',
        params: {
          id: this.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.center-info {
  margin: 50px 0;
  background: #eaeaea;
  .bg-wrapper {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .info-wrapper {
    padding: 0 15px;
    // background-color: white;
    @include color_primary($bg-color-light);
    .avatar-wrapper {
      position: relative;
      top: -25px;
      img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
      }
    }
    .info-text {
      position: relative;
      top: -15px;
      .name {
        color: black;
        font-size: 14px;
      }
      .introduction {
        color: black;
        font-size: 14px;
      }
      .follow-wrapper {
        display: flex;
      }
    }
  }
  .router-opts {
    // background-color: white;
    @include color_primary($bg-color-light);
    position: relative;
    .opt {
      display: inline-block;
      width: 50%;
      text-align: center;
      font-size: 12px;
      padding: 10px 0;
      transition: all .2s linear;
    }
    .slider {
      background-color: pink;
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50%;
      transition: all .2s linear;
    }
    .right {
      left: 50%;
    }
  }
}
</style>
