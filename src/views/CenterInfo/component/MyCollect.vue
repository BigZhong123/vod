<template>
  <div class="my-page">
      <div class="text">我的收藏</div>
      <div class="video-wrapper">
        <tiny-video
          v-for="(item, index) in userVideoLists"
          :key="index"
          :imgPath="item.img"
          :length="item.length"
          :introduction="item.introduction"
          :clickCount="item.videoOperationEntity.clickCount"
        ></tiny-video>
      </div>
  </div>
</template>

<script>
import TinyVideo from '@/components/Video/TinyVideo.vue';
import { getUserCollect } from '@/api/mine.js';
import mixins from '@/utils/mixins.js';
import { baseUrl } from '@/api/home.js';
import { computedTime } from '@/utils/util.js';
  export default {
    mixins: [mixins],
    data() {
      return {
        userVideoLists: [],
        currentPage: 1,
        pageSize: 20
      }
    },
    components: {
      TinyVideo
    },
    created() {
      getUserCollect(this.userId, this.currentPage, this.pageSize).then(res => {
        if (res.data.status === 1) {
          let data = res.data.data.videoView;
          data.forEach((item, index) => {
            data[index]['length'] = computedTime(data[index]['length']);
            data[index]['savePath'] = baseUrl + data[index]['savePath'];
            data[index]['img'] = baseUrl + data[index]['img'];
          });
          this.userVideoLists = data;
        }
      })
    }
  }
</script>

<style lang="scss">
.my-page {
    padding-bottom: 10px;
    .text {
        font-size: 14px;
        color: black;
        padding-left: 10px;
        padding-top: 10px;
    }
    .video-wrapper {
      display: flex;
      flex-wrap: wrap;
      padding: 0 4px;
    }
}
</style>
