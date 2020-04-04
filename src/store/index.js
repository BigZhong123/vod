import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fromTop: 0, // 距离顶部的距离
    moveY: 0, // Y轴方向移动的距离
    isBottom: false, // 屏幕是否到达底部
    isSearch: false, // 是否搜索
    isMenu: false, // 菜单栏是否打开
    userId: 7, // 用户id, null
    isLogin: true, // 是否登录 flase
    notRead: 0, // 订阅未阅读数
    isLoading: false, // 是否处于加载中
    currentVideoId: 1, //当前观看的视频id null
    currentPartId: 1, // 当前观看视频的分类 nu;;
    isSlider: true, // 是否显示底部导航条
    isNav: true, // 是否显示头部导航条
    isHome: true, // 是否在首页，以此来判断是否显示搜索
    userResult: [], // 搜索结果的用户
    videoResult: [], // 搜索结果的视频
    myFollow: [], // 用户的关注
    mySubscribe: [], // 用户的粉丝
  },
  mutations: {
    SET_FROM_TOP (state, fromTop) {
      state.fromTop = fromTop;
    },
    SET_MOVEY (state, moveY) {
      state.moveY = moveY;
    },
    SET_IS_BOTTOM (state, isBottom) {
      state.isBottom = isBottom;
    },
    SET_IS_SEARCH (state, isSearch) {
      state.isSearch = isSearch;
    },
    SET_IS_MENU(state, isMenu) {
      state.isMenu = isMenu;
    },
    SET_USER_ID(state, userId) {
      state.userId = userId;
    },
    SET_IS_LOGIN(state, isLogin) {
      state.isLogin = isLogin;
    },
    SET_NOT_READ(state, notRead) {
      state.notRead = notRead;
    },
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_CURRENT_VIDEO_ID(state, currentVideoId) {
      state.currentVideoId = currentVideoId;
    },
    SET_CURRENT_PART_ID(state, currentPartId) {
      state.currentPartId = currentPartId;
    },
    SET_IS_SLIDER(state, isSlider) {
      state.isSlider = isSlider;
    },
    SET_IS_NAV(state, isNav) {
      state.isNav = isNav;
    },
    SET_IS_HOME(state, isHome) {
      state.isHome = isHome;
    },
    SET_SEARCH_RESULT(state, userResult) {
      state.userResult = userResult;
    },
    SET_VIDEO_RESULT(state, videoResult) {
      state.videoResult = videoResult;
    },
    SET_MY_FOLLOW(state, myFollow) {
      state.myFollow = myFollow;
    },
    SET_MY_SUBSCRIBE(state, mySubscribe) {
      state.mySubscribe = mySubscribe;
    }
  },
  actions: {
    setFromTop ({ commit }, fromTop) {
      commit('SET_FROM_TOP', fromTop);
    },
    setMoveY ({ commit }, moveY) {
      commit('SET_MOVEY', moveY);
    },
    setIsBottom ({ commit }, isBottom) {
      commit('SET_IS_BOTTOM', isBottom);
    },
    setIsSearch ({ commit }, isSearch) {
      commit('SET_IS_SEARCH', isSearch);
    },
    setIsMenu({ commit }, isMenu) {
      commit('SET_IS_MENU', isMenu);
    },
    setUserId({ commit }, userId) {
      commit('SET_USER_ID', userId);
    },
    setIsLogin({ commit }, isLogin) {
      commit('SET_IS_LOGIN', isLogin);
    },
    setNotRead({ commit }, notRead) {
      commit('SET_NOT_READ', notRead);
    },
    setIsLoading({ commit }, isLoading) {
      commit('SET_IS_LOADING', isLoading);
    },
    setCurrentVideoId({ commit }, currentVideoId) {
      commit('SET_CURRENT_VIDEO_ID', currentVideoId);
    },
    setCurrentPartId({ commit }, currentPartId) {
      commit('SET_CURRENT_PART_ID', currentPartId);
    },
    setIsSlider({ commit }, isSlider) {
      commit('SET_IS_SLIDER', isSlider);
    },
    setIsNav({ commit }, isNav) {
      commit('SET_IS_NAV', isNav);
    },
    setIsHome({ commit }, isHome) {
      commit('SET_IS_HOME', isHome);
    },
    setUserResult({ commit }, userResult) {
      commit('SET_SEARCH_RESULT', userResult);
    },
    setVideoResult({ commit }, videoResult) {
      commit('SET_VIDEO_RESULT', videoResult)
    },
    setMyFollow({ commit }, myFollow) {
      commit('SET_MY_FOLLOW', myFollow);
    },
    SET_MY_SUBSCRIBE({ commit }, mySubscribe) {
      commit('SET_MY_SUBSCRIBE', mySubscribe);
    }
  },
  getters: {
    fromTop: state => state.fromTop,
    moveY: state => state.moveY,
    isBottom: state => state.isBottom,
    isSearch: state => state.isSearch,
    isMenu: state => state.isMenu,
    userId: state => state.userId,
    isLogin: state => state.isLogin,
    notRead: state => state.notRead,
    isLoading: state => state.isLoading,
    currentVideoId: state => state.currentVideoId,
    currentPartId: state => state.currentPartId,
    isSlider: state => state.isSlider,
    isNav: state => state.isNav,
    isHome: state => state.isHome,
    userResult: state => state.userResult,
    videoResult: state => state.videoResult,
    myFollow: state => state.myFollow,
    muSubscribe: state => state.muSubscribe,
  },
  modules: {
  }
})
