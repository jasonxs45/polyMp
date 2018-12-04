export default Behavior({
  data: {
    currentIndex: 0,
    barLeft: 0,
    barWidth: 0,
    barObjs: null
  },
  methods: {
    tabChange(e) {
      let barLeft = e.currentTarget.offsetLeft
      let currentIndex = parseInt(e.currentTarget.dataset.index)
      this.setData({
        currentIndex,
        barLeft
      })
    },
    swiperChange (e) {
      let currentIndex = parseInt(e.detail.current)
      let barLeft = this.data.barObjs[currentIndex].left
      this.setData({
        currentIndex,
        barLeft
      })
    }
  },
  lifetimes: {
    ready () {
      const query = wx.createSelectorQuery().in(this)
      query.selectAll('.tab-item').boundingClientRect()
      query.exec(res => {
        this.data.barObjs = res[0]
        let barLeft = this.data.barObjs[this.data.currentIndex].left
        this.setData({
          barLeft
        })
      })
    }
  }
})