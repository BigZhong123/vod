<template>
  <div class="center-info" :style="{'min-height': minHeight + 'px'}">
    <div class="bg-wrapper">
      <img src="http://101.133.165.169:8000/res/img/avatar/20200403165132_234.png">
    </div>
    <div class="info-wrapper">
      <div class="avatar-wrapper">
        <img src="http://101.133.165.169:8000/res/img/avatar/20200403165122_10.png">
      </div>
      <div class="info-text">
        <div class="name">bobbo</div>
        <div class="introduce">我是等哈说的话</div>
        <div class="follow-wrapper">
          <span>18</span>粉丝
          <span>15</span>关注
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
export default {
  data () {
    return {
      type: 1,
      minHeight: 0
    }
  },
  components: {

  },
  created() {
    const height = document.documentElement.clientHeight || document.body.clientHeight;
    this.minHeight = height - 100;
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
    background-color: white;
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
      top: -10px;
      .name {
        color: black;
        font-size: 14px;
      }
      .introduction {
        color: black;
        font-size: 14px;
      }
      .follow-wrapper {

      }
    }
  }
  .router-opts {
    background-color: white;
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
