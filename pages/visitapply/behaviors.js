import { _contactorlist } from '../../common/visit'
const app = getApp()
let now = new Date()
let nowYear = now.getFullYear()
let nowMonth = now.getMonth() + 1
let nowDate = now.getDate()
let nowHour = now.getHours()
let nowMinute = '00' + now.getMinutes()
nowMinute = nowMinute.substr(nowMinute.length - 2)
// 表单相关的方法
export default Behavior({
  data: {
    sidemenuShow: false,
    contactList: [],
    datetimeValue: `${nowYear}-${nowMonth}-${nowDate} ${nowHour}:${nowMinute}`
  },
  methods: {
    nameInput(e) {
      let value = e.detail
      this.data.name = value
    },
    telInput(e) {
      let value = e.detail
      this.data.tel = value
    },
    textInput (e) {
      let value = e.detail.value
      this.data.backinfo = value
    },
    datetimeChange (e) {
      let datetimeValue = e.detail
      this.data.datetimeValue = datetimeValue
      this.setData({
        datetimeValue: this.data.datetimeValue
      })
    },
    openSide () {
      this.setData({
        sidemenuShow: true
      }, () => {
        this.getContactList()
      })
    },
    hideSide() {
      this.setData({
        sidemenuShow: false
      })
    },
    getContactList () {
      app.loading('加载中')
      _contactorlist(app.globalData.member.ID, '', '').then(res => {
        wx.hideLoading()
        let list = []
        list = res.data.Visit_Contacts_list || []
        this.setData({
          contactList: list
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
  },
  lifetimes: {
  }
})