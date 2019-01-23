import { _orderdetail as _detail } from '../../common/meeting'
import { formatDate } from '../../utils/util'
const app = getApp()
Page({
  data: {
    id: null,
    detail: null
  },
  getDetail () {
    app.loading('加载中')
    _detail(this.data.id).then(res => {
      wx.hideLoading()
      let detail = res.data.Meeting_Apply
      detail.AddTime = formatDate(new Date(detail.AddTime), 'yyyy年MM月dd hh:mm')
      detail.TimeList = JSON.parse(detail.TimeList)
      this.setData({
        detail
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: '请求失败，请稍后再试'
      })
    })
  },
  onLoad (options) {
    this.data.id = options.id
    this.getDetail()
  },
  onReady () {},
  onShow () {},
  onHide () {},
  onUnload () {},
  onPullDownRefresh () {},
  onReachBottom () {},
  onShareAppMessage () {}
})