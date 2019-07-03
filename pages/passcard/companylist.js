import { _companylist, _companypasslist } from '../../common/passcard'
import { formatDate } from '../../utils/util'
const states = ['待企业审核', '待区管审核', '待放行', '已拒绝', '已放行']
const roles = ['租户', '企业', '区管']
const app = getApp()
Page({
  data: {
    role: '',
    roleIndex: null,
    lists: [
      [], []
    ],
    tabMenus: [
      {
        name: '待审核'
      },
      {
        name: '已审核'
      }
    ],
    currentIndex: 0,
    pageIndexes: [1, 1],
    pageSize: 5,
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
      _companylist(app.globalData.member.CompanyID, this.data.pageIndexes[0], this.data.pageSize),
      _companypasslist(app.globalData.member.ID, this.data.pageIndexes[1], this.data.pageSize)
    ]).then(res => {
      wx.stopPullDownRefresh()
      wx.hideLoading()
      let lists = []
      lists = res.map(r => {
        r = r.data.ERelease_Apply_list.map(item => {
          item.OrderTime = formatDate(new Date(item.OrderTime), 'yyyy年MM月dd日 hh:mm')
          item.AddTime = formatDate(new Date(item.AddTime), 'yyyy年MM月dd日 hh:mm')
          item.color = item.Status.includes('拒绝') ? 'red' : item.Status.includes('已放行') ? 'green' : ''
          return item
        })
        return r
      })
      let finished = [false, false]
      let totalCount = res.map(r => r.data.total_count)
      finished = totalCount.map((item, index) => {
        return lists[index].length >= item
      })
      this.setData({
        lists,
        totalCount,
        finished
      })
    }).catch(err => {
      console.log(err)
      wx.stopPullDownRefresh()
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(err) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  concatList() {
    let promise = null
    if (this.data.currentIndex === 0) {
      promise = Promise.resolve(_companylist(app.globalData.member.CompanyID, this.data.pageIndex, this.data.pageSize))
    }
    if (this.data.currentIndex === 1) {
      promise = Promise.resolve(_companypasslist(app.globalData.member.ID, this.data.pageIndexes[1], this.data.pageSize))
    }
    promise.then(res => {
      let list
      list = res.data.ERelease_Apply_list.map(item => {
        item.OrderTime = formatDate(new Date(item.OrderTime), 'yyyy年MM月dd日 hh:mm')
        item.AddTime = formatDate(new Date(item.AddTime), 'yyyy年MM月dd日 hh:mm')
        item.color = item.Status.includes('拒绝') ? 'red' : item.Status.includes('已放行') ? 'green' : ''
        console.log(item.Status)
        return item
      })
      this.data.lists[this.data.currentIndex] = this.data.lists[this.data.currentIndex].concat(list)
      let str = `lists[${this.data.currentIndex}]`
      this.setData({
        [str]: this.data.lists[this.data.currentIndex]
      })
    }).catch(err => {
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(err) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  onLoad(options) {
    let index = options.role - 1
    this.data.roleIndex = options.role
    this.setData({
      roleIndex: this.data.roleIndex
    })
    this.data.role = roles[index]
  },
  onReady() { },
  onShow() {
    app.memberReadyCb = () => {
      this.totalQuery()
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() {
    this.data.finished = [false, false]
    this.data.pageIndexes = [1, 1]
    this.data.totalCount = [null, null]
    this.setData({
      finished: this.data.finished
    })
    this.totalQuery()
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
  onShareAppMessage() {
    return app.shareInfo
  }
})