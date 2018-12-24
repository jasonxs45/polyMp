import { _mydetail } from '../../common/activity'
import { _getQr } from '../../common/getQr'
import { formatDate } from '../../utils/util'
const WxParse = require('../../libs/wxParse/wxParse.js')
const app = getApp()
Page({
  data: {
    id: null,
    detail: {},
    applyDetail: {}
  },
  getDetail() {
    app.loading('加载中')
    _mydetail(this.data.id, app.globalData.member.ID).then(res => {
      wx.hideLoading()
      let detail = res.data.Activity_Activity
      detail.ApplyStart = formatDate(new Date(detail.ApplyStart), 'yyyy/MM/dd hh:mm')
      detail.ApplyEnd = formatDate(new Date(detail.ApplyEnd), 'yyyy/MM/dd hh:mm')
      detail.PlayStart = formatDate(new Date(detail.PlayStart), 'yyyy/MM/dd hh:mm')
      detail.PlayEnd = formatDate(new Date(detail.PlayEnd), 'yyyy/MM/dd hh:mm')
      let applyDetail = res.data.Activity_Apply
      applyDetail.qrimg = _getQr(applyDetail.SN)
      let content = detail.Content
      WxParse.wxParse('content', 'html', content, this, 0)
      let explain = detail.Explain
      WxParse.wxParse('explain', 'html', explain, this, 0)
      this.setData({
        detail,
        applyDetail
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
    this.data.id = options.id
    app.memberReadyCb = () => {
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
  onShareAppMessage() { }
})