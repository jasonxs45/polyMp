const list = [
  { rq: '11月22日', xq: '星期四', sw: false, xw: false },
  { rq: '11月23日', xq: '星期四', sw: false, xw: false },
  { rq: '11月24日', xq: '星期四', sw: false, xw: false },
  { rq: '11月25日', xq: '星期四', sw: false, xw: false },
  { rq: '11月26日', xq: '星期四', sw: false, xw: false },
  { rq: '11月27日', xq: '星期四', sw: false, xw: false },
  { rq: '11月28日', xq: '星期四', sw: false, xw: false },
  { rq: '11月29日', xq: '星期四', sw: false, xw: false },
  { rq: '11月30日', xq: '星期四', sw: false, xw: false },
  { rq: '12月01日', xq: '星期四', sw: false, xw: false },
  { rq: '12月02日', xq: '星期四', sw: false, xw: false },
  { rq: '12月03日', xq: '星期四', sw: false, xw: false },
  { rq: '12月04日', xq: '星期四', sw: false, xw: false },
  { rq: '12月05日', xq: '星期四', sw: false, xw: false }
]
Page({
  data: {
    name: '',
    tel: '',
    description: '',
    yuyue: [],
    list,
    yuyueB: false
  },
  nameInput(e) {
    let value = e.detail
    this.setData({
      name: value
    })
  },
  telInput(e) {
    let value = e.detail
    this.setData({
      tel: value
    })
  },
  bindTextAreaBlur(e) {
    let value = e.detail.value
    this.setData({
      description: value
    })
  },
  tijiao() {
    wx.showModal({
      title: '提交成功',
      content: '恭喜您已提交成功，请耐心等候\r\n我们将尽快为您审核通过',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  yuyueBut() {
    let yuyueB = !this.data.yuyueB
    this.setData({
      yuyueB: yuyueB
    })
  },
  selectBut(e) {
    if (e.target.dataset.value == 1) {
      list[e.target.dataset.id].sw = !list[e.target.dataset.id].sw
    } else {
      list[e.target.dataset.id].xw = !list[e.target.dataset.id].xw
    }
    let yuyue = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].sw || list[i].xw) {
        yuyue.push(list[i])
      }
    }
    this.setData({
      yuyue: yuyue,
      list: list
    })
  },
  onLoad (options) {},
  onReady () {},
  onShow () {},
  onHide () {},
  onUnload () {},
  onShareAppMessage () {}
})