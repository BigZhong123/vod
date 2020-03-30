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
      <Spin size="large" fix></Spin>
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
      let left = (this.$hotcss.px2rem(100)) * parseInt(this.currentType - 1);
      return left + 'rem'
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
  margin: px2rem(100) 0;
  overflow-x: hidden;
  .opts-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    overflow-x: auto;
    height: px2rem(145);
    &::-webkit-scrollbar {
      display:none
    }
    .current-type {
      position: absolute;
      height: px2rem(145);
      width: px2rem(100);
      left: 0;
      top: 0;
      background: #c8edff;
      z-index: -1;
      transition: left .2s linear;
    }
    .opt-box {
      width: px2rem(100);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: px2rem(10) px2rem(20);
      .icon {
        width: px2rem(90);
        height: px2rem(90);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        span {
          font-size: px2rem(50);
          color: #4087c6;
        }
      }
      .opt-text {
        font-size: px2rem(24);
        height: px2rem(30);
        line-height: px2rem(30);
        text-align: center;
        color: black;
      }
    }
  }
  .spin {
    position: relative;
    height: px2rem(800);
  }
  .btn {
    margin-top: px2rem(200);
    width: px2rem(200);
    height: px2rem(100);
  }
}
.ivu-spin-large .ivu-spin-dot {
  height: px2rem(100);
  width: px2rem(100);
}
</style>
