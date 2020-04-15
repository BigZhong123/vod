import { mapActions, mapGetters } from 'vuex';
import { clickVideo } from '@/api/base.js';
import { renderI18nKey } from './renderI18nKey.js';

const mixins = {
  computed: {
    ...mapGetters([
      'fromTop',
      'moveY',
      'isBottom',
      'isSearch',
      'isMenu',
      'userId',
      'isLogin',
      'notRead',
      'isLoading',
      'currentVideoId',
      'currentPartId',
      'isSlider',
      'isNav',
      'isHome',
      'userResult',
      'videoResult',
      'myFollow',
      'mySubscribe',
      'commentModal',
      'backTop',
      // 'unRead'
    ])
  },
  methods: {
    ...mapActions([
      'setFromTop',
      'setMoveY',
      'setIsBottom',
      'setIsSearch',
      'setIsMenu',
      'setUserId',
      'setIsLogin',
      'setNotRead',
      'setIsLoading',
      'setCurrentVideoId',
      'setCurrentPartId',
      'setIsSlider',
      'setIsNav',
      'setIsHome',
      'setUserResult',
      'setVideoResult',
      'setMyFollow',
      'setMySubscribe',
      'setCommentModal',
      'setBackTop',
      // 'setUnRead'
    ]),
    clickVideo,
    renderI18nKey
  }
}

export default mixins