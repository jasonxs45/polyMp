import { _homelist } from '../../common/menus'
import { _list as _bannerlist } from '../../common/banner'
import { _list as _goodslist }  from '../../common/shop'
import { _list as _actlist } from '../../common/activity'
import { _ad } from '../../common/ad'
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
    url: '/pages/repairuser/list'
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
    banners: [],
    actList: [],
    goodsList: [],
    entries: [],
    power: null,
    ad: null,
    adshow: true
  },
  getList () {
    let member = app.globalData.member || wx.getStorageSync('member')
    this.data.power = member && member.Type === '租户' ? 2 : 1
    _homelist(this.data.power).then(res => {
      // 入口菜单
      let entries = res.data.Home_Menu_list
      this.setData({
        entries
      })
    }).catch(err => {
      console.log(err)
    })
  },
  totalQuery() {
    // app.loading('加载中')
    Promise.all([
      _bannerlist('首页banner'),
      _goodslist(undefined, undefined, undefined, true),
      _actlist('unover', app.globalData.member.ID, 1, 3),
      _ad()
    ]).then(res => {
      console.log(res)
      wx.hideLoading()
      // banner
      let banners = res[0].data.AD_Config_list
      // 活动列表
      let actList = res[2].data.Activity_Activity_list
      // 商品列表
      let goodsList = res[1].data.Shop_Goods_list
      // 广告
      let ad = {
        img: res[3].data.Data.image,
        url: res[3].data.Data.url
      }
      this.setData({
        banners,
        goodsList,
        actList,
        ad
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(err) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  adLoaded () {
    this.setData({
      adshow: true
    })
  },
  hideAd () {
    this.setData({
      adshow: false
    })
  },
  onLoad() {
    app.memberReadyCb = () => {
    }
    app.fansReadyCb = () => {
      this.totalQuery()
      this.getList()
    }
    app.init()
  },
  onShow() {
    let uid = app.globalData.uid || wx.getStorageSync('uid')
    if (uid) {
      this.getList()
    }
  }
})