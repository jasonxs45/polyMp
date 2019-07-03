import { _userlist, _companylist, _managerlist } from '../../common/passcard'
import { formatDate } from '../../utils/util'
const states = ['待企业审核', '待区管审核', '待放行', '已拒绝', '已放行']
const roles = ['租户', '企业', '区管']
const app = getApp()
Page({
  data: {
    role: '',
    roleIndex: null,
    list: [],
    finished: false,
    pageIndex: 1,
    pageSize: 4
  },
  totalQuery() {
    app.loading('加载中')
    let promise = null
    // if (this.data.role === '租户') {
    promise = Promise.resolve(_userlist(app.globalData.member.ID, this.data.pageIndex, this.data.pageSize))
    // }
    // if (this.data.role === '企业') {
    //   promise = Promise.resolve(_companylist(app.globalData.member.CompanyID, this.data.pageIndex, this.data.pageSize))
    // }
    // if (this.data.role === '区管') {
    //   promise = Promise.resolve(_managerlist( this.data.pageIndex, this.data.pageSize))
    // }
    promise.then(res => {
      wx.stopPullDownRefresh()
      wx.hideLoading()
      let list
      list = res.data.ERelease_Apply_list.map(item => {
        item.OrderTime = formatDate(new Date(item.OrderTime), 'yyyy年MM月dd日 hh:mm')
        item.AddTime = formatDate(new Date(item.AddTime), 'yyyy年MM月dd日 hh:mm')
        item.color = item.Status.includes('拒绝') ? 'red' : item.Status.includes('已放行') ? 'green' : ''
        return item
      })
      let finished = false
      let totalCount = res.data.total_count
      finished = list.length >= totalCount
      this.setData({
        list,
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
    // if (this.data.role === '租户') {
    promise = Promise.resolve(_userlist(app.globalData.member.ID, this.data.pageIndex, this.data.pageSize))
    // }
    // if (this.data.role === '企业') {
    //   promise = Promise.resolve(_companylist(app.globalData.member.CompanyID, this.data.pageIndex, this.data.pageSize))
    // }
    // if (this.data.role === '区管') {
    //   promise = Promise.resolve(_managerlist(this.data.pageIndex, this.data.pageSize))
    // }
    promise.then(res => {
      let list
      list = res.data.ERelease_Apply_list.map(item => {
        item.OrderTime = formatDate(new Date(item.OrderTime), 'yyyy年MM月dd日 hh:mm')
        item.AddTime = formatDate(new Date(item.AddTime), 'yyyy年MM月dd日 hh:mm')
        item.color = item.Status.includes('拒绝') ? 'red' : item.Status.includes('已放行') ? 'green' : ''
        console.log(item.Status)
        return item
      })
      this.data.list = this.data.list.concat(list)
      this.setData({
        list: this.data.list
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
    this.data.finished = false
    this.data.pageIndex = 1
    this.data.totalCount = null
    this.setData({
      finished: this.data.finished
    })
    this.totalQuery()
  },
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