<template>
  <div class="manage-video">
    <div class="nav">
        <div class="back" id="cancel" @click="back">
            <Icon type="ios-arrow-back" size="20" />
        </div>
        <div class="save" id="button" v-if="isRemove" @click="isRemove = !isRemove">{{$t('base.remove')}}</div>
        <div class="save" id="button" v-if="!isRemove" @click="isRemove = !isRemove">{{$t('base.finish')}}</div>
    </div>
    <div class="my-video" :class="{'distance': !isRemove}">
        <div class="video" v-for="(item, index) in videoLists"
                :key="index"
                @click="editVideo(index, item.id)">
            <div class="icon" @click="selectVideo(index, item.id)" v-if="!isRemove">
                <Icon type="md-checkmark" size="25" :class="{'selected-color': selectArr.indexOf(index) >= 0}" />
            </div>
            <small-video
                class="small-video"
                :imgPath="item.img"
                :title="item.title"
                :name="item.userEntity.nickname"
                :count="item.videoOperationEntity.clickCount"
                :videoPath="item.savePath"
                :partId="item.partitionId"
                :videoId="item.id"
            ></small-video>
            <div class="right-icon" v-if="isRemove">
                <Icon type="ios-arrow-forward" size="20" />
            </div>
        </div>
    </div>
    <div class="remove-button" v-if="!isRemove" @click="deleteVideo">
        <Icon type="md-trash" size="20" />
        <div >{{$t('base.remove')}}</div>
    </div>
  </div>
</template>

<script>
import { getUserVideo } from '@/api/mine.js';
import mixins from '@/utils/mixins.js';
import { baseUrl } from '@/api/home.js';
import SmallVideo from '@/components/Video/SmallVideo.vue';
import { deleteVideo } from '@/api/management.js'
  export default {
    mixins: [mixins],
    data() {
      return {
          videoLists: [],
          page: 1,
          pageSize: 99,
          selectArr: [],
          selectVideoArr: [],
          isRight: true,
          isRemove: true
      }
    },
    components: {
        SmallVideo
    },
    created() {
        this.hide();
        this.getUserVideo();
    },
    methods: {
        getUserVideo() {
            getUserVideo(this.userId, this.page, this.pageSize).then(res => {
                if(res.data.status === 1) {
                    const videoView = res.data.data.videoView;
                    videoView.forEach(item => {
                        item.savePath = baseUrl + item.savePath;
                        item.img = baseUrl + item.img;
                    });
                    this.videoLists = [...videoView]
                }
            })
        },
        selectVideo(index, id) {
            let position = this.selectArr.indexOf(index);
            let position2 = this.selectVideoArr.indexOf(id);
            if(position >= 0) {
                this.selectArr.splice(position, 1);
                this.selectVideoArr.splice(position2, 1);
            } else {
                this.selectArr.push(index);
                this.selectVideoArr.push(id);
            }
        },
        // 删除视频
        deleteVideo() {
            deleteVideo(this.userId, this.selectVideoArr).then(res => {
                if(res.data.status === 1) {
                    this.selectArr = [];
                    this.selectVideoArr = [];
                    this.isRemove = !this.isRemove;
                    this.getUserVideo();
                    this.$Message.success('删除成功')
                }
            })
        },
        editVideo(index, videoId) {
            if(!this.isRemove) {
                this.selectVideo(index, videoId);
            } else {
                    this.$router.push({
                    name: 'edit',
                    params: {
                        id: videoId
                    }
                })
            }
        },
        show() {
            this.setIsNav(true);
            this.setIsSlider(true);
        },
        hide() {
            this.setIsNav(false);
            this.setIsSlider(false);
        },
        back() {
            history.go(-1)
        }
    },
    destroyed() {
        this.show()
    }
  }
</script>

<style lang="scss" scoped>
.manage-video {
    margin: 50px 0;
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
    .distance {
        margin-bottom: 50px;
    }
    .my-video {
        margin-bottom: 50px;
        .video {
            display: flex;
            align-items: center;
            .icon {
                height: 100px;
                line-height: 100px;
                padding: 0 10px;
                border-bottom: 1px solid #eee;
                i {
                    flex: 0 0 20px;
                    border: 1px solid #cccccc;
                    padding: 2px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
            }
            .right-icon {
                height: 100px;
                line-height: 100px;
                padding: 0 10px;
                border-bottom: 1px solid #eee;
            }
            .selected-color {
                color: #83ff36;
                border-color: #83ff36!important;
            }
            .small-video {
                flex: 1;
            }
        }
    }
    .remove-button {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background: rgba(55, 55, 55, 0.38);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        i {

        }
        div {

        }
    }
}
</style>
