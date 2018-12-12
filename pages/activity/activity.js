import {data,data2} from './data'
Page({
  data: {
    actAll: data,
    actAll2: data2,
    tabMenus: [
      {
        name: '进行中'
      },
      {
        name: '已结束'
      }
    ],
    currentIndex: 0,
  },
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
  jump (e) {
    wx.navigateTo({
      url: '/pages/activity/detail?id=' + e.currentTarget.dataset.id
    })
  },
  onLoad (options) {},
  onReady () {},
  onShow () {},
  onHide () {},
  onUnload () {},
  onPullDownRefresh () {},
  onReachBottom () {},
  onShareAppMessage () {}
})