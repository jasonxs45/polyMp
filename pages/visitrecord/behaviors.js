export default Behavior({
  data: {
    currentIndex: 0,
  },
  methods: {
    tabChange(e) {
      let currentIndex = parseInt(e.detail)
      this.setData({
        currentIndex
      })
    },
    swiperChange (e) {
      let currentIndex = parseInt(e.detail.current)
      this.setData({
        currentIndex
      })
    },
    toggleDetail(e) {
      let index = parseInt(e.currentTarget.dataset.index)
      let open = this.data.outLists[index].open
      let str = `outLists[${index}].open`
      this.setData({
        [str]: !open
      })
    },
    goModify() {
      wx.navigateTo({
        url: `/pages/modifycontactor/index?role=${this.data.role}`,
      })
    }
  },
  pageLifetimes: {
    show () {
    }
  },
  lifetimes: {
    ready () {
    }
  }
})