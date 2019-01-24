import { _detail, _submit } from '../../common/activity'
import { formatDate } from '../../utils/util'
const WxParse = require('../../libs/wxParse/wxParse.js')
const app = getApp()
Page({
  data: {
    id: null,
    detail: {},
    disabled: true,
    notstart: true
  },
  getDetail () {
    app.loading('加载中')
    _detail(this.data.id).then(res => {
      wx.hideLoading()
      let detail = res.data.Activity_Activity
      let now = Date.now()
      if (now < new Date(detail.ApplyStart).getTime()) {
        this.setData({
          notstart: true
        })
      } else {
        this.setData({
          notstart: false
        })
      }
      if (now > new Date(detail.ApplyStart).getTime() && now < new Date(detail.ApplyEnd).getTime()) {
        this.setData({
          disabled: false
        })
      } else {
        this.setData({
          disabled: true
        })
      }
      detail.ApplyStart = formatDate(new Date(detail.ApplyStart), 'yyyy/MM/dd hh:mm')
      detail.ApplyEnd = formatDate(new Date(detail.ApplyEnd), 'yyyy/MM/dd hh:mm')
      detail.PlayStart = formatDate(new Date(detail.PlayStart), 'yyyy/MM/dd hh:mm')
      detail.PlayEnd = formatDate(new Date(detail.PlayEnd), 'yyyy/MM/dd hh:mm')
      let content = detail.Content
      WxParse.wxParse('content', 'html', content, this, 0)
      let explain = detail.Explain
      WxParse.wxParse('explain', 'html', explain, this, 0)
      this.setData({
        detail
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
  submit() {
    wx.showModal({
      title: '提示',
      content: '确定报名吗？',
      success: res => {
        if (res.confirm) {
          app.loading('提交中')
          _submit(app.globalData.member.ID, this.data.id).then(r => {
            wx.hideLoading()
            wx.showModal({
              title: r.data.IsSuccess?'恭喜您':'对不起',
              content: r.data.IsSuccess ? '您已报名成功，可在个人中心【我的活动】里':r.data.Msg,
              showCancel: false
            })
          }).catch(e => {
            wx.hideLoading()
            wx.showModal({
              title: '对不起',
              content: JSON.stringify(e) || '网络错误，请稍后再试',
              showCancel: false
            })
          })
        }
      }
    })
  },
  onLoad (options) {
    this.data.id = options.id
    app.memberReadyCb = () => {
      this.getDetail()
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