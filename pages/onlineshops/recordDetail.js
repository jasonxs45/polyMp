import { _recordDetail } from '../../common/shop'
import { _getQr } from '../../common/getQr'
import { formatDate } from '../../utils/util'
const WxParse = require('../../libs/wxParse/wxParse.js')
const app = getApp()
Page({
  data: {
    id: null,
    goods: {},
    code: ''
  },
  getDetail() {
    app.loading('加载中')
    _recordDetail(app.globalData.member.ID, this.data.id).then(res => {
      wx.hideLoading()
      let goods = res.data.Shop_Exchange
      goods.GoodsUseStart = formatDate(new Date(goods.GoodsUseStart), 'yyyy年MM月dd日')
      goods.GoodsUseEnd = formatDate(new Date(goods.GoodsUseEnd), 'yyyy年MM月dd日')
      goods.AddTime = formatDate(new Date(goods.AddTime), 'yyyy年MM月dd日')
      let article = goods.Content
      WxParse.wxParse('article', 'html', article, this, 0)
      this.setData({
        goods,
        code: _getQr(goods.TicketContent)
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
  onPullDownRefresh() {},
  onReachBottom() { }
})