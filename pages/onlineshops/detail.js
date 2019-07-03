import { _detail, _exchange } from '../../common/shop'
import { formatDate } from '../../utils/util'
const WxParse = require('../../libs/wxParse/wxParse.js')
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
      let article = goods.Content
      WxParse.wxParse('article', 'html', article, this, 0)
      this.setData({
        goods
      })
    }).catch(err => {
      console.log(err)
      wx.stopPullDownRefresh()
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        // content: JSON.stringify(err) || '网络错误，请稍后再试',
        content: err,
        showCancel: false
      })
    })
  },
  exchange() {
    wx.showModal({
      title: '温馨提示',
      content: '确定兑换吗？',
      success: res => {
        if (res.confirm) {
          app.loading('加载中')
          _exchange(app.globalData.uid, this.data.id).then(res => {
            wx.hideLoading()
            wx.showModal({
              title: res.data.IsSuccess ? '恭喜您' : '对不起',
              content: res.data.Msg,
              showCancel: false,
              success: r => {
                if (res.data.IsSuccess && r.confirm) {
                  wx.navigateTo({
                    url: '/pages/onlineshops/record'
                  })
                }
              }
            })
          }).catch(err => {
            console.log(err)
            wx.hideLoading()
            wx.showModal({
              title: '对不起',
              content: '请求失败，请稍后再试',
              showCancel: false
            })
          })
        }
      }
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
    // this.getDetail()
  },
  onReachBottom() { },
  onShareAppMessage() {
    return app.shareInfo
  }
})