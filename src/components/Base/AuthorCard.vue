<template>
  <div class="author-card">
    <div class="avatar-wrapper">
      <div class="avatar">
        <img :src="img">
      </div>
    </div>
    <div class="info-wrapper">
      <div class="name">{{name}}</div>
      <div class="video-num">{{videoNum}}{{$t('authorCard.videoNum')}}</div>
      <div class="order-num">{{orderNum}}{{$t('authorCard.orderNum')}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    img: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    orderNum: {
      type: Number,
      default: 0
    },
    videoNum: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.author-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: px2rem(200);
  .avatar-wrapper {
    .avatar {
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .info-wrapper {
    margin-left: px2rem(50);
    .name {
      font-size: px2rem(24);
    }
    .video-num {
      margin-top: px2rem(10);
      font-size: px2rem(20);
    }
    .order-num {
      font-size: px2rem(20);
    }
  }
}
</style>
