<template>
  <div class="popular">
    <div class="opts-wrapper">
      <div
        class="opt-box"
        v-for="(item, index) in iconLists"
        :key="index"
      >
        <router-link :to="{name: 'popular', params: {id: index}}"
                     tag="div">
          <div class="icon">
            <span class="iconfont" :class="item.style"></span>
          </div>
          <div class="opt-text">{{item.name}}</div>
        </router-link>
      </div>
      <div class="current-type" :style="{'left': moveLeft}"></div>
    </div>
    <div class="spin" v-if="isLoading">
      <Spin size="large"></Spin>
    </div>
    <div v-else>
      <div class="video-card" v-for="(item, i) in videoLists" :key="i" @click="toWatch(item.savePath, item.id, item.partitionId)">
        <video-card
          :cover="item.img"
          :avatar="item.avatar"
          :title="item.title"
          :name="item.name"
          :num="item.videoOperationEntity.clickCount"
          :time="item.createTime"></video-card>
      </div>
    </div>
  </div>
</template>

<script>
import { iconLists } from '@/utils/icon.js';
import { getPartVideoLists } from "@/api/popular.js";
import { baseUrl } from '@/api/home.js';
import VideoCard from '@/components/Video/Video.vue/';
import mixins from '@/utils/mixins.js';
import { clickVideo } from '@/api/base.js';
export default {
  mixins: [mixins],
  data () {
    return {
      iconLists: iconLists,
      videoLists: [],
      currentPage: 1,
      currentType: 0
    }
  },
  components: {
    VideoCard
  },
  created() {
    const id = this.$route.params.id || 1;
    this.currentType = id;
    this.getVideolIsts(id);
  },
  watch: {
    '$route' () {
      const id = this.$route.params.id || 1;
      this.currentType = id;
      this.currentPage = 1;
      this.getVideolIsts(id);
    }
  },
  computed: {
    moveLeft() {
      let left = 60 * parseInt(this.currentType - 1);
      return left + 'px';
    }
  },
  methods: {
    getVideolIsts(id) {
      this.setIsLoading(true);
      getPartVideoLists(id, this.currentPage).then(res => {
        const lists = res.data.data.videoView;
        lists.forEach((item, i) => {
          lists[i].img = baseUrl + lists[i].img;
          lists[i].savePath = baseUrl + lists[i].savePath;
          lists[i].userEntity.avatar = baseUrl + lists[i].userEntity.avatar;
          lists[i].createTime = this.$moment(lists[i].createTime).format('YYYY-MM-DD')
        });
        this.videoLists = [...lists];
        this.currentPage++;
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
  }
}
</script>

<style lang="scss">
.popular {
  margin: 50px 0;
  overflow-x: hidden;
  height: 100%;
  .opts-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    overflow-x: auto;
    height: 80px;
    &::-webkit-scrollbar {
      display:none
    }
    .current-type {
      position: absolute;
      height: 80px;
      width: 60px;
      left: 0;
      top: 0;
      background: #c8edff;
      z-index: -1;
      transition: left .2s linear;
    }
    .opt-box {
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 15px;
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        span {
          font-size: 30px;
          color: #4087c6;
        }
      }
      .opt-text {
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: black;
      }
    }
  }
  .spin {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.ivu-spin-large .ivu-spin-dot {
  height: 100px;
  width: 100px;
}
</style>
