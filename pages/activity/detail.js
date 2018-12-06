import { data} from './data'
Page({
  data: {
    detail: {}
  },
  jump: function (e) {
    wx.navigateTo({
      url: '/pages/activity/detail?id=' + e.currentTarget.dataset.id
    })
  },
  onLoad: function (options) {
    //生命周期函数--监听页面加载
    for(let i = 0; i<data.length; i++){
      if (data[i].id == options.id){
        this.setData({
          detail: data[i]
        })
        break
      }
    }
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
  onShareAppMessage: function () {
    // 用户点击右上角分享
  }
})