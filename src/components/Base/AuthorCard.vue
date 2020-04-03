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
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.author-card {
  display: flex;
  align-items: center;
  height: 100px;
  // padding-left: 100px;
  .avatar-wrapper {
    width: 50px;
    height: 50px;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
  .info-wrapper {
    margin-left: 10px;
    .name {
      font-size: 14px;
    }
    .video-num {
      margin-top: 5px;
      font-size: 12px;
    }
    .order-num {
      font-size: 12px;
    }
  }
}
</style>
