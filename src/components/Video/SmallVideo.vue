<template>
  <div class="small-video" @click="switchVideo">
    <div class="img-wrapper">
      <img
        :src="imgPath"
      >
    </div>
    <div class="info-wrapper">
      <div class="name-instr">
        <div class="small-introduce">{{title}}</div>
        <div class="up-name">{{name}}</div>
      </div>
      <div class="watch-num">{{count}}观看</div>
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
    isClick: {
      type: Boolean,
      default: true
    },
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
      if(!this.isClick) {
        return;
      }
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
  padding: 10px 10px;
  height: 100px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  .img-wrapper {
    display: inline-block;
    overflow: hidden;
    height: 80px;
    width: 130px;
    flex: 0 0 130px;
    img {
      width: 100%;
    }
  }
  .info-wrapper {
    height: 100%;
    display: inline-block;
    font-size: 12px;
    margin-left: 10px;
    width: 100%;
    padding-right: 10px;
    .name-instr {
      width: 100%;
      .small-introduce {
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .up-name {
      }
    }
    .watch-num {
      margin-top: 10px;
    }
  }
}
</style>
