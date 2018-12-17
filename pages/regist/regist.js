import { _getCode, _regist, _getBuildingList, _getCompanyList } from '../../common/regist'
import { NAME_REG, TEL_REG } from '../../utils/reg'
const codeLimit = 60
import behavior from './behaviors'
const app = getApp()
Component({
  data: {
    roles: [
      { name: '租户'},
      { name: '访客'}
    ],
    roleIndex: 0,
    buildings: [],
    allCompanies: [],
    companies: [],
    buildingSelectIndex: null,
    companySelectIndex: null,
    companyName: '',
    name: '',
    tel: '',
    code: '',
    codeDisabled: false,
    codeLimit,
    submitDisabled: false
  },
  behaviors: [behavior],
  methods: {
    roleChange(e) {
      let roleIndex = parseInt(e.detail)
      this.setData({
        roleIndex
      })
    },
    getBuildingList () {
      app.loading('加载中')
      _getBuildingList().then(res => {
        wx.hideLoading()
        if (res.data.code == 200) {
          this.data.buildings = res.data.Office_Building_list
          this.setData({
            buildings: this.data.buildings
          })
        }
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
        wx.showModal({
          title: '对不起',
          content: '获取写字楼失败，请稍后再试',
          showCancel: false
        })
      })
    },
    getCompanyList (id) {
      _getCompanyList(id).then(res => {
        if (res.data.code == 200) {
          this.data.allCompanies = res.data.Office_Company_list
          this.setData({
            allCompanies: this.data.allCompanies
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getCode () {
      if (!TEL_REG.test(this.data.tel)) {
        wx.showToast({
          title: '请填写正确的手机号码',
          icon: 'none',
          mask: true
        })
        return
      }
      this.setData({
        codeDisabled: true
      })
      let timer = setInterval(() => {
        if (this.data.codeLimit <= 0) {
          clearInterval(timer)
          this.setData({
            codeDisabled: false,
            codeLimit: codeLimit
          })
        } else {
          this.data.codeLimit -= 1
          this.setData({
            codeLimit: this.data.codeLimit
          })
        }
      }, 1000)
      _getCode({Phone: this.data.tel}).then(res => {
        wx.hideToast()
        if (res.data.IsSuccess) {
          // app.toast(res.data.Msg)
          app.toast('已发送，请注意查收')
        } else {
          wx.showModal({
            title: '对不起',
            content: JSON.stringify(res.data.Msg),
            showCancel: false
          })
          clearInterval(timer)
          this.setData({
            codeDisabled: false,
            codeLimit: codeLimit
          })
        }
      }).catch(err => {
        wx.showModal({
          title: '对不起',
          content: JSON.stringify(err),
          showCancel: false
        })
        clearInterval(timer)
        this.setData({
          codeDisabled: false,
          codeLimit: codeLimit
        })
      })
    },
    submit () {
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
      if (this.data.roleIndex === 0 && this.data.buildingSelectIndex === null) {
        app.toast('请选择写字楼')
        return
      }
      if (this.data.roleIndex === 0 && this.data.companySelectIndex === null) {
        app.toast('请填写并选择公司')
        return
      }
      if (!NAME_REG.test(this.data.name)) {
        app.toast('请填写2-6位中文姓名')
        return
      }
      if (!TEL_REG.test(this.data.tel)) {
        app.toast('请填写正确格式的手机号码')
        return
      }
      if (!this.data.code) {
        app.toast('请填写验证码')
        return
      }
      let company = this.data.roleIndex === 0 ? this.data.companies[this.data.companySelectIndex].ID : null
      let opt = {
        UnionID: wx.getStorageSync('uid')||app.globalData.uid,
        Type: this.data.roleIndex + 1,
        Company: company,
        Code: this.data.code,
        Name: this.data.name,
        Phone: this.data.tel
      }
      app.loading('加载中')
      console.log(opt)
      _regist(opt).then(res => {
        wx.hideLoading()
        console.log(res)
        if (res.data.IsSuccess) {
          wx.setStorageSync('member', res.data.Data)
          app.globalData.fans = res.data.Data
          wx.showModal({
            title: '恭喜您',
            content: res.data.Msg,
            showCancel: false,
            success: r => {
              if (r.confirm) {
                wx.switchTab({
                  url: '/pages/usercenter/index'
                })
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
      app.init()
      this.getBuildingList()
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