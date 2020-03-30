<template>
  <div class="introduce">
    <div class="up-info">
      <div class="info-left">
        <img :src="upAvatar">
        <span>{{upName}}</span>
      </div>
      <div class="info-right">
        <Icon type="md-heart" @click="showLove" :class="{'animation': isShowLove, 'isPink': isShowLove}" size="80" />
        <Icon type="ios-star" @click="showCollect" :class="{'animation': isShowCollect, 'isPink': isShowCollect}" size="80" />
        <div class="order-btn">
          <span>+ 关注</span>
        </div>
      </div>
    </div>
    <div class="instroduction">
      {{videoInstr}}
    </div>
    <div class="small-video-wrapper">
      <small-video
        v-for="(item, index) in recommendVideo"
        :key="index"
        :imgPath="item.img"
        :title="item.title"
        :name="item.userEntity.nickname"
        :count="item.videoOperationEntity.clickCount"
        :videoPath="item.savePath"
        :partId="item.partitionId"
        :videoId="item.id"
        @switchVideo="switchVideo"
      ></small-video>
    </div>
  </div>
</template>

<script>
import SmallVideo from '@/components/Video/SmallVideo.vue';
import { getVideoInfo, collectVideo, cancelCollectVideo, likeVideo, cancelLikeVideo, getUserOperation, getPartitionVideo} from '@/api/watch.js';
import mixins from '@/utils/mixins.js';
import { baseUrl } from '@/api/home.js';
export default {
  mixins: [mixins],
  data() {
    return {
      isShowLove: false,
      isShowCollect: false,
      page: 1,
      pageSize: 10,
      recommendVideo: [],
      upAvatar: '',
      upName: '',
      videoInstr: ''
    }
  },
  components: {
      SmallVideo
  },
  created() {
    this.getPartitionVideo(this.currentPartId);
    this.getUserOperation();
    this.getVideoInfo();
  },
  methods: {
    getUserOperation() {
      getUserOperation(this.userId, this.currentVideoId).then(res => {
        if(res.data.status === 1) {
          const info = res.data.data;
          // console.log(info)
          this.isShowLove = info.isLike > 0;
          this.isShowCollect = info.isCollect > 0;
        }
      })
    },
    getPartitionVideo(partId) {
      getPartitionVideo(partId, this.page, this.pageSize).then(res => {
        if(res.data.status === 1) {
          const lists = res.data.data.videoView;
          lists.forEach((item, i) => {
            lists[i].savePath = baseUrl + lists[i].savePath;
            lists[i].img = baseUrl + lists[i].img;
          });
          this.recommendVideo = lists;
        }
      })
    },
    getVideoInfo() {
      getVideoInfo(this.currentVideoId).then(res => {
        const data = res.data.data;
        this.videoInstr = data.introduction;
        this.upName = data.userEntity.nickname;
        this.upAvatar = baseUrl + data.userEntity.img;
      })
    },
    showLove() {
      this.isShowLove = !this.isShowLove;
      if (this.isShowLove) {
        likeVideo(this.userId, this.currentVideoId);
      } else {
        cancelLikeVideo(this.userId, this.currentVideoId);
      }
    },
    showCollect() {
      this.isShowCollect = !this.isShowCollect;
      if (this.isShowCollect) {
        collectVideo(this.userId, this.currentVideoId);
      } else {
        cancelCollectVideo(this.userId, this.currentVideoId);
      }
    },
    switchVideo(videoPath, videoId, partId) {
      this.$emit('switchVideo', videoPath);
      this.setCurrentVideoId(videoId);
      this.setCurrentPartId(partId);
      // 获取随机的一个分区的视频进行推荐
      const randomPart = Math.floor(Math.random() * 17 + 1)
      this.setCurrentPartId(randomPart);
      this.getPartitionVideo(randomPart);
      this.getVideoInfo();
    }
  }
}
</script>

<style lang="scss">
.introduce {
  .up-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: px2rem(40) px2rem(40);
    .info-left {
      display: flex;
      align-items: center;
      img {
        width: px2rem(50);
        height: px2rem(50);
        border-radius: 50%;
      }
      span {
        font-size: px2rem(18);
        margin-left: px2rem(20);
      }
    }
    .info-right {
      display: flex;
      .order-btn {
        background: #f98c8c;
        color: white;
        font-size: px2rem(24);
        padding: px2rem(10) px2rem(20);
      }
      i {
        margin-right: px2rem(20);
        color: #505050;
      }
      .animation {
        animation: scale .5s;
      }
      .isPink {
        color: #f98c8c;
      }
    }
  }
  .instroduction {
    margin-top: px2rem(20);
    padding: 0 px2rem(40);
    font-size: px2rem(26);
  }
  .small-video-wrapper {
    margin-top: px2rem(40);
  }
}
@keyframes scale {
  0% {}
  50% {
    transform: scale(1.5);
    color: #f98c8c;
  }
  100% {
    transform: scale(1);
    color: #f98c8c;
  }
}
</style>
