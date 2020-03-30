<template>
  <div class="order">
    <div v-if="!isLogin">
      <div class="bg-wrapper">
        <img src="@/assets/images/order-bg.png" width="80%">
      </div>
      <div class="tip">还未登录，赶紧去登录吧</div>
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
         @click="toWatch(item.videoEntity.savePath, item.videoEntity.id, item.videoEntity.partitionId)">
          <video-card
            :cover="item.videoEntity.img"
            :avatar="item.userEntity.avatar"
            :title="item.videoEntity.title"
            :name="item.userEntity.nickname"
            :num="item.partitionSubId"
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
    }
  },
  computed: {
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
  },
  methods: {
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
    getOrderVideo(userId) {
      this.setIsLoading(true);
      getOrderVideo(userId).then(res => {
        const lists = res.data.data;
        for(let i = 0; i < lists.length; i++) {
          lists[i].createTime = this.$moment(lists[i].createTime).format('YYYY-MM-DD')
          lists[i].videoEntity.img = baseUrl + lists[i].videoEntity.img;
          lists[i].videoEntity.savePath = baseUrl + lists[i].videoEntity.savePath;
          lists[i].userEntity.avatar = baseUrl + lists[i].userEntity.avatar;
        }
        this.videoLists = lists;
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
  margin: px2rem(100) 0;
  .bg-wrapper {
    position: relative;
    background-color: #e8e8e8;
    width: 100%;
    height: px2rem(600);
    text-align: center;
    overflow: hidden;
  }
  .tip {
    font-size: px2rem(26);
    text-align: center;
    margin-top: px2rem(30);
  }
  .spin {
    position: relative;
    height: px2rem(1135);
  }
}
</style>
