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
    imgArr: [],
    submitDisabled: false
  },
  categorySelect (e) {
    let value = e.detail.value
    this.setData({
      categoryIndex: value
    })
  },
  uploadingHandler (e) {
  },
  uploadOverHandler (e) {
    this.setData({
      imgArr: this.data.imgArr.concat(e.detail.group)
    })
  },
  delHandler (e) {
    this.setData({
      imgArr: e.detail.group
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