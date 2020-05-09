<template>
  <div class="my-page">
      <div class="text">{{$t('base.myVideo')}}</div>
      <div v-if="userVideoLists.length === 0" style="margin-left: 20px; margin-top: 10px">
        {{$t('mine.noUpload')}}
      </div>
      <div class="video-wrapper" v-else>
        <tiny-video
          v-for="(item, index) in userVideoLists"
          :key="index"
          :imgPath="item.img"
          :length="item.length"
          :introduction="item.introduction"
          :clickCount="item.videoOperationEntity.clickCount"
          @click.native="toWatch(item.savePath, item.id, item.partitionId)"
        ></tiny-video>
      </div>
  </div>
</template>

<script>
import TinyVideo from '@/components/Video/TinyVideo.vue';
import { getUserVideo } from '@/api/mine.js';
import mixins from '@/utils/mixins.js';
import { baseUrl } from '@/api/home.js';
import { computedTime } from '@/utils/util.js';
  export default {
    mixins: [mixins],
    data() {
      return {
        userVideoLists: [],
        currentPage: 1,
        pageSize: 20,
        id: this.$route.params.id
      }
    },
    components: {
      TinyVideo
    },
    created() {
      getUserVideo(this.id, this.currentPage, this.pageSize).then(res => {
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
    },
    methods: {
      toWatch(path, videoId, partId) {
        this.clickVideo(this.userId, videoId);
        this.setCurrentVideoId(videoId);
        this.setCurrentPartId(partId);
        localStorage.setItem('videoPath', path);
        this.$router.push({
          path: '/watch'
        })
      }
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
