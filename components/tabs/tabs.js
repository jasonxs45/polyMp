const PATH = './tab-item';
Component({
  relations: {
    [PATH]: {
      type: 'child',
      linked() {
        this.update()
      },
      linkChanged() {
        this.update()
      },
      unlinked() {
        this.update()
      }
    }
  },
  properties: {
    current: {
      type: Number,
      value: 0
    },
    activeKey: {
      type: Array,
      value: [],
      observer: 'changeCurrent'
    }
  },
  data: {
    rects: []
  },
  methods: {
    update() {
      this.getRelationNodes(PATH).map((e, index) => {
        e.setData({
          index,
          actived: this.data.current === index
        })
      })
    },
    clickItem(index, rect) {
      this.setData({
        current: index
      })
      this.getRelationNodes(PATH).map((e, idx) => {
        if (index !== idx) {
          e.setData({ actived: false })
        }
      })
      this.triggerEvent('change', index)
    }
  },
  lifetimes: {
    ready () {
      this.getRelationNodes(PATH).map((e, index) => {
        const query = e.createSelectorQuery()
        let rect = {}
        query.select('.tab-item').boundingClientRect(res => {
          let { top, bottom, left, right, width, height } = res
          e.setData({
            rect: { top, bottom, left, right, width, height }
          }, () => {
            this.data.rects.push(e.data.rect)
            this.setData({
              rects: this.data.rects
            })
          })
        }).exec()
      })
    }
  }
})