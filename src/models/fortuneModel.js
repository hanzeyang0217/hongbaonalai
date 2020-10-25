import timeMgr from '@/lib/timeMgr'
import makeID from '@/lib/idMaker'

const fortuneModelBase = {
  key: 'fortune',
  initCord: '000000',
  setData(d) {
    window.localStorage.setItem(this.key, JSON.stringify(d))
  },
  fetch() {
    return JSON.parse(window.localStorage.getItem(this.key)) || undefined
  },
  create(data) {
    let array = this.fetch()
    const item = {
      id: makeID(this.fetch()),
      time: data.time.start.inputData,
      saveMoney: data.base.startStore.inputData,
      startFund: data.base.startFund.inputData,
      init: false,
    }
    if (array === undefined) {
      array = []
      const initData = JSON.parse(JSON.stringify(item))
      initData.init = true
      initData.id = 0
      array.push(initData)
    }

    const beforeMonthStr = timeMgr.getBeforeMonth(
      data.time.start.inputData.slice(0, 2),
      data.time.start.inputData.slice(2, 4)
    )
    array.forEach(i => {
      if (
        (i.init === false) &&
        i.time === beforeMonthStr
      ) {
        i.startFund = data.base.startFund.inputData
        item.saveMoney = i.saveMoney
      }
    })
    array.push(item)
    this.setData(array)
  },
  update(timeKey, typeKey, value, plus) {
    const array = this.fetch()
    array.forEach(i => {
      if (
        (i.init === false) &&
        (i.time === timeKey)
      ) {
        if (plus) {
          i[typeKey] = Number(i[typeKey]) + Number(value)
        } else {
          i[typeKey] = Number(i[typeKey]) - Number(value)
        }
      }
    })
    this.setData(array)
    return array
  },
  diffBeforePercentage(item, what) {
    if (item === undefined) return
    let array = this.fetch()
    let before = {}
    before = array[Number(item.id) - 1]
    let now = array[Number(item.id)]
    if (what === 'all') {
      let all = Number(now["saveMoney"]) + Number(now["startFund"])
      let beforeAll = Number(before["saveMoney"]) + Number(before["startFund"])
      return ((all - beforeAll) / beforeAll * 100).toFixed(2)
    } else {
      return ((Number(item[what]) - Number(before[what])) / Number(before[what]) * 100).toFixed(2)
    }
  },
  beforeMoney(item){
    if (item === undefined) return
    let array = this.fetch()
    let before = array[Number(item.id) - 1]
    return Number(before["saveMoney"]) + Number(before["startFund"])
  }
}

const fortuneModel = {
  create(data) {
    return fortuneModelBase.create(data)
  },
  update(timeKey, typeKey, value, plus) {
    return fortuneModelBase.update(timeKey, typeKey, value, plus)
  },
  fetch() {
    return fortuneModelBase.fetch()
  },
  diffBeforePercentage(item, what) {
    return fortuneModelBase.diffBeforePercentage(item, what)
  },
  beforeMoney(item){
    return fortuneModelBase.beforeMoney(item)
  }
}

export default fortuneModel