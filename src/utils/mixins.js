import { mapActions, mapGetters } from 'vuex';

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
      'videoResult'
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
    ])
  }
}

export default mixins