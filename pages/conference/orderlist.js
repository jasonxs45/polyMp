import { _orderlist } from '../../common/meeting'
import { formatDate } from '../../utils/util'
const app = getApp()
Page({
  data: {
    list: [],
    finished: false,
    pageIndex: 1,
    pageSize: 6,
    totalCount: null
  },
  concatList() {
    _orderlist(
      app.globalData.member.ID,
      this.data.pageIndex,
      this.data.pageSize
    ).then(res => {
      let list = res.data.Meeting_Apply_list.map(item => {
        item.AddTime = formatDate(new Date(item.AddTime), 'yyyy年MM月dd hh:mm')
        item.TimeList = JSON.parse(item.TimeList)
        return item
      })
      this.setData({
        list: this.data.list.concat(list)
      })
    }).catch(err => {
      wx.showModal({
        title: '对不起',
        content: '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  getAll() {
    app.loading('加载中')
    _orderlist(
      app.globalData.member.ID,
      1,
      this.data.pageSize
    ).then(res => {
      wx.hideLoading()
      let list = res.data.Meeting_Apply_list.map(item => {
        item.AddTime = formatDate(new Date(item.AddTime), 'yyyy-MM-dd hh:mm')
        item.TimeList = JSON.parse(item.TimeList)
        return item
      })
      this.data.totalCount = res.data.total_count
      let finished = false
      finished = list.length >= this.data.totalCount
      this.setData({
        list,
        finished
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  onLoad(options) {
    app.memberReadyCb = () => {
      this.getAll()
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
  onPullDownRefresh() { },
  onReachBottom() {
    if (this.data.list.length >= this.data.totalCount) {
      this.setData({
        finished: true
      })
    } else {
      this.data.pageIndex += 1
      this.concatList()
    }
  },
  onShareAppMessage() { }
})