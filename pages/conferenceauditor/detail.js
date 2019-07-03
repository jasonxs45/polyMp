import {
    _orderdetail as _detail,
    _cancel,
    _audit,
    _confirmPay
} from '../../common/meeting'
import { formatDate, formatNumber } from '../../utils/util'
const computedBehavior = require('miniprogram-computed')
const app = getApp()
Component({
  behaviors: [computedBehavior],
  data: {
    id: null,
    detail: null,
    goodsArr: []
  },
  computed: {
    price () {
      if (this.data.detail && this.data.detail.OrderAmount) {
        return formatNumber(this.data.detail.OrderAmount, 2)
      } else {
        return 0.00
      }
    },
    payBack () {
      return this.data.detail && this.data.detail.VoucherImg
             ? [this.data.detail.VoucherImg] : []
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
        let goodsArr = detail.ItemList ? JSON.parse(detail.ItemList) : []
        goodsArr.forEach(item => {
          item.price = Number(item.price)
          // item.price = formatNumber(item.price, 2)
        })
        this.setData({
          detail,
          goodsArr
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
    // 取消订单
    cancel () {
      wx.showModal({
        title: '温馨提示',
        content: '确定取消吗？',
        success: r => {
          if (r.confirm) {
            app.loading('加载中')
            let ID = this.data.id
            let UnionID = app.globalData.uid || wx.getStorageSync('uid')
            _cancel(ID, UnionID).then(res => {
              console.log(res)
              wx.hideLoading()
              wx.showModal({
                title: res.data.IsSuccess ? '温馨提示':'对不起',
                content: res.data.Msg,
                showCancel: false,
                success: re => {
                  wx.navigateBack()
                }
              })
            }).catch(err => {
              console.log(err)
              wx.hideLoading()
              wx.showModal({
                title: '对不起',
                content: '请求失败，请稍后再试！',
                showCancel: false
              })
            })
          }
        }
      })
    },
    // 审核通过
    audit () {
      wx.showModal({
        title: '温馨提示',
        content: '确定通过吗？',
        success: r => {
          if (r.confirm) {
            app.loading('加载中')
            let ID = this.data.id
            let UnionID = app.globalData.uid || wx.getStorageSync('uid')
            _audit(ID, UnionID).then(res => {
              console.log(res)
              wx.hideLoading()
              wx.showModal({
                title: res.data.IsSuccess ? '温馨提示' : '对不起',
                content: res.data.Msg,
                showCancel: false,
                success: re => {
                  wx.navigateBack()
                }
              })
            }).catch(err => {
              console.log(err)
              wx.hideLoading()
              wx.showModal({
                title: '对不起',
                content: '请求失败，请稍后再试！',
                showCancel: false
              })
            })
          }
        }
      })
    },
    // 确认支付
    confirmPay () {
      let itemList = ['现金', '刷卡', '转账', '其他']
      wx.showActionSheet({
        itemList,
        success: r => {
          wx.showModal({
            title: '温馨提示',
            content: '确定已支付吗？',
            success: res => {
              if (res.confirm) {
                let ID = this.data.id
                let UnionID = app.globalData.uid || wx.getStorageSync('uid')
                let PayType = itemList[r.tapIndex]
                app.loading('加载中')
                _confirmPay(ID, UnionID, PayType).then(re => {
                  console.log(re)
                  wx.hideLoading()
                  wx.showModal({
                    title: re.data.IsSuccess ? '温馨提示' : '对不起',
                    content: re.data.Msg,
                    showCancel: false,
                    success: r => {
                      if (r.confirm) {
                        wx.navigateBack()
                      }
                    }
                  })
                }).catch(err => {
                  console.log(err)
                  wx.hideLoading()
                  wx.showModal({
                    title: '对不起',
                    content: '请求失败，请稍后再试',
                    showCancel: false
                  })
                })
              }
            }
          })
        }
      })
    },
    // 转到编辑
    goEdit () {
      wx.navigateTo({
        url: `./edit?id=${this.data.id}&roomid=${this.data.detail.RoomID}`
      })
    },
    onLoad(options) {
      this.data.id = options.id
    },
    onReady() { },
    onShow() {
      this.getDetail()
    },
    onHide() { },
    onUnload() { },
    onPullDownRefresh() { },
    onReachBottom() { },
    onShareAppMessage() {
      return app.shareInfo
    }
  }
})