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
    userId: 8, // 用户id, null
    isLogin: true, // 是否登录 flase
    notRead: 0, // 订阅未阅读数
    isLoading: false, // 是否处于加载中
    currentVideoId: 1, //当前观看的视频id null
    currentPartId: 1, // 当前观看视频的分类 nu;;
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
    currentPartId: state => state.currentPartId
  },
  modules: {
  }
})
