import { _submit } from '../../common/meeting'
import { NAME_REG, TEL_REG } from '../../utils/reg'
const app = getApp()
Page({
  data: {
    name: '',
    tel: '',
    description: '',
    selectedDate: [],
    notallowed: true,
    submitDisabled: false
  },
  nameInput(e) {
    let value = e.detail
    this.setData({
      name: value
    })
  },
  telInput(e) {
    let value = e.detail
    this.setData({
      tel: value
    })
  },
  bindTextAreaBlur(e) {
    let value = e.detail.value
    this.setData({
      description: value
    })
  },
  allowHandler (e) {
    this.data.notallowed = !this.data.notallowed
    this.setData({
      notallowed: this.data.notallowed
    })
  },
  submit() {
    if (!NAME_REG.test(this.data.name)) {
      app.toast('请填写2-6位中文姓名')
      return
    }
    if (!TEL_REG.test(this.data.tel)) {
      app.toast('请填写正确格式的手机号码')
      return
    }
    // if (!this.data.description.trim()) {
    //   app.toast('请填写备注')
    //   return
    // }
    this.setData({
      submitDisabled: true
    })
    let RoomID = this.data.id
    let MemberID = app.globalData.member.ID
    let Name = this.data.name
    let Tel = this.data.tel
    let Remark = this.data.description
    let TimeList = JSON.stringify(this.data.selectedDate)
    console.log(TimeList)
    _submit(RoomID, MemberID, Name, Tel, Remark, TimeList).then(res => {
      this.setData({
        submitDisabled: false
      })
      wx.showModal({
        title: res.data.IsSuccess?'温馨提示':'对不起',
        content: res.data.Msg,
        success: r => {
          if (r.confirm && res.data.IsSuccess) {
            wx.navigateTo({
              url: './orderlist'
            })
          }
        }
      })
    }).catch(err => {
      console.log(err)
      this.setData({
        submitDisabled: false
      })
    })
  },
  onLoad (options) {
    this.data.id = options.id
    this.setData({
      selectedDate: app.globalData.meetingDate
    })
    app.memberReadyCb = () => {
      this.setData({
        name: app.globalData.member.Name,
        tel: app.globalData.member.Tel
      })
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onReady () {},
  onShow () {
  },
  onHide () {},
  onUnload () {},
  onShareAppMessage() {
    return app.shareInfo
  }
})