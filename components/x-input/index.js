Component({
  properties: {
    select: {
      type: Boolean,
      value: false
    },
    selectedItems: {
      type: Array,
      value: []
    },
    selectedItemKey: {
      type: String,
      value: ''
    },
    clear: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: '',
      observer (newVal, oldVal, changedPath) {
        if (this.properties.select && !newVal) {
          this.triggerEvent('select', null)
        }
      }
    },
    type: {
      type: String,
      value: 'text'
    },
    password: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: ''
    },
    placeholderStyle: {
      type: 'String',
      value: ''
    },
    placeholderClass: {
      type: 'String',
      value: 'input-placeholder'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    maxlength: {
      type: Number,
      value: 140
    },
    cursorSpacing: {
      type: [Number, String],
      value: 0
    },
    focus: {
      type: Boolean,
      value: false
    },
    confirmType: {
      type: String,
      value: 'done'
    },
    confirmHold: {
      type: Boolean,
      value: false
    },
    cursor: {
      type: Number
    },
    selectionStart: {
      type: Number,
      value: -1
    },
    selectionEnd: {
      type: Number,
      value: -1
    },
    adjustPosition: {
      type: Boolean,
      vaule: true
    }
  },
  data: {
    focusing: false,
    selecting: false,
    resultIndex: null
  },
  methods: {
    clear () {
      console.log('clear')
      this.data.value = ''
      this.setData({
        value: this.data.value,
        selecting: false
      })
      if (this.properties.select) {
        this.triggerEvent('select', null)
      } else {
        this.triggerEvent('input', '')
      }
    },
    inputHandler (e) {
      console.log('input')
      let selecting = e.detail.value ? true : false
      this.setData({
        value: e.detail.value,
        selecting: true
      })
      this.triggerEvent('input', e.detail.value)
    },
    blurHandler (e) {
      this.triggerEvent('blur')
    },
    focusHandler (e) {
      this.setData({
        focusing: true
      })
      this.triggerEvent('focus')
    },
    confirmHandler (e) {
      this.triggerEvent('confirm')
    },
    itemTap (e) {
      let resultIndex = e.target.dataset.index
      this.setData({
        resultIndex,
        selecting: false
      })
      this.triggerEvent('select', resultIndex)
    }
  },
  attached () {
    const query = wx.createSelectorQuery()
    const page = query.select('page')
    page.onTap = () => {
      console.log(1)
    }
  }
})
