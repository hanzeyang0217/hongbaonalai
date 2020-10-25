<template>
  <Layout>
    <h3>
      计划表
      <router-link
        :to="`MoneyPlan/new`">
        new plan
      </router-link>
    </h3>


    <ul>
      <router-link
        v-for="plan in planList"
        :key="plan.id"
        :to="`MoneyPlan/edit/${plan.time.start.inputData}`">
        <li class="card">
          {{plan.time.start.inputData}}
          {{plan.saveMoneyTotal.headerData}}:{{plan.saveMoneyTotal.inputData}}
          {{plan.expenseTotal.headerData}}:{{plan.expenseTotal.inputData}}
        </li>
      </router-link>

    </ul>
  </Layout>
</template>

<script lang="js">
  import planListModel from '@/models/planListModel'

  export default {
    name: "MoneyPlanMgr",
    computed: {
      planList() {
        if (planListModel.fetch() === undefined) return
        let result = JSON.parse(JSON.stringify(planListModel.fetch()))

        result.sort((a, b) => {
          return Number(a.time.start.inputData) - Number(b.time.start.inputData)
        })
        return result
      }
    },
  }
</script>

<style lang="scss" scoped>
  .card {
    color: #5f6368;
    margin-top: 8px;
    border-radius: 8px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border: 1px solid #dadce0;
    border-top-color: rgb(218, 220, 224);
    border-top-style: solid;
    border-top-width: 1px;
    border-right-color: rgb(218, 220, 224);
    border-right-style: solid;
    border-right-width: 1px;
    border-bottom-color: rgb(218, 220, 224);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-left-color: rgb(218, 220, 224);
    border-left-style: solid;
    border-left-width: 1px;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
    box-sizing: border-box;
  }
</style>