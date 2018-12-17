import { _detail, _exchange } from '../../common/shop'
import { formatDate } from '../../utils/util'
const app = getApp()
Page({
  data: {
    id: null,
    goods: {}
  },
  getDetail() {
    app.loading('加载中')
    _detail(this.data.id).then(res => {
      wx.stopPullDownRefresh()
      wx.hideLoading()
      let goods = res.data.Shop_Goods
      goods.ExchangeStart = formatDate(new Date(goods.ExchangeStart), 'yyyy年MM月dd日')
      goods.ExchangeEnd = formatDate(new Date(goods.ExchangeEnd), 'yyyy年MM月dd日')
      this.setData({
        goods
      })
    }).catch(err => {
      wx.stopPullDownRefresh()
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(err) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  exchange () {
    app.loading('加载中')
    _exchange(app.globalData.uid, this.data.id).then(res => {
      wx.hideLoading()
      wx.showModal({
        title: res.data.IsSuccess ? '恭喜您' : '对不起',
        content: res.data.Msg,
        showCancel: false
      })
    }).catch(err => {
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(err) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  onLoad(options) {
    app.memberReadyCb = () => {
      this.data.id = options.id
      this.getDetail()
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onReady() { },
  onShow() { },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() {
    this.getDetail()
  },
  onReachBottom() { },
  onShareAppMessage() { }
})