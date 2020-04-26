import { _invitesubmit as _submit } from '../../common/visit'
import behavior from './behaviors'
import { NAME_REG, TEL_REG } from '../../utils/reg'
const app = getApp()
Component({
  behaviors: [behavior],
  data: {
    name: '',
    tel: '',
    backinfo: '',
    visitorCount: 1,
    submitDisabled: false
  },
  methods: {
    onChange (e) {
      const { value } = e.detail
      this.setData({
        visitorCount: value
      })
    },
    selectContactor(e) {
      let index = e.currentTarget.dataset.index
      let contactor = this.data.contactList[index]
      this.data.name = contactor.Name
      this.data.tel = contactor.Tel
      this.setData({
        name: this.data.name,
        tel: this.data.tel
      }, () => {
        this.hideSide()
      })
    },
    submit () {
      if (!NAME_REG.test(this.data.name)) {
        app.toast('请填写2-6位中文姓名')
        return
      }
      if (!TEL_REG.test(this.data.tel)) {
        app.toast('请填写正确格式的手机号码')
        return
      }
      if (!this.data.datetimeValue) {
        app.toast('请选择约访时间')
        return
      }
      let MemberID = app.globalData.member.ID
      let Name = this.data.name
      let Tel = this.data.tel
      let VisitTime = this.data.datetimeValue
      let Remark = this.data.backinfo
      let Number = this.data.visitorCount
      this.setData({
        submitDisabled: true
      })
      _submit(
        MemberID, Name, Tel, VisitTime, Remark, Number
      ).then(res => {
        this.setData({
          submitDisabled: false
        })
        wx.showModal({
          title: res.data.IsSuccess ? '温馨提示' : '对不起',
          content: res.data.Msg,
          showCancel: false,
          success: r => {
            if (r.confirm && res.data.IsSuccess) {
              wx.navigateTo({
                url: '/pages/visitrecord/staff'
              })
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
          content: '网络错误，请稍后再试',
          showCancel: false
        })
      })
    },
    onLoad(options) {
      this.setData({
        name: options.name || '',
        tel: options.tel || ''
      })
      app.memberReadyCb = () => {
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
  }
})