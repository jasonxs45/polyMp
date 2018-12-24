import { _record } from '../../common/shop'
import { formatDate } from '../../utils/util'
const app = getApp()
Page({
  data: {
    list: [],
    totalCount: null,
    finished: false,
    pageIndex: 1,
    pageSize: 6
  },
  concatList() {
    _record(
      app.globalData.member.ID,
      this.data.pageIndex,
      this.data.pageSize
    ).then(res => {
      this.data.totalCount = res.data.total_count
      let list = res.data.Shop_Exchange_list.map(item => {
        item.AddTime = formatDate(new Date(item.AddTime), 'yyyy-MM-dd hh: mm')
        return item
      })
      this.data.list = this.data.list.concat(list)
      this.data.finished = this.data.list.length >= this.data.totalCount
      this.setData({
        list: this.data.list,
        finished: this.data.finished
      })
    }).catch(err => {
      console.log(err)
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(err) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  onLoad (options) {
    app.memberReadyCb = () => {
      this.concatList()
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
  onShareAppMessage () {}
})