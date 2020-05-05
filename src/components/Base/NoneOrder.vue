<template>
  <div class="none-order">
    <div class="bg-wrapper">
      <img src="@/assets/images/order-bg.png"
           width="80%">
      <div class="bg-text-wrapper">
        <div class="title">{{$t('noneOrder.title')}}</div>
        <div class="content">{{$t('noneOrder.content')}}</div>
      </div>
    </div>
    <div class="author-wrapper">
      <div v-for="(item, index) in authorList" :key="index">
        <author-card
          :img="item.avatar"
          :name="item.nickname"
          :orderNum="item.followCount"
          :videoNum="item.videoCount"
          @click.native="toPage(item.id)"
          ></author-card>
      </div>
    </div>
  </div>
</template>

<script>
import AuthorCard from './AuthorCard.vue'
export default {
  data () {
    return {
    }
  },
  props: {
    authorList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    AuthorCard
  },
  methods: {
    toPage(id) {
      console.log(111)
      this.$router.push({
        name: 'centerInfo',
        params: {
          id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.none-order {
  .bg-wrapper {
    position: relative;
    background-color: #e8e8e8;
    width: 100%;
    text-align: center;
    .bg-text-wrapper {
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 40px;
      .title {
        font-size: 12pxpx;
        color: #111;
      }
      .content {
        margin-top: 10px;
        font-size: 12px;
        color: #aaaaaa;
      }
    }
  }
  .author-wrapper {
    padding: 20px;
    padding-left: 110px;
  }
}
</style>
