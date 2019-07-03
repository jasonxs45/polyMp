import { _roomlist, _filter } from '../../common/meeting'
const computedBehavior = require('miniprogram-computed')
const app = getApp()
Component({
  behaviors: [computedBehavior],
  data: {
    list: [],
    filters: [],
    filterIndex: 0,
    filter: ''
  },
  computed: {
    filtedList() {
      console.log(this.data.filter)
      return this.data.list.filter(item => 
        this.data.filter ? item.RoomType == this.data.filter: true
        )
    }
  },
  methods: {
    totalQuery() {
      app.loading('加载中')
      Promise.all([
        _roomlist(),
        _filter()
      ]).then(res => {
        wx.hideLoading()
        let list = res[0].data.Meeting_Room_list
        let filters = res[1].data.Meeting_Room_distinct_ext.sort((a, b) => {
          return b - a
        }).map(item => {
          return {
            label: item,
            value: item
          }
        })
        filters.unshift({
          label: '全部',
          value: ''
        })
        this.setData({
          list,
          filters
        })
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.showModal({
          title: '对不起',
          content: JSON.stringify(err) || '网络错误，请稍后再试',
          showCancel: false
        })
      })
    },
    switchFilter(e) {
      let index = e.currentTarget.dataset.index
      this.data.filter = this.data.filters[index].value
      this.setData({
        filter: this.data.filter,
        filterIndex: index
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
    onPullDownRefresh() { },
    onReachBottom() { },
    onShareAppMessage() {
      return app.shareInfo
    }
  }
})