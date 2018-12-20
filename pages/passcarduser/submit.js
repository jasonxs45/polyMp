Page({
  data: {
    goodsArr: [],
    datetimeValue: null,
    description: '',
    submitDisabled: false
  },
  nameInput(e) {
    let value = e.detail
    this.data.name = value
  },
  countInput(e) {
    let value = e.detail
    this.data.tel = value
  },
  changeDateTime(e) {
    this.data.datetimeValue = e.detail
  },
  bindTextAreaBlur(e) {
    let value = e.detail.value
    this.setData({
      description: value
    })
  },
  addLine() {
    this.data.goodsArr.push({
      img: '',
      name: '',
      count: 1
    })
    this.setData({
      goodsArr: this.data.goodsArr
    })
  },
  remove(e) {
    let index = e.currentTarget.dataset.index
    this.data.goodsArr.splice(index, 1)
    this.setData({
      goodsArr: this.data.goodsArr
    })
  },
  chooseImg(e) {
    let index = e.currentTarget.dataset.index
    let str = `goodsArr[${index}].img`
    wx.chooseImage({
      count: 1,
      success: r => {
        this.setData({
          [str]: r.tempFilePaths[0]
        })
      },
      fail: e => { }
    })
  },
  delImg(e) {
    let index = e.currentTarget.dataset.index
    this.data.goodsArr[index].img = ''
    let str = `goodsArr[${index}].img`
    this.setData({
      [str]: ''
    })
  },
  previewImg(e) {
    let index = e.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.goodsArr[index].img,
      urls: [this.data.goodsArr[index].img]
    })
  },
  submit() {
    wx.showModal({
      title: '提交成功',
      content: '恭喜您已提交成功，请耐心等候\r\n我们将尽快为您审核通过',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onLoad(options) { },
  onReady() { },
  onShow() { },
  onHide() { },
  onUnload() { },
  onShareAppMessage() { }
})