import { _sign } from '../../common/activity'
const app = getApp()
Page({
  data: {
    role: null,
    baseinfo: null
  },
  openScan() {
    wx.scanCode({
      onlyFromCamera: true,
      success: res => {
        let code = res.result
        app.loading('处理中')
        _sign(code, app.globalData.uid).then(res => {
          wx.hideLoading()
          if (res.data.IsSuccess) {
            let baseinfo = res.data.Data
            this.setData({
              baseinfo
            })
            wx.showModal({
              title: '温馨提示',
              content: res.data.Msg,
              showCancel: false
            })
          } else {
            wx.showModal({
              title: '对不起',
              content: res.data.Msg,
              showCancel: false
            })
          }
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
    })
  },
  onLoad(options) {
  },
  onReady() {
    this.openScan()
  },
  onShow() {
    app.memberReadyCb = () => {
    }
    app.fansReadyCb = () => {
    }
    app.init()
  },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() { },
  onShareAppMessage() { }
})