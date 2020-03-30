<template>
  <div class="mine">
    <div class="line"
      @click="handleShowavatar"
      style="margin-top: 40px;">
      <div class="line-left">
        <Icon type="md-person" size="80" />
        <span class="line-text">头像</span>
      </div>
      <div class="line-right">
        <img :src="userInfo.avatar">
        <Icon type="ios-arrow-forward" size="80" />
      </div>
    </div>
    <div class="line"
      @click="handleShowName"
      style="margin-top: 40px;">
      <div class="line-left">
        <Icon type="ios-time-outline"
            size="80" />
        <span class="line-text">昵称</span>
      </div>
      <div class="line-right">
        <span>{{userInfo.nickname}}</span>
        <Icon type="ios-arrow-forward" size="80" />
      </div>
    </div>
    <div class="line"
      @click="handleShowInstro"
      style="margin-top: 40px;">
      <div class="line-left">
        <Icon type="ios-bookmark"
            size="80" />
        <span class="line-text">个人简介</span>
      </div>
      <div class="line-right">
        <span>{{userInfo.introduction}}</span>
        <Icon type="ios-arrow-forward" size="80" />
      </div>
    </div>
    <div class="line"
      style="margin-top: 40px;"
      @click="handleShowVideo">
      <div class="line-left">
        <Icon type="md-cloud-upload"
            size="80" />
        <span class="line-text">上传视频</span>
      </div>
      <Icon type="ios-arrow-forward" size="80" />
    </div>
    <div class="line"
      style="margin-top: 40px;">
      <div class="line-left">
        <Icon type="logo-youtube"
            size="80" />
        <span class="line-text">我的视频</span>
      </div>
      <Icon type="ios-arrow-forward" size="80" />
    </div>
    <br><br>
    <!-- <div class="exceptional">
      <div class="play">播放列表</div>
      <div class="play-video-lists">
        <div class="lists-image">
          <img src="@/assets/images/video-list-bg.jpg">
          <div class="video-num-wrapper">
            <div class="video-num">
              <div class="num">0</div>
              <div>
                <Icon type="md-list"
                      size="80" />
              </div>
            </div>
          </div>
        </div>
        <div class="info">
          <div class="info-text1">
            打赏过的视频
          </div>
          <div class="info-text2">
            <div>bobo</div>
            <div>无视频</div>
          </div>
        </div>
      </div>
    </div> -->
    <modal-bg v-if="showavatar">
      <div class="content" v-click-outside="hideModal">
        <Upload
          ref="upload"
          :format="['jpg','jpeg','png']"
          :on-format-error="uploadErr"
          action="http://101.133.165.169:8000/api/upload/avatar"
          :on-success="handleavatarSuccess">
          <Button icon="ios-cloud-upload-outline">上传头像</Button>
        </Upload>
        <div class="upload"  @click="updateUserInfo">
          上传
        </div>
      </div>
    </modal-bg>
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
    ModalBg
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
  margin: px2rem(100) 0;
  position: relative;
  .line {
    padding: px2rem(20) px2rem(30);
    box-sizing: content-box;
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .line-left {
      display: flex;
      align-items: center;
      .line-text {
        font-size: px2rem(26);
        margin-left: px2rem(20);
        line-height: inherit;
        height: 100%;
        display: inline-block;
      }
    }
    .line-right {
      display: flex;
      align-items: center;
      span {
        width: px2rem(200);
        text-align: right;
        font-size: px2rem(20);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      img {
        width: px2rem(50);
        height: px2rem(50);
        border-radius: 50%;
      }
    }
  }
  // .exceptional {
  //   padding: px2rem(50) px2rem(30);
  //   .play {
  //     font-size: px2rem(34);
  //   }
  //   .play-video-lists {
  //     display: flex;
  //     .lists-image {
  //       width: px2rem(300);
  //       height: px2rem(200);
  //       position: relative;
  //       img {
  //         width: px2rem(300);
  //         height: px2rem(200);
  //       }
  //       .video-num-wrapper {
  //         position: absolute;
  //         bottom: 0;
  //         right: 0;
  //         width: px2rem(100);
  //         height: px2rem(200);
  //         color: white;
  //         display: flex;
  //         flex-direction: column;
  //         justify-content: center;
  //         align-items: center;
  //         background-color: #111111cc;
  //         .video-num {
  //           .num {
  //             text-align: center;
  //             font-size: px2rem(24);
  //           }
  //         }
  //       }
  //     }
  //     .info {
  //       margin-left: px2rem(20);
  //       .info-text1 {
  //         color: #111111;
  //         font-size: px2rem(26);
  //       }
  //       .info-text2 {
  //         font-size: px2rem(24);
  //         color: #707070;
  //       }
  //     }
  //   }
  // }
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
      margin-top: px2rem(30);
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
      padding: px2rem(10) px2rem(80);
      font-size: px2rem(30);
      border-radius: px2rem(8);
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
