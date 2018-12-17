import { rootUrl } from '../../common/config'
import { _uploadFile } from '../../common/uploadFile'
import { _modifyInfo } from '../../common/usercenter'
import { _getBuildingList, _getCompanyList } from '../../common/regist'
import { NAME_REG, TEL_REG, ID_CHECK } from '../../utils/reg'
const app = getApp()
Page({
  data: {
    avatar: '',
    nickname: '',
    name: '',
    tel: '',
    birthday: '',
    idnum: '',
    buildings: [],
    allCompanies: [],
    companies: [],
    buildingSelectIndex: null,
    companySelectIndex: null,
    companyName: '',
    company: '',
    modifyShow: false,
    modifyItem: '',
    submitDisabled: false
  },
  // 获取写字楼列表
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
  // 获取公司列表
  getCompanyList(id) {
    app.loading('加载中')
    _getCompanyList(id).then(res => {
      wx.hideLoading()
      if (res.data.code == 200) {
        this.data.allCompanies = res.data.Office_Company_list
        this.setData({
          allCompanies: this.data.allCompanies
        })
      }
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
      wx.showModal({
        title: '对不起',
        content: '获取公司列表失败，请稍后再试',
        showCancel: false
      })
    })
  },
  // 监听写字楼选择
  buildingSelect(e) {
    let value = e.detail.value
    this.setData({
      buildingSelectIndex: value
    }, () => {
      let id = this.data.buildings[value].ID
      this.getCompanyList(id)
    })
  },
  // 监听公司输入
  companyInput(e) {
    let value = e.detail
    let companies = this.data.allCompanies.filter(item => item.Name.includes(value))
    this.setData({
      companies,
      companyName: value
    })
  },
  // 监听公司选择
  companySelect(e) {
    let value = e.detail
    this.setData({
      companySelectIndex: value,
      companyName: value !== null ? this.data.companies[value].Name : '',
      company: value !== null ? this.data.companies[value].ID : null
    })
  },
  // 头像加载失败
  avatarError () {
    this.setData({
      avatar: '../../images/avatar.png'
    })
  },
  nameInput(e) {
    let value = e.detail
    this.setData({
      name: value
    })
  },
  nicknameInput(e) {
    let value = e.detail
    this.setData({
      nickname: value
    })
  },
  telInput(e) {
    let value = e.detail
    this.setData({
      tel: value
    })
  },
  birthdayChange (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  idNumInput(e) {
    let value = e.detail
    this.setData({
      idnum: value
    })
  },
  cancel () {
    this.setData({
      modifyShow: false,
      modifyItem: '',
      avatar: app.globalData.fans.HeadImgUrl,
      nickname: app.globalData.fans.NickName,
      name: app.globalData.member.Name,
      tel: app.globalData.member.Tel,
      birthday: app.globalData.member.Birthday || '',
      idnum: app.globalData.member.IDCard || '',
      company: app.globalData.member.CompanyID || '',
      companyName: app.globalData.member.CompanyName || '',
      buildings: [],
      allCompanies: [],
      companies: [],
      buildingSelectIndex: null,
      companySelectIndex: null
    })
  },
  // 打开弹层
  show (e) {
    let modifyItem = e.currentTarget.dataset.item
    this.setData({
      modifyShow: true,
      modifyItem
    })
    if (modifyItem === 'company') {
      this.getBuildingList()
    }
  },
  avatarTap () {
    wx.chooseImage({
      count: 1,
      success: res => {
        let filePath = res.tempFilePaths[0]
        console.log(filePath)
        app.loading('上传中')
        _uploadFile(filePath, r => {
          let obj = JSON.parse(r.data)
          let HeadImg = rootUrl + obj.url
          this.modifyInfo({
            HeadImg
          }, () => {
            wx.hideLoading()
            this.setData({
              avatar: app.globalData.fans.HeadImgUrl
            })
          })
        })
      }
    })
  },
  // 修改资料
  modifyInfo (param,cb) {
    let uid =app.globalData.uid
    let opt = {
      UnionID: uid
    }
    opt = Object.assign(opt, param)
    app.loading('提交中')
    _modifyInfo(opt).then(res => {
      wx.hideLoading()
      wx.showModal({
        title: '恭喜您',
        content: res.data.Msg,
        showCancel: false,
        success: r => {
          if (r.confirm) {
            console.log(res.data)
            wx.setStorageSync('fans', res.data.Data.Fans)
            wx.setStorageSync('member', res.data.Data.Member)
            app.globalData.fans = res.data.Data.Fans
            app.globalData.member = res.data.Data.Member
            cb && cb()
          }
        }
      })
    }).catch(err => {
      wx.hideLoading()
    })
  },
  // 提交
  confirm() {
    let modifyItem = this.data.modifyItem
    let key = ''
    switch (modifyItem) {
      case 'nickname':
        key = 'NickName'
        if (!this.data[modifyItem]) {
          app.toast('昵称不能为空')
          return
        }
        break
      case 'name':
        key = 'Name'
        if (!NAME_REG.test(this.data[modifyItem])) {
          app.toast('请填写2-6位中文姓名')
          return
        }
        break
      case 'tel':
        key = 'Phone'
        if (!TEL_REG.test(this.data[modifyItem])) {
          app.toast('请填写正确格式的手机号码')
          return
        }
        break
      case 'birthday':
        key = 'Birthday'
        if (!this.data[modifyItem]) {
          app.toast('生日不能为空')
          return
        }
        break
      case 'idnum':
        key = 'IDCard'
        if (!ID_CHECK(this.data[modifyItem])) {
          app.toast('请填写正确的身份证号码')
          return
        }
        break
      case 'company':
        if (this.data.buildingSelectIndex === null) {
          app.toast('请选择写字楼')
          return
        }
        if (this.data.companySelectIndex === null) {
          app.toast('请输入并选择公司名称')
          return
        }
        key = 'CompanyID'
        break
      default:
    }
    this.modifyInfo({
      [key]: this.data[modifyItem]
    }, () => {
      if (modifyItem === 'company') {
        this.setData({
          modifyShow: false,
          modifyItem: '',
          company: app.globalData.member.CompanyID || '',
          companyName: app.globalData.member.CompanyName || ''
        })
      } else {
        this.setData({
          [modifyItem]: this.data[modifyItem]
        }, () => {
          this.setData({
            modifyShow: false,
            modifyItem: ''
          })
        })
      }
    })
  },
  onLoad (options) {
    app.memberReadyCb = () => {
      this.setData({
        avatar: app.globalData.fans.HeadImgUrl,
        nickname: app.globalData.fans.NickName,
        name: app.globalData.member.Name,
        tel: app.globalData.member.Tel,
        birthday: app.globalData.member.Birthday || '',
        idnum: app.globalData.member.IDCard || '',
        company: app.globalData.member.CompanyID || '',
        companyName: app.globalData.member.CompanyName || ''
      })
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onReady () {},
  onShow () {},
  onHide () {},
  onUnload () {},
  onPullDownRefresh () {},
  onReachBottom () {},
  onShareAppMessage () {}
})