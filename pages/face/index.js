import { rootUrl } from '../../common/config'
import { _updateInfo } from '../../common/usercenter'
import { _floorlist, _submit } from '../../common/face'
import { _uploadFile } from '../../common/uploadFile'
const app = getApp()
Page({
  data: {
    state: '',
    photo: '',
    _defaultFloor: '',
    floors: [],
    floor: ''
  },
  onChooseImg () {
    let photo = this.data.photo
    wx.chooseImage({
      count: 1,
      success: res => {
        console.log('success')
        let filePath = res.tempFilePaths[0]
        app.loading('上传中')
        _uploadFile(filePath, r => {
          wx.hideLoading()
          let obj = JSON.parse(r.data)
          photo = rootUrl + obj.url
          this.setData({
            photo
          })
        })
      },
      fail: err => {}
    })
  },
  floorChange (e) {
    this.data.floor = e.detail.value
  },
  getFloor () {
    const uid = app.globalData.uid
    wx.showNavigationBarLoading()
    _floorlist(uid)
      .then(res => {
        wx.hideNavigationBarLoading()
        let floors = res.data.Data.Floor.map(item => {
          item = {
            floor: item,
            checked: item == app.globalData.member.DefaultFloor
          }
          return item
        })
        let state = res.data.Data.FaceState
        this.setData({
          floors,
          state
        }, () => {
          this.data.floor = app.globalData.member.DefaultFloor
        })
        if (!res.data.IsSuccess) {
          wx.showModal({
            title: '温馨提示',
            content: res.data.Msg,
            showCancel: false
          })
        }
      })
      .catch(err => {
        console.log(err)
        wx.hideNavigationBarLoading()
        wx.showModal({
          title: '对不起',
          content: err.toString(),
          showCancel: false
        })
      })
  },
  onSubmit () {
    const { photo, floor } = this.data
    if (!photo) {
      app.toast('请上传照片')
      return
    }
    if (!floor) {
      app.toast('请选择楼层')
      return
    }
    const uid = app.globalData.uid || wx.getStorageSync('uid')
    app.loading('加载中')
    _submit(uid, photo, floor)
      .then(res => {
        wx.hideLoading()
        wx.showModal({
          title: res.data.IsSuccess ? '温馨提示' : '对不起',
          content: res.data.Msg,
          showCancel: false,
          success: r => {}
        })
      })
      .catch(err => {
        wx.hideLoading()
        console.log(err)
        wx.showModal({
          title: '对不起',
          content: '请求失败，请稍后再试',
          showCancel: false
        })
      })
  },
  onLoad (options) {
    app.memberReadyCb = () => {
      // 强制更新
      console.log('强制更新')
      _updateInfo(app.globalData.uid)
        .then(res => {
          if (res.data.Data.Fans) {
            const fans = res.data.Data.Fans
            const member = res.data.Data.Member
            wx.setStorageSync('fans', fans)
            app.globalData.fans = fans
            wx.setStorageSync('member', member)
            app.globalData.member = member
            let photo = member.FacePic
            this.data._defaultFloor = member.DefaultFloor
            this.setData({
              photo
            })
            this.getFloor()
          }
        })
        .catch(err => {
        })
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onReady () {},
  onShow () {
  },
  onHide () {},
  onUnload () {},
  onPullDownRefresh () {},
  onReachBottom () {},
  onShareAppMessage() {
    return app.shareInfo
  }
})