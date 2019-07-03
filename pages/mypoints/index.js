import { _getscore, _getscoreRecord } from '../../common/points'
import { formatDate, formatNumber } from '../../utils/util'
const app = getApp()
Page({
  data: {
    points: 0,
    list: [],
    finished: false,
    pageIndex: 1,
    pageSize: 10,
    totalCount: null
  },
  concatList() {
    _getscoreRecord(
      app.globalData.member.ID,
      this.data.pageIndex,
      this.data.pageSize
    ).then(res => {
      let list = res.data.Score_Log_list.map(item => {
        item.Score = item.Score > 0 ? '+' + item.Score : '' + item.Score
        item.AddTime = formatDate(new Date(item.AddTime), 'yyyy-MM-dd hh:mm:ss')
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
    Promise.all([
      _getscore(app.globalData.member.ID),
      _getscoreRecord(app.globalData.member.ID, 1, this.data.pageSize)
    ]).then(res => {
      wx.hideLoading()
      let num = res[0].data.Score_Log_sum || 0
      let list = res[1].data.Score_Log_list.map(item => {
        item.Score = item.Score > 0 ? '+' + item.Score : '' + item.Score
        item.AddTime = formatDate(new Date(item.AddTime), 'yyyy-MM-dd hh:mm:ss')
        return item
      })
      this.data.totalCount = res[1].data.total_count
      let finished = false
      finished = list.length >= this.data.totalCount
      this.setData({
        points: formatNumber(num, 0),
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
  onShareAppMessage() {
    return app.shareInfo
  }
})