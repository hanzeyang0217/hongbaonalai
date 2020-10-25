<template>
  <div>
    <div class="item" v-if="gridItemData.show">
      <GridItemHeader :gridItemData="gridItemData"/>
      <GridItemInput :gridItemData="gridItemData"/>
    </div>
  </div>
</template>

<script lang="js">
  import GridItemInput from '@/components/MoneyPlanMake/GridItemInput.vue'
  import GridItemHeader from '@/components/MoneyPlanMake/GridItemHeader.vue'

  export default {
    name: "GridItem",
    components: {GridItemInput, GridItemHeader},
    props: {
      gridItemData: Object,
    },
  }
</script>

<style lang="scss" scoped>
  .item {
    display: flex;
    flex-direction: column;
    max-width: 50px;

  }
</style>