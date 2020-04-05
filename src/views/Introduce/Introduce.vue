<template>
  <div class="introduce">
    <div class="up-info">
      <div class="info-left">
        <img :src="upAvatar">
        <div style="margin-left: 10px">
          <span>{{upName}}</span>
          <div>{{followCount}}粉丝</div>
        </div>
      </div>
      <div class="info-right">
        <Icon type="md-heart" @click="showLove" :class="{'animation': isShowLove, 'isPink': isShowLove}" size="30" />
        <Icon type="ios-star" @click="showCollect" :class="{'animation': isShowCollect, 'isPink': isShowCollect}" size="30" />
        <div class="order-btn" :style="{'background': isSubscribe ? '#ccc' : '#f98c8c'}">
          <span v-if="!isSubscribe" @click="addFollow">+ {{$t('introduce.follow')}}</span>
          <span v-else @click="cancelFollow">{{$t('introduce.followed')}}</span>
        </div>
      </div>
    </div>
    <div style="padding: 10px;">
      <div class="title">{{title}}</div>
      <div class="instroduction">
        {{videoInstr}}
      </div>
      <div style="display: flex; align-items: center">
        <div class="click-count">
          <Icon type="logo-youtube" size="10" />
          {{clickCount}}观看
        </div>
        <div class="click-count" style="margin-left: 8px;">
          <Icon type="md-heart" size="10" />
          {{loveCount}}点赞
        </div>
        <div class="click-count" style="margin-left: 8px;">
          <Icon type="ios-star" size="10" />
          {{collectCount}}收藏
        </div>
      </div>
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
import { addFollow, cancelFollow } from '@/api/watch.js';
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
      title: '',
      videoInstr: '',
      clickCount: '',
      loveCount: 0,
      collectCount: 0,
      isSubscribe: false,
      upId: -1,
      followCount: 0
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
      if(!this.isLogin) {
        return
      }
      getUserOperation(this.userId, this.currentVideoId).then(res => {
        if(res.data.status === 1) {
          const info = res.data.data;
          this.isShowLove = info.isLike > 0;
          this.isShowCollect = info.isCollect > 0;
          this.isSubscribe = info.isSubscribe > 0;
        }
      }).catch(() => {
        //
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
        if(res.data.status === 1) {
          const data = res.data.data;
          console.log(data)
          this.videoInstr = data.introduction;
          this.upName = data.userEntity.nickname;
          this.title = data.title;
          this.upAvatar = baseUrl + data.userEntity.avatar;
          this.clickCount = data.videoOperationEntity.clickCount;
          this.loveCount = data.videoOperationEntity.likeCount;
          this.collectCount = data.videoOperationEntity.collectCount;
          this.upId = data.upId;
          this.followCount = data.userEntity.followCount;
        }
      })
    },
    showLove() {
      if(!this.isLogin) {
        this.$router.push('/login');
        return;
      }
      this.isShowLove = !this.isShowLove;
      if (this.isShowLove) {
        likeVideo(this.userId, this.currentVideoId);
      } else {
        cancelLikeVideo(this.userId, this.currentVideoId);
      }
    },
    showCollect() {
      if(!this.isLogin) {
        this.$router.push('/login');
        return;
      }
      this.isShowCollect = !this.isShowCollect;
      if (this.isShowCollect) {
        collectVideo(this.userId, this.currentVideoId);
      } else {
        cancelCollectVideo(this.userId, this.currentVideoId);
      }
    },
    switchVideo(videoPath, videoId, partId) {
      this.clickVideo(this.userId, videoId);
      this.$emit('switchVideo', videoPath);
      this.setCurrentVideoId(videoId);
      this.setCurrentPartId(partId);
      // 获取随机的一个分区的视频进行推荐
      const randomPart = Math.floor(Math.random() * 17 + 1)
      this.setCurrentPartId(randomPart);
      this.getPartitionVideo(randomPart);
      this.getVideoInfo();
    },
    addFollow() {
      if(!this.isLogin) {
        this.$router.push('/login');
        return;
      }
      this.isSubscribe = true;
      addFollow(this.userId, this.upId).then(res => {
        if(res.status === 0) {
          this.isSubscribe = false;
        }
      })
    },
    cancelFollow() {
      this.isSubscribe = false;
      cancelFollow(this.userId, this.upId).then(res => {
        if (res.status === 0) {
          this.isSubscribe = true;
        }
      })
    }
  }
}
</script>

<style lang="scss">
.introduce {
  border-bottom: 1px solid #ccc;
  @include color_primary($bg-color-light);
  .up-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .info-left {
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      span {
        font-size: 14px;
      }
      .title {
        font-size: 12px;
        width: 185px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .info-right {
      display: flex;
      align-items: center;
      .order-btn {
        // background: #f98c8c;
        color: white;
        font-size: 12px;
        padding: 5px 10px;
      }
      i {
        margin-right: 10px;
        color: #505050;
      }
      .animation {
        animation: scale .5s;
      }
      .isPink {
        color: #ff5c5c;
      }
    }
  }
  .instroduction {
    margin-top: 5px;
    font-size: 14px;
    // color: black;
  }
  .click-count {
    font-size: 12px;
    display: flex;
    align-items: center;
  }
  .small-video-wrapper {
    margin-top: 10px;
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
