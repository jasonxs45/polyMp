const limit = 5
Page({
  data: {
    categories: [
      { name: '武汉122313123123' },
      { name: '长沙' },
      { name: '郑州' },
      { name: '成都' },
      { name: '武汉' },
      { name: '长沙' },
      { name: '郑州' },
      { name: '成都' }
    ],
    categoryIndex: null,
    limit,
    imgArr: [
      '../../images/logo.png',
      '../../images/logo.png',
      '../../images/logo.png',
      '../../images/logo.png',
      '../../images/logo.png'
    ],
    submitDisabled: false
  },
  categorySelect (e) {
    let value = e.detail.value
    this.setData({
      categoryIndex: value
    })
  },
  chooseImg() {
    wx.chooseImage({
      count: limit - this.data.imgArr.length,
      success: r => {
        this.setData({
          imgArr: r.tempFilePaths
        })
      },
      fail: e => { }
    })
  },
  delImg(e) {
    let index = e.currentTarget.dataset.index
    this.data.imgArr.splice(index, 1)
    this.setData({
      imgArr: this.data.imgArr
    })
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