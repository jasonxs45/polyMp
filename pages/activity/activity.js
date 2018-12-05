const actAll = [
  { id: '1', src: '1.png', name: 'P1+P2会议室1', figure: '可容纳150人', address: '武汉市洪山区关山大道322号保利国' },
  { id: '2', src: '2.png', name: 'P1+P2会议室2', figure: '可容纳150人', address: ' 武汉市洪山区关山大道322号保利国' },
  { id: '3', src: '3.png', name: 'P1+P2会议室3', figure: '可容纳150人', address: '武汉市洪山区关山大道322号保利国' }
]
const actAll2 = [
  { id: '1', src: '1.png', name: 'P1+P2会议室1', figure: '可容纳150人', address: '武汉市洪山区关山大道322号保利国' },
  { id: '2', src: '2.png', name: 'P1+P2会议室2', figure: '可容纳150人', address: ' 武汉市洪山区关山大道322号保利国' },
  { id: '3', src: '3.png', name: 'P1+P2会议室3', figure: '可容纳150人', address: '武汉市洪山区关山大道322号保利国' },
  { id: '4', src: '1.png', name: 'P1+P2会议室4', figure: '可容纳150人', address: '武汉市洪山区关山大道322号保利国' },
  { id: '5', src: '2.png', name: 'P1+P2会议室5', figure: '可容纳150人', address: ' 武汉市洪山区关山大道322号保利国' },
  { id: '6', src: '3.png', name: 'P1+P2会议室6', figure: '可容纳150人', address: '武汉市洪山区关山大道322号保利国' }
]
Page({
  data: {
    actAll,
    actAll2: actAll2,
    tabMenus: [
      {
        name: '进行中',
        target: 'formal'
      },
      {
        name: 'getOn',
        target: 'finish'
      }
    ],
    moveBarStyle: '',
    activelistMode: 0
  },
  tabChangeHandler(e) {
    console.log(e)
    let activeTabIndex = e.target.dataset.index
    this.setData({
      moveBarStyle: 'left:' + e.target.offsetLeft + 'px'
    })
    //this.moveBar()
  },
  jump: function (e) {
    // wx.navigateTo({
    //   url: '/pages/conferenceDet/conferenceDet?id=' + e.currentTarget.dataset.id
    // })
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
    // wx.stopPullDownRefresh()
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