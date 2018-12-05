const PATH = './cell-radio'
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
          checked: this.data.current === index
        })
      })
    },
    clickItem(index) {
      this.setData({
        current: index
      })
      this.getRelationNodes(PATH).map((e, idx) => {
        if (index !== idx) {
          e.setData({ checked: false })
        }
      })
      this.triggerEvent('change', index)
    }
  },
  lifetimes: {
    ready() {
    }
  }
})