import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from '@/locale';
import axios from 'axios'

import 'dplayer/dist/DPlayer.min.css';

import '@/assets/iconFont/iconfont.css';

axios.defaults.baseURL = 'http://101.133.165.169:8000/';

// import '@/assets/style/hotcss.js';

import '@/plugin/iview.js';
import '@/plugin/js-base64.js';
import '@/plugin/moment.js';
Vue.prototype.$hotcss = window.hotcss;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
