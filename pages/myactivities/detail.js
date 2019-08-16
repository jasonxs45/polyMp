import { _mydetail } from '../../common/activity'
import { _getQr } from '../../common/getQr'
import { formatDate } from '../../utils/util'
const WxParse = require('../../libs/wxParse/wxParse.js')
const app = getApp()
const describes = [
  '非常不满意', '不满意', '一般', '满意', '非常满意'
]
Page({
  data: {
    id: null,
    detail: {},
    applyDetail: {},
    scores: [],
    describes,
    rateItems: ['现场氛围', '活动效果', '活动收益']
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
      let scores = [applyDetail.Evaluate1, applyDetail.Evaluate2, applyDetail.Evaluate3]
      applyDetail.qrimg = _getQr(applyDetail.SN)
      let content = detail.Content
      WxParse.wxParse('content', 'html', content, this, 0)
      let explain = detail.Explain
      WxParse.wxParse('explain', 'html', explain, this, 0)
      this.setData({
        detail,
        applyDetail,
        scores
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
  goRate() {
    wx.navigateTo({
      url: `./rate?id=${this.data.id}`
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
  onShareAppMessage() {
    return {
      title: this.data.detail.Name,
      path: `/pages/activity/detail?id=${this.applyDetail.ActivityID}`
    }
  }
})