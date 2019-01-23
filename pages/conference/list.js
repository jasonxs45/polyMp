import { _roomlist } from '../../common/meeting'
const app = getApp()
Page({
  data: {
    list: []
  },
  totalQuery() {
    app.loading('加载中')
    _roomlist()
      .then(res => {
        wx.hideLoading()
        let list = res.data.Meeting_Room_list
        this.setData({
          list
        })
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.showModal({
          title: '对不起',
          content: JSON.stringify(err) || '网络错误，请稍后再试',
          showCancel: false
        })
      })
  },
  onLoad(options) {
    app.memberReadyCb = () => {
      this.totalQuery()
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onReady() { },
  onShow() { },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() { }
})