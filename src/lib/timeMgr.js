const timeMgrBase = {
  constData: {
    daysOfOneWeek: 7,
    monthStr: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',]
  },
  reFormatMonth(m) {
    if (m.toString().length === 1) {
      m = '0' + m
    }
    return m
  },
  getDays(y, m) {
    if (y === undefined ||
      m === undefined) {
      y = this.getYearStr()
      m = this.getMonthStr()
    }
    const d = new Date(y, m, 0)
    return d.getDate()
  },
  getMonthStr() {
    let monthStr = Number(new Date().getMonth()) + 1
    if (monthStr.toString().length === 1) {
      monthStr = '0' + monthStr
    }
    return monthStr.toString()
  },
  getYearStr() {
    return String(new Date().getFullYear()).slice(2)
  },
  getDate() {
    let dayStr = Number(new Date().getDate())
    if (dayStr.toString().length === 1) {
      dayStr = '0' + dayStr
    }
    return dayStr
  },
  getThisYearStr() {
    return String(new Date().getFullYear())
  },
  getThisMonthStr() {
    let monthStr = Number(new Date().getMonth()) + 1
    if (monthStr.toString().length === 1) {
      monthStr = '0' + monthStr
    }
    return monthStr
  },
  getThisWeekType() {
    //拿到周几
    let weekDay = Number(new Date().getDay())
    const month = Number(this.getMonthStr())
    const today = Number(this.getDate())
    const days = Number(this.getDays(
      this.getThisYearStr(),
      this.getThisMonthStr()
    ))
    /*
     * weekDay pre suf
     * 1 -0 +6
     * 2 -1 +5
     * 3 -2 +4
     * 4 -3 +3
     * 5 -4 +2
     * 6 -5 +1
     * 7 -6 +0
     *
     * 8.1 周4 -3 +3 => 3
     * 8.1 周1 0  +6 => 0
     * 8.1 周6 -5 +1 => 5
     * 8.2 周4 -3 +3 => 2
     * 8.2 周1 0  +6 => 0
     * 8.2 周6 -5 +1 => 4
     * 8.22 周6 -5 +1 => 0
     * 8.22 周6 -5 +1 => 0
     * 8.22 周6 -5 +1 => 0
     * 8.30 周1  0 +6 => 5
     * 8.30 周4 -3 +3 => 2
     * 8.30 周6 -5 +1 => 0
     */
    if (weekDay === 0) weekDay = this.constData.daysOfOneWeek
    if ((weekDay - today) > 0) {
      return [
        [
          this.reFormatMonth(month),
          this.constData.daysOfOneWeek - weekDay + today
        ],
        [
          this.reFormatMonth(month - 1),
          weekDay - today
        ],
      ]
    } else if ((this.constData.daysOfOneWeek - weekDay - days + today) > 0) {
      return [
        [this.reFormatMonth(month), weekDay],
        [
          this.reFormatMonth(month + 1),
          this.constData.daysOfOneWeek - weekDay - days + today],
      ]
    } else {
      return [
        [this.reFormatMonth(month), this.constData.daysOfOneWeek],
        [this.reFormatMonth(month), 0],
      ]
    }
  },
  getThisWeek() {
    const dateOfToday = Date.now()
    const dayOfToday = (new Date().getDay() + 7 - 1) % 7
    return Array.from(new Array(7))
      .map((_, i) => {
        const date = new Date(dateOfToday + (i - dayOfToday) * 1000 * 60 * 60 * 24)
        return this.getYearStr() +
          String(date.getMonth() + 1).padStart(2, '0') +
          String(date.getDate()).padStart(2, '0')
      })
  },
  getThisMonth(y, m) {
    let maxCount
    let array = []
    if (y === undefined && m === undefined) {
      maxCount = this.getDays(this.getYearStr(), this.getMonthStr())
      y = this.getYearStr()
      m = this.getMonthStr()
    } else {
      maxCount = this.getDays(y, m)
    }
    for (let index = 1; index <= maxCount; index++) {
      array.push(
        y +
        m +
        String(index).padStart(2, '0')
      )
    }

    return array
  },
  today() {
    return this.getYearStr() + this.getMonthStr() + this.getDate()
  },
  getBeforeMonth(y, m) {
    let yearStr = y
    let monthStr
    if (m === '01') {
      yearStr = String(Number(y) - 1)
      monthStr = '12'
    } else {
      monthStr = String(Number(m) - 1)
      if (monthStr.toString().length === 1) {
        monthStr = '0' + monthStr
      }
    }
    return yearStr + monthStr
  }
}

const timeMgr = {
  getYearStr() {
    return timeMgrBase.getYearStr()
  },
  getMonthStr() {
    return timeMgrBase.getMonthStr()
  },

  today() {
    return timeMgrBase.today()
  },

  getDate() {
    return timeMgrBase.getDate()
  },
  thisWeekType() {
    return timeMgrBase.getThisWeekType()
  },
  getThisMonthDays(y, m) {
    return timeMgrBase.getDays(y, m)
  },
  getThisWeek() {
    return timeMgrBase.getThisWeek()
  },
  getThisMonth(y, m) {
    return timeMgrBase.getThisMonth(y, m)
  },
  getConstData() {
    return timeMgrBase.constData
  },
  getBeforeMonth(y, m) {
    return timeMgrBase.getBeforeMonth(y, m)
  }
}


export default timeMgr