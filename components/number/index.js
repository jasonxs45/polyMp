Component({
  /**
   * 组件的属性列表
   * @param {number} defaultValue 当前默认值
   * @param {number} max 最大值
   * @param {number} min 最小值
   * @param {number} width 当前输入框宽度
   * @param {number} steps 步进数
   * @param {boolean} fillable 是否可填写
   * @param {boolean} disabled 禁用
   */
  properties: {
    defaultValue: {
      type: Number,
      value: 0,
    },
    max: {
      type: Number,
      value: Infinity,
    },
    width: {
      type: Number,
      value: 35,
    },
    min: {
      type: Number,
      value: 0,
    },
    steps: {
      type: Number,
      value: 1,
    },
    fillable: {
      type: Boolean,
      value: true,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    _cutDisabled: false,
    _addDisabled: false,
    value: 0,
  },
  methods: {
    handleInput(e) {
      let value = Number(e.detail.value);
      this.computed(value)
    },
    computed(value) {
      let {
        _cutDisabled,
        _addDisabled,
        max,
        min
      } = this.data;
      if (typeof value !== 'number' || isNaN(value) || value <= min) {
        value = min;
        _cutDisabled = true;
        _addDisabled = false;
      } else if (value >= max) {
        value = max;
        _cutDisabled = false;
        _addDisabled = true;
      } else {
        _cutDisabled = false;
        _addDisabled = false;
      }
      this.setData({
        value,
        _cutDisabled,
        _addDisabled,
      })
    },
    handleBlur(e) {
      const { value } = this.data;
      this.triggerEvent('onChange',{ value },{});
    },
    handleConfirm(e) {
      const { value } = this.data;
      this.triggerEvent('onChange',{ value },{});
    },
    handleCut() {
      let {
        value,
        steps,
        disabled,
      } = this.data;
      if (this.data._cutDisabled || disabled) return false;
      this.computed(value -= steps);
      this.triggerEvent('onChange',{ value },{});
    },
    handleAdd() {
      let {
        value,
        steps,
        disabled,
      } = this.data;
      if (this.data._addDisabled || disabled) return false;
      this.computed(value += steps);
      this.triggerEvent('onChange',{ value },{});
    },
  },
  created () {},
  ready () {
    const {
      defaultValue,
      min
    } = this.data;
    if(min<0) throw Error('min 必须大于或等于0');
    this.computed(defaultValue)
  },
  attached () {},
  moved () {}
})