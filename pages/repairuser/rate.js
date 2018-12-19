import { _rate } from '../../common/repair'
const describes = [
  '非常不满意', '不满意', '一般', '满意', '非常满意'
]
const app = getApp()
Page({
  data: {
    id: '',
    describes,
    desc: '',
    rateItems: ['响应速度','服务态度','处理结果'],
    scores: [0, 0, 0],
    submitDisable: false
  },
  textInputHandler (e) {
    this.data.desc = e.detail.value
  },
  rate (e) {
    let index = e.currentTarget.dataset.index
    let str = `scores[${index}]`
    this.setData({
      [str]: e.detail
    })
  },
  submit () {
    let index = this.data.scores.findIndex(item => item === 0)
    if (index !== -1) {
      app.toast(`请对${this.data.rateItems[index]}评分`)
      return
    }
    this.setData({
      submitDisable: true
    })
    _rate(this.data.id, ...this.data.scores, this.data.desc).then(res => {
      this.setData({
        submitDisable: false
      })
      wx.showModal({
        title: res.data.IsSuccess?'温馨提示':'对不起',
        content: res.data.Msg,
        showCancel: false,
        success: r => {
          if (r.confirm) {
            wx.navigateBack()
          }
        }
      })
    }).catch(err => {
      this.setData({
        submitDisable: false
      })
      console.log(err)
      wx.showModal({
        title: '对不起',
        content: '网络错误，请稍候再试',
        showCancel: false
      })
    })
  },
  onLoad(options) {
    this.data.id = options.id
    app.memberReadyCb = () => {
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
  onPullDownRefresh() { },
  onReachBottom() { },
  onShareAppMessage() { }
})