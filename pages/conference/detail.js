import { _detail, _dates } from '../../common/meeting'
import { formatDate } from '../../utils/util'
const WxParse = require('../../libs/wxParse/wxParse.js')
const app = getApp()
Page({
  data: {
    id: '',
    detail: null,
    dates: [],
    selectedDates: [],
    selecting: false
  },
  totalQuery () {
    app.loading('加载中')
    Promise.all([
      _detail(this.data.id),
      _dates(this.data.id)
    ]).then(res => {
      wx.hideLoading()
      this.data.detail = res[0].data.Meeting_Room
      this.data.detail.SlideImg = JSON.parse(this.data.detail.SlideImg)
      let content = this.data.detail.Introduce
      WxParse.wxParse('content', 'html', content, this, 0)
      this.data.dates = res[1].data.Data.map(item => {
        item.Date = formatDate(new Date(item.Date), 'yyyy年MM月dd日')
        return item
      })
      this.setData({
        detail: this.data.detail,
        dates: this.data.dates
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(err) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  showSelect () {
    this.setData({
      selecting: true
    })
  },
  hideSelect() {
    this.setData({
      selecting: false
    })
  },
  checkHandler (e) {
    let index = e.currentTarget.dataset.index
    let value = e.detail.value.length > 1 ? ['上午', '下午'] : e.detail.value
    if (value.length > 0) {
      let date = this.data.dates[index].Date
      let idx = this.data.selectedDates.findIndex(item => item.date === date)
      if (idx === -1) {
        this.data.selectedDates.push({
          date: this.data.dates[index].Date,
          value
        })
      } else {
        this.data.selectedDates[idx].value = value
      }
    }
  },
  confirm () {
    if (this.data.selectedDates.length <= 0) {
      app.toast("请选择日期!")
      return
    }
    app.updateMeetingDate(this.data.selectedDates)
    this.hideSelect()
    wx.navigateTo({
      url: `./apply?id=${this.data.id}`,
    })
  },
  onLoad (options) {
    this.data.id = options.id
    app.memberReadyCb = () => {
      this.totalQuery()
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onReady () {},
  onShow () {},
  onHide () {},
  onUnload () {},
  onShareAppMessage () {}
})