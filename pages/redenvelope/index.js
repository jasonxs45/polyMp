import { _redenvelope } from '../../common/regist'
const app = getApp()
Page({
  data: {
    uid: '',
    succShow: false,
    money:''
  },
  toggleCard() {
    this.data.cardShort = !this.data.cardShort
    this.setData({
      cardShort: this.data.cardShort
    })
  },
  showSucc() {
    this.setData({
      succShow: true
    })
  },
  hideSucc() {
    this.setData({
      succShow: false
    })
  },
  clickHandler () {
    app.loading('加载中')
    _redenvelope(this.data.uid).then(res => {
      console.log(res)
      wx.hideLoading()
      if (res.data.IsSuccess) {
        this.setData({
          money: res.data.Data
        }, () => {
          this.showSucc()
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
  },
  onLoad (options) {},
  onReady () {},
  onShow () {
    app.memberReadyCb = () => {
      this.data.uid = app.globalData.uid || wx.getStorageSync('uid')
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onHide () {},
  onUnload () {},
  onPullDownRefresh () {},
  onReachBottom () {},
  onShareAppMessage() {
    return app.shareInfo
  }
})