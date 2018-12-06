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
  jump: function (e) {
    wx.navigateTo({
      url: '/pages/activity/detail?id=' + e.currentTarget.dataset.id
    })
  },
  onLoad: function (options) {
    //生命周期函数--监听页面加载
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    //生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    console.log("下拉动作")
    // this.setData({
    //   actAll: actAll
    // })
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    console.log("页面上拉")
    // let act = this.data.actAll.concat(actAll)
    // this.setData({
    //   actAll: act
    // })
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
  }
})