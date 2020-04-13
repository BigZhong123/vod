<template>
  <div class="home">
    <div class="shine">
      <span>
        <Icon type="ios-megaphone-outline" />
        {{$t('home.slogan')}}
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
        :upId="item.upId"
        :num="item.videoOperationEntity.clickCount"
        :time="item.createTime"></video-card>
    </div>
    <div class="spin-wrapper" v-if="isBottomLoading">
      <Spin>
        <Icon type="ios-loading"
              size=50
              class="demo-spin-icon-load"></Icon>
        <div class="loading-text">Loading</div>
      </Spin>
    </div>
    <div class="search-wrapper"
         v-if="isSearch">
      <div class="search-box">
        <Icon type="ios-arrow-back"
              @click="cancelSearch"
              size="20" />
        <Input v-model="searchContent"
               placeholder="在SUNTV中搜索..."
               class="search-ipt"
               @keyup.enter.native="search"
        />
        <Icon type="ios-search"
              size="20"
              @click="search"
        />
      </div>
      <div class="search-history"
           v-if="historySearch.length > 0">
        <div v-for="(item, index) in historySearch"
             :key="index"
             @click="toSearch(item)"
             class="history">
          <div>{{item}}</div>
          <div @click="removeHistory(index, $event)">移除</div>
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
import { getVideoLists, baseUrl, search } from '@/api/home.js';
import { clickVideo } from '@/api/base.js';
export default {
  data () {
    return {
      videoLists: [],
      historySearch: [],
      searchContent: '',
      page: 1,
      pageSize: 10,
      isBottomLoading: true,
      // 请求默认一页，大小为10
      video_current_page: 1,
      video_page_size: 10,
      user_current_page: 1,
      user_page_size: 10,
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
    const history = localStorage.getItem('searchHistory');
    if(!history || history === null) {
      return
    } else {
      this.historySearch = JSON.parse(history);
    }
  },
  methods: {
    // 获取首页视频
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
    },
    toSearch(searchText) {
      this.doSearch(searchText, this.video_current_page, this.video_page_size, this.user_current_page, this.user_page_size)
    },
    search() {
      if(this.searchContent === '' || this.searchContent.length === 0) {
        return
      }
      this.doSearch(this.searchContent, this.video_current_page, this.video_page_size, this.user_current_page, this.user_page_size)
    },
    // 数组去重
    unique(arr) {
      return arr.filter(function(item, index, arr) {
        return arr.indexOf(item, 0) === index;
      });
    },
    // 移除历史搜索
    removeHistory (index, e) {
      this.historySearch.splice(index, 1)
      localStorage.setItem('searchHistory', JSON.stringify(this.historySearch));
      e.stopPropagation();
      e.preventDefault();
    },
    // 执行搜索
    doSearch(searchContent, video_current_page, video_page_size, user_current_page, user_page_size) {
      search(searchContent, video_current_page, video_page_size, user_current_page, user_page_size).then(res => {
        if(res.data.status === 1) {
          const userLists = res.data.data.userReturnView.userEntities;
          const videoLists = res.data.data.videoReturnView.videoView;
          userLists.forEach((item, i) => {
            userLists[i]['avatar'] = baseUrl + userLists[i]['avatar']
          });
          videoLists.forEach((item, index) => {
            videoLists[index]['savePath'] = baseUrl + videoLists[index]['savePath'];
            videoLists[index]['img'] = baseUrl + videoLists[index]['img']
          });
          this.setUserResult(userLists);
          this.setVideoResult(videoLists);
        }
        this.$router.push('/search');
        this.setIsSearch(false);
        let history = localStorage.getItem('searchHistory');
        if(history && history !== null) {
          history = JSON.parse(history);
          history.unshift(this.searchContent);
          history = this.unique(history);
          if(history.length > 5) {
            history.pop()
          }
          localStorage.setItem('searchHistory', JSON.stringify(history));
        } else {
          localStorage.setItem('searchHistory', JSON.stringify([this.searchContent]));
        }
      })
    }
  }
}
</script>

<style lang="scss">
.home {
  margin: 50px 0;
  .shine {
    background: #ffc800;
    text-align: center;
    span {
      font-size: 12px;
      color: red;
      animation: blink .8s infinite;
      i {
        font-size: 10px;
      }
    }
  }
  .spin-wrapper {
    position: relative;
    .loading-text {
      color: #515a6e;
      font-size: 12px;
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
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      background-color: #eee;
      .search-ipt {
        margin: 0 10px;
      }
    }
    .search-history {
      padding: 0 10px;
      background-color: white;
      border-bottom: 1px solid black;
      @include color_primary($bg-color-light);
      .history {
        font-size: 12px;
        color: #6666ff;
        height: 40px;
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
    height: 30px;
    background-color: #eee;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 12px;
    &:focus {
      box-shadow: 0 0 0;
      border-color: black;
    }
  }
  .ivu-input-icon {
    font-size: 30px;
    height: 60px;
    line-height: 60px;
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
