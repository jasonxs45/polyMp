import { _typelist, _repairsubmit as _submit } from '../../common/repair'
const app = getApp()
const limit = 5
Page({
  data: {
    categories: [],
    categoryIndex: null,
    limit,
    imgArr: [],
    desc: '',
    submitDisabled: false
  },
  getTypelist() {
    app.loading('加载中')
    _typelist().then(res => {
      wx.hideLoading()
      let categories = res.data.Repair_Type_list
      this.setData({
        categories
      })
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
      wx.showModal({
        title: '对不起',
        content: '请求失败，请稍后再试',
        showCancel: false
      })
    })
  },
  submit() {
    if (this.data.categoryIndex === null) {
      app.toast('请选择类别！')
      return
    }
    if (!this.data.desc.trim()) {
      app.toast('请填写问题描述')
      return
    }
    let typeid = this.data.categories[this.data.categoryIndex].ID
    let img = this.data.imgArr.join(',')
    this.setData({
      submitDisabled: true
    })
    _submit(typeid, app.globalData.member.ID, this.data.desc, img)
      .then(res => {
        this.setData({
          submitDisabled: false
        })
        wx.showModal({
          title: res.data.IsSuccess ? '提示' : '对不起',
          content: res.data.Msg,
          showCancel: false,
          success: r => {
            if (r.confirm) {
              if (res.data.IsSuccess) {
                wx.redirectTo({
                  url: './list'
                })
              }
            }
          }
        })
      }).catch(err => {
        this.setData({
          submitDisabled: false
        })
        console.log(err)
        wx.showModal({
          title: '对不起',
          content: '网络错误，请稍后再试！',
          showCancel: false
        })
      })
  },
  categorySelect(e) {
    let value = e.detail.value
    this.setData({
      categoryIndex: value
    })
  },
  textHandler(e) {
    this.data.desc = e.detail.value
  },
  uploadOverHandler(e) {
    this.setData({
      imgArr: this.data.imgArr.concat(e.detail.group)
    })
  },
  delHandler(e) {
    this.setData({
      imgArr: e.detail.group
    })
  },
  onLoad(options) {
    app.memberReadyCb = () => {
      this.getTypelist()
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
  onPullDownRefresh() { },
  onReachBottom() { },
  onShareAppMessage() {
    return app.shareInfo
  }
})