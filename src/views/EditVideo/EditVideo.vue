<template>
    <div class="upload-video" :style="{'min-height': minHeight + 'px'}">
        <div class="form">
            <input type="text" v-model="title" class="item-input" placeholder="请输入视频标题">
            <input type="text" v-model="instroduction" class="item-input" placeholder="请输入视频介绍">
            <div class="tip" :style="{'color': noneType ? 'red' : 'black'}">请选择一个分类</div>
            <div class="type">
                <div
                    v-for="item in opts"
                    :key="item.part"
                    @click="seceltRealPart(item.part)"
                    :class="{'select-btn': realPart === item.part}"
                    class="type-btn">
                {{item.name}}</div>
            </div>
            <div class="confirm-btn" @click="upload">修改</div>
        </div>
    </div>
</template>

<script>
import { iconLists } from '@/utils/icon.js';
import { editVideo } from '@/api/edit.js'
import { getVideoInfo } from '@/api/watch.js'
import mixins from '@/utils/mixins.js';
  export default {
    mixins: [mixins],
    data() {
      return {
          opts: iconLists,
          realPart: 0,
          imgPath: '',
          videoPath: '',
          videoLength: 0,
          noneType: false,
          title: '',
          instroduction: '',
          minHeight: 0,
          videoId: this.$route.params.id

      }
    },
    created() {
        const height = (document.documentElement.clientHeight || document.body.clientHeight) - 100
        this.minHeight = height;
        this.getVideoInfo();
    },
    methods: {
        getVideoInfo() {
            getVideoInfo(this.videoId).then(res => {
                if(res.data.status === 1) {
                    const info = res.data.data;
                    this.imgPath = info.img;
                    this.instroduction = info.introduction;
                    this.videoLength = info.length;
                    this.videoPath = info.savePath;
                    this.title = info.title;
                    this.realPart = info.partitionId;
                }
            })
        },
        seceltRealPart(index) {
            this.realPart = index;
            this.noneType = false;
        },
        // 上传视频
        upload() {
            if(!this.title || !this.instroduction || this.realPart === 0) {
                if(!this.title || !this.instroduction) {
                    this.$Message.error(this.renderI18nKey('mine.picOrDis'));
                }
                if(this.realPart === 0) {
                    this.noneType = true;
                }
            } else {
                const params = {
                    "img": this.imgPath,
                    "introduction": this.instroduction,
                    "length": this.videoLength,
                    "partitionId": this.realPart,
                    "savePath": this.videoPath,
                    "title": this.title,
                    "id": this.videoId,
                }
                editVideo(params).then(res => {
                    if(res.data.status === 1) {
                        this.$Message.success(this.renderI18nKey('base.uploadSuccess'));
                        this.$router.push('/mine');
                    }
                })
            }
        }
    }
  }
</script>

<style lang="scss">
.upload-video {
    @include color_primary($bg-color-light);
    margin: 50px 0 50px 0;
    .form {
        width: 95%;
        margin: 0 auto;
        input {
            border-top: none;
            border-left: none;
            border-right: none;
            margin-top: 10px;
            font-size: 16px;
            @include color_primary($bg-color-light);
        }
        .upload-btn {
            width: 100%;
            margin-top: 20px;
            .btn {
                width: 100%;
                padding: 5px 0;
                color: #001fff;
                @include color_primary($bg-color-light);;
            }
            .ivu-upload {
                width: 100%;
            }
        }
        .confirm-btn {
            width: 100%;
            padding: 5px 0;
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            border: 1px solid #001fff;
        }
        .tip {
            margin: 10px 0 0 0;
            font-size: 16px;
        }
        .type {
            display: flex;
            flex-wrap: wrap;
            margin-top: 10px;
            .type-btn {
                // background: white;
                @include color_primary($bg-color-light);
                color: #5f4b4b;
                border: 1px solid #5f4b4b;
                margin: 3px;
                border-radius: 4px;
                text-align: center;
                padding: 5px 10px;
                font-size: 12px;
            }
            .select-btn {
                color: #001fff;
                border: 1px solid #001fff;
            }
        }
        .cover-img {
            .img-wrapper {
                width: 100%;
                img {
                    width: 33.3%;
                    padding: 5px;
                    transition: all .2s linear;
                }
                .selected {
                    border: 1px solid #001fff;
                }
            }
        }
    }
}
</style>
