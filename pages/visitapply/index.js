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
  behaviors: [behavior],
  data: {
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
    datetimeValue: null,
    backinfo: '',
    submitDisabled: false
  },
  methods: {
    submit () {
      console.log(this.data.backinfo)
    },
    onLoad(options) { },
    onReady() { },
    onShow() { },
    onHide() { },
    onUnload() { },
    onPullDownRefresh() { },
    onReachBottom() { },
    onShareAppMessage() { }
  }
})