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
import behavior from './behaviors'
Component({
  data: {
    role: '',
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
  behaviors: [behavior],
  methods: {
    onLoad(options) {
      this.data.role = options.role
      this.setData({
        role: this.data.role
      })
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