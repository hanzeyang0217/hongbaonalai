import makeID from '@/lib/idMaker'
import timeMgr from '@/lib/timeMgr'
import recordListModel from '@/models/recordListModel'

const planListModelBase = {
  key: 'planList',
  setData(d) {
    window.localStorage.setItem(this.key, JSON.stringify(d))
  },
  fetch() {
    const d = JSON.parse(window.localStorage.getItem(this.key))
    if (d !== null) {
      return Array.from(d)
    } else {
      return undefined
    }
  },
  createPlan(d) {
    //make id
    d.id = makeID(this.fetch())
    //set value
    let obj = this.fetch()
    if (obj === undefined) {
      obj = []
    }
    obj.push(d)
    this.setData(obj)
    //建立计划的时候把一个月的初始data也设定好
    //先不考虑多个月和删除的情况
    recordListModel.init(
      d.time.start.inputData,
    )
    return d
  },
  isErrorDate(timeStr) {
    if (this.fetch() === undefined) return false
    const array = JSON.parse(
      JSON.stringify(
        this.fetch()
      )
    )
    let r = false
    let minTime
    array.forEach(i => {
      if (minTime === undefined) {
        minTime = Number(i.time.start.inputData)
      } else if (minTime > Number(i.time.start.inputData)) {
        minTime = i.time.start.inputData
      }
      if (i.time.start.inputData === timeStr) {
        r = true
      }
    })
    if (minTime > Number(timeStr)) {
      r = true
    }
    return r
  },
  update(d) {
    if (this.fetch() === undefined) return
    const planList = this.fetch()
    const plan = planList.filter(item => item.id === d.id)[0]
    planList[planList.indexOf(plan)] = d
    this.setData(planList)
    return planList
  },
  findPlanById(id) {
    if (id === '' || id === undefined) return
    const planList = this.fetch()
    if (this.fetch() === undefined) return
    return planList.filter(item => item.id === id)[0]
  },
  findPlan(y, m) {
    let planData
    if (this.fetch() === undefined) return
    this.fetch().forEach(i => {
      if (
        Number(i.time.start.inputData) === Number(y + m)
      ) {
        planData = i
      }
    })
    return planData
  },

  getMonthData(y, m) {
    if (
      y === undefined ||
      m === undefined
    ) {
      y = timeMgr.getYearStr()
      m = timeMgr.getMonthStr()
    }
    if (this.findPlan(y, m) !== undefined) {
      return this.findPlan(y, m).expense.monthlyExpense
    }
  },
  getWeekData() {
    const part1 = this.calculation(
      this.getDayData(),
      '乘',
      timeMgr.thisWeekType()[0][1]
    )

    const part2DayData = this.getDayData(
      timeMgr.getYearStr(),
      timeMgr.thisWeekType()[1][0]
    )

    const part2 = this.calculation(
      part2DayData,
      '乘',
      timeMgr.thisWeekType()[1][1]
    )

    return this.calculation(
      part1,
      '加',
      '',
      part2
    )
  },
  getDayData(y, m) {
    if (
      y === undefined ||
      m === undefined
    ) {
      y = timeMgr.getYearStr()
      m = timeMgr.getMonthStr()
    }
    let obj = this.calculation(
      this.getMonthData(y, m),
      '乘',
      10000
    )
    return this.calculation(
      obj,
      '除',
      timeMgr.getThisMonthDays(y, m)
    )
  },
  getYearData(y) {
    if (
      y === undefined
    ) {
      y = timeMgr.getYearStr()
    }
    let obj, newObj
    const month = timeMgr.getConstData().monthStr
    month.forEach(m => {
      newObj = this.findPlan(y, m)
      if (newObj !== undefined) {
        newObj = newObj.expense.monthlyExpense
        if (obj === undefined) {
          obj = newObj
        } else {
          obj = this.calculation(
            obj,
            '加',
            '',
            newObj
          )
        }
      }
    })
    return obj
  },
  getFullData() {
    let obj, newObj
    for (let i = 20; i < 50; i++) {
      newObj = this.getYearData(String(i))
      if (newObj !== undefined) {
        if (obj === undefined) {
          obj = newObj
        } else {
          obj = this.calculation(
            obj,
            '加',
            '',
            newObj
          )
        }
      }
    }
    return obj
  },
  calculation(d, method, count, obj) {
    //拷贝一个新的对象
    if (d === undefined) return
    const newObj = JSON.parse(JSON.stringify(d))
    //TODO 好吧偷懒了
    //把里面的数字都按照传过来的运算法则进行计算
    for (let key in newObj) {
      if (method === '除') {
        newObj[key].inputData = Math.floor(Number(
          newObj[key].inputData
        ) / count)
        newObj[key].nowData = Math.floor(Number(
          newObj[key].nowData
        ) / count)
      } else if (method === '乘') {
        newObj[key].inputData = Number(
          newObj[key].inputData
        ) * count
        newObj[key].nowData = Number(
          newObj[key].nowData
        ) * count
      } else if (method === '加') {
        if (obj === undefined) return d
        newObj[key].inputData = Number(newObj[key].inputData) +
          Number(obj[key].inputData)

        newObj[key].nowData = Number(newObj[key].nowData) +
          Number(obj[key].nowData)
      }
    }
    //返回新的对象
    return newObj
  },
}

const planListModel = {
  checkDB: {
    isErrorDate(timeStr) {
      return planListModelBase.isErrorDate(timeStr)
    },
  },
  createPlan(d) {
    return planListModelBase.createPlan(d)
  },
  update(d) {
    return planListModelBase.update(d)
  },
  fetch() {
    return planListModelBase.fetch()
  },


  getYearData() {
    return planListModelBase.getYearData()
  },
  getMonthData() {
    return planListModelBase.getMonthData()
  },
  getWeekData() {
    return planListModelBase.getWeekData()
  },
  getDayData() {
    return planListModelBase.getDayData()
  },
  getFullData() {
    return planListModelBase.getFullData()
  },

  findPlan(y, m) {
    return planListModelBase.findPlan(y, m)
  },

}

export default planListModel