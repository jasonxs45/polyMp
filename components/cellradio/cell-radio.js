const PATH = './cell-radio-group';
Component({
  addGlobalClass: true,
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
    checked: {
      type: Boolean,
      value: false
    }
  },
  data: {
    index: null
  },
  methods: {
    onTap() {
      this.setData({
        checked: true
      })
      const { index } = this.data
      const parent = this.getRelationNodes(PATH)[0]
      if (parent) {
        parent.clickItem(index)
      }
    }
  },
  lifetimes: {
    ready() {
    }
  }
})