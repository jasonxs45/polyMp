const entires = [
  [
    { label: '访客记录', icon: './visit.png', url: '' },
    { label: '会务订单', icon: './meeting.png', url: '' }
  ],
  [
    { label: '我的活动', icon: './activities.png', url: '' },
    { label: '我的红包', icon: './bonus.png', url: '' },
    { label: '我的卡券', icon: './card.png', url: '' },
    { label: '我的积分', icon: './points.png', url: '/pages/mypoints/index' }
  ],
  [
    { label: '会员权益', icon: './rights.png', url: '' },
    { label: '服务建议', icon: './advise.png', url: '' },
    { label: '关于我们', icon: './about.png', url: '' }
  ]
]
import { _getscore } from '../../common/points'
import { formatNumber } from '../../utils/util'
const  app = getApp()
Page({
  data: {
    avatar: '',
    nickname: '',
    points: '123123123123',
    money: '2312313.12',
    entires
  },
  totalQuery() {
    app.loading('加载中')
    Promise.all([
      _getscore(app.globalData.member.ID)
    ]).then(res => {
      wx.hideLoading()
      // 积分
      let num = res[0].data.Score_Log_sum || 0
      this.setData({
        points: formatNumber(num, 0)
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
  },
  onShow() {
  },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() { },
  onShareAppMessage() { }
})