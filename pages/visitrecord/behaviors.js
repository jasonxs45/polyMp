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