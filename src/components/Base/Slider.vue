<template>
  <div class="slider-wrapper">
    <div class="slider">
      <div class="home-wrapper">
        <router-link :to="{ path: '/home' }"
                     tag="div">
          <Icon type="ios-home"
                size="20" />
          <div>{{$t('slider.home')}}</div>
        </router-link>
      </div>
      <div class="hot-wrapper">
        <router-link :to="{ path: '/popular' }"
                     tag="div">
          <Icon type="ios-flame"
                size="20" />
          <div>{{$t('slider.popular')}}</div>
        </router-link>
      </div>
      <div class="subscribe-wrapper">
        <router-link :to="{ path: '/order' }"
                     tag="div">
          <Icon type="logo-youtube"
                size="20" />
          <div>{{$t('slider.order')}}</div>
        </router-link>
        <div class="un-read" :class="{'no-un-read': notRead <= 0}">{{notRead > 0 ? notRead : ''}}</div>
      </div>
      <div class="mine-wrapper">
        <router-link :to="{ path: '/mine' }"
                     tag="div">
          <Icon type="ios-contact"
                size="20" />
          <div>{{$t('slider.mine')}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from '@/utils/mixins.js';
export default {
  mixins: [mixins],
  data () {
    return {
      selectNum: 1
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
.slider-wrapper {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 500;
  // background-color: white;
  @include color_primary($bg-color-light);
  font-size: 12px;
  height: 50px;
  .slider {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-top: 1px solid hsla(0, 0%, 53.3%, 0.4);
    .selected-color {
      color: red !important;
    }
    .home-wrapper {
      width: 25%;
    }
    .hot-wrapper {
      width: 25%;
    }
    .subscribe-wrapper {
      position: relative;
      width: 25%;
      .un-read {
        height: 20px;
        width: 20px;
        position: absolute;
        top: -3px;
        right: 15px;
        color: white;
        background: red;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
      }
      .no-un-read {
        display: none;
      }
    }
    .mine-wrapper {
      width: 25%;
    }
  }
}
.router-link-active {
  color: red;
}
</style>
