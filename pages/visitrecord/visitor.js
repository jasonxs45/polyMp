import {
  _visitapplylist as _applylist,
  _visitreceivedlist as _receivedlist,
  _contactorlist,
  _delcontactor as _del
} from '../../common/visit'
import { _getQr } from '../../common/getQr'
import { formatDate } from '../../utils/util'
import behaviors  from './behaviors'
const app = getApp()
Component({
  data: {
    tabs: ['发出的申请','收到的邀访','常用联系人'],
    lists: [
      [], [], []
    ],
    pageIndexes: [1, 1, 1],
    pageSize: 5,
    finished: [false, false, false],
    totalCount: [0, 0, 0]
  },
  behaviors: [behaviors],
  methods: {
    totalQuery() {
      app.loading('加载中')
      Promise.all([
        _applylist(app.globalData.member.ID, this.data.pageIndexes[0], this.data.pageSize),
        _receivedlist(app.globalData.member.Tel, this.data.pageIndexes[1], this.data.pageSize),
        _contactorlist(app.globalData.member.ID, this.data.pageIndexes[2], this.data.pageSize)
      ]).then(res => {
        wx.hideLoading()
        let lists = [[], [], []]
        lists[0] = res[0].data.Visit_Apply_list.map(item => {
          item.AddTime = formatDate(new Date(item.AddTime), 'yyyy/MM/dd hh:mm')
          item.open = false
          item.qr = _getQr(item.SN)
          return item
        })
        lists[1] = res[1].data.Visit_Apply_list.map(item => {
          item.AddTime = formatDate(new Date(item.AddTime), 'yyyy/MM/dd hh:mm')
          item.open = false
          item.qr = _getQr(item.SN)
          return item
        })
        lists[2] = res[2].data.Visit_Contacts_list
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
        wx.stopPullDownRefresh()
      }).catch(err => {
        wx.stopPullDownRefresh()
        console.log(err)
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
      let promise = null
      if (currentIndex === 0) {
        promise = Promise.resolve(_applylist(app.globalData.member.ID, this.data.pageIndexes[0], this.data.pageSize))
      }
      if (currentIndex === 1) {
        promise = Promise.resolve(_receivedlist(app.globalData.member.Tel, this.data.pageIndexes[1], this.data.pageSize))
      }
      if (currentIndex === 2) {
        promise = Promise.resolve(_contactorlist(app.globalData.member.ID, this.data.pageIndexes[2], this.data.pageSize))
      }
      promise.then(res => {
        let list = []
        if (currentIndex === 0) {
          list = res.data.Visit_Apply_list.map(item => {
            item.AddTime = formatDate(new Date(item.AddTime), 'yyyy/MM/dd hh:mm')
            item.open = false
            item.qr = _getQr(item.SN)
            return item
          })
        }
        if (currentIndex === 1) {
          list = res.data.Visit_Apply_list.map(item => {
            item.AddTime = formatDate(new Date(item.AddTime), 'yyyy/MM/dd hh:mm')
            item.open = false
            item.qr = _getQr(item.SN)
            return item
          })
        }
        if (currentIndex === 2) {
          lists = res.data.Visit_Contacts_list
        }
        this.data.lists[currentIndex] = this.data.lists[currentIndex].concat(list)
        let str = `lists[${currentIndex}]`
        this.setData({
          [str]: this.data.lists[currentIndex]
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
    toggleDetail(e) {
      let currentIndex = this.data.currentIndex
      let index = parseInt(e.currentTarget.dataset.index)
      let open = this.data.lists[currentIndex][index].open
      let str = `lists[${currentIndex}][${index}].open`
      this.setData({
        [str]: !open
      })
    },
    delContactor (e) {
      let id = e.currentTarget.dataset.id
      wx.showModal({
        title: '温馨提示',
        content: '确定删除吗？',
        success: res => {
          if (res.confirm) {
            app.loading('删除中...')
            _del(app.globalData.member.ID, id).then(res => {
              wx.hideLoading()
              wx.showModal({
                title: res.data.IsSuccess?'温馨提示':'对不起',
                content: res.data.Msg,
                showCancel: false,
                success: r => {
                  if(r.confirm) {
                    let index = this.data.lists[2].findIndex(item => item.ID === id)
                    this.data.lists[2].splice(index, 1)
                  }
                }
              })
            }).catch(err => {
              wx.hideLoading()
              console.log(err)
              wx.showModal({
                title: '对不起',
                content: '请求错误，请稍后再试！',
                showCancel: false
              })
            })
          }
        }
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
      if (!!options.current) {
        this.setData({
          currentIndex: options.current
        })
      }
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
      this.setData({
        pageIndexes: [1, 1, 1],
        finished: [false, false, false],
        totalCount: [0, 0, 0]
      })
      this.totalQuery()
    },
    onReachBottom() {},
    onShareAppMessage() { }
  }
})