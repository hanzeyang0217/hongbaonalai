<template>
  <Layout>
    <h3 @click="localStorageClear">花钱</h3>
    <div v-if="planMonth !== undefined">
      <ul class="moneyUl">

        <li @click="selectItem='life'">一辈子</li>
        <ProgressList
          @update:updateRecord="updateRecord"
          :expense="planFull"
          :expenseType="'life'"
          :selectItem="selectItem"
          :recordData=recordLife
        />

        <li @click="selectItem='year'">今年</li>
        <ProgressList
          :expense="planYear"
          :expenseType="'year'"
          :selectItem="selectItem"
          :recordData=recordThisYear
        />
        <li @click="selectItem='month'">这个月</li>
        <ProgressList
          @update:updateRecord="updateRecord"
          :expense="planMonth"
          :expenseType="'month'"
          :selectItem="selectItem"
          :recordData=recordThisMonth
        />
        <li @click="selectItem='week'">这周</li>
        <ProgressList
          @update:updateRecord="updateRecord"
          :expense="planWeek"
          :expenseType="'week'"
          :selectItem="selectItem"
          :recordData=recordThisWeek
        />
        <div class="today">
          <li @click="selectItem='day'">今天</li>
          <ProgressList
            @update:updateRecord="updateRecord"
            :expense="planDay"
            :expenseType="'day'"
            :selectItem="selectItem"
            :recordData=recordToday
          />
        </div>
      </ul>
    </div>
  </Layout>
</template>

<script lang="js">
  import planListModel from '@/models/planListModel'
  import recordListModel from '@/models/recordListModel'
  import timeMgr from '@/lib/timeMgr'
  import ProgressList from '@/components/ProgressList.vue'


  export default {
    name: "MoneyPlanShow",
    components: {ProgressList},
    data() {
      return {
        selectItem: 'day',
        thisMonthDays: timeMgr.getThisMonthDays(),
        thisWeek: timeMgr.getThisWeek(),
        today: timeMgr.getYearStr() + timeMgr.getMonthStr() + timeMgr.getDate(),
        planFull: planListModel.getFullData(),
        planYear: planListModel.getYearData(),
        planMonth: planListModel.getMonthData(),
        planWeek: planListModel.getWeekData(),
        planDay: planListModel.getDayData(),
        recordLife: recordListModel.getRecordLife(),
        recordThisYear: recordListModel.getRecordThisYear(),
        recordThisMonth: recordListModel.getRecordThisMonth(),
        recordThisWeek: recordListModel.getRecordThisWeek(),
        recordToday: recordListModel.getRecordToday(),
      }
    },
    beforeCreate: function () {
      window.t1 = performance.now()
    },
    created: function () {
      if (this.planMonth === undefined) {
        this.$router.push({name: 'newMoneyPlan'})
      }
    },
    mounted() {
      window.t2 = performance.now()
      console.log(`用时: ${window.t2 - window.t1} ms`)
    },
    computed: {
      thisWeekType() {
        return timeMgr.thisWeekType()
      },
    },
    methods: {
      updateRecord() {
        this.recordToday = recordListModel.getRecordToday()
        this.recordThisWeek = recordListModel.getRecordThisWeek()
        this.recordThisMonth = recordListModel.getRecordThisMonth()
        this.recordThisYear = recordListModel.getRecordThisYear()
        this.recordLife = recordListModel.getRecordLife()
      },
      localStorageClear() {
        window.localStorage.clear()
      }
    }
  }
</script>

<style lang="scss" scoped>


  .box {
    display: flex;
    flex-direction: column;
    height: 100vh;

  }

  .moneyUl {
    list-style: none;
    padding: unset;

    li {
      text-align: left;
      line-height: 32px;
      height: 32px;
      background-color: white;
      border-radius: 4px;
      color: #ffbf26;
      padding-left: 8px;
      box-sizing: border-box;
      border: #ffcd49 1px solid;

    }
  }
</style>