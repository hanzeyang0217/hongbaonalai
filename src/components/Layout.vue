<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <Nav/>
  </div>
</template>

<script lang="js">
  import Nav from '@/components/Nav'

  export default {
    name: "Layout",
    components: {Nav},
  }
</script>

<style lang="scss">
  .nav-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .content {
    padding-left: 8px;
    padding-right: 8px;
    flex-grow: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .content h3 {
    padding-top: 8px;
    padding-bottom: 8px;
    margin-bottom: 24px;
    border-bottom: #AAAAAA solid 1px;
    text-align: left;
    color: gray;
  }
</style>