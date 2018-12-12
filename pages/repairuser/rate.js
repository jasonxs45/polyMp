const describes = [
  '非常不满意', '不满意', '一般', '满意', '非常满意'
]
Page({
  data: {
    describes,
    scores: [0, 0, 0]
  },
  rate (e) {
    let index = e.currentTarget.dataset.index
    let str = `scores[${index}]`
    this.setData({
      [str]: e.detail
    })
  },
  onLoad(options) { },
  onReady() { },
  onShow() { },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() { },
  onShareAppMessage() { }
})