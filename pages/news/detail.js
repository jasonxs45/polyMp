import { _detail } from '../../common/news'
const WxParse = require('../../libs/wxParse/wxParse.js')
const app = getApp()
Page({
  data: {
    id: '',
    content: null
  },
  getDetail () {
    app.loading('加载中')
    _detail(this.data.id).then(res => {
      wx.hideLoading()
      wx.setNavigationBarTitle({
        title: res.data.News_News.Title
      })
      let article = res.data.News_News.Content
      WxParse.wxParse('article', 'html', article, this, 0)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: '请求失败，轻稍后再试',
        showCancel: false
      })
    })
  },
  onLoad (options) {
    this.data.id = options.id
    app.memberReadyCb = () => {
    }
    app.fansReadyCb = () => {
      this.getDetail()
    }
    app.init()
  },
  onReady () {},
  onShow () {},
  onHide () {},
  onUnload () {},
  onPullDownRefresh () {},
  onReachBottom () {},
  onShareAppMessage () {}
})