import timeMgr from '@/lib/timeMgr'
import recordData from '@/constants/recordData.js'

const recordListModelBase = {
  key: 'recordList',
  monthKey: 'recordListMonth',
  emptyCord: "000000",
  emptyData: recordData,
  setData(d, key) {
    if (key === undefined) key = this.key
    window.localStorage.setItem(key, JSON.stringify(d))
  },
  fetch(key) {
    if (key === undefined) key = this.key
    return JSON.parse(window.localStorage.getItem(key)) || undefined
  },
  init(startTime, endTime) {
    if (endTime === undefined) endTime = startTime
    let obj
    if (this.fetch() === undefined) {
      obj = {}
      //需要个空的data
      obj[this.emptyCord] = this.emptyData
    } else {
      obj = this.fetch()
    }

    //別的日期data
    if (startTime === endTime) {
      //一个月 好吧俺把他定死了只能一个月一个月的定计划
      const daysArray = timeMgr.getThisMonth(
        startTime.slice(0, 2),
        startTime.substring(2)
      )
      daysArray.forEach(day => {
        obj[day] = this.emptyData
      })
    }
    this.setData(obj)

    //做month的table
    let monthObj = {}
    if (this.fetch(this.monthKey) !== undefined) {
      monthObj = this.fetch(this.monthKey)
    }
    monthObj[startTime] = this.emptyData

    this.setData(monthObj, this.monthKey)
  }
  ,
  update(timeKey, typeKey, value, tableKey) {

    if (tableKey === undefined) tableKey = this.key
    const recordList = this.fetch(tableKey)
    recordList[timeKey][typeKey].amount = value
    this.setData(recordList, tableKey)
    return recordList
  },
  updateMonth(timeKey, typeKey, value, plus) {
    const year = timeMgr.getYearStr()
    const month = timeMgr.getMonthStr()
    let obj = this.fetch(this.monthKey)
    if (plus) {
      obj[year + month][typeKey].amount = Number(obj[year + month][typeKey].amount) + Number(value)
    } else {
      obj[year + month][typeKey].amount = Number(obj[year + month][typeKey].amount) - Number(value)
    }

    this.setData(obj, this.monthKey)
    return obj
  },

  calculation(time, type, data1, data2) {
    if (time === undefined) return this.emptyData
    let Magnification = 10000
    if (type !== "life" && type !== "month") Magnification = 1
    let newObj = JSON.parse(JSON.stringify(this.emptyData))
    if (type === "year" || type === "life") {
      if (data1 !== undefined) newObj = data1
      if (data2 === undefined) return newObj
      for (let key in newObj) {
        newObj[key].amount = Number(newObj[key].amount) +
          Number(data2[key].amount) / Magnification
      }
    } else {
      time.forEach(time => {
        if (this.fetch()[time]) {
          for (let key in this.fetch()[time]) {
            newObj[key].amount = Number(newObj[key].amount) +
              Number(this.fetch()[time][key].amount) / Magnification
          }
        }
      })
    }
    return newObj
  }
  ,
  getRecordToday() {
    if (this.fetch() !== undefined) {
      if (this.fetch()[timeMgr.today()]) {
        return this.fetch()[timeMgr.today()]
      } else {
        return this.emptyData
      }
    }
  }
  ,
  getRecordThisWeek() {
    if (this.fetch() !== undefined) {
      return this.calculation(timeMgr.getThisWeek())
    }
  }
  ,
  getRecordThisMonth(y, m) {
    // if (this.fetch() !== undefined) {
    //   return this.calculation(timeMgr.getThisMonth(y, m), "month")
    // }

    if (y === undefined || m === undefined) {
      y = timeMgr.getYearStr()
      m = timeMgr.getMonthStr()
    }
    if (this.fetch(this.monthKey) !== undefined) {
      return this.fetch(this.monthKey)[y + m]
    }
  }
  ,
  getRecordThisYear() {
    // if (this.fetch() !== undefined) {
    //   const month = timeMgr.getConstData().monthStr
    //   let obj
    //   month.forEach(m => {
    //     obj = this.calculation(
    //       "",
    //       "year",
    //       obj,
    //       this.getRecordThisMonth(
    //         timeMgr.getYearStr(),
    //         m))
    //   })
    //   return obj
    // }
    const obj = this.fetch(this.monthKey)
    if (obj !== undefined) {
      const month = timeMgr.getConstData().monthStr
      const year = timeMgr.getYearStr()
      const monthYear = []
      month.forEach(n => {
        monthYear.push(year + n)
      })

      let result = JSON.parse(JSON.stringify(this.emptyData))
      for (let k in result) {
        result[k].amount = 0
      }

      monthYear.forEach(m => {
        if (obj[m]) {
          for (let k in result) {
            result[k].amount = Number(result[k].amount) +
              Number(obj[m][k].amount)
          }
        }
      })
      return result
    }
  }
  ,
  getRecordLife() {
    // if (this.fetch() !== undefined) {
    //   let obj
    //   for (let key in this.fetch()) {
    //     obj = this.calculation(
    //       "",
    //       "life",
    //       obj,
    //       this.fetch()[key],
    //     )
    //   }
    //   return obj
    // }
    const obj = this.fetch(this.monthKey)
    if (obj !== undefined) {
      let result = JSON.parse(JSON.stringify(this.emptyData))
      for (let k in result) {
        result[k].amount = 0
      }
      for (let k in result) {
        for (let t in obj) {
          result[k].amount = Number(result[k].amount) +
            Number(obj[t][k].amount)
        }
      }
      return result
    }
  }
}

const recordListModel = {
  init(startTime, endTime) {
    return recordListModelBase.init(startTime, endTime)
  },
  update(timeKey, typeKey, value) {
    return recordListModelBase.update(timeKey, typeKey, value)
  },
  fetch() {
    return recordListModelBase.fetch()
  },
  getRecordToday() {
    return recordListModelBase.getRecordToday()
  },
  getRecordThisWeek() {
    return recordListModelBase.getRecordThisWeek()
  },
  getRecordThisMonth() {
    return recordListModelBase.getRecordThisMonth()
  },
  getRecordThisYear() {
    return recordListModelBase.getRecordThisYear()
  },
  getRecordLife() {
    return recordListModelBase.getRecordLife()
  },
  updateMonth(timeKey, typeKey, value, plus) {
    return recordListModelBase.updateMonth(timeKey, typeKey, value, plus)
  },
}

export default recordListModel