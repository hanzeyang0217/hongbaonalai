<template>
  <div>
    <ul class="moneyUlChild" v-if="selectItem === expenseType">
      <div v-if="adjustment!==0 && expenseType==='month'">
        还可以充钱 {{adjustment}}
      </div>

      <li v-for="expense in expense" :key="expense.key" >
        <div v-if="(
            (expenseType !== offList[0] &&
            expenseType !== offList[1]) ||
            (expense.key==='food' ||
                expense.key==='demonCost' ||
                expense.key==='traffic' ||
                expense.key==='growUp' ||
                expense.key==='happy' ||
                expense.key==='others')
                )"
        >
          <div :class="{
              progressBarBase:true,
              progressBar : progressBarClass(
                expense.inputData,
                recordData[expense.key].amount,
                expense.key
                ),
              progressBarMax :progressBarMaxClass(
                expense.inputData,
                recordData[expense.key].amount,
                expense.key
              )
            }"
               :style="{
                      width: progressBarNowValue(
                        recordData[expense.key].amount,
                        expense.key
                        ) /
                             (
                               Number(expense.inputData) === 0
                               ? '1' : expense.inputData
                             ) *
                             100 + '%',
                            }"
          >
            <div>
              <div v-if="(expenseType !== offList[0] &&
            expenseType !== offList[1])">
                <label>{{expense.headerData + ' '}}</label>
                <label @click="createRecord(recordData[expense.key])">
                  {{
                  Number(inputData(
                  recordData[expense.key].amount,
                  expense.key
                  )).toFixed(2).toString()
                  }}
                </label>
                <label> / </label>
                <label>{{Number(expense.inputData).toFixed(1)}}</label>
              </div>
              <div v-else>
                <label>{{expense.headerData + ' '}}</label>
                <label @click="createRecord(recordData[expense.key])">
                  {{
                  inputData(
                  recordData[expense.key].amount,
                  expense.key
                  )
                  }}
                </label>
                <label> / </label>
                <label>{{Number(expense.inputData).toFixed(0)}}</label>
              </div>
            </div>
          </div>
          <label
            class="right"
            v-if="(expenseType !== offList[0] &&
            expenseType !== offList[1])"
          >
            {{diffValue(
            expense.inputData,
            recordData[expense.key].amount,
            expense.key,
            "fixed"
            )}}
          </label>
          <label class="right" v-else-if="(expense.inputData - recordData[expense.key].amount)!==0">
            {{diffValue(
            expense.inputData,
            recordData[expense.key].amount,
            expense.key
            )}}
          </label>
        </div>
      </li>
    </ul>
    <div class="xn-container">
      <div class="css-popup">
        <div class="popup-content" :class="{show}">
          <InputPad
            :inputAmount.sync="inputAmount"
            :plus.sync="plus"
            @update:addRecord="addRecord"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
  import InputPad from '@/components/InputPad.vue'
  import timeMgr from '../lib/timeMgr'
  import recordListModel from '@/models/recordListModel.js'
  import fortuneModel from '@/models/fortuneModel.js'

  export default {
    name: "ProgressList",
    components: {InputPad},
    props: {
      expense: Object,
      expenseType: String,
      selectItem: String,
      recordData: Object,
    },
    data() {
      return {
        offList: ['week', 'day'],
        show: false, //输入板初步出现
        inputAmount: "0",
        newInputAmount: "0",
        selectedKey: "",
        timeKey: timeMgr.today(),
        monthOpenKeys: [
          "saveMoney",
          "china",
          "tourism",
          "fund",
          "house",
          "iphone",
        ],
        gateOpen: false,
        plus: true,
      }
    },
    computed: {
      adjustment() {
        let diff = 0
        const obj = this.expense
        const recordData = this.recordData
        Object.keys(obj).forEach(function (i) {
          diff = diff +
            (
              Number(obj[i].inputData) -
              Number(
                recordData[i].amount
              )
            )
        })
        return diff.toFixed(1)
      },
    },
    methods: {
      createRecord(e) {
        if (this.expenseType === "year") return
        if (this.expenseType === "life" &&
          e.key !== 'china' &&
          e.key !== 'tourism' &&
          e.key !== 'saveMoney' &&
          e.key !== 'fund'
        ) return
        this.show = !this.show
        this.selectedKey = this.setKey(e.key)
      },
      setKey(key) {
        if (this.show === false) {
          return ""
        } else {
          return key
        }
      },
      inputData(str, key) {
        if (this.plus === true) {
          if (key === this.selectedKey) {
            this.newInputAmount = Number(str) + Number(this.inputAmount)
            return Number(str) + Number(this.inputAmount)
          } else {
            return str
          }
        } else {
          if (key === this.selectedKey) {
            this.newInputAmount = Number(str) - Number(this.inputAmount)
            return Number(str) - Number(this.inputAmount)
          } else {
            return str
          }
        }

      },
      progressBarClass(inputData, amount, key) {
        if (key === this.selectedKey) {
          return inputData - this.newInputAmount >= 0
        } else {
          return inputData - amount >= 0
        }
      },
      progressBarMaxClass(inputData, amount, key) {
        if (key === this.selectedKey) {
          return inputData - this.newInputAmount < 0
        } else {
          return inputData - amount < 0
        }
      },
      progressBarNowValue(amount, key) {
        if (key === this.selectedKey) {
          return this.newInputAmount
        } else {
          return amount
        }
      },
      diffValue(inputData, amount, key, type) {
        if (type === 'fixed') {
          if (key === this.selectedKey) {
            return (inputData - this.newInputAmount).toFixed(1)
          } else {
            return (inputData - amount).toFixed(1)
          }
        } else {
          if (key === this.selectedKey) {
            return (inputData - this.newInputAmount).toFixed(0)
          } else {
            return (inputData - amount).toFixed(0)
          }
        }

      },
      addRecord() {
        let diffAmount = this.inputAmount
        if (this.expenseType === 'month' ||
          this.expenseType === 'life' ||
          this.expenseType === 'year'
        ) {
          this.newInputAmount = String(Number(this.newInputAmount) * 10000)
        } else {
          diffAmount = String(Number(diffAmount) / 10000)
        }
        recordListModel.update(
          this.timeKey,
          this.selectedKey,
          this.newInputAmount
        )
        recordListModel.updateMonth(
          this.timeKey.slice(0, 4),
          this.selectedKey,
          diffAmount,
          this.plus
        )
        fortuneModel.update(
          this.timeKey.slice(0, 4),
          this.selectedKey,
          diffAmount,
          this.plus
        )
        this.show = !this.show
        this.inputAmount = "0"
        this.$emit('update:updateRecord')
      },
    }
  }
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: all 1s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
    transform: translateY(30px);
  }

  .css-popup {
    .popup-content {
      position: absolute;
      /*display: none;*/
      /*opacity: 0;*/
      height: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: white;
      -webkit-transition: all 0.2s ease-in;
      transition: all 0.2s ease-in;
      overflow: hidden;

      &.show {
        height: 336px;
        /*display: block;*/
      }

      p {
        line-height: 30px;
        text-align: center;
      }
    }
  }

  .moneyUlChild {
    list-style: none;
    padding-left: 24px;

    li > div {
      text-align: left;
      line-height: 24px;
      height: 24px;
      background-color: #42b983;

      border-radius: 4px;
      color: white;
      padding-left: unset;
      display: flex;
    }
  }

  .right {
    position: absolute;
    right: 10%;

  }

  .progressBar {
    white-space: nowrap;
    /*background-color: #ff9c43;*/
    background-color: #ffd767;
    border-radius: 4px;
  }

  .progressBarMax {
    width: 100% !important;
    white-space: nowrap;
    background-color: #ff5d47;
    border-radius: 4px;
  }

</style>