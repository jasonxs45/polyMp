import behavior from './behaviors'
Component({
  behaviors: [behavior],
  data: {
    role: '员工',
    tabs: [
      {
        num: 34,
        text: '发出的邀访'
      },
      {
        num: 34,
        text: '常用联系人'
      }
    ],
    currentIndex: 0,
    outLists: [
      { open: false }, { open: false }, { open: false }, { open: false }, { open: false }
    ]
  },
  methods: {
    onLoad(options) {},
    onReady() { },
    onShow() { },
    onHide() { },
    onUnload() { },
    onPullDownRefresh() { },
    onReachBottom() { },
    onShareAppMessage() { }
  }
})