<template>
  <div class="my-subscribe">
    <div style="padding: 10px" v-if="userLists.length === 0">
      {{$t('base.noFansTip')}}
    </div>
    <div v-else>
      <div style="padding: 10px">{{$t('base.myFans')}}</div>
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
import { getMyFollow } from "@/api/mine.js";
  export default {
    data() {
      return {
          userLists: [],
          id: this.$route.params.id
      }
    },
    components: {
      Author
    },
    created() {
        this.getMyFollow();
    },
    methods: {
      getMyFollow() {
        getMyFollow(this.id).then(res => {
          if(res.data.status === 1) {
            const lists = res.data.data;
            lists.forEach((item, index) => {
              lists[index].avatar = baseUrl + lists[index].avatar;
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
