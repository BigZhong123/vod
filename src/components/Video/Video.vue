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
        <div class="avatar-wrapper" @click="toCenterInfo">
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
            <span>{{num}}次观看</span>
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
    },
    upId: {
      type: Number,
      default: -1
    }
  },
  methods:{
    toCenterInfo(e) {
      this.$router.push({
        name: 'centerInfo',
        params: {
          id: this.upId
        }
      })
      e.preventDefault();
      e.stopPropagation();
    }
  }
}
</script>

<style lang="scss" scoped>
.video {
  border-bottom: 1px solid #cccccc;
  .video-wrapper {
    .img-wrapper {
      max-height: 260px;
      overflow: hidden;
    }
    .desc-wrapper {
      display: flex;
      padding: 5px 20px 10px 0;
      @include color_primary($bg-color-light);
      .avatar-wrapper {
        margin-left: 15px;
        margin-right: 20px;
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .text-wrapper {
        .title {
          font-size: 12px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .name {
          font-size: 12px;
        }
        .num-time {
          font-size: 12px;
          .dot {
            &::before {
              content: "\002022";
              margin: 4px;
              font-size: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
