import { _detail } from '../../common/activity'
const app = getApp()
Page({
  data: {
    id: null,
    detail: {}
  },
  getDetail () {
    app.loading('加载中')
    _detail(this.data.id).then(res => {
      wx.hideLoading()
      this.setData({
        detail: res.data.Activity_Activity
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
  yuyueBut() {
    wx.showModal({
      title: '报名成功',
      content: '您已报名成功，可在个人中心【我的活动】里',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
  onShareAppMessage () {}
})