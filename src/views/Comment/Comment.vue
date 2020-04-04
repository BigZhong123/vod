<template>
  <div class="comment">
      <button @click="getFocus">获取焦点</button>
        <replay
        v-model="value"
        :focus-type.sync="show"
        @send="send()"></replay>
  </div>
</template>

<script>
import Replay from '@/components/Message/Replay.vue'
  export default {
    data() {
      return {
        value: '',
        show: false
      }
    },
    components: {
      Replay
    },
    methods: {
      getFocus() {
        this.show = true
      },
      send() {
        console.log(this.value)
        this.show = false
      }
    }
  }
</script>

<style lang="scss">
.comment {
  font-size: 16px;
}
</style>
