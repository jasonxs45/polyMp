import { _orderdetail as _detail, _pay } from '../../common/meeting'
import { formatDate, formatNumber } from '../../utils/util'
const computedBehavior = require('miniprogram-computed')
const app = getApp()
Component({
  behaviors: [computedBehavior],
  data: {
    id: null,
    detail: null
  },
  computed: {
    price() {
      if (this.data.detail && this.data.detail.OrderAmount) {
        return formatNumber(this.data.detail.OrderAmount, 2)
      } else {
        return 0.00
      }
    }
  },
  methods: {
    getDetail() {
      app.loading('加载中')
      _detail(this.data.id).then(res => {
        wx.hideLoading()
        let detail = res.data.Meeting_Apply
        detail.AddTime = formatDate(new Date(detail.AddTime), 'yyyy年MM月dd hh:mm')
        detail.TimeList = JSON.parse(detail.TimeList)
        this.setData({
          detail
        })
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.showModal({
          title: '对不起',
          content: '请求失败，请稍后再试'
        })
      })
    },
    doPay() {
      let uid = app.globalData.uid || wx.getStorageSync('uid')
      app.loading('加载中')
      _pay(uid, this.data.id).then(res => {
        console.log(res)
        wx.hideLoading()
        if (res.data.IsSuccess) {
          let r = res.data.Data
          console.log(r)
          wx.requestPayment({
            timeStamp: r.timeStamp,
            nonceStr: r.nonceStr,
            package: r.package,
            signType: 'MD5',
            paySign: r.paySign,
            success: re => {
              console.log(re)
              wx.showModal({
                title: '温馨提示',
                content: '支付成功',
                showCancel: false,
                success: rr => {
                  this.getDetail()
                }
              })
            },
            fail: er => {
              console.log(er)
              wx.showModal({
                title: '温馨提示',
                content: '支付失败',
                showCancel: false,
                success: r => {
                  this.getDetail()
                }
              })
            }
          })
        } else {
          wx.showModal({
            title: '对不起',
            content: res.data.Msg,
            showCancel: false
          })
        }
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    },
    onLoad(options) {
      this.data.id = options.id
      app.memberReadyCb = () => {
        this.getDetail()
      }
      app.fansReadyCb = () => {
        app.checkMember()
      }
    },
    onReady() { },
    onShow() {
      app.init()
    },
    onHide() { },
    onUnload() { },
    onPullDownRefresh() { },
    onReachBottom() { },
    onShareAppMessage() { }
  }
})