const allBuildings = [
  { name: '武汉122313123123' },
  { name: '长沙' },
  { name: '郑州' },
  { name: '成都' },
  { name: '武汉' },
  { name: '长沙' },
  { name: '郑州' },
  { name: '成都' }
]
const allCompanies = [
  { name: '武汉122313123123' },
  { name: '长沙' },
  { name: '郑州' },
  { name: '成都' },
  { name: '武汉' },
  { name: '长沙' },
  { name: '郑州' },
  { name: '成都' }
]
const app = getApp()
Page({
  data: {
    role: null,
    allBuildings,
    allCompanies,
    buildings: allBuildings,
    companies: [],
    buildingSelectIndex: null,
    buildingName: '',
    companySelectIndex: null,
    companyName: '',
    name: '',
    tel: '',
    submitDisabled: false
  },
  buildingInput(e) {
    let value = e.detail
    this.setData({
      buildings: this.data.allBuildings.filter(item => item.name.includes(value)),
      buildingName: value,
      buildingSelectIndex: null
    })
  },
  buildingSelect(e) {
    let value = e.detail.value
    this.setData({
      buildingSelectIndex: value,
      buildingName: value !== null ? this.data.buildings[value].name : ''
    })
  },
  companyInput(e) {
    let value = e.detail
    this.setData({
      companies: this.data.allCompanies.filter(item => item.name.includes(value)),
      companyName: value,
      companySelectIndex: null
    })
  },
  companySelect(e) {
    let value = e.detail
    this.setData({
      companySelectIndex: value,
      companyName: value !== null ? this.data.companies[value].name : ''
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
  onLoad (options) {
    this.data.role = options.role
    this.setData({
      role: this.data.role
    })
    app.init()
  },
  onReady () {},
  onShow () {},
  onHide () {},
  onUnload () {},
  onPullDownRefresh () {},
  onReachBottom () {}
})