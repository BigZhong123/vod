import { mapActions, mapGetters } from 'vuex';
import { clickVideo } from '@/api/base.js';

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
      'commentModal'
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
      'setCommentModal'
    ]),
    clickVideo
  }
}

export default mixins