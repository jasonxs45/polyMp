import { _list } from '../../common/activity'
const app = getApp()
Page({
  data: {
    lists: [
      [], []
    ],
    tabMenus: [
      {
        name: '进行中'
      },
      {
        name: '已结束'
      }
    ],
    currentIndex: 0,
    pageIndexes: [1, 1],
    pageSize: 4,
    states: ['unover', 'over'],
    finished: [false, false],
    totalCount: [null, null]
  },
  tabChange(e) {
    let currentIndex = parseInt(e.detail)
    this.setData({
      currentIndex
    })
  },
  swiperChange(e) {
    let currentIndex = parseInt(e.detail.current)
    this.setData({
      currentIndex
    })
  },
  totalQuery() {
    app.loading('加载中')
    Promise.all([
      _list(this.data.states[0], app.globalData.member.ID, this.data.pageIndexes[0], this.data.pageSize),
      _list(this.data.states[1], app.globalData.member.ID, this.data.pageIndexes[1], this.data.pageSize)
    ]).then(res => {
      wx.hideLoading()
      let lists = res.map(item => item.data.Activity_Activity_list)
      let finished = []
      let totalCount = res.map((item, index) => {
        finished.push(lists[index].length >= item.data.total_count)
        return item.data.total_count
      })
      this.setData({
        lists,
        totalCount,
        finished
      })
    }).catch(err => {
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(err) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  concatList() {
    let currentIndex = this.data.currentIndex
    let currentPageIndex = this.data.pageIndexes[this.data.currentIndex]
    console.log(currentPageIndex)
    _list(
      this.data.states[currentIndex],
      app.globalData.member.ID,
      this.data.pageIndexes[currentIndex],
      this.data.pageSize
    ).then(res => {
      this.data.lists[currentIndex] = this.data.lists[currentIndex].concat(res.data.Activity_Activity_list)
      let str = `lists[${currentIndex}]`
      this.setData({
        [str]: this.data.lists[currentIndex]
      })
    }).catch(err => {
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(err) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  onReachLower() {
    let currentIndex = this.data.currentIndex
    if (this.data.finished[currentIndex]) {
      return
    }
    let currentList = this.data.lists[currentIndex]
    let currentTotalCount = this.data.totalCount[currentIndex]
    if (currentList.length >= currentTotalCount) {
      this.data.finished[currentIndex] = true
      this.setData({
        finished: this.data.finished
      })
    } else {
      this.data.pageIndexes[currentIndex] += 1
      this.concatList()
    }
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
  onPullDownRefresh() {
    this.data.finished = [false, false]
    this.data.pageIndexes = [1, 1]
    this.data.lists = [ [], [] ]
    this.data.totalCount = [null, null]
    this.setData({
      finished: this.data.finished,
      lists: this.data.lists
    })
    app.loading('加载中')
    Promise.all([
      _list(this.data.states[0], this.data.pageIndexes[0], this.data.pageSize),
      _list(this.data.states[1], this.data.pageIndexes[1], this.data.pageSize)
    ]).then(res => {
      wx.stopPullDownRefresh()
      wx.hideLoading()
      let lists = res.map(item => item.data.Activity_Activity_list)
      let finished = []
      let totalCount = res.map((item, index) => {
        finished.push(lists[index].length >= item.data.total_count)
        return item.data.total_count
      })
      this.setData({
        lists,
        totalCount,
        finished
      })
    }).catch(err => {
      wx.stopPullDownRefresh()
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(err) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  onShareAppMessage () {
    return app.shareInfo
  }
})