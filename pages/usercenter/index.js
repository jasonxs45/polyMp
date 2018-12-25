const entries = [
  [
    { label: '申访记录', icon: './visit.png', url: '/pages/visitrecord/visitor' },
    { label: '会务订单', icon: './meeting.png', url: '/pages/conference/list' }
  ],
  [
    { label: '我的活动', icon: './activities.png', url: '/pages/myactivities/list' },
    { label: '我的红包', icon: './bonus.png', url: '/pages/mymoney/index' },
    { label: '我的卡券', icon: './card.png', url: '/pages/onlineshops/record' },
    { label: '我的积分', icon: './points.png', url: '/pages/mypoints/index' }
  ],
  [
    { label: '会员权益', icon: './rights.png', url: '/pages/news/detail?id=1' },
    { label: '联系我们', icon: './advise.png', url: '/pages/news/detail?id=2' },
    { label: '关于我们', icon: './about.png', url: '/pages/news/detail?id=3' }
  ]
]
import { _getscore } from '../../common/points'
import { _money } from '../../common/money'
import { formatNumber } from '../../utils/util'
const app = getApp()
Page({
  data: {
    avatar: '',
    nickname: '',
    points: '',
    money: '',
    entries
  },
  totalQuery() {
    app.loading('加载中')
    Promise.all([
      _getscore(app.globalData.member.ID),
      _money(app.globalData.member.ID)
    ]).then(res => {
      wx.hideLoading()
      // 积分
      let num = res[0].data.Score_Log_sum || 0
      // 红包
      let money = res[1].data.Red_Log_sum || 0
      this.setData({
        points: formatNumber(num, 0),
        money: formatNumber(money, 2)
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
  },
  onReady() {
  },
  onShow() {
    app.memberReadyCb = () => {
      let str = 'entries[0][0]'
      this.setData({
        avatar: app.globalData.fans.HeadImgUrl,
        nickname: app.globalData.fans.NickName,
        role: app.globalData.member.Type,
        [str]: {
          label: app.globalData.member.Type === '租户' ? '邀访记录' : '申访记录',
          icon: './visit.png',
          url: `/pages/visitrecord/${app.globalData.member.Type === '租户' ? 'staff' : 'visitor'}`
        }
      })
      this.totalQuery()
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() { },
  onShareAppMessage() { }
})