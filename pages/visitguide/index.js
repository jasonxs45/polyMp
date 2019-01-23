const app = getApp()
Page({
  data: {
    roleType: null
  },
  onLoad (options) {
    app.memberReadyCb = () => {
      let roleType = app.globalData.member.Type || wx.getStorageSync('member').Type
      this.setData({
        roleType
      })
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
  onPullDownRefresh () {},
  onReachBottom () {},
  onShareAppMessage () {}
})