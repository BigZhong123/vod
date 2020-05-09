<template>
  <div class="author">
      <div class="img-wrapper">
          <img :src="imgPath">
      </div>
      <div class="info-wrapper">
          <div class="name">{{name}}</div>
          <div class="introduction">{{introduction}}</div>
          <div class="follow-count">{{count}}{{$t('base.fans')}}</div>
      </div>
  </div>
</template>

<script>
  export default {
    props: {
        imgPath: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        introduction: {
            type: String,
            default: ''
        },
        count: {
            type: Number,
            default: 0
        }
    }
  }
</script>

<style lang="scss">
.author {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
    .img-wrapper {
        img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }
    }
    .info-wrapper {
        margin-left: 15px;
        font-size: 14px;
        .name {

        }
        .introduction {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .follow-count {
            font-size: 12px;
        }
    }
}
</style>
