import { _visitorsubmit as _submit } from '../../common/visit'
import behavior from './behaviors'
import { NAME_REG, TEL_REG } from '../../utils/reg'
const app = getApp()
Component({
  behaviors: [behavior],
  data: {
    name: '',
    tel: '',
    datetimeValue: null,
    backinfo: '',
    visitorCount: 1,
    submitDisabled: false
  },
  methods: {
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
      console.log(this.data)
    },
    onLoad(options) {
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
    onShareAppMessage() { }
  }
})