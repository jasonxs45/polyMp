import { fetch } from '../../common/api'
import { _list as _goodslist }  from '../../common/shop'
import { _list as _actlist } from '../../common/activity'
const banners = ['https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-1?wid=1068&hei=640&fmt=png-alpha&.v=1536171355016',
  'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-3?wid=2000&hei=1536&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1535396227637',
  'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-4?wid=2000&hei=1536&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1535396223232'
]
const entries = [
  {
    icon: './visitapply.png',
    name: '访客预约',
    url: '/pages/visitapply/index'
  },
  {
    icon: './meetting.png',
    name: '会务预约',
    url: '/pages/visitapply/index'
  },
  {
    icon: './conference.png',
    name: '电子放行单',
    url: '/pages/conference/apply'
  },
  {
    icon: './repair.png',
    name: '报修投诉',
    url: '/pages/repairuser/submit'
  },
  {
    icon: './onlineshop.png',
    name: '积分商城',
    url: '/pages/onlineshops/index'
  }
]
const app = getApp()
Page({
  data: {
    banners,
    actList: [],
    goodsList: [],
    entries
  },
  totalQuery() {
    app.loading('加载中')
    Promise.all([
      _goodslist(undefined, undefined, undefined, true),
      _actlist('unover', 1, 3)
    ]).then(res => {
      wx.hideLoading()
      // 活动列表
      let actList = res[1].data.Activity_Activity_list
      // 商品列表
      let goodsList = res[0].data.Shop_Goods_list
      this.setData({
        goodsList,
        actList
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
  onLoad() {
    app.memberReadyCb = () => {
      this.totalQuery()
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onShow() {
  }
})