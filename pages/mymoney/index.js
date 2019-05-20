import { _money, _record, _toaccount } from '../../common/money'
import { formatDate, formatNumber } from '../../utils/util'
const app = getApp()
Page({
  data: {
    money: 0,
    list: [],
    finished: false,
    pageIndex: 1,
    pageSize: 10,
    totalCount: null,
    showPop: false,
    outNum: null,
    submiting: false
  },
  popIn () {
    this.setData({
      showPop: true
    })
  },
  popOut() {
    this.setData({
      showPop: false
    })
  },
  inputHandler (e) {
    this.data.outNum = e.detail.value
    this.setData({
      outNum: this.data.outNum
    })
  },
  all () {
    this.setData({
      outNum: Number(this.data.money)
    })
  },
  toAccount () {
    let value = Number(this.data.outNum)
    if (!value) {
      app.toast('请输入正确的金额')
      return
    }
    if (value > 200) {
      app.toast('单次提现不能超过200')
      return
    }
    if (value > Number(this.data.money)) {
      app.toast('提现金额超过当前余额')
      return
    }
    app.loading('提交中')
    _toaccount(app.globalData.member.ID, value).then(res => {
      wx.hideLoading()
      if (res.data.IsSuccess) {
        wx.showModal({
          title: '恭喜您',
          content: res.data.Msg,
          showCancel: false,
          success: r => {
            if (r.confirm) {
              this.setData({
                money: parseFloat(res.data.Data),
                outNum: '',
              }, () => {
                this.popOut()
                this.getAll()
              })
            }
          }
        })
      } else {
        wx.showModal({
          title: '对不起',
          content: res.data.Msg,
          showCancel: false
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  concatList() {
    _record(
      app.globalData.member.ID,
      this.data.pageIndex,
      this.data.pageSize
    ).then(res => {
      let list = res.data.Red_Log_list.map(item => {
        item.RedMoney = item.RedMoney > 0 ? '+' + item.RedMoney : '' + item.RedMoney
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
      _money(app.globalData.member.ID),
      _record(app.globalData.member.ID, 1, this.data.pageSize)
    ]).then(res => {
      wx.hideLoading()
      let num = res[0].data.Red_Log_sum || 0
      let list = res[1].data.Red_Log_list.map(item => {
        item.RedMoney = item.RedMoney > 0 ? '+' + item.RedMoney : '' + item.RedMoney
        item.AddTime = formatDate(new Date(item.AddTime), 'yyyy-MM-dd hh:mm:ss')
        return item
      })
      this.data.totalCount = res[1].data.total_count
      let finished = false
      finished = list.length >= this.data.totalCount
      this.setData({
        money: formatNumber(num, 2),
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
  }
})