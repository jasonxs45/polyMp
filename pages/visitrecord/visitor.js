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
    onLoad(options) {},
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