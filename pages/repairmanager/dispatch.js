import {
  _handlers,
  _managerHandle,
  _managerReply,
  _handlerRepost,
  _handlerDone
} from '../../common/repair'
const app = getApp()
Page({
  data: {
    index: null,
    bakinfo: '',
    handlers: [],
    disabled: false,
    reply: null
  },
  textareaChange (e) {
    this.data.bakinfo = e.detail.value
  },
  handlerSelect (e) {
    this.setData({
      index: Number(e.detail.value)
    })
  },
  getHandler () {
    _handlers().then(res => {
      let handlers = res.data.SYS_Manager_list
      this.setData({
        handlers
      })
    }).catch(err => {
      console.log(err)
      wx.showModal({
        title: '对不起',
        content: '请求失败，请稍后再试！',
        showCancel: false
      })
    })
  },
  submit () {
    let promise = null
    // 分配
    if (this.data.reply !== true) {
      if (this.data.index === null) {
        app.toast('请先选择处理人')
        return
      }
      let StaffID = this.data.handlers[this.data.index].StaffID
      // 客服的分配处理人
      if (this.data.roleName === '客服') {
        console.log('客服分配处理人')
        promise = Promise.resolve(_managerHandle(app.globalData.uid, this.data.id, StaffID, this.data.bakinfo, ''))
      }
      // 处理人转派其他处理人
      if (this.data.roleName === '处理人') {
        console.log('处理人转派处理人')
        promise = Promise.resolve(_handlerRepost(app.globalData.uid, this.data.id, StaffID, this.data.bakinfo, ''))
      }
    } else {// 回复
      if (!this.data.bakinfo.trim()) {
        app.toast('请填写回复内容')
        return
      }
      // 客服的答复
      if (this.data.roleName === '客服') {
        console.log('客服答复')
        promise = Promise.resolve(_managerReply(app.globalData.uid, this.data.id, this.data.bakinfo, ''))
      }
      // 处理人的答复
      if (this.data.roleName === '处理人') {
        console.log('处理人答复')
        promise = Promise.resolve(_handlerDone(app.globalData.uid, this.data.id, this.data.bakinfo, ''))
      }
    }
    this.setData({
      disabled: true
    })
    promise.then(res => {
      this.setData({
        disabled: false
      })
      wx.showModal({
        title: res.data.IsSuccess?'温馨提示':'对不起',
        content: res.data.Msg,
        showCancel: false,
        success: r => {
          if (r.confirm && res.data.IsSuccess) {
            wx.navigateBack({
              delta: 2
            })
          }
        }
      })
    }).catch(err => {
      console.log(err)
      this.setData({
        disabled: false
      })
      wx.showModal({
        title: '对不起',
        content: '请求失败，请稍后再试！',
        showCancel: false
      })
    })
  },
  onLoad (options) {
    this.data.role = options.role
    this.data.id = options.id
    this.data.roleName = this.data.role == 1 ? '客服' : '处理人'
    this.data.reply = Boolean(options.reply)
    this.setData({
      reply: this.data.reply
    })
    wx.setNavigationBarTitle({
      title: this.data.reply ? '回复':'分配',
    })
    app.memberReadyCb = () => {
      this.getHandler()
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onReady () {},
  onShow () {},
  onHide () {},
  onUnload () {},
  onPullDownRefresh () {},
  onReachBottom () {},
  onShareAppMessage () {}
})