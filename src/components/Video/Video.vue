### 图片懒加载记得(未完成)
<template>
  <div class="video">
    <div class="video-wrapper">
      <div class="img-wrapper">
        <img :src="cover"
             width="100%"
             style="display: block;">
      </div>
      <div class="desc-wrapper">
        <div class="avatar-wrapper">
          <img :src="avatar"
               class="avatar">
        </div>
        <div class="text-wrapper">
          <div class="title">
            {{title}}
          </div>
          <div class="name">
            {{name}}
          </div>
          <div class="num-time">
            <span>{{num}}w次观看</span>
            <span class="dot"></span>
            <span>{{time}}</span>
          </div>
        </div>
      </div>
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
    cover: {
      type: String,
      default: ''
    },
    avatar: {
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
    num: {
      type: Number,
      default: 100
    },
    date: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.video {
  .video-wrapper {
    .img-wrapper {
    }
    .desc-wrapper {
      display: flex;
      padding: px2rem(10) 0 px2rem(30) 0;
      @include color_primary($bg-color-light);
      .avatar-wrapper {
        margin-left: px2rem(15);
        margin-right: px2rem(30);
        .avatar {
          width: px2rem(100);
          height: px2rem(100);
          border-radius: 50%;
        }
      }
      .text-wrapper {
        .title {
          font-size: px2rem(25);
        }
        .name {
          margin-top: px2rem(5);
          font-size: px2rem(20);
        }
        .num-time {
          font-size: px2rem(20);
          .dot {
            &::before {
              content: "\002022";
              margin: 4px;
              font-size: px2rem(20);
            }
          }
        }
      }
    }
  }
}
</style>
