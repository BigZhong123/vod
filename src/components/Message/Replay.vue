  
<template>
  <div
    v-if="focusType"
    class="answer">
    <div class="box clearfix">
      <div class="left">
        <input
          v-focus="focusType"
          name="sendReport"
          :value="value"
          :placeholder="tips"
          @change="handleChange($event)"></div>
      <div class="right" @click="send">
        <span>发送</span>
      </div>
    </div>
    <div
      v-show="focusType"
      class="mask"
      @click="active($event)" />
  </div>
</template>

<script>
export default {
  name: 'vueReport',
  // 设置获取焦点
  directives: {
    // 自动获取焦点
    focus: {
      inserted: function(el, binding) {
        if (binding.value) {
          el.focus()
          el.scrollIntoView()
        } else {
          el.blur()
        }
      },
      componentUpdated: function(el, binding) {
        if (binding.value) {
          el.focus()
          el.scrollIntoView()
        } else {
          el.blur()
        }
      }
    }
  },
  props: {
    // input value值
    value: {
      type: String,
      default: null
    },
    // 是否展示和获取焦点
    focusType: {
      type: Boolean,
      default: false
    },
    // 输入框内 提示语
    tips: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      height: null
    }
  },
  computed: {
    status() {
      return !this.focusType
    }
  },
  watch: {
    // 发送完后 回到原始位置
    focusType() {
      if (this.focusType) {
        this.ios()
      } else {
        document.body.scrollTop = this.height
        document.documentElement.scrollToop = this.height
      }
    }
  },
  mounted() {
    // 监听滚动条高度
    document.addEventListener('scroll', () => {
      if (this.status) {
        this.height = (document.documentElement.scrollTop || document.body.scrollTop)
      }
    })
  },
  methods: {
    // 隐藏组件
    active() {
      this.$emit('update:focusType', false);
    },
    // 发送回调函数
    send() {
      this.active();
      this.$emit('send');
    },
    // 兼容ios手机 滚动
    ios() {
      setTimeout(function() {
        this.height = document.body.scrollTop;
        document.body.scrollTop = document.body.scrollHeight;
        document.documentElement.scrollTop = document.body.scrollHeight;
      }, 300)
    },
    // 同步父级 input 输入 value值
    handleChange(event) {
      this.$emit('input', event.target.value);
    }
  }
}
</script>

<style lang="scss">
.clearfix:before,
.clearfix:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
}
.answer{
  background-color: white;
  position:fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  z-index: 9999999;
  .box{
    padding: 0 10px;
    position: relative;
    z-index: 999999999;
    display: flex;
    align-items: center;
    .left{
      text-align: center;
      flex: 1;
      input {
        display: inline-block;
        width: 100%;
        height: 32px;
        line-height: 1.5;
        padding: 4px 7px;
        font-size: 14px;
        border: 1px solid #dcdee2;
        color: #515a6e;
        background-image: none;
        z-index: 999999999;
        position: relative;
        cursor: text;
        border: none;
        border-radius: 15px;
        background-color: #ccc;
        transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
        &:focus {
          outline-style: none;
        }
      }
    }
    .right{
      margin-left: 10px;
      width: 40px;
      flex: 0 0 40px;
      font-size: 12px;
      color: #ccc;
    }
  }
}
.mask{
    z-index: 99999;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    // background: rgba(0, 0, 0, 0.8);
    background: black;
    opacity: .5;
}
</style>