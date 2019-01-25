import {_handlinglist, _handledlist } from '../../common/repair'
import { formatDate } from '../../utils/util'
const app = getApp()
Component({
  data: {
    lists: [[], []],
    tabMenus: ['处理中', '已处理'],
    currentIndex: 0,
    pageIndexes: [1, 1],
    pageSize: 5,
    finished: [false, false],
    totalCount: [null, null]
  },
  methods: {
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
        _handlinglist(app.globalData.uid, this.data.pageIndexes[0], this.data.pageSize),
        _handledlist(app.globalData.uid, this.data.pageIndexes[1], this.data.pageSize),
      ]).then(res => {
        wx.stopPullDownRefresh()
        wx.hideLoading()
        let lists = res.map(item => {
          let list = item.data.Repair_Apply_list.map(ele => {
            ele.AddTime = formatDate(new Date(ele.AddTime), 'yyyy/MM/dd hh:mm')
            return ele
          })
          return list
        })

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
        console.log(err)
        wx.hideLoading()
        wx.stopPullDownRefresh()
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
        this.data.tabMenus[currentIndex],
        this.data.pageIndexes[currentIndex],
        this.data.pageSize
      ).then(res => {
        this.data.lists[currentIndex] = this.data.lists[currentIndex].concat(res.data.Repair_Apply_list)
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
    },
    onReady() { },
    onShow() {
      this.data.finished = [false, false]
      this.data.pageIndexes = [1, 1]
      this.data.totalCount = [null, null]
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
        finished: this.data.finished,
        lists: this.data.lists
      })
      this.totalQuery()
    },
    onShareAppMessage() { }
  }
})