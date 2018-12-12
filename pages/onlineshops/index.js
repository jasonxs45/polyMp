const banners = ['https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-1?wid=1068&hei=640&fmt=png-alpha&.v=1536171355016',
  'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-3?wid=2000&hei=1536&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1535396227637',
  'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-4?wid=2000&hei=1536&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1535396223232'
]
const list = ['https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-section1-holiday-201811?wid=564&hei=516&fmt=png-alpha&qlt=80&.v=1540674991315', 'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-1?wid=1068&hei=640&fmt=png-alpha&.v=1536171355016',
  'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-3?wid=2000&hei=1536&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1535396227637',
  'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-4?wid=2000&hei=1536&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1535396223232',
  'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-section1-holiday-201811?wid=564&hei=516&fmt=png-alpha&qlt=80&.v=1540674991315']
Page({
  data: {
    avatar: '',
    nickname: '',
    role: '',
    points: '12331323',
    steps: [1, 1, 1, 2, 2, 3, 5],
    signedDays: 2,
    submitLoading: false,
    submitDisabled: false,
    cardShort: true,
    succShow: true,
    banners,
    list,
    fixed: false,
    orderRules: ['common', 'price'],
    orderIndex: 0,
    ascending: true,
    commonSortsShow: false,
    commonSorts: ['综合排序', '新品优先', '最受欢迎'],
    commonSortsIndex: 0,
    sortBarTop: null
  },
  toggleCard () {
    this.data.cardShort = !this.data.cardShort
    this.setData({
      cardShort: this.data.cardShort
    })
  },
  showSucc () {
    this.setData({
      succShow: true
    })
  },
  hideSucc() {
    this.setData({
      succShow: false
    })
  },
  orderByCommon() {
    if (this.data.orderIndex === 0) {
      this.setData({
        commonSortsShow: !this.data.commonSortsShow
      })
    } else {
      this.setData({
        orderIndex: 0
      })
    }
  },
  commonOrderChange(e) {
    this.setData({
      commonSortsIndex: parseInt(e.detail.value),
      commonSortsShow: false
    })
  },
  orderByPrice() {
    if (this.data.orderIndex === 1) {
      this.setData({
        ascending: !this.data.ascending
      })
    } else {
      this.setData({
        orderIndex: 1,
        ascending: true
      })
    }
  },
  _onScroll (top) {
    this.data.fixed = this.data.sortBarTop <= top
    this.setData({
      fixed: this.data.fixed
    })
  },
  onLoad(options) { },
  onReady() {
    const query = wx.createSelectorQuery()
    query.select('.sortbar').boundingClientRect(res => {
      this.data.sortBarTop = res.top
    }).exec()
  },
  onShow() { },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() { },
  onPageScroll (obj) {
    this._onScroll(obj.scrollTop)
  },
  onShareAppMessage() { }
})