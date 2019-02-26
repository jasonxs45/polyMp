import { _detail, _handle } from '../../common/passcard'
import { _getQr } from '../../common/getQr'
import { formatDate } from '../../utils/util'
const roles = ['租户', '企业', '区管', '保安']
const app = getApp()
Page({
  data: {
    id: null,
    role: '',
    detail: {},
    handleBoxShow: false,
    type: null,
    remark: '',
    passImg: '',
    imgArr: []
  },
  getDetail() {
    app.loading('加载中')
    _detail(this.data.id).then(res => {
      wx.hideLoading()
      let detail = res.data.ERelease_Apply
      // 是否可重新提交
      detail.again = this.data.role === "租户" && detail.Status.includes("拒绝")
      detail.showBtns = detail.Status !== '已放行' && !detail.Status.includes('拒绝')
      detail.Goods = JSON.parse(detail.Goods)
      detail.OrderTime = detail.OrderTime && formatDate(new Date(detail.OrderTime), 'yyyy年MM月dd日 hh:mm')
      detail.CompanyAuditTime = detail.CompanyAuditTime && formatDate(new Date(detail.CompanyAuditTime), 'yyyy年MM月dd日 hh:mm')
      detail.AuditTime = detail.AuditTime && formatDate(new Date(detail.AuditTime), 'yyyy年MM月dd日 hh:mm')
      detail.PassTime = detail.PassTime && formatDate(new Date(detail.PassTime), 'yyyy年MM月dd日 hh:mm')
      detail.PassImg = [detail.PassImg]
      detail.qr = _getQr(detail.SN)
      this.setData({
        detail
      })
    }).catch(err => {
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: '请求失败，请稍后再试',
        showCancel: false
      })
    })
  },
  uploadOverHandler(e) {
    this.setData({
      imgArr: this.data.imgArr.concat(e.detail.group)
    })
    this.data.passImg = this.data.imgArr[0]
  },
  preview (e) {
    let index = e.currentTarget.dataset.index
    let urls = this.data.detail.Goods.map(item => item.img)
    wx.previewImage({
      current: urls[index],
      urls
    })
  },
  delHandler(e) {
    this.setData({
      imgArr: e.detail.group
    })
  },
  // 审核通过
  pass() {
    if (this.data.role === '保安') {
      if (!this.data.passImg) {
        app.toast('请上传照片！')
        return
      }
    }
    wx.showModal({
      title: '温馨提示',
      content: '确定通过吗？',
      success: res => {
        if (res.confirm) {
          this.handle('已同意', 1, this.data.passImg)
        }
      }
    })
  },
  remarkHandler (e) {
    this.data.remark = e.detail.value
    this.setData({
      remark: this.data.remark
    })
  },
  handle(remark, result, passImg) {
    app.loading('加载中')
    _handle(
      app.globalData.member.ID,
      this.data.id,
      remark,
      result,
      passImg
    ).then(res => {
      wx.hideLoading()
      wx.showModal({
        title: res.data.IsSuccess ? '温馨提示' : '对不起',
        content: res.data.Msg,
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
        showCancel: false,
        success: r => {
          if (r.confirm) {
            wx.navigateBack()
          }
        }
      })
    })
  },
  // 确认拒绝
  confirmRefuse () {
    if (!this.data.remark.trim()) {
      app.toast('原因不能为空！')
      return
    }
    wx.showModal({
      title: '温馨提示',
      content: '确定拒绝吗？',
      success: res => {
        if (res.confirm) {
          this.handle(this.data.remark, 2, this.data.passImg)
        }
      }
    })
  },
  // 打开弹层
  openHandle() {
    this.setData({
      handleBoxShow: true
    })
  },
  // 关闭弹层
  hideHandle() {
    this.setData({
      handleBoxShow: false,
      remark: ''
    })
  },
  onLoad(options) {
    let index = options.role - 1
    this.data.role = roles[index]
    this.data.id = options.id
    this.setData({
      id: this.data.id,
      role: this.data.role
    })
    app.memberReadyCb = () => {
      this.getDetail()
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onReady() { },
  onShow() { },
  onHide() { },
  onUnload() { },
  onShareAppMessage() { }
})