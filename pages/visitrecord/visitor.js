import behaviors  from './behaviors'
Component({
  data: {
    role: '访客',
    tabs: [
      {
        num: 123,
        text: '发出的申请'
      },
      {
        num: 34,
        text: '收到的邀访'
      },
      {
        num: 34,
        text: '常用联系人'
      }
    ],
    outLists: [
      { open: false }, { open: false }, { open: false }, { open: false }, { open: false }
    ]
  },
  behaviors: [behaviors],
  methods: {
    toggleDetail (e) {
      let index = parseInt(e.currentTarget.dataset.index)
      let open = this.data.outLists[index].open
      let str = `outLists[${index}].open`
      this.setData({
        [str]: !open
      })
    },
    onLoad(options) {
      this.data.barWidth = 100 / this.data.tabs.length + '%'
      this.setData({
        barWidth: this.data.barWidth
      })
    },
    onReady() { },
    onShow() { },
    onHide() { },
    onUnload() { },
    onPullDownRefresh() { },
    onReachBottom() {
      console.log(123)
    },
    onShareAppMessage() { }
  }
})