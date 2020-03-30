<template>
  <div class="modal">
      <slot></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    components: {

    }
  }
</script>

<style lang="scss">
.modal {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(55,55,55,.6);
}
</style>
