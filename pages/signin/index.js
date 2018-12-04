import { formatNumber } from '../../utils/util'
Page({
  data: {
    avatar: '',
    nickname: '',
    role: '',
    points: '12331323',
    steps: [1, 1, 1, 2, 2, 3, 5],
    signedDays: 2,
    submitLoading: false,
    submitDisabled: false
  },
  onLoad(options) {
    this.data.points = formatNumber(this.data.points, 0)
    this.setData({
      points: this.data.points
    })
  },
  onReady() { },
  onShow() { },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() { },
  onShareAppMessage() { }
})