import { _userdetail as _detail } from '../../common/repair'
import { formatDate } from '../../utils/util'
const describes = [
  '非常不满意', '不满意', '一般', '满意', '非常满意'
]
const app =getApp()
Page({
  data: {
    id: '',
    detail: null,
    rateItems: ['响应速度', '服务态度', '处理结果'],
    scores: [],
    steps: [],
    describes,
  },
  getDetail () {
    app.loading('加载中')
    _detail(this.data.id).then(res => {
      wx.hideLoading()
      let detail = res.data.Repair_Apply
      detail.AddTime = formatDate(new Date(detail.AddTime), 'yyyy/MM/dd hh:mm')
      detail.Img = detail.Img.split(',')
      let scores = [detail.Evaluate1, detail.Evaluate2, detail.Evaluate3]
      let steps = res.data.Repair_Process_list.map(item => {
        item.AddTime = formatDate(new Date(item.AddTime), 'yyyy/MM/dd hh:mm')
        return item
      })
      this.setData({
        detail,
        steps,
        scores
      })
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  goRate () {
    wx.navigateTo({
      url: `./rate?id=${this.data.id}`
    })
  },
  onLoad (options) {
    this.data.id = options.id
  },
  onReady () {},
  onShow () {
    app.memberReadyCb = () => {
      this.getDetail()
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onHide () {},
  onUnload () {},
  onPullDownRefresh () {},
  onReachBottom () {},
  onShareAppMessage() {
    return app.shareInfo
  }
})