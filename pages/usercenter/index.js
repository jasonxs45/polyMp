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
  onLoad(options) {
    this.setData({
      points: formatNumber(this.data.points, 0),
      money: formatNumber(this.data.money, 2)
    })
  },
  onReady() { },
  onShow() {
    app.memberCheck(app.globalData.uid).then(r => {
      console.log(r)
    }).catch(e => {
      console.error(e)
    })
  },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() { },
  onShareAppMessage() { }
})