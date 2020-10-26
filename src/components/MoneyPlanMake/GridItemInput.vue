<template>
  <div>
    <label>
      <input class="GridItemInput" :value="gridItemData.inputData" :disabled="gridItemData.readonly"
             @input="input($event.target.value)"
             :class="{errorStyle: gridItemData.errorMark }"
             type="number"
      />
    </label>
  </div>
</template>

<script lang="js">
  import planListModel from '@/models/planListModel'

  export default {
    name: "GridItemInput",
    props: {
      gridItemData: Object,
    },
    methods: {
      input(value) {
        this.gridItemData.inputData = value
        if (this.gridItemData.key==="start"){
          //輸入日期的時候需要checkDB有沒有重複
          this.gridItemData.errorMark = planListModel.checkDB.isErrorDate(
            this.gridItemData.inputData
          )
        }
        this.$emit('update:gridItemData', this.gridItemData)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .GridItemInput {
    width: 100%;
    height: 32px;
    background-color: #42b983;
    color: white;
    /*outline: none;*/
    box-sizing: border-box;
    border: none;
    text-align: center;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    :focus {
      border: none;
      outline: none !important;
    }
  }

  .errorStyle {
    background-color: darkred !important;
  }
</style>