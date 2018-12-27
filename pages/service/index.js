import { _list as _bannerlist } from '../../common/banner'
import { _homelist, _servicelist } from '../../common/menus'
const entries = [
  {
    icon: '',
    name: '访客预约',
    url: '/pages/visitapply/index'
  },
  {
    icon: '',
    name: '会务预约',
    url: '/pages/visitapply/index'
  },
  {
    icon: '',
    name: '电子放行单',
    url: '/pages/conference/apply'
  },
  {
    icon: '',
    name: '报修投诉',
    url: '/pages/repairuser/submit'
  },
  {
    icon: '',
    name: '积分商城',
    url: '/pages/onlineshops/index'
  }
]
const app = getApp()
Page({
  data: {
    banners: [],
    entries: [],
    powerEntries: []
  },
  getEntries () {
    let uid = app.globalData.uid || wx.getStorageSync('uid')
    _servicelist(uid).then(res => {
      // 入口菜单
      let entries = res.data.Data.Menu
      let powerEntries = res.data.Data.PowerMenu
      this.setData({
        entries,
        powerEntries
      })
    }).catch(err => {
      console.log(err)
    })
  },
  totalQuery() {
    app.loading('加载中')
    Promise.all([
      _bannerlist('服务banner')
    ]).then(res => {
      wx.hideLoading()
      // banner
      let banners = res[0].data.AD_Config_list
      this.setData({
        banners
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
  onLoad(options) {
    app.memberReadyCb = () => {
    }
    app.fansReadyCb = () => {
      this.totalQuery()
      this.getEntries()
    }
    app.init()
  },
  onShow() {
    let uid = app.globalData.uid || wx.getStorageSync('uid')
    if (uid) {
      this.getEntries()
    }
  }
})