const app = getApp()
Page({
  data: {
    disabled: true,
    uid: null
  },
  onShow () {
    app.memberReadyCb = () => {
      const uid = wx.getStorageSync('uid')
      if (uid) {
        this.setData({
          uid,
          disabled: false
        })
      }
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  }
})