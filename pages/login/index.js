import { getUserInfoByKey } from '../../common/login'
const app = getApp()
Page({
  data: {},
  getUserInfo (e) {
    let iv = e.detail.iv
    let encryptedData = e.detail.encryptedData
    let key = wx.getStorageSync('s_key')
    app.loading('请稍候')
    getUserInfoByKey({ iv, encryptedData, key }).then(r => {
      wx.hideLoading()
      if (r.data.IsSuccess) {
        let uid = r.data.Data.Fans.UnionID
        let fans = r.data.Data.Fans
        let member = r.data.Data.Member
        wx.setStorageSync('uid', uid)
        app.globalData.uid = uid
        wx.setStorageSync('fans', fans)
        app.globalData.fans = fans
        wx.setStorageSync('member', member)
        app.globalData.member = member
        wx.switchTab({
          url: '/pages/home/index'
        })
      } else {
        wx.showModal({
          title: '对不起',
          content: r.data.Msg,
          showCancel: false
        })
      }
    }).catch(e => {
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: '请求失败，请稍后再试',
        showCancel: false
      })
      console.log(e)
    })
  },
  onLoad (options) {},
  onReady () {},
  onShow () {},
  onHide () {},
  onUnload () {},
  onPullDownRefresh () {},
  onReachBottom () {},
  onShareAppMessage () {}
})