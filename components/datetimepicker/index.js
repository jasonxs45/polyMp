// 日期时间选择器
function createArray(start, end) {
  let arr = []
  for (let i = start; i <= end; i++) {
    arr.push(i)
  }
  return arr
}
let years = createArray(2018, 2028)
let months = createArray(1, 12)
let dates = createArray(1, 31)
let hours = createArray(8, 22)
let minutes = createArray(0, 59).map(item => {
  item = '00' + item
  item = item.substr(item.length - 2)
  return item
})
let now = new Date()
let nowYear = now.getFullYear()
let nowMonth = now.getMonth() + 1
let nowDate = now.getDate()
let nowHour = now.getHours()
let nowMinute = '00' + now.getMinutes()
nowMinute = nowMinute.substr(nowMinute.length -2)
let defaultTimeValue = [
  years.findIndex(item => item ===nowYear),
  months.findIndex(item => item === nowMonth),
  dates.findIndex(item => item === nowDate),
  hours.findIndex(item => item === nowHour),
  minutes.findIndex(item => item === nowMinute)
]
Component({
  properties: {},
  data: {
    currentYear: null,
    datetimeRange: [years, months, dates, hours, minutes],
    datetimeValue: defaultTimeValue,
    value: null
  },
  methods: {
    columnChange (e) {
      let column = e.detail.column
      let value = e.detail.value
      this.data.datetimeValue[column] = value
      // 年份改变，要计算是否是闰年
      if (column === 0) {
        this.data.currentYear = years[value]
        this.watchDatetime(this.data.datetimeValue[1])
      }
      if (column === 1) {
        this.watchDatetime(value)
      }
    },
    watchDatetime(value) {
      if (value === 0 || value === 2 || value === 4 || value === 6 || value === 7 || value === 9 || value === 11) {
        this.data.datetimeRange[2] = dates
        this.setData({
          'datetimeRange[2]': this.data.datetimeRange[2]
        })
      } else if (value === 1) {
        // 计算是否是闰年
        let year = this.data.currentYear        
        if (year % 4 === 0) {
          this.data.datetimeRange[2] = dates.filter((item, index) => index < 29)
        } else {
          this.data.datetimeRange[2] = dates.filter((item, index) => index < 28)
        }
        // 当前下标如果大于换算后日期长度则自动换算成最后一位
        if (this.data.datetimeValue[2] >= this.data.datetimeRange[2].length) {
          this.data.datetimeValue[2] = this.data.datetimeRange[2].length - 1
        }
        this.setData({
          'datetimeRange[2]': this.data.datetimeRange[2],
          datetimeValue: this.data.datetimeValue
        })
      } else {
        this.data.datetimeRange[2] = dates.filter((item, index) => index < 30)
        // 当前下标如果大于换算后日期长度则自动换算成最后一位
        if (this.data.datetimeValue[2] >= this.data.datetimeRange[2].length) {
          this.data.datetimeValue[2] = this.data.datetimeRange[2].length - 1
        }
        this.setData({
          'datetimeRange[2]': this.data.datetimeRange[2],
          datetimeValue: this.data.datetimeValue
        })
      }
    },
    confirm (e) {
      let arr = e.detail.value
      this.data.datetimeValue = arr
      let date = '00' + dates[arr[2]]
      date = date.substr(date.length - 2)
      this.data.value = `${years[arr[0]]}-${months[arr[1]]}-${date} ${hours[arr[3]]}:${minutes[arr[4]]}`
      this.setData({
        value: this.data.value
      })
      this.triggerEvent('change', this.data.value)
    }
  },
  lifetimes: {
    ready() {
      this.data.currentYear = years[this.data.datetimeValue[0]]
      this.data.currentMonth = months[this.data.datetimeValue[1]]
      let value = this.data.datetimeValue[1]
      this.watchDatetime(value)
    }
  }
})
