import { _userlist as _list } from '../../common/repair'
import { formatDate } from '../../utils/util'
const app = getApp()
Component({
  data: {
    currentIndex: 0,
    tabs: [
      {
        text: '待受理',
        target: 'unhandleList'
      },
      {
        text: '处理中',
        target: 'handleList'
      },
      {
        text: '待评价',
        target: 'evaluateList'
      },
      {
        text: '已完成',
        target: 'finishList'
      }
    ],
    lists: [
      [], [], [], []
    ],
    pageIndexes: [1, 1, 1, 1],
    pageSize: 4,
    states: ['待受理', '处理中', '待评价', '已完成'],
    finished: [false, false, false, false],
    totalCount: [null, null, null, null]
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
      let arr = []
      for (let i = 0; i < this.data.tabs.length; i++) {
        arr.push(_list(app.globalData.member.ID, this.data.states[i], this.data.pageIndexes[i], this.data.pageSize))
      }
      Promise.all(arr).then(res => {
        wx.hideLoading()
        let lists = res.map(item => {
          let list = item.data.Repair_Apply_list.map(ele => {
            let addtime = new Date(ele.AddTime)
            ele.AddTime = formatDate(addtime, 'yyyy/MM/dd hh:mm')
            return ele
          })
          return item.data.Repair_Apply_list
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
      console.log(currentPageIndex)
      _list(
        app.globalData.member.ID,
        this.data.states[currentIndex],
        this.data.pageIndexes[currentIndex],
        this.data.pageSize
      ).then(res => {
        let list = res.data.Repair_Apply_list.map(ele => {
          let addtime = new Date(ele.AddTime)
          ele.AddTime = formatDate(addtime, 'yyyy/MM/dd hh:mm')
          return ele
        })
        this.data.lists[currentIndex] = this.data.lists[currentIndex].concat(list)
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
    onShow() {
    },
    onHide() { },
    onUnload() { },
    onPullDownRefresh() {
      this.setData({
        pageIndexes: [1, 1, 1, 1],
        finished: [false, false, false, false],
        totalCount: [null, null, null, null]
      })
      this.totalQuery()
    },
    onReachBottom() { },
    onShareAppMessage() { }
  }
})