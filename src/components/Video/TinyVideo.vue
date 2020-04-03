<template>
  <div class="tiny-video-wrapper">
    <div class="tiny-video">
      <div class="img-wrapper">
          <img :src="imgPath">
          <div class="click-count">
              <Icon type="logo-youtube" size="10" />
              {{clickCount}}w
          </div>
          <div class="video-length">
              {{length}}
          </div>
      </div>
      <div class="introduction">
        {{introduction}}
      </div>
    </div>
  </div>
</template>

<script>
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
      clickCount: {
        type: Number,
        default: 0
      },
      length: {
        type: String,
        default: ''
      },
      introduction: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss">
.tiny-video-wrapper {
  padding: 8px 4px;
  width: 50%;
  border-radius: 4px;
  .tiny-video {
    background: white;
    .img-wrapper {
      position: relative;
      width: 100%;
      img {
        width: 100%;
        border-radius: 4px;
        max-height: 130px;
      }
      .click-count {
        position: absolute;
        bottom: 5px;
        left: 3px;
        color: white;
        font-size: 12px;
      }
      .video-length {
        position: absolute;
        right: 3px;
        bottom: 5px;
        color: white;
        font-size: 12px;
      }
    }
    .introduction {
      font-size: 12px;
      color: black;
      padding: 0 5px 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
