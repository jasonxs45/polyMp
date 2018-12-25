import { _visitorlist as _list, _audit } from '../../common/visit'
import { formatDate } from '../../utils/util'
const app = getApp()
Page({
  data: {
    id: null,
    comID: null,
    list: [],
    pageIndex: 1,
    pageSize: 5,
    finished: false,
    totalCount: null
  },
  totalQuery() {
    app.loading('加载中')
    _list(this.data.comID, this.data.pageIndex, this.data.pageSize)
      .then(res => {
        wx.stopPullDownRefresh()
        wx.hideLoading()
        let list = res.data.Visit_Apply_list.map(item => {
          item.VisitTime = formatDate(new Date(item.VisitTime), 'yyyy/MM/dd hh:mm')
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
    _list(
      this.data.comID,
      this.data.pageIndex,
      this.data.pageSize
    ).then(res => {
      let list = res.data.Visit_Apply_list.map(item => {
        item.VisitTime = formatDate(new Date(item.VisitTime), 'yyyy/MM/dd hh:mm')
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
  audit(index, id, Result) {
    console.log(index, id)
    app.loading('加载中')
    let ID = id
    let MemberID = app.globalData.member.ID || wx.getStorageSync('member.ID')
    _audit(ID, MemberID, Result).then(res => {
      wx.hideLoading()
      wx.showModal({
        title: res.data.IsSuccess ? '温馨提示' : '对不起',
        content: res.data.Msg,
        showCancel: false,
        success: r => {
          if (r.confirm) {
            if (res.data.IsSuccess) {
              this.data.list.splice(index, 1)
              this.setData({
                list: this.data.list
              })
            }
          }
        }
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: '请求失败，请稍候再试',
        showCancel: false
      })
    })
  },
  refuse(e) {
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '温馨提示',
      content: '确定拒绝吗？',
      success: res => {
        if (res.confirm) {
          this.audit(index, id, 0)
        }
      }
    })
  },
  pass(e) {
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '温馨提示',
      content: '确定通过吗？',
      success: res => {
        if (res.confirm) {
          this.audit(index, id, 1)
        }
      }
    })
  },
  onLoad(options) {
    this.data.id = options.id
    app.memberReadyCb = () => {
      let companyID = app.globalData.member.CompanyID || wx.getStorageSync('member').CompanyID
      this.data.comID = this.data.id == 1 ? companyID : ''
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
    this.data.finished = false
    this.data.pageIndex = 1
    this.data.totalCount = null
    this.setData({
      finished: this.data.finished,
    })
    this.totalQuery()
  },
  onReachBottom() {
    if (this.data.finished) {
      return
    }
    let currentList = this.data.list
    let currentTotalCount = this.data.totalCount
    if (currentList.length >= currentTotalCount) {
      this.data.finished = true
      this.setData({
        finished: this.data.finished
      })
    } else {
      this.data.pageIndex += 1
      this.concatList()
    }
  },
  onShareAppMessage() { }
})