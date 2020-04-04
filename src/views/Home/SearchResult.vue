<template>
  <div class="search-result">
    <div class="user-lists" v-if="userResult.length > 0">
      <div style="padding-left: 10px;">用户</div>
      <author
        v-for="(item, index) in userResult"
        :key="index"
        :imgPath="item.avatar"
        :name="item.nickname"
        :introduction="item.introduction"
        :count="item.subscribeCount"
        @click.native="toCenterInfo(item.id)"
      ></author>
    </div>
    <div class="video-lists" v-else-if="videoResult.length > 0">
      <div style="padding-left: 10px;">视频</div>
      <small-video
        v-for="(item, i) in videoResult"
        :isClick="false"
        :key="i"
        :imgPath="item.img"
        :title="item.title"
        :name="item.userEntity.nickname"
        :count="item.videoOperationEntity.clickCount"
        @click.native="toWatch(item.savePath)"
      ></small-video>
    </div>
    <div v-else style="padding: 10px">
      暂无搜索结果
    </div>
  </div>
</template>

<script>
import Author from './components/Author.vue';
import SmallVideo from "@/components/Video/SmallVideo.vue";
import mixins from '@/utils/mixins.js';
  export default {
    mixins: [mixins],
    data() {
      return {

      }
    },
    components: {
      Author,
      SmallVideo
    },
    methods: {
      toCenterInfo(id) {
        this.$router.push({
          name: 'centerInfo',
          params: {
            id: id
          }
        })
      },
      toWatch(savePath) {
        localStorage.setItem('videoPath', savePath)
        this.$router.push('/watch')
      }
    }
  }
</script>

<style lang="scss">
.search-result {
  margin: 50px 0;
  .user-lists {
    padding-top: 10px;
  }
  .video-lists {
    padding-top: 10px;
  }
}
</style>
