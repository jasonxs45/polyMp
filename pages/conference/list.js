const conAll = [
  { id: '1', src: 'cs.jpg', name: 'P1+P2会议室1', figure: '可容纳150人', address: '武汉市洪山区关山大道322号保利国' },
  { id: '2', src: 'cs.jpg', name: 'P1+P2会议室2', figure: '可容纳150人', address: ' 武汉市洪山区关山大道322号保利国' },
  { id: '3', src: 'cs.jpg', name: 'P1+P2会议室3', figure: '可容纳150人', address: '武汉市洪山区关山大道322号保利国' },
  { id: '4', src: 'cs.jpg', name: 'P1+P2会议室4', figure: '可容纳150人', address: '武汉市洪山区关山大道322号保利国' },
]
Page({
  data: {
    conAll
  },
  jump(e) {
    wx.navigateTo({
      url: '/pages/conference/detail?id=' + e.currentTarget.dataset.id
    })
  },
  onLoad (options) {
  },
  onReady () {
  },
  onShow () {
  },
  onHide () {
  },
  onUnload () {
  },
  onPullDownRefresh () {
    this.setData({
      conAll: conAll
    })
  },
  onReachBottom () {
    let con = this.data.conAll.concat(conAll)
    this.setData({
      conAll: con
    })
  },
  onShareAppMessage () {
  }
})