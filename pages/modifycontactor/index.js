import { _getBuildingList, _getCompanyList } from '../../common/regist'
import { _modify } from '../../common/visit'
import behavior from './behaviors'
const app = getApp()
Component({
  data: {
    id: null,
    role: '',
    buildings: [],
    allCompanies: [],
    companies: [],
    buildingSelectIndex: null,
    companySelectIndex: null,
    buildingName: '',
    companyName: '',
    name: '',
    tel: '',
    submitDisabled: false
  },
  behaviors: [behavior],
  methods: {
    getBuildingList() {
      app.loading('加载中')
      _getBuildingList().then(res => {
        wx.hideLoading()
        if (res.data.code == 200) {
          this.data.buildings = res.data.Office_Building_list
          let index = this.data.buildings.findIndex(item => item.Name === this.data.buildingName)
          index = index === -1 ? null : index
          this.setData({
            buildings: this.data.buildings,
            buildingSelectIndex: index
          }, () => {
            if (this.data.companyName) {
              this.getCompanyList()
            }
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
          let index = this.data.allCompanies.findIndex(item => item.Name === this.data.companyName)
          index = index === -1 ? null : index
          this.setData({
            allCompanies: this.data.allCompanies,
            companies: this.data.allCompanies,
            companySelectIndex: index
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
    nameInput(e) {
      let value = e.detail
      this.data.name = value
    },
    telInput(e) {
      let value = e.detail
      this.data.tel = value
    },
    submit () {
      let ContactsID = this.data.id
      let MemberID = app.globalData.member.ID || wx.getStorageSync('member.ID')
      let CompanyID = this.data.role === '访客' ? this.data.companies[this.data.companySelectIndex].ID : 0
      let InviteName = this.data.name
      let InviteTel = this.data.tel
      console.log(MemberID,
        ContactsID,
        CompanyID,
        InviteName,
        InviteTel)
        app.loading('提交中')
        _modify(
          MemberID,
          ContactsID,
          CompanyID,
          InviteName,
          InviteTel
        ).then(res => {
          console.log(res)
          wx.hideLoading()
          wx.showModal({
            title: '温馨提示',
            content: res.data.Msg,
            showCancel: false,
            success: r => {
              if(r.confirm && res.data.IsSuccess) {
                wx.navigateBack()
              }
            }
          })
        }).catch(err => {
          console.log(err)
          wx.hideLoading()
          wx.showModal({
            title: '对不起',
            content: JSON.stringify(err) || '网络错误，请稍后再试',
            showCancel: false
          })
        })
    },
    onLoad(options) {
      this.setData({
        role: options.role || '',
        id: options.id || '',
        buildingName: options.building || '',
        companyName: options.company || '',
        name: options.name || '',
        tel: options.tel || ''
      })
    },
    onReady() { },
    onShow() {
      app.memberReadyCb = () => {
        if (this.data.role === '访客') {
          this.getBuildingList()
        }
      }
      app.fansReadyCb = () => {
        app.checkMember()
      }
      app.init()
    },
    onHide() { },
    onUnload() { },
    onPullDownRefresh() { },
    onReachBottom() { },
    onShareAppMessage() { }
  }
})