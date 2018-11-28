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
const codeLimit = 60
import behavior from './behaviors'
Component({
  data: {
    roles: [
      { name: '租户'},
      { name: '访客'}
    ],
    roleIndex: 0,
    allBuildings,
    allCompanies,
    buildings: [],
    companies: [],
    buildingSelectIndex: null,
    buildingName: '',
    companySelectIndex: null,
    companyName: '',
    name: '',
    tel: '',
    gender: '',
    code: '',
    codeDisabled: false,
    codeLimit,
    submitDisabled: false
  },
  behaviors: [behavior],
  methods: {
    roleChange(e) {
      let roleIndex = parseInt(e.detail.value)
      this.setData({
        roleIndex
      })
    },
    getCode () {
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
    },
    onLoad(options) {
      console.log(options)
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