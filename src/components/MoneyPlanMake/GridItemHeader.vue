<template>
  <div class="item-header">
    <label >
      {{gridItemData.headerData}}
    </label>
  </div>
</template>

<script lang="js">
  export default {
    name: "ItemHeader",
    props: {
      gridItemData: Object,
    },
  }
</script>

<style lang="scss" scoped>
  .item-header {
    width: 100%;
    height: 24px;
    background-color: #ffd767;
    color: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
</style>