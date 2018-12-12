const describes = [
  '非常不满意', '不满意', '一般', '满意', '非常满意'
]
Page({
  data: {
    imgArr: [
      '../../images/logo.png',
      '../../images/logo.png',
      '../../images/logo.png',
      '../../images/logo.png',
      '../../images/logo.png'
    ],
    steps: [
      {
        date: '2018-03-12 09：34',
        desc: '您所提交的订单已联系您所提交的订单已联系您所提交的订单已联系您所提交的订单已联系'
      },
      {
        date: '2018-03-12 09：34',
        desc: '您所提交的订单已联系您所提交的订单已联系您所提交的订单已联系您所提交的订单已联系'
      },
      {
        date: '2018-03-12 09：34',
        desc: '您所提交的订单已联系您所提交的订单已联系您所提交的订单已联系您所提交的订单已联系'
      }
    ],
    describes,
    scores: [2, 4, 3]
  },
  previewImg(e) {
    let index = e.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.imgArr[index],
      urls: this.data.imgArr
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