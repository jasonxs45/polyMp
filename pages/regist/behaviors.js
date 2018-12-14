// 表单相关的方法
export default Behavior({
  methods: {
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
      this.setData({
        name: this.data.name
      })
    },
    telInput(e) {
      let value = e.detail
      this.data.tel = value
      this.setData({
        tel: this.data.tel
      })
    },
    codeInput(e) {
      let value = e.detail
      this.data.code = value
      this.setData({
        code: this.data.code
      })
    }
  }
})