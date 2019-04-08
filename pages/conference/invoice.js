import { _invoice } from '../../common/meeting'
import { TEL_REG } from '../../utils/reg'
const app = getApp()
Page({
  data: {
    types: ['公司', '个人'],
    typeIndex: 0,
    name: "",
    invoiceNumber: "",
    addr: "",
    tel: "",
    bank: "",
    card: "",
    submitDisabled: false
  },
  typeChange(e) {
    let typeIndex = parseInt(e.detail)
    this.setData({
      typeIndex
    })
  },
  inputHandler(e) {
    let attr = e.currentTarget.dataset.attr
    this.setData({
      [attr]: e.detail
    })
  },
  submit() {
    let uid = wx.getStorageSync('uid') || app.globalData.uid
    if (!uid) {
      wx.showModal({
        title: '对不起',
        content: '登录信息失效，请重新登录',
        showCancel: false,
        success: r => {
          if (r.confirm) {
            wx.navigateTo({
              url: '/pages/login/index'
            })
          }
        }
      })
    }
    if (!this.data.id) {
      app.toast('ID异常')
      return
    }
    if (!this.data.name.trim()) {
      app.toast('请填写发票抬头')
      return
    }
    if (this.data.typeIndex == 0) {
      if (!this.data.invoiceNumber.trim()) {
        app.toast('请填写开票税号')
        return
      }
      if (!this.data.addr.trim()) {
        app.toast('请填写开票地址')
        return
      }
      if (!TEL_REG.test(this.data.tel)) {
        app.toast('请填写正确格式的手机号码')
        return
      }
      if (!this.data.bank.trim()) {
        app.toast('请填写开票开户银行')
        return
      }
      if (!this.data.card.trim()) {
        app.toast('请填写开票开户银行卡号')
        return
      }
    }
    let opt = {
      ID: this.data.id,
      InvoiceType: this.data.types[this.data.typeIndex],
      InvoiceName: this.data.name,
      InvoiceNumber: this.data.invoiceNumber,
      InvoiceAddress: this.data.addr,
      InvoicePhone: this.data.tel,
      InvoiceBank: this.data.bank,
      InvoiceAccount: this.data.card
    }
    app.loading('加载中')
    console.log(...opt)
    _invoice(opt).then(res => {
      wx.hideLoading()
      console.log(res)
      if (res.data.IsSuccess) {
        wx.showModal({
          title: '温馨提示',
          content: res.data.Msg,
          showCancel: false,
          success: r => {
            if (r.confirm) {
              wx.navigateBack()
            }
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
      wx.hideLoading()
      console.log(err)
    })
  },
  onLoad(options) {
    this.data.id = options.id
  },
  onReady() { },
  onShow() { },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() { },
  onShareAppMessage() { }
})