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
      <!-- <div v-for="(item, index) in authorList"
           :key="index">
        <div class="class-name">{{item.className}}</div>
        <div v-for="(child, i) in item.authors"
             :key="i">
          <author-card :img="child.avatar"
                       :name="child.name"
                       :orderNum="child.orderNum"
                       :videoNum="child.videoNum"></author-card>
        </div>
      </div> -->
      <div v-for="(item, index) in authorList" :key="index">
        <author-card
          :img="item.avatar"
          :name="item.nickName"
          :orderNum="item.followCount"
          :videoNum="child.videoCount"
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
      // authorList: [
      //   {
      //     className: '游戏',
      //     authors: [
      //       {
      //         avatar: require('@/assets/images/avatar.jpg'),
      //         name: '窝窝头',
      //         orderNum: '49',
      //         videoNum: '4'
      //       },
      //       {
      //         avatar: require('@/assets/images/avatar.jpg'),
      //         name: '窝窝头',
      //         orderNum: '49',
      //         videoNum: '4'
      //       },
      //       {
      //         avatar: require('@/assets/images/avatar.jpg'),
      //         name: '窝窝头',
      //         orderNum: '49',
      //         videoNum: '4'
      //       }
      //     ]
      //   },
      // ]
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
  }
}
</script>

<style lang="scss" scoped>
.none-order {
  .bg-wrapper {
    position: relative;
    background-color: #e8e8e8;
    width: 100%;
    height: px2rem(600);
    text-align: center;
    .bg-text-wrapper {
      position: absolute;
      width: 100%;
      text-align: center;
      bottom: px2rem(50);
      .title {
        font-size: px2rem(30);
        color: #111;
      }
      .content {
        margin-top: px2rem(10);
        font-size: px2rem(24);
        color: #aaaaaa;
      }
    }
  }
  .author-wrapper {
    padding: px2rem(20);
    .class-name {
      font-size: px2rem(40);
    }
  }
}
</style>
