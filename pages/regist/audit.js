import { _registlist as _list, _audit } from '../../common/regist'
import { formatDate } from '../../utils/util'
const app = getApp()
Page({
  data: {
    list: [],
    pageIndex: 1,
    pageSize: 5,
    finished: false,
    totalCount: null
  },
  totalQuery() {
    app.loading('加载中')
    _list(this.data.pageIndex, this.data.pageSize)
      .then(res => {
        wx.stopPullDownRefresh()
        wx.hideLoading()
        let list = res.data.Office_MemberApply_list.map(item => {
          item.AddTime = formatDate(new Date(item.AddTime), 'yyyy/MM/dd hh:mm')
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
      this.data.pageIndex,
      this.data.pageSize
    ).then(res => {
      console.log(res)
      this.data.list = this.data.list.concat(res.data.Office_MemberApply_list)
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
  audit(index,id,Result) {
    app.loading('加载中')
    let ID = id
    let UnionID = app.globalData.uid || wx.getStorageSync('uid')
    _audit(ID, UnionID, Result).then(res => {
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
  refuse (e) {
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
  }
})