import { _analysiscode } from '../../common/passcard'
const app = getApp()
Page({
  data: {
    role: null
  },
  openScan () {
    wx.scanCode({
      onlyFromCamera: true,
      success: res => {
        let code = res.result
        app.loading('处理中')
        _analysiscode(code).then(res => {
          wx.hideLoading()
          if (res.data.IsSuccess) {
            let id = res.data.Data
            wx.navigateTo({
              url: `./detail?role=${this.data.role}&id=${id}`
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
  onLoad (options) {
    this.data.role = options.role
  },
  onReady () {
    // 自动打开
    this.openScan()
  },
  onShow () {},
  onHide () {},
  onUnload () {},
  onPullDownRefresh () {},
  onReachBottom () {},
  onShareAppMessage () { }
})