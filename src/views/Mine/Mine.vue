<template>
  <div class="mine" :style="{'min-height': minHeight + 'px'}">
    <div v-if="!isLogin" style="padding: 10px">还未登录，赶紧去登录吧~</div>
    <div v-else>
      <div class="line"
        @click="handleShowavatar"
        style="margin-top: 10px;">
        <div class="line-left">
          <Icon type="md-person" size="25" />
          <span class="line-text">{{$t('mine.avatar')}}</span>
        </div>
        <div class="line-right">
          <img :src="userInfo.avatar">
          <Icon type="ios-arrow-forward" size="20" />
        </div>
      </div>
      <div class="line"
        @click="handleShowName"
        style="margin-top: 10px;">
        <div class="line-left">
          <Icon type="ios-time-outline"
              size="25" />
          <span class="line-text">{{$t('mine.name')}}</span>
        </div>
        <div class="line-right">
          <span>{{userInfo.nickname}}</span>
          <Icon type="ios-arrow-forward" size="20" />
        </div>
      </div>
      <div class="line"
        @click="handleShowInstro"
        style="margin-top: 10px;">
        <div class="line-left">
          <Icon type="ios-bookmark"
              size="25" />
          <span class="line-text">{{$t('mine.instroduction')}}</span>
        </div>
        <div class="line-right">
          <span>{{userInfo.introduction}}</span>
          <Icon type="ios-arrow-forward" size="20" />
        </div>
      </div>
      <div class="line"
        style="margin-top: 10px;"
        @click="handleShowVideo">
        <div class="line-left">
          <Icon type="md-cloud-upload"
              size="25" />
          <span class="line-text">{{$t('mine.uploadVideo')}}</span>
        </div>
        <Icon type="ios-arrow-forward" size="20" />
      </div>
      <div class="line"
        @click="toMyPage"
        style="margin-top: 10px;">
        <div class="line-left">
          <Icon type="logo-youtube"
              size="25" />
          <span class="line-text">{{$t('mine.myPage')}}</span>
        </div>
        <Icon type="ios-arrow-forward" size="20" />
      </div>
      <div class="line"
        @click="toManage"
        style="margin-top: 10px;">
        <div class="line-left">
          <Icon type="ios-hammer" size="25"/>
          <span class="line-text">{{$t('mine.manage')}}</span>
        </div>
        <Icon type="ios-arrow-forward" size="20" />
      </div>
    </div>
    <cropper-bg
      v-if="showavatar"
      @on-cancel="hideModal"
      @on-success="handleAvatarSuccess"
      @hide-modla="hideModal"
    ></cropper-bg>
    <transition name="fade" v-if="showUpdate">
      <update
        :type="type"
        @on-cancel="hideModal"
        @on-save="onSaveUpdate"
      ></update>
    </transition>
  </div>
</template>

<script>
import CropperBg from '@/components/Image/Cropper.vue';
import Update from './component/Update.vue';
import ClickOutside from 'vue-click-outside';
import { getUserInfo, updateUserInfo } from '@/api/mine.js';
import { baseUrl } from '@/api/home.js';
import mixins from '@/utils/mixins.js';
export default {
  mixins: [mixins],
  directives: {
    ClickOutside
  },
  data () {
    return {
      showavatar: false,
      showUpdate: false,
      userInfo: {},
      newName: '',
      newIntroduction: '',
      videoInfo: '',
      avatarInfo: '',
      type: 'name',
      minHeight: 0
    }
  },
  components: {
    CropperBg,
    Update
  },
  created() {
    if(this.isLogin) {
      this.getUserInfo(this.userId);
    }
    this.setIsNav(true);
    this.setIsSlider(true);
    const height = (document.documentElement.clientHeight || document.body.clientHeight) - 100
    this.minHeight = height
  },
  methods: {
    toMyPage() {
      this.$router.push({
        name: 'centerInfo',
        params: {
          id: this.userId
        }
      })
    },
    toManage() {
      this.$router.push('/management')
    },
    getUserInfo(id) {
      getUserInfo(id).then(res => {
        this.userInfo = res.data.data;
        this.userInfo.avatar = baseUrl + this.userInfo.avatar;
      })
    },
    handleShowVideo() {
      this.$router.push('/upload')
    },
    handleShowavatar() {
      this.showavatar = true;
    },
    onSaveUpdate(name, introduce) {
      this.hideModal();
      this.newName = name;
      this.newIntroduction = introduce;
      this.updateUserInfo();
    },
    handleShowInstro() {
      this.type = 'introduce';
      this.showUpdate = true;
    },
    handleShowName() {
      this.type = 'name';
      this.showUpdate = true;
    },
    hideModal() {
      this.showavatar = false;
      this.showUpdate = false;
    },
    uploadErr() {
      this.$Message.error('请上传正确的文件格式')
    },
    handleAvatarSuccess(data) {
      this.avatarInfo =  data;
      this.updateUserInfo();
    },
    // 更新用户信息
    updateUserInfo() {
      this.hideModal();
      const params = {
        avatar: this.avatarInfo,
        id: this.userId,
        introduction: this.newIntroduction,
        nickname: this.newName
      };
      updateUserInfo(params).then(res => {
        if(res.data.status === 1) {
          if(this.avatarInfo) {
            this.userInfo.avatar = baseUrl + this.avatarInfo;
          }
          if(this.newName) {
            this.userInfo.nickname = this.newName;
          }
          if(this.newIntroduction) {
            this.userInfo.introduction = this.newIntroduction;
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mine {
  margin: 50px 0;
  position: relative;
  @include color_primary($bg-color-light);
  .line {
    padding: 5px 10px;
    box-sizing: content-box;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .line-left {
      display: flex;
      align-items: center;
      .line-text {
        font-size: 12px;
        margin-left: 10px;
        line-height: inherit;
        height: 100%;
        display: inline-block;
      }
    }
    .line-right {
      display: flex;
      align-items: center;
      span {
        width: 100px;
        text-align: right;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 10px;
      }
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .upload {
      margin-top: 30px;
      display: inline-block;
      margin-bottom: 0;
      font-weight: 400;
      text-align: center;
      vertical-align: middle;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      background-image: none;
      border: 1px solid transparent;
      white-space: nowrap;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      padding: 10px 80px;
      font-size: 12px;
      border-radius: 8px;
      transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
      color: #1d63ff;
      background-color: #fff;
      border-color: #dcdee2;
    }
    .item-input {
      width: 50%;
    }
  }
}
</style>
