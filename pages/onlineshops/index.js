const banners = ['https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-1?wid=1068&hei=640&fmt=png-alpha&.v=1536171355016',
  'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-3?wid=2000&hei=1536&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1535396227637',
  'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-4?wid=2000&hei=1536&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1535396223232'
]
import { _getscore } from '../../common/points'
import { _signinList, _signin } from '../../common/signin'
import { _list } from '../../common/shop'
import { formatNumber } from '../../utils/util'
const app = getApp()
Page({
  data: {
    avatar: '',
    nickname: '',
    role: '',
    points: '',
    steps: [],
    signedDays: 0,
    submitDisabled: false,
    cardShort: false,
    succShow: false,
    banners,
    list: [],
    order: 'Sort',
    pageIndex: 1,
    pageSize: 4,
    totalCount: null,
    finished: false,
    fixed: false,
    orderRules: ['common', 'price'],
    orderIndex: 0,
    ascending: true,
    commonSortsShow: false,
    commonSorts: [
      { label: '综合排序', order: 'Sort' },
      { label: '新品优先', order: 'AddTime-' },
      { label: '最受欢迎', order: 'ExchangeCount-' }
    ],
    commonSortsIndex: 0,
    sortBarTop: null
  },
  toggleCard() {
    this.data.cardShort = !this.data.cardShort
    this.setData({
      cardShort: this.data.cardShort
    })
  },
  showSucc() {
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
    let index = parseInt(e.detail.value)
    this.data.order = this.data.commonSorts[index].order
    this.setData({
      commonSortsIndex: index,
      commonSortsShow: false
    })
    this.orderList()
  },
  orderByPrice() {
    if (this.data.orderIndex === 1) {
      this.setData({
        ascending: !this.data.ascending
      })
      this.data.order = this.data.ascending ? 'Score' : 'Score-'
    } else {
      this.data.order = 'Score'
      this.setData({
        orderIndex: 1,
        ascending: true
      })
    }
    this.orderList()
  },
  signIn() {
    this.setData({
      submitDisabled: true
    })
    _signin(app.globalData.uid).then(res => {
      this.setData({
        submitDisabled: false
      })
      if (res.data.IsSuccess) {
        this.setData({
          succShow: true,
          signedDays: this.data.signedDays + 1
        })
      } else {
        wx.showModal({
          title: '对不起',
          content: res.data.Msg,
          showCancel: false
        })
      }
    }).catch(err => {
      this.setData({
        submitDisabled: false
      })
      console.log(err)
    })
  },
  orderList () {
    app.loading('加载中')
     this.data.pageIndex = 1
    _list(this.data.order, this.data.pageIndex, this.data.pageSize).
      then(res => {
        wx.hideLoading()
        let list = res.data.Shop_Goods_list
        this.setData({
          list
        })
      }).catch(err => {
        wx.hideLoading()
        wx.showModal({
          title: '对不起',
          content: '网络错误，请稍后再试',
          showCancel: false
        })
        console.log(err)
      })    
  },
  // 拼接商品列表
  concatGoodsList() {
    _list(this.data.order, this.data.pageIndex, this.data.pageSize).
      then(res => {
        let list = res.data.Shop_Goods_list
        this.setData({
          list: this.data.list.concat(list)
        })
      }).catch(err => {
        console.log(err)
        wx.showModal({
          title: '对不起',
          content: '网络错误，请稍后再试',
          showCancel: false
        })
      })
  },
  _onScroll(top) {
    this.data.fixed = this.data.sortBarTop <= top
    this.setData({
      fixed: this.data.fixed
    })
  },
  totalQuery() {
    app.loading('加载中')
    Promise.all([
      _getscore(app.globalData.member.ID),
      _signinList(app.globalData.uid),
      _list(this.data.order, this.data.pageIndex, this.data.pageSize)
    ]).then(res => {
      wx.hideLoading()
      // 积分
      let num = res[0].data.Score_Log_sum || 0
      // 签到记录
      let steps = res[1].data.Data.RewardList
      let signedDays = res[1].data.Data.Lantern
      // 商品列表
      let list = res[2].data.Shop_Goods_list
      let totalCount = res[2].data.total_count
      if (list.length >= totalCount) {
        this.data.finished = true
      }
      this.setData({
        points: formatNumber(num, 0),
        steps,
        signedDays,
        list,
        totalCount,
        finished: this.data.finished
      })
    }).catch(err => {
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(err) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  onLoad(options) {
    app.memberReadyCb = () => {
      this.setData({
        avatar: app.globalData.fans.HeadImgUrl,
        nickname: app.globalData.fans.NickName,
        role: app.globalData.member.Type
      })
      this.totalQuery()
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onReady() {
    const query = wx.createSelectorQuery()
    query.select('.sortbar').boundingClientRect(res => {
      this.data.sortBarTop = res.top
    }).exec()
  },
  onShow() {
    // app.checkMember()
  },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() {
    if (this.data.list.length >= this.data.totalCount) {
      this.setData({
        finished: true
      })
    } else {
      this.data.pageIndex += 1
      this.concatGoodsList()
    }
  },
  onPageScroll(obj) {
    this._onScroll(obj.scrollTop)
  },
  onShareAppMessage() { }
})