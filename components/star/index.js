Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    readonly: {
      type: Boolean,
      value: false
    },
    score: {
      type: [Number, String],
      value: 0,
      observer (newVal) {
        if (typeof newVal === 'string') {
          this.setData({
            score: Number(newVal)
          })
        }
      }
    }
  },
  data: {},
  methods: {
    tapHandler (e) {
      if (!this.properties.readonly) {
        let index = e.currentTarget.dataset.index
        this.setData({
          score: index + 1
        })
        this.triggerEvent('change', index + 1)
      } else {
        return
      }
    }
  },
  attached () {
    console.log(this.data.score)
  }
})
