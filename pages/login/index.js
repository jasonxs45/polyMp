import { getUserInfo } from '../../common/login'
const app = getApp()
Page({
  data: {},
  _getUserInfo (e) {
    console.log(e)
    let iv = e.detail.iv
    let encryptedData = e.detail.encryptedData
    console.log(app.globalData)
    let key = app.globalData.s_key
    getUserInfo({iv, encryptedData, key}).then(r => {
      console.log(r)
    }).catch(e => {
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