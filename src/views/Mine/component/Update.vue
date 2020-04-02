<template>
  <div class="update" :style="{'height': height + 'px'}">
    <div class="nav">
      <div class="back" id="cancel" @click="cancel">
        <Icon type="ios-arrow-back" size="20" />
      </div>
      <div class="save" id="button" @click="commit">{{$t('base.save')}}</div>
    </div>
    <div class="input-wrapper">
      <Input
        v-model="name"
        :placeholder="$t('mine.newName')"
        v-if="type === 'name'"
        style="width: 100%;"
        class="name-input" />
      <Input
        v-model="introduce" 
        maxlength="100"
        show-word-limit
        v-else
        type="textarea"
        :rows="5"
        :placeholder="$t('mine.newInstroduction')"
        style="width: 100%" />
    </div>
  </div>
</template>

<script>
import mixins from '@/utils/mixins.js';
export default {
  mixins: [mixins],
  data() {
    return {
      height: 0,
      name: '',
      introduce: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'name',
    },
  },
  created() {
    this.hide();
    const height = document.documentElement.clientHeight || document.body.clientHeight;
    this.height = height;
  },
  methods: {
    show() {
      this.setIsNav(true);
      this.setIsSlider(true);
    },
    hide() {
      this.setIsNav(false);
      this.setIsSlider(false);
    },
    commit() {
      this.show();
      this.$emit('on-save', this.name, this.introduce);
    },
    cancel() {
      this.show();
      this.$emit('on-cancel');
    }
  }
}
</script>

<style lang="scss">
.update {
  width: 100%;
  background-color: #eae9e9;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  .nav {
    display: flex;
    background: pink;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 10px;
    position: fixed;
    width: 100%;
    height: 50px;
    left: 0;
    top: 0;
  }
  .input-wrapper {
    padding: 10px 0;
    position: absolute;
    top: 50px;
    width: 100%;
  }
  .name-input {
    .ivu-input {
      background: #eae9e9;
      border-bottom: 1px solid #a29696;
    }
  }
  .ivu-input {
    border-color: white;
    border: none;
    border-radius: 0;
  }
  .ivu-input:focus {
    border-color: #a29696;;
    box-shadow: none;
  }
  textarea.ivu-input {
    resize: none;
  }
}
</style>
