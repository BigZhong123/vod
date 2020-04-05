<template>
  <div class="comment">
    <!-- <button @click="getFocus">获取焦点</button> -->
    <!-- <replay
      v-model="value"
      :focus-type.sync="show"
      @send="send"></replay> -->
    <replay
    :focus-type.sync="show"
    @send="send"></replay>
    <div style="padding: 10px 0 0 20px;">热门评论</div>
    <div class="comment-wrapper">
      <div
        v-for="(item, index) in firstComment"
        :key="index"
        style="border-bottom: 1px solid #ccc; padding: 10px 0"
      >
        <div class="s-comment" @click="showReplay">
          <div class="img-wrapper">
            <img :src="item.avatar">
          </div>
          <div class="content-wrapper">
            <!-- 可以加一个up标记 -->
            <div class="name">{{item.name}}</div>
            <div class="time">{{item.time}}</div>
            <div class="msg">{{item.msg}}</div>
          </div>
        </div>
        <div
          class="reply-wrapper"
          v-if="item.children.length > 0" 
          @click="showSecond(index, $event)"
        >
          <div  v-for="(sub, i) in item.children" :key="i + 'zz'" class="reply">
            <div  v-if="i < 3" style="display: flex;">
              <div class="sub-name" style="color: #7373ff;">{{sub.name}}：</div>
              <div class="sub-msg">{{sub.msg}}</div>
            </div>
          </div>
          <div style="color: #7373ff;">查看全部回复</div>
        </div>
      </div>
    </div>
    <!-- <div class="second-comment" v-if="isSecond" :class="{'is-show': isSecond}"> -->
    <div class="close-icon" @click="closeCommentModal" :class="{'is-show-icon': isSecond}">
      <Icon type="ios-close" size="30" />
    </div>
    <div class="second-comment-wrapper" :class="{'is-show': isSecond}">
      <div class="second-comment">
        <div class="overflow-wrapper">
          <div style="display: flex; padding: 0 10px 10px; border-bottom: 1px solid #ccc;">
            <div class="b-img-wrapper">
              <img :src="secondComment.avatar">
            </div>
            <div class="b-content-wrapper">
              <!-- 可以加一个up标记 -->
              <div class="b-name">{{secondComment.name}}</div>
              <div class="b-time">{{secondComment.time}}</div>
              <div class="b-msg">{{secondComment.msg}}</div>
            </div>
          </div>
          <div class="b-other" v-for="(item, index) in secondComment.children" :key="index">
            <div class="other-img">
              <img :src="item.avatar">
            </div>
            <div class="other-content">
              <div class="other-name">{{item.name}}</div>
              <div>
                <span v-if="item.showReplay">
                  回复
                  <span style="color: #7373ff;">{{item.replayName}}</span>
                  ：
                </span>
                <span>{{item.msg}}</span>
              </div>
            </div>
            <div class="other-time">
              {{item.time}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Replay from '@/components/Message/Replay.vue';
import { getComment } from '@/api/comment.js';
import mixins from '@/utils/mixins.js';
import { timeago } from '@/utils/util.js';
import { baseUrl } from '@/api/home.js';
import ClickOutside from 'vue-click-outside';
  export default {
    mixins: [mixins],
    directives: {
      ClickOutside
    },
    data() {
      return {
        value: '',
        show: false,
        currentPage: 1,
        pageSize: 50,
        firstComment: [],
        secondComment: [],
        isSecond: false, // 是否显示第二层回复
      }
    },
    components: {
      Replay
    },
    created() {
      this.getComment(this.currentVideoId, this.currentPage, this.pageSize);
      // const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // this.clientHeight = clientHeight
      // const height = clientHeight - 100;
      // this.hiddenClass = {
      //   height: height + 'px',
      //   overflow: 'hidden'
      // }
    },
    methods: {
      getComment(videoId, currentPage, pageSize) {
        getComment(videoId, currentPage, pageSize).then(res => {
          if(res.data.status === 1) {
            let first = res.data.data.firstCommentViews;
            // console.log('first', first)
            first.forEach((item) => {
              let obj = {
                pid: item.id,
                avatar: baseUrl + item.userEntity.avatar,
                name: item.userEntity.nickname,
                time: timeago(item.createTime),
                msg: item.commentMsg,
                children: []
              }
              let flagId = item.userId;
              let ppid = item.id;
              for(let i = 0; i < item.commentViews.length; i++) {
                let second = item.commentViews[i];
                let subObj = {
                  pid: ppid,
                  avatar: baseUrl + second.userEntity.avatar,
                  name: second.userEntity.nickname,
                  msg: second.commentMsg,
                  replayName: second.replyNickName,
                  showReplay: second.replyUserId !== flagId,
                  time: timeago(second.createTime)
                }
                obj.children.push(subObj)
              }
              this.firstComment.push(obj);
            })
            // console.log('first comment', this.firstComment);
          }
        })
      },
      closeCommentModal() {
        this.isSecond = false;
        this.setCommentModal(false);
      },
      showSecond(index, e) {
        const data = this.firstComment[index];
        this.secondComment = data;
        this.isSecond = true;
        this.setCommentModal(true);
        e.preventDefault();
        e.stopPropagation();
      },
      showReplay() {
        this.show = true;
      },
      // send(value) {
      send() {
        // console.log(888, value)
        this.show = false
      },
    }
  }
</script>

<style lang="scss">
.comment {
  font-size: 12px;
  .comment-wrapper {
    padding-top: 10px;
    .s-comment {
      display: flex;
      padding: 10px 10px 10px 20px;
      .img-wrapper {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .content-wrapper {
        font-size: 12px;
        margin-left: 15px;
        .name {

        }
        .time {
          color: #ccc;
        }
        .msg {
          margin-top: 5px;
          color: black;
        }
      }
    }
    .reply-wrapper {
      margin: 10px 10px 10px 85px;
      padding: 10px;
      background: #f3f3f3;
      .reply {
        display: flex;
      }
    }
  }
  .close-icon {
    position: fixed;
    z-index: -10;
    bottom: -970px;
    right: 0;
    height: 35px;
    line-height: 35px;
    width: 100%;
    background: white;
    border-top: 1px solid #ccc;
    text-align: right;
    transition: all .2s linear;
  }
  .is-show-icon {
    z-index: 999999;
    opacity: 1;
    bottom: 425px;
  }
  .second-comment-wrapper {
    z-index: -10;
    opacity: 0;
    width: 100%;
    // max-height: 500px;
    height: 430px;
    overflow-y: auto;
    background: white;
    position: fixed;
    border-top: 1px solid #cccccc;
    left: 0;
    padding-top: 10px;
    bottom: -1000px;
    transition: all .2s linear;
    .second-comment {
      .overflow-wrapper {
        height: auto;
        overflow-y: auto;
      }
      .b-img-wrapper {
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 50%;
        img {
          width: 100%;
        }
      }
      .b-content-wrapper {
        margin-left: 10px;
        .b-name {

        }
        .b-time {

        }
        .b-msg {

        }
      }
      .b-other {
        display: flex;
        padding: 10px;
        font-size: 12px;
        border-bottom: 1px solid #ccc;
        .other-img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          flex: 0 0 50px;
          img {
            width: 100%;
          }
        }
        .other-content {
          margin-left: 10px;
          flex: 1;
          .other-name {

          }
        }
        .other-time {
          flex: 0 0 80px;
          text-align: right;
        }
      }
    }
  }
  .is-show {
    z-index: 999999;
    opacity: 1;
    bottom: 0;
  }
}
</style>
