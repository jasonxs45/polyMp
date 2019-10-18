import { _updateInfo } from '../../common/usercenter'
const app = getApp()
Page({
  data: {
    disabled: true,
    uid: null,
    member: null
  },
  tip () {
    wx.showModal({
      title: '对不起',
      content: '您暂时不能参与本项活动',
      showCancel: false
    })
  },
  onShow () {
    app.memberReadyCb = () => {
      const uid = wx.getStorageSync('uid')
      if (uid) {
        _updateInfo(uid).then(res => {
          if (res.data.IsSuccess) {
            // 判断是否有粉丝信息，有就直接获取，没有就跳转授权页面
            if (res.data.Data.Fans) {
              wx.setStorageSync('fans', res.data.Data.Fans)
              app.globalData.fans = res.data.Data.Fans
              wx.setStorageSync('member', res.data.Data.Member)
              app.globalData.member = res.data.Data.Member
              this.setData({
                member: app.globalData.member
              })
            }
          }
        })
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