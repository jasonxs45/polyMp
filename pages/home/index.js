const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad() {
  },
  getUserInfo(e) {
    let userInfo = e.detail.userInfo
  }
})