const PATH = './tabs';
Component({
  relations: {
    [PATH]: { type: 'parent' },
    linked() {
    },
    linkChanged() {
    },
    unlinked() {
    }
  },
  properties: {
    actived: {
      type: Boolean,
      value: false
    }
  },
  data: {
    index: null,
    rect: null
  },
  methods: {
    update () {
      const query = wx.createSelectorQuery().in(this)
      let rect = {}
      query.select('.tab-item').boundingClientRect(res => {
        let { top, bottom, left, right, width, height } = res
        this.setData({
          rect: { top, bottom, left, right, width, height }
        })
      }).exec()
    },
    onTap() {
      this.setData({
        actived: true
      })
      const { index } = this.data
      const parent = this.getRelationNodes(PATH)[0]
      if (parent) {
        parent.clickItem(index, this.data.rect)
      }
    }
  },
  lifetimes: {
    ready() {
      this.update()
    }
  }
})