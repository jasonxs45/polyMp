const entries = [
  [
    { label: '申访记录', icon: './visit.png', url: '/pages/visitrecord/visitor' },
    { label: '会务订单', icon: './meeting.png', url: '/pages/conference/orderlist' }
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
import { _updateInfo } from '../../common/usercenter'
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
    role: '',
    cardClass: 'common',
    entries
  },
  getScore() {
    _getscore(app.globalData.member.ID).then(res => {
      // 积分
      let num = res.data.Score_Log_sum || 0
      this.setData({
        points: formatNumber(num, 0)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  getMoney() {
    _money(app.globalData.member.ID).then(res => {
      // 红包
      let money = res.data.Red_Log_sum || 0
      this.setData({
        money: formatNumber(money, 2)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  updateInfo(cb) {
    _updateInfo(app.globalData.uid).then(res => {
      if (res.data.IsSuccess) {
        // 判断是否有粉丝信息，有就直接获取，没有就跳转授权页面
        if (res.data.Data.Fans) {
          wx.setStorageSync('fans', res.data.Data.Fans)
          app.globalData.fans = res.data.Data.Fans
          wx.setStorageSync('member', res.data.Data.Member)
          app.globalData.member = res.data.Data.Member
          let str = 'entries[0][0]'
          let cardClass = ''
          let level = app.globalData.member.Level
          let role = '访客'
          // level = ''
          switch (level) {
            case '黑金':
              cardClass = 'black'
              role = level + '会员'
              break;
            case '黄金':
              cardClass = 'yellow'
              role = level + '会员'
              break;
            case '白金':
              cardClass = 'white'
              role = level + '会员'
              break;
            default:
              cardClass = 'common'
              role = '访客'
          }
          this.setData({
            avatar: app.globalData.fans.HeadImgUrl,
            nickname: app.globalData.fans.NickName,
            role,
            cardClass,
            [str]: {
              label: app.globalData.member.Type === '租户' ? '邀访记录' : '申访记录',
              icon: './visit.png',
              url: `/pages/visitrecord/${app.globalData.member.Type === '租户' ? 'staff' : 'visitor'}`
            }
          })
          cb && cb()
        }
      }
    })
  },
  totalQuery() {
    this.updateInfo(() => {
      this.getMoney()
      this.getScore()
    })
  },
  onLoad(options) {
  },
  onReady() {
  },
  onShow() {
    app.memberReadyCb = () => {
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
  onShareAppMessage() {
    return app.shareInfo
  }
})