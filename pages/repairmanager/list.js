Component({
  data: {
    currentIndex: 0,
    tabs: [
      {
        num: 123,
        text: '待受理',
        target: 'unhandleList'
      },
      {
        num: 34,
        text: '已受理',
        target: 'handledList'
      }
    ],
    lists: {
      unhandleList: [1, 2, 3],
      handledList: [1, 2, 3, 4, 5]
    }
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
    onLoad(options) { },
    onReady() { },
    onShow() { },
    onHide() { },
    onUnload() { },
    onPullDownRefresh() { },
    onReachBottom() { },
    onShareAppMessage() { }
  }
})