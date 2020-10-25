<template>
  <Layout>
    <h3>{{this.caption}}</h3>
    <div>
      <ul class="row">
        <li v-for="time in planData.time" :key="time.key">
          <grid-item
            :gridItemData.sync="time"
          />
        </li>
      </ul>
      <br>
      <ul class="row">
        <li v-for="base in planData.base" :key="base.key">
          <grid-item :gridItemData.sync="base"/>
        </li>
      </ul>
      <br>
      <ul class="row">
        <grid-item :gridItemData="incomeTotal"/>
        <li v-for="income in planData.income" :key="income.key">
          <grid-item :gridItemData.sync="income"/>
        </li>
      </ul>
      <br>
      <ul class="row">
        <grid-item :gridItemData="usableMoney"/>
        <li v-for="monthlyExpense in planData.expense.monthlyExpense" :key="monthlyExpense.key">
          <grid-item :gridItemData.sync="monthlyExpense"/>
        </li>
      </ul>
      <br>
      <ul class="row">
        <grid-item :gridItemData="saveMoneyTotal"/>
        <grid-item :gridItemData="expenseTotal"/>
        <div class="done" @click="GoGo">
          <label>GO~~~</label>
        </div>
      </ul>
    </div>
  </Layout>
</template>


<script lang="js">
  import planData from '@/constants/planData'
  import GridItem from '@/components/MoneyPlanMake/GridItem.vue'
  import planListModel from '@/models/planListModel'
  import fortuneModel from '@/models/fortuneModel'
  import timeMgr from '@/lib/timeMgr'

  export default {
    name: "MoneyPlanMake",
    components: {GridItem},
    created: function () {
      //第一次才出现已存
      this.planData.base.startStore.show = planListModel.fetch() === undefined

      if (this.$route.params.time) {
        this.caption = '编辑计划'

        //拿到數據
        this.planData = planListModel.findPlan(
          this.$route.params.time.slice(0, 2),
          this.$route.params.time.slice(2)
        )

        //編輯的時候不允許更新時間 已存 理財 好吧其實基本用不到
        this.planData.time.start.readonly = true
        this.planData.base.startStore.readonly = true
        this.planData.base.startFund.readonly = true

        //賦值
        this.time = this.planData.time
        this.base = this.planData.base
        this.income = this.planData.income
        this.monthlyExpense = this.planData.expense.monthlyExpense

      } else {
        this.caption = '定计划'
        //初始化
        this.planData.id = ''
        //把现在的日期补全
        this.planData.time.start.inputData = timeMgr.getYearStr() + timeMgr.getMonthStr()
        //检查重复
        if (planListModel.fetch() !== undefined) {
          this.planData.time.start.errorMark = planListModel.checkDB.isErrorDate(
            this.planData.time.start.inputData
          )
        }
      }
    },
    computed: {
      incomeTotal: function () {
        const result = {
          key: 'incomeTotal',
          headerData: '收入',
          inputData: '',
          readonly: true,
          show: true,
        }
        result.inputData = Number(this.income.monthlyIncome.inputData) +
          Number(this.income.bonus.inputData)
        return result
      },
      usableMoney: function () {
        const result = {
          key: 'usableMoney',
          headerData: '可用',
          inputData: '',
          readonly: true,
          errorMark: false,
          show: true,
        }
        let monthlyExpenseTotal = 0
        const monthlyExpense = this.monthlyExpense
        Object.keys(monthlyExpense).forEach(function (key) {
          monthlyExpenseTotal = monthlyExpenseTotal +
            Number(monthlyExpense[key].inputData)
        })
        result.inputData = Number(this.incomeTotal.inputData) -
          monthlyExpenseTotal

        result.errorMark = Number(result.inputData) !== 0
        return result
      },
      saveMoneyTotal: function () {
        let result = {
          key: 'saveMoneyTotal',
          headerData: '总存款',
          inputData: '',
          readonly: true,
          show: true,
        }
        result.inputData = Number(this.monthlyExpense.saveMoney.inputData)
        return result
      },
      expenseTotal: function () {
        let result = {
          key: 'expenseTotal',
          headerData: '总花费',
          inputData: '',
          readonly: true,
          show: true,
        }
        let monthlyExpenseTotal = 0
        let monthlyExpense = this.monthlyExpense
        Object.keys(monthlyExpense).forEach(function (key) {
          if (key !== 'saveMoney') {
            monthlyExpenseTotal = monthlyExpenseTotal + Number(monthlyExpense[key].inputData)
          }
        })
        result.inputData = monthlyExpenseTotal
        return result
      },
    },
    data() {
      return {
        planData: planData,
        time: planData.time,
        base: planData.base,
        income: planData.income,
        monthlyExpense: planData.expense.monthlyExpense,
        path: '/',
        caption: '',
      }
    },
    methods: {
      GoGo: function () {
        this.planData.saveMoneyTotal = this.saveMoneyTotal
        this.planData.expenseTotal = this.expenseTotal
        //数据上传前check

        if (
          (Number(this.usableMoney.inputData) === 0) &&
          this.time.start.errorMark === false
        ) {
          if (this.$route.params.time) {
            planListModel.update(this.planData)
          } else {
            planListModel.createPlan(this.planData)
            fortuneModel.create(this.planData)
          }
        } else {
          this.path = ''
          console.log('不能更新数据')
          //TODO 分类提醒考虑下?
        }
        this.$router.push({name: 'RecordInput'})
      },
    }
  }
</script>

<style lang="scss" scoped>
  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .done {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: none;
    width: 200px;
    background-color: #ffd767;
    color: white;
    outline: none;

    a {
      color: inherit;
    }
  }

</style>