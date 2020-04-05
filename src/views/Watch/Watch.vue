<template>
  <div class="watch" :style="[commentModal ? hiddenClass : '', minHeight]">
    <div class="video-wrapper">
      <div id="dplayer"></div>
    </div>
    <div class="classification">
      <div class="class-type">
        <router-link :to="{path: '/watch/introduce'}" @click.native="type = 1">视频简介</router-link>
        <router-link :to="{path: '/watch/comment'}" @click.native="type = 2">精选评论</router-link>
      </div>
      <div class="b-bottom" :class="{'right': type === 2}"></div>
    </div>
    <keep-alive>
      <router-view @switchVideo="switchVideo"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import DPlayer from 'dplayer';
import mixins from '@/utils/mixins.js';
export default {
  mixins: [mixins],
  data () {
    return {
      url: '',
      type: 1, // 1为简介，2为评论
      hiddenClass: {},
      clientHeight: 0,
      minHeight: {}
    }
  },
  created() {
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    this.clientHeight = clientHeight
    const height = clientHeight - 100;
    this.minHeight = {
      'min-height': height + 'px'
    };
    this.hiddenClass = {
      height: height + 'px',
      overflow: 'hidden'
    };
  },
  mounted () {
    this.initVideo();
  },
  watch: {
    commentModal(newVal) {
      this.$nextTick(() => {
        if(newVal) {
          this.hiddenClass = {
            position: 'fixed',
            top: `-${this.fromTop}px`,
            zIndex: 1000
          }
        } else {
          window.scrollTo(0,this.backTop);
        }
      })
    }
  },
  methods: {
    initVideo() {
      const url = localStorage.getItem('videoPath');
      this.dp = new DPlayer({
        container: document.getElementById('dplayer'),
        autoplay: true, // 自动播放
        lang: 'zh-cn', // 设置语言
        screenshot: true, //开启截图，如果开启，视频和视频封面需要允许跨域
        hotkey: true, // 开启热键
        preload: 'auto', // 预加载
        volume: 0, // 默认音量，如果用户自己设置了音量则会失效
        // logo: 'logo.png',
        video: {
          // url: 'http://101.133.165.169:8000/res/video/1.mp4',
          url: url,
          // pic: 'http://101.133.165.169:8000/res/img/pic/suntv_20200329202717.png',
          // thumbnails: 'thumbnails.jpg', // 视频缩略图，可以使用 DPlayer-thumbnails 生成
          type: 'auto', // 可选值: 'auto', 'hls', 'flv', 'dash', 'webtorrent', 'normal' 或其他自定义类型, 
        },
        highlight: [
          {
            time: 20,
            text: '这是第 20 秒',
          },
          {
            time: 120,
            text: '这是 2 分钟',
          },
        ],
      });
    },
    switchVideo(videoPath) {
      this.dp.switchVideo({
        url: videoPath,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.watch {
  @include color_primary($bg-color-light);
  margin: 50px 0;
  .video-wrapper {

  }
  .classification {
    position: relative;
    @include color_primary($bg-color-light);
    .class-type {
      a {
        display: inline-block;
        width: 50%;
        text-align: center;
        font-size: 12px;
        padding: 10px 0;
        transition: all .2s linear;
      }
    }
    .b-bottom {
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
