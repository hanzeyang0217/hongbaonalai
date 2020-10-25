<template>
  <Layout>
    <h3>推移</h3>
    <div class="box">
      <div class="up">
        <ul class="shuzhuangtu">
          <li
            v-for="fortune in fortuneList"
            :key="fortune.id"
          >
            <div
              v-if="fortune.init !== true"
              class="shu"
              :class="{minuschu:Number(percentage(fortune))<0}"
              :style="{
              top:
                Number(percentage(fortune)) > 0
                ? max - (money(fortune)) * xishu +'px'
                : max - (beforeMoney(fortune)) * xishu +'px',
              height:
                Math.abs(
                  money(fortune) - beforeMoney(fortune)
                ) *
                xishu +'px',
                }"
            >
            </div>
            <div
              v-else
              class="shu"
              :style="{
              top: max - money(fortune) * xishu +'px',
              height: money(fortune) * xishu +'px',}"
            >
            </div>
          </li>
        </ul>
      </div>
      <div class="down">
        <ul>
          <li
            v-for="fortune in fortuneList"
            :key="fortune.id"
            class="card"
          >
            <div class="left">
              {{timeStr(fortune)}}
            </div>
            <div class="rightSide">
              <label class="str"
                     :class="{minusStr:Number(percentage(fortune))<0}"
              >
                {{money(fortune)}}
              </label>
              <label class="percentage"
                     :class="{minus:Number(percentage(fortune))<0}">
                {{percentage(fortune)}}%
              </label>
            </div>

          </li>
        </ul>
      </div>
    </div>
  </Layout>
</template>

<script lang="js">
  import fortuneModel from '@/models/fortuneModel'

  export default {
    name: "FortuneTelling",
    data() {
      return {
        xishu: 0.3, //图表放大系数
        max: 300, //图表height
      }
    },
    computed: {
      fortuneList() {
        if (fortuneModel.fetch() === undefined) return
        let result = JSON.parse(JSON.stringify(fortuneModel.fetch()))
        result.sort((a, b) => {
          return Number(a.time) - Number(b.time)
        })
        return result
      }
    },
    methods: {
      timeStr(fortune) {
        if (fortune.init === true) {
          return '初始'
        } else {
          return fortune.time
        }
      },
      money(item) {
        return String(Number(item.saveMoney) + Number(item.startFund))
      },
      beforeMoney(item){
        return fortuneModel.beforeMoney(item)
      },
      saveMoney(item) {
        let beforeStr = String(item.saveMoney)
        let afterStr = ''
        if (item.id !== 0) {
          afterStr = `(${fortuneModel.diffBeforePercentage(item, "saveMoney")}%)`
        }
        return beforeStr + afterStr
      },
      fund(item) {
        let beforeStr = String(item.startFund)
        let afterStr = ''
        if (item.id !== 0) {
          afterStr = `${fortuneModel.diffBeforePercentage(item, "startFund")}%)`
        }
        return beforeStr + afterStr
      },
      percentage(item) {
        let afterStr = ''
        if (item.id !== 0) {
          afterStr = `${
            Number(
              fortuneModel.diffBeforePercentage(item, "all")
            ).toFixed(2)
          }`
        } else {
          afterStr = '0.00'
        }
        return afterStr
      }
    }
  }
</script>

<style lang="scss" scoped>
  .shuzhuangtu {
    height: 100%;
    width: 100%;
    display: flex;
    /*padding-left: 42px;*/
    li {
      height: 100%;
      width: 8px;
      position: relative;
      margin-right: 1px;
    }
  }

  .shu {
    position: absolute;
    width: 8px;
    border: #eb2b37 1px solid;
    min-height: 1px;
    box-sizing: border-box;
  }

  .minuschu {
    background-color: #42b983;
    border: #42b983;
  }

  .card {

    font-size: 13px;
    padding-left: 8px;
    padding-right: 8px;
    color: #5f6368;
    margin-top: 8px;
    box-sizing: border-box;

    div {
      text-align: left;
    }

    display: flex;
    justify-content: space-between;
  }

  .box {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .up {
    height: 300px;
    width: 100%;
  }

  .down {
    border-top: #e3e3e3 1px solid;
  }

  .percentage {
    margin-left: 8px;
    text-align: right;
    display: block;
    width: 60px;
    /*background-color: #dd222e;*/
    background-color: #eb2b37;
    color: white;
    border-radius: 4px;
    padding-right: 4px;
    padding-left: 4px;
  }

  .minus {
    /*background-color: #009933;*/
    background-color: #42b983;
  }

  .rightSide {
    display: flex;
    flex-wrap: nowrap;
  }

  .str {
    color: #eb2b37;
  }

  .minusStr {
    color: #42b983;
  }

  .left {
    font-weight: bold;
    color: rgba(33, 33, 33, 0.81);
  }

</style>