import { _usersubmit as _submit, _detail } from '../../common/passcard'
import { _uploadFile } from '../../common/uploadFile'
import { rootUrl } from '../../common/config'
const app = getApp()
let now = new Date()
let nowYear = now.getFullYear()
let nowMonth = now.getMonth() + 1
let nowDate = now.getDate()
let nowHour = now.getHours()
let nowMinute = '00' + now.getMinutes()
nowMinute = nowMinute.substr(nowMinute.length - 2)
Page({
  data: {
    id: null,
    goodsArr: [
      {
        img: '',
        name: '',
        count: '',
      }
    ],
    datetimeValue: `${nowYear}-${nowMonth}-${nowDate} ${nowHour}:${nowMinute}`,
    description: '',
    submitDisabled: false
  },
  // 增加重新提交的功能
  getDetail() {
    app.loading('加载中')
    _detail(this.data.id).then(res => {
      wx.hideLoading()
      let detail = res.data.ERelease_Apply
      detail.Goods = JSON.parse(detail.Goods)
      this.setData({
        detail,
        goodsArr: detail.Goods,
        description: detail.Remark
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
  nameInput(e) {
    let value = e.detail.value
    let index = e.currentTarget.dataset.index
    let str = `goodsArr[${index}].name`
    this.setData({
      [str]: value
    })
  },
  countInput(e) {
    let value = e.detail.value
    let index = e.currentTarget.dataset.index
    let str = `goodsArr[${index}].count`
    this.setData({
      [str]: value
    })
  },
  changeDateTime(e) {
    this.data.datetimeValue = e.detail
    console.log(this.data.datetimeValue)
  },
  textChange (e) {
    let value = e.detail.value
    this.data.description = value
  },
  addLine() {
    this.data.goodsArr.push({
      img: '',
      name: '',
      count: ''
    })
    this.setData({
      goodsArr: this.data.goodsArr
    })
  },
  remove(e) {
    let index = e.currentTarget.dataset.index
    this.data.goodsArr.splice(index, 1)
    this.setData({
      goodsArr: this.data.goodsArr
    })
  },
  chooseImg(e) {
    let index = e.currentTarget.dataset.index
    let str = `goodsArr[${index}].img`
    wx.chooseImage({
      count: 1,
      success: r => {
        app.loading('上传中')
        _uploadFile(r.tempFilePaths[0], res=> {
          wx.hideLoading()
          let obj = JSON.parse(res.data)
          let img = rootUrl + obj.url
          this.setData({
            [str]: img
          })
        })
      },
      fail: e => { }
    })
  },
  delImg(e) {
    let index = e.currentTarget.dataset.index
    this.data.goodsArr[index].img = ''
    let str = `goodsArr[${index}].img`
    this.setData({
      [str]: ''
    })
  },
  previewImg(e) {
    let index = e.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.goodsArr[index].img,
      urls: [this.data.goodsArr[index].img]
    })
  },
  submit() {
    let id = this.data.id === null ? 0 : this.data.id
    for (let i = 0; i< this.data.goodsArr.length; i++) {
      let goods = this.data.goodsArr[i]
      if (!goods.img) {
        app.toast(`请上传第${i + 1}件物品的图片`)
        return
      }
      if (!goods.name) {
        app.toast(`请填写第${i + 1}件物品的名称`)
        return
      }
      if (!Number(goods.count)) {
        app.toast(`第${i + 1}件物品的数量不能为空`)
        return
      }
    }
    if (!this.data.datetimeValue) {
      app.toast('请选择通行时间！')
      return
    }
    // if (!this.data.description.trim()) {
    //   app.toast('备注信息不能为空！')
    //   return
    // }
    this.setData({
      submitDisabled: true
    })
    _submit(
      id,
      app.globalData.member.ID,
      JSON.stringify(this.data.goodsArr),
      this.data.datetimeValue,
      this.data.description
    ).then(res => {
      this.setData({
        submitDisabled: false
      })
      wx.showModal({
        title: res.data.IsSuccess?'提交成功':'对不起',
        content: res.data.Msg,
        showCancel: false,
        success: r => {
          if (res.data.IsSuccess && r.confirm) {
            wx.navigateTo({
              url: './list?role=1'
            })
          }
        }
      })
    }).catch(err => {
      console.log(err)
      this.setData({
        submitDisabled: false
      })
      wx.showModal({
        title: '对不起',
        content: '请求失败，请稍后再试',
        showCancel: false
      })
    })
  },
  onLoad(options) {
    this.setData({
      id: options.id !== 0 && !options.id ? null : options.id
    })
    app.memberReadyCb = () => {
      this.setData({
        name: app.globalData.member.Name || wx.getStorageSync('member').Name,
        tel: app.globalData.member.Tel || wx.getStorageSync('member').Tel,
        companyname: app.globalData.member.CompanyName || wx.getStorageSync('member').CompanyName
      })
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onReady() { },
  onShow() {
    if (this.data.id !== null) {
      this.getDetail()
    }
  },
  onHide() { },
  onUnload() { },
  onShareAppMessage() { }
})