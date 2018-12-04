import behaviors from './behaviors'
Component({
  data: {
    role: '员工',
    tabs: [],
    currentIndex: 0
  },
  methods: {
    onLoad(options) {
      this.setData({
        tabs: tabs.filter(item => item.role === this.data.role)
      })
    },
    onReady() { },
    onShow() { },
    onHide() { },
    onUnload() { },
    onPullDownRefresh() { },
    onReachBottom() { },
    onShareAppMessage() { }
  }
})