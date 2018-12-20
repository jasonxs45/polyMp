// pages/passcard/list.js
Page({
  data: {
    list: [
      {
        jieg: '审核中',
      },
      {
        jieg: '审核通过',
      },
      {
        jieg: '已拒绝',
      }
    ],
    bomb: false
  },
  jump: function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: './details?id=' + e.currentTarget.dataset.id
    })
  },
  close: function () {
    this.setData({
      bomb: false,
    })
  },
  show: function () {
    this.setData({
      bomb: true,
    })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
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
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
  }
})