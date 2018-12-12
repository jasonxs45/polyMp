Page({
  data: {
    avatar: '',
    nickname: '昵称',
    name: '测试',
    gender: '男',
    tel: '123',
    idnum: '12312313',
    company: '公司公司',
    modifyShow: false,
    modifyItem: '',
    submitDisabled: false
  },
  nameInput(e) {
    let value = e.detail
    this.setData({
      name: value
    })
  },
  genderChange(e) {
    this.setData({
      gender: e.detail.value
    })
  },
  telInput(e) {
    let value = e.detail
    this.setData({
      tel: value
    })
  },
  idNumInput(e) {
    let value = e.detail
    this.setData({
      idnum: value
    })
  },
  companyInput(e) {
    let value = e.detail
    this.setData({
      company: value
    })
  },
  cancel () {
    this.setData({
      modifyShow: false,
      modifyItem: ''
    })
  },
  show (e) {
    let modifyItem = e.currentTarget.dataset.item
    this.setData({
      modifyShow: true,
      modifyItem
    })
  },
  confirm () {
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    let modifyItem = this.data.modifyItem
    setTimeout(() => {
      wx.hideLoading()
      this.setData({
        [modifyItem]: this.data[modifyItem]
      }, () => {
        this.setData({
          modifyShow: false,
          modifyItem: ''
        })
      })
    }, 2000)
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