const app = getApp()
Page({
  data: {
    role: 1
  },
  onLoad (options) {
  },
  onReady () {},
  onShow () {},
  onHide () {},
  onUnload () {},
  onPullDownRefresh () {},
  onReachBottom () {},
  onShareAppMessage() {
    return app.shareInfo
  }
})