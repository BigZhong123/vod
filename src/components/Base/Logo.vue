<template>
  <div class="logo">
    <span class="logo-s">S</span>
    <span class="logo-u">U</span>
    <span class="logo-n">N</span>
    <span class="logo-t">T</span>
    <span class="logo-v">V</span>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: px2rem(80);
  font-size: px2rem(60);
  text-align: center;
  line-height: px2rem(80);
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  .logo-s {
    color: rgb(66, 133, 244);
  }
  .logo-u {
    color: rgb(234, 67, 53);
  }
  .logo-n {
    color: rgb(251, 188, 5);
  }
  .logo-t {
    color: rgb(52, 168, 83);
  }
  .logo-v {
    color: rgb(234, 67, 53);
  }
}
</style>
