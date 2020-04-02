<template>
    <div class="upload-video">
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
            <Upload
                class="upload-btn"
                ref="upload"
                :format="['mp4']"
                :on-format-error="uploadErr"
                action="http://101.133.165.169:8000/api/upload/video"
                :on-success="handleVideoSuccess">
                <Button class="btn" icon="ios-cloud-upload-outline">上传视频</Button>
            </Upload>
            <div class="cover-img" v-if="imgPath && imgPath.length > 0">
                <div class="tip" :style="{'color': noneImg ? 'red' : 'black'}">请选择一张封面</div>
                <div class="img-wrapper">
                    <img
                        v-for="(item, index) in imgPath"
                        :key="index"
                        :src="item"
                        @click="selectRealCover(index)"
                        :class="{'selected': realCover === index}"
                    >
                </div>
            </div>
            <div class="confirm-btn" @click="upload">上传</div>
        </div>
    </div>
</template>

<script>
import { iconLists } from '@/utils/icon.js';
import { uploadVideo } from '@/api/mine.js';
import mixins from '@/utils/mixins.js';
  export default {
    mixins: [mixins],
    data() {
      return {
          opts: iconLists,
          realPart: 0,
          imgPath: [],
          uploadImgPath: [],
          videoPath: '',
          videoLength: 0,
          noneType: false,
          noneImg: false,
          title: '',
          instroduction: '',
          realCover: -1
      }
    },
    methods: {
        handleVideoSuccess(res) {
            const url = 'http://101.133.165.169:8000/res/';
            this.noneImg = false;
            if(res.status === 1) {
                const data = res.data;
                this.videoPath = data.savePath;
                this.imgPath.push(url + data.img1);
                this.imgPath.push(url + data.img2);
                this.imgPath.push(url + data.img3);
                this.uploadImgPath.push(data.img1);
                this.uploadImgPath.push(data.img2);
                this.uploadImgPath.push(data.img3);
                this.videoLength = data.length;
            }
        },
        uploadErr() {
            this.$Message.error('请上传正确格式的文件')
        },
        seceltRealPart(index) {
            this.realPart = index;
            this.noneType = false;
        },
        selectRealCover(index) {
            this.realCover = index;
            this.noneImg = false;
        },
        upload() {
            if(!this.title || !this.instroduction || this.realPart === 0 || this.realCover === -1) {
                if(!this.title || !this.instroduction) {
                    this.$Message.error('请输入视频标题或介绍');
                }
                if(this.realPart === 0) {
                    this.noneType = true;
                }
                if(this.realCover === -1) {
                    this.noneImg = true;
                }
            } else {
                const params = {
                    "img": this.uploadImgPath[this.realCover],
                    "introduction": this.instroduction,
                    "length": this.videoLength,
                    "partitionId": this.realPart,
                    "savePath": this.videoPath,
                    "title": this.title,
                    "upId": this.userId,
                    // type随便填的
                    "type": 0,
                }
                uploadVideo(params).then(res => {
                    if(res.data.status === 1) {
                        this.$Message.success('上传成功');
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
        }
        .upload-btn {
            width: 100%;
            margin-top: 20px;
            .btn {
                width: 100%;
                padding: 5px 0;
                color: #001fff;
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
                background: white;
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
                    transition: all .5s linear;
                }
                .selected {
                    border: 1px solid #001fff;
                }
            }
        }
    }
}
</style>
