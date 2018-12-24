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
    entries: []
  },
  totalQuery() {
    app.loading('加载中')
    let uid = app.globalData.uid || wx.getStorageSync('uid')
    Promise.all([
      _bannerlist('服务banner'),
      _servicelist(uid)
    ]).then(res => {
      wx.hideLoading()
      // banner
      let banners = res[0].data.AD_Config_list
      // 入口菜单
      let entries = res[1].data.Data.Menu
      let powerEntries = res[1].data.Data.PowerMenu
      this.setData({
        banners,
        entries,
        powerEntries
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
    }
    app.init()
  }
})