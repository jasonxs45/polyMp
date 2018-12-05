const allCompanies = [
  { name: '公司1' },
  { name: '公司2' },
  { name: '公司3' },
  { name: '公司4' },
  { name: '公司5' },
  { name: '公司6' },
  { name: '公司7' },
  { name: '公司8' }
]
Page({
  data: {
    types: ['进场','出场'],
    typeIndex: 0,
    companyName: '',
    allCompanies,
    companies: [],
    companySelectIndex: null,
    name: '',
    tel: '',
    datetimeValue: null,
    description: '',
    imgArr: [
      '../../images/logo.png',
      '../../images/logo.png',
      '../../images/logo.png',
      '../../images/logo.png',
      '../../images/logo.png',
      '../../images/logo.png'
    ],
    submitDisabled: false
  },
  typeChange(e) {
    this.setData({
      typeIndex: e.detail
    })
  },
  companyInput(e) {
    let value = e.detail
    this.setData({
      companies: this.data.allCompanies.filter(item => item.name.includes(value)),
      companyName: value,
      companySelectIndex: null
    })
  },
  companySelect(e) {
    let value = e.detail
    this.setData({
      companySelectIndex: value,
      companyName: value !== null ? this.data.companies[value].name : ''
    })
  },
  nameInput(e) {
    let value = e.detail
    this.data.name = value
  },
  telInput(e) {
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
  chooseImg () {
    wx.chooseImage({
      success: r => {
        this.setData({
          imgArr: r.tempFilePaths
        })
      },
      fail: e => {}
    })
  },
  delImg (e) {
    let index = e.currentTarget.dataset.index
    this.data.imgArr.splice(index, 1)
    this.setData({
      imgArr: this.data.imgArr
    })
  },
  previewImg (e) {
    let index = e.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.imgArr[index],
      urls: this.data.imgArr
    })
  },
  submit () {
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
  onLoad (options) {},
  onReady () {},
  onShow () {},
  onHide () {},
  onUnload () {},
  onShareAppMessage () {}
})