<template>
  <div class="my-subscribe">
    <div v-if="userLists.length === 0 || !hasSubscribe" style="padding: 10px">暂无关注者，赶紧去关注吧！</div>
    <div v-else>
      <div style="padding: 10px">我的关注</div>
      <author
        v-for="(item, index) in userLists"
        :key="index"
        :imgPath="item.avatar"
        :name="item.nickname"
        :introduction="item.introduction"
        :count="item.followCount"
        @click.native="toCenterInfo(item.id)"
      ></author>
    </div>
  </div>
</template>

<script>
import Author from '../Home/components/Author.vue';
import { baseUrl } from "@/api/home.js";
import { getMySubscribe } from "@/api/mine.js";
  export default {
    data() {
      return {
          userLists: [],
          id: this.$route.params.id,
          hasSubscribe: true
      }
    },
    components: {
      Author
    },
    created() {
        this.getMySubscribe();
    },
    methods: {
      getMySubscribe() {
        getMySubscribe(this.id).then(res => {
          // console.log(res)
          if(res.data.status === 1) {
            this.hasSubscribe = res.data.data.hasSubscribes > 0 ? true : false
            const lists = res.data.data.userEntities;
            lists.forEach((item, index) => {
              lists[index].avatar = baseUrl + lists[index].avatar
            });
            this.userLists = lists;
          }
        })
      },
      toCenterInfo(id) {
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

<style lang="scss">
.my-subscribe {
  margin: 50px 0;
}
</style>
