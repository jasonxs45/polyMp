import { tabs, tabChange } from './mixins'
Page({
  data: {
    role: '访客',
    tabs: [],
    currentIndex: 0
  },
  tabChange,
  onLoad (options) {
    this.setData({
      tabs: tabs.filter(item => item.role === this.data.role)
    })
  },
  onReady () {},
  onShow () {},
  onHide () {},
  onUnload () {},
  onPullDownRefresh () {},
  onReachBottom () {},
  onShareAppMessage () {}
})