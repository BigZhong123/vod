<template>
  <div id="app">
    <nav-bar v-if="isNav"></nav-bar>
    <router-view />
    <slider v-if="isSlider"></slider>
  </div>
</template>

<script>
import Slider from '@/components/Base/Slider.vue';
import NavBar from '@/components/Base/Nav.vue';
import mixins from '@/utils/mixins';
import { getNotRead } from '@/api/order.js'
export default {
  data () {
    return {
      touchY: 0
    }
  },
  mixins: [mixins],
  components: {
    Slider,
    NavBar
  },
  watch: {
    $route: function(to) {
      if(to.name === 'home') {
        this.setIsHome(true);
      } else {
        this.setIsHome(false);
      }
      getNotRead(this.userId).then(res => {
        const unRead = res.data.data.unreadCount;
        this.setNotRead(unRead);
      }).catch(() => {
        // console.log(err)
      })
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      this.setIsMenu(false);  // 菜单消失
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.setFromTop(scrollTop);
      var totalHeight = document.documentElement.scrollHeight;
      var clientHeight = document.documentElement.clientHeight;
      if (totalHeight <= clientHeight + scrollTop) {
        this.setIsBottom(true); // 到达底部
      }
    });
    window.addEventListener('touchstart', (e) => {
      this.touchY = e.touches[0].clientY;
    });
    window.addEventListener('touchmove', (e) => {
      const moveY = e.touches[0].clientY - this.touchY;
      this.setMoveY(moveY);
      this.setIsMenu(false);
    });
    window.ChatraSetup = {
      // buttonSize: 150,
      language: 'zh'
    };
    setTimeout(() => {
      // 客服
      (function(d, w, c) {
        w.ChatraID = 'Fz8irvJ2srhgn7Gix';
        var s = d.createElement('script');
        w[c] = w[c] || function() {
            (w[c].q = w[c].q || []).push(arguments);
        };
        s.async = true;
        s.src = 'https://call.chatra.io/chatra.js';
        if (d.head) d.head.appendChild(s);
      })(document, window, 'Chatra');
    }, 0);
  },
}
</script>

<style lang="scss" scoped>
</style>
