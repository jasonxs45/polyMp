import { _getBuildingList, _getCompanyList } from '../../common/regist'
import { _visitorsubmit as _submit } from '../../common/visit'
import { NAME_REG, TEL_REG } from '../../utils/reg'
import behavior from './behaviors'
const app = getApp()
Component({
  behaviors: [behavior],
  data: {
    buildings: [],
    allCompanies: [],
    companies: [],
    buildingSelectIndex: null,
    companySelectIndex: null,
    companyName: '',
    name: '',
    tel: '',
    datetimeValue: null,
    count: 1,
    backinfo: '',
    submitDisabled: false
  },
  methods: {
    getBuildingList() {
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
    getCompanyList(id) {
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
    buildingSelect(e) {
      let value = e.detail.value
      this.setData({
        buildingSelectIndex: value
      }, () => {
        let id = this.data.buildings[value].ID
        this.getCompanyList(id)
      })
    },
    companyInput(e) {
      let value = e.detail
      this.setData({
        companies: this.data.allCompanies.filter(item => item.Name.includes(value)),
        companyName: value,
        companySelectIndex: null
      })
    },
    companySelect(e) {
      let value = e.detail
      this.setData({
        companySelectIndex: value,
        companyName: value !== null ? this.data.companies[value].Name : ''
      })
    },
    submit() {
      if (this.data.buildingSelectIndex === null) {
        app.toast('请选择写字楼')
        return
      }
      if (this.data.companySelectIndex === null) {
        app.toast('请选择公司名称')
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
      if (!this.data.datetimeValue) {
        app.toast('请选择约访时间')
        return
      }
      let MemberID = app.globalData.member.ID
      let CompanyID = this.data.companies[this.data.companySelectIndex].ID
      let InviteName = this.data.name
      let InviteTel = this.data.tel
      let VisitTime = this.data.datetimeValue
      let Remark = this.data.backinfo
      let Number = this.data.count
      this.setData({
        submitDisabled: true
      })
      _submit(
        MemberID, CompanyID, InviteName, InviteTel, VisitTime, Remark, Number
      ).then(res => {
        this.setData({
          submitDisabled: false
        })
        wx.showModal({
          title: res.data.IsSuccess?'温馨提示':'对不起',
          content: res.data.Msg,
          showCancel: false,
          success: r => {
            if (r.confirm && res.data.IsSuccess) {
              wx.navigateTo({
                url: '/pages/visitrecord/visitor'
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
    selectContactor(e) {
      let index = e.currentTarget.dataset.index
      let contactor = this.data.contactList[index]
      this.data.name = contactor.Name
      this.data.tel = contactor.Tel
      this.data.buildingSelectIndex = this.data.buildings.findIndex(item => item.ID === contactor.BuildingID)
      this.data.companyName = contactor.CompanyName
      _getCompanyList(contactor.BuildingID).then(res => {
        if (res.data.code == 200) {
          this.data.companies = res.data.Office_Company_list
          this.setData({
            companies: this.data.companies
          }, () => {
            this.data.companySelectIndex = this.data.companies.findIndex(item => item.ID === contactor.BuildingID)
            this.setData({
              name: this.data.name,
              tel: this.data.tel,
              buildingSelectIndex: this.data.buildingSelectIndex,
              companyName: this.data.companyName,
              companySelectIndex: this.data.companySelectIndex
            }, () => {
              this.hideSide()
            })
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    onLoad(options) {
    },
    onReady() { },
    onShow() {
      app.memberReadyCb = () => {
        this.getBuildingList()
      }
      app.fansReadyCb = () => {
        app.checkMember()
      }
      app.init()
    },
    onHide() { 
      app.memberReadyCb = null
      app.fansReadyCb = null
    },
    onUnload() {
      app.memberReadyCb = null
      app.fansReadyCb = null
    },
    onPullDownRefresh() { },
    onReachBottom() { },
    onShareAppMessage() { }
  }
})