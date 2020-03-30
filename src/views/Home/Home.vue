<template>
  <div class="home">
    <div class="shine">
      <span>
        <Icon type="ios-megaphone-outline" />
        SUNTV，一个随心所欲的视频网站
      </span>
    </div>
    <div v-for="(item, index) in videoLists"
         :key="index"
         @click="toWatch(item.savePath, item.id, item.partitionId)">
      <video-card
        :cover="item.img"
        :avatar="item.userEntity.avatar"
        :title="item.title"
        :name="item.userEntity.nickname"
        :num="item.videoOperationEntity.clickCount"
        :time="item.createTime"></video-card>
    </div>
    <div class="spin-wrapper" v-if="isBottomLoading">
      <Spin>
        <Icon type="ios-loading"
              size=100
              class="demo-spin-icon-load"></Icon>
        <div class="loading-text">Loading</div>
      </Spin>
    </div>
    <div class="search-wrapper"
         v-if="isSearch">
      <div class="search-box">
        <Icon type="ios-arrow-back"
              @click="cancelSearch"
              size="60" />
        <Input v-model="searchContent"
               placeholder="在SUNTV中搜索..."
               class="search-ipt"
               clearable />
        <Icon type="ios-search"
              size="60" />
      </div>
      <div class="search-history"
           v-if="historySearch.length > 0">
        <div v-for="(item, index) in historySearch"
             :key="index"
             class="history">
          <div>{{item}}</div>
          <div @click="removeHistory(index)">移除</div>
        </div>
      </div>
      <div class="search-history"
           v-else>
        <div class="history">暂无历史搜索内容...</div>
      </div>
      <div class="search-outside"
           @click="cancelSearch"></div>
    </div>
  </div>
</template>

<script>
import VideoCard from '@/components/Video/Video.vue';
import mixins from '@/utils/mixins';
import { getVideoLists, baseUrl } from '@/api/home.js';
import { clickVideo } from '@/api/base.js';
export default {
  data () {
    return {
      videoLists: [],
      historySearch: ['目击者之追凶', '李子柒', '华农兄弟', '唐人街探案', '科比坠机'],
      searchContent: '',
      page: 1,
      pageSize: 10,
      isBottomLoading: true
    }
  },
  mixins: [mixins],
  components: {
    VideoCard
  },
  watch: {
    isBottom (value) {
      if (value) {
        this.setIsBottom(false);
        this.getVideoLists(this.page, this.pageSize);
        this.page++;
      }
    }
  },
  created() {
    this.getVideoLists(this.page, this.pageSize);
    this.page++;
  },
  methods: {
    getVideoLists(page, pageSize) {
      getVideoLists(page, pageSize).then(res => {
        const lists = res.data.data.videoView;
        if(lists.length === 0) {
          this.isBottomLoading = false;
          return;
        }
        for(let i = 0; i < lists.length; i++) {
          lists[i].img = baseUrl + lists[i].img;
          lists[i].savePath = baseUrl + lists[i].savePath;
          lists[i].userEntity.avatar = baseUrl + lists[i].userEntity.avatar;
          lists[i].createTime = this.$moment(lists[i].createTime).format('YYYY-MM-DD')
        }
        this.videoLists.push(...lists);
      })
    },
    removeHistory (index) {
      this.historySearch.splice(index, 1)
    },
    cancelSearch () {
      this.setIsSearch(false)
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
.home {
  margin: px2rem(100) 0;
  .shine {
    background: #ffc800;
    text-align: center;
    padding: px2rem(10) 0;
    span {
      font-size: px2rem(20);
      color: red;
      animation: blink .8s infinite;
      i {
        font-size: px2rem(30);
      }
    }
  }
  .spin-wrapper {
    position: relative;
    .loading-text {
      color: #515a6e;
      font-size: px2rem(24);
    }
  }
  .search-wrapper {
    position: fixed;
    z-index: 1500;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: hsla(0, 0%, 6.7%, 0.8);
    .search-box {
      padding: 0 px2rem(24);
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: px2rem(100);
      background-color: #eee;
      .search-ipt {
        margin: 0 px2rem(30);
      }
    }
    .search-history {
      padding: 0 px2rem(20);
      background-color: white;
      border-bottom: px2rem(4) solid black;
      .history {
        font-size: px2rem(24);
        color: #6666ff;
        height: px2rem(80);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .search-outside {
      height: 100%;
      width: 100%;
    }
  }
  .ivu-spin {
    color: #515a6e;
  }
  .ivu-input {
    height: px2rem(60);
    background-color: #eee;
    border: none;
    border-bottom: 6px solid black;
    font-size: px2rem(24);
    &:focus {
      box-shadow: 0 0 0;
      border-color: black;
    }
  }
  .ivu-input-icon {
    font-size: px2rem(30);
    height: px2rem(60);
    line-height: px2rem(60);
  }
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes blink{
	0%{
		opacity: 0;
	}
	50%{
		opacity: 100;
	}
	100%{
		opacity: 0;
	}
}
</style>
