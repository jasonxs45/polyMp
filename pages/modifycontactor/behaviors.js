// 表单相关的方法
export default Behavior({
  methods: {
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
    }
  }
})