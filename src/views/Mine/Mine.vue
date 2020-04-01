<template>
  <div class="mine">
    <div class="line"
      @click="handleShowavatar"
      style="margin-top: 10px;">
      <div class="line-left">
        <Icon type="md-person" size="25" />
        <span class="line-text">头像</span>
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
        <span class="line-text">昵称</span>
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
        <span class="line-text">个人简介</span>
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
        <span class="line-text">上传视频</span>
      </div>
      <Icon type="ios-arrow-forward" size="20" />
    </div>
    <div class="line"
      style="margin-top: 10px;">
      <div class="line-left">
        <Icon type="logo-youtube"
            size="25" />
        <span class="line-text">我的收藏</span>
      </div>
      <Icon type="ios-arrow-forward" size="20" />
    </div>
    <br><br>
    <cropper-bg v-if="showavatar" @on-cancel="hideModal"></cropper-bg>
    <modal-bg v-if="showName">
      <div class="content" v-click-outside="hideModal">
        <input v-model="newName" type="text" class="item-input" placeholder="请输入新昵称">
        <div class="upload" @click="updateUserInfo">
          确定
        </div>
      </div>
    </modal-bg>
    <modal-bg v-if="showInstruction">
      <div class="content" v-click-outside="hideModal">
        <input type="text" v-model="newIntroduction" class="item-input" placeholder="请输入新个人简介">
        <div class="upload" @click="updateUserInfo">
          确定
        </div>
      </div>
    </modal-bg>
  </div>
</template>

<script>
import ModalBg from '@/components/Base/ModalBg.vue';
import CropperBg from '@/components/Image/Cropper.vue';
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
      showName: false,
      showInstruction: false,
      userInfo: {},
      newName: '',
      newIntroduction: '',
      videoInfo: '',
      avatarInfo: '',
    }
  },
  components: {
    ModalBg,
    CropperBg
  },
  created() {
    this.getUserInfo(this.userId)
    // this.getUserInfo(8)
  },
  methods: {
    getUserInfo(id) {
      // console.log(id)
      getUserInfo(id).then(res => {
        this.userInfo = res.data.data;
        // console.log('res', res)
        this.userInfo.avatar = baseUrl + this.userInfo.avatar;
      })
    },
    handleShowVideo() {
      this.$router.push('/upload')
    },
    handleShowavatar(e) {
      this.showavatar = true;
      e.preventDefault();
      e.stopPropagation();
    },
    handleShowInstro(e) {
      this.showInstruction = true;
      e.preventDefault();
      e.stopPropagation();
    },
    handleShowName(e) {
      this.showName = true;
      e.preventDefault();
      e.stopPropagation();
    },
    hideModal() {
      this.showavatar = false;
      this.showName = false;
      this.showInstruction = false;
    },
    uploadErr() {
      this.$Message.error('请上传正确的文件格式')
    },
    handleavatarSuccess(res) {
      if(res.status === 1) {
        this.avatarInfo = res.data
      }
    },
    updateUserInfo() {
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
          this.hideModal();
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
