import { formatDate } from '../../utils/util'
Component({
  properties: {},
  data: {
    dayTexts: ['日', '一', '二', '三', '四', '五', '六'],
    monthDaysize: null,
    blank: null,
    today: ''
  },
  methods: {
    init () {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth() + 1
      const date = today.getDate()
      const day = today.getDay()
      const blank = day - date % 7 + 1
      let monthDaySize
      if (month === 1 && month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        monthDaySize = 31
      } else if (month === 2) {
        if (year % 4 === 0) {
          monthDaySize = 29
        } else {
          monthDaySize = 28
        }
      } else {
        monthDaySize = 30
      }
      this.data.monthDaysize = monthDaySize
      this.data.blank = blank
      // this.data.today = `${year}/${month}/${date}`
    }
  },
  lifetimes: {
    created () {
      this.init()
    },
    attached () {
      this.setData({
        blank: this.data.blank,
        monthDaySize: this.data.monthDaysize,
        today: formatDate(new Date(), 'yyyy/MM/dd')
      })
    }
  }
})
