<template>
  <div class="small-video" @click="switchVideo">
    <div class="img-wrapper">
      <img
        :src="imgPath"
      >
    </div>
    <div class="info-wrapper">
      <div class="name-instr">
        <div class="introduce">{{title}}</div>
        <div class="up-name">{{name}}</div>
      </div>
      <div class="watch-num">{{count}}w观看</div>
    </div>
  </div>
</template>

<script>
// import { clickVideo } from "@/api/base.js";
export default {
  data() {
    return {

    }
  },
  props: {
    imgPath: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    count: {
      type: Number,
      default: 0
    },
    videoId: {
      type: Number
    },
    partId: {
      type: Number
    },
    videoPath: {
      type: String,
      default: ''
    }
  },
  methods: {
    switchVideo() {
      this.$emit('switchVideo', this.videoPath, this.videoId, this.partId);
      localStorage.setItem('videoPath', this.videoPath)
    }
  }
}
</script>

<style lang="scss">
.small-video {
  width: 100%;
  overflow: hidden;
  display: flex;
  padding: px2rem(20) px2rem(40);
  height: px2rem(190);
  box-sizing: border-box;
  border-bottom: px2rem(1) solid #eee;
  .img-wrapper {
    display: inline-block;
    overflow: hidden;
    height: px2rem(150);
    width: px2rem(250);
    flex: 0 0 px2rem(250);
    img {
      width: 100%;
    }
  }
  .info-wrapper {
    height: 100%;
    display: inline-block;
    font-size: px2rem(24);
    margin-left: px2rem(40);
    width: 100%;
    max-width: px2rem(380);
    .name-instr {
      width: 100%;
      .introduce {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .up-name {
      }
    }
    .watch-num {
      margin-top: px2rem(20);
    }
  }
}
</style>
