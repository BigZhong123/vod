<template>
  <div class="order" :style="{'min-height': minHeight + 'px'}">
    <div v-if="!isLogin">
      <div class="bg-wrapper">
        <img src="@/assets/images/order-bg.png" width="80%">
      </div>
      <div class="tip">{{$t('mine.noLoginTip')}}</div>
    </div>
    <div class="spin" v-else-if="isLoading">
      <Spin size="large" fix></Spin>
    </div>
    <div v-else>
      <div v-if="!hasSubscribes">
        <none-order :authorList="recommendUp"></none-order>
      </div>
      <div v-else>
        <div v-for="(item, index) in videoLists"
         :key="index"
         @click="toWatch(item.videoView.savePath, item.videoView.id, item.videoView.partitionId)">
          <video-card
            :upId="item.videoView.upId"
            :cover="item.videoView.img"
            :avatar="item.videoView.userEntity.avatar"
            :title="item.videoView.title"
            :name="item.videoView.userEntity.nickname"
            :num="item.videoView.videoOperationEntity.clickCount"
            :time="item.createTime"></video-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoneOrder from '@/components/Base/NoneOrder.vue';
// import AuthorCard from '@/components/Base/AuthorCard.vue'
import VideoCard from '@/components/Video/Video.vue';
import mixins from '@/utils/mixins';
import { getOrderVideo, getSubscribes } from '@/api/order.js'
import { baseUrl } from '@/api/home.js';
import { clickVideo } from '@/api/base.js';
export default {
  mixins: [mixins],
  data () {
    return {
      videoLists: [],
      hasSubscribes: true,
      recommendUp: [],
      // orderUp: [],
      minHeight: 0
    }
  },
  components: {
    NoneOrder,
    // AuthorCard,
    VideoCard
  },
  created() {
    if (this.isLogin) {
      this.getSubscribes(this.userId);
    }
    const height = (document.documentElement.clientHeight || document.body.clientHeight)
    this.minHeight = height - 100
  },
  methods: {
    // 判断用户是否有关注
    getSubscribes(userId) {
      this.setIsLoading(true);
      getSubscribes(userId).then(res => {
        this.hasSubscribes = res.data.data.hasSubscribes > 0;
        if (this.hasSubscribes) {
          this.getOrderVideo(this.userId);
        } else {
          const userEntities = res.data.data.userEntities;
          userEntities.forEach((item, index) => {
            userEntities[index].avatar = baseUrl + userEntities[index].avatar;
          });
          this.recommendUp = userEntities;
        }
      }).finally(() => {
        this.setIsLoading(false);
      })
    },
    // 获取关注者更新的视频资源
    getOrderVideo(userId) {
      this.setIsLoading(true);
      getOrderVideo(userId).then(res => {
        const lists = res.data.data;
        for(let i = 0; i < lists.length; i++) {
          lists[i].createTime = this.$moment(lists[i].createTime).format('YYYY-MM-DD')
          lists[i].videoView.img = baseUrl + lists[i].videoView.img;
          lists[i].videoView.savePath = baseUrl + lists[i].videoView.savePath;
          lists[i].videoView.userEntity.avatar = baseUrl + lists[i].videoView.userEntity.avatar;
        }
        this.videoLists = lists;
        // console.log(this.videoLists)
      }).finally(() => {
        this.setIsLoading(false);
      })
    },
    toWatch(path, videoId, partId) {
      clickVideo(this.userId, videoId);
      this.setCurrentVideoId(videoId);
      this.setCurrentPartId(partId);
      localStorage.setItem('videoPath', path);
      this.$router.push({
        path: '/watch'
      })
    }
  },
  wath: {
    'hasSubscribes': (oldVlue, newVlaue) => {
      if (newVlaue) {
        this.getOrderVideo(this.userId)
        // this.getOrderVideo(1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order {
  margin: 50px 0;
  height: 100%;
  @include color_primary($bg-color-light);
  .bg-wrapper {
    position: relative;
    background-color: #e8e8e8;
    width: 100%;
    height: 280px;
    text-align: center;
    overflow: hidden;
  }
  .tip {
    font-size: 12px;
    text-align: center;
    margin-top: 30px;
  }
  .spin {
    height: 100%;
  }
}
</style>
