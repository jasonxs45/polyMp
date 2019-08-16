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
    floor: '',
    cameraShow: false,
    cameraReady: false,
    shoot: false
  },
  openCamera () {
    wx.getSetting({
      success: r => {
        const { authSetting } = r
        if (authSetting['scope.camera']) {
          console.log('已授权摄像头')
          this.setData({
            cameraShow: true,
            shoot: false
          })
        } else {
          console.log('未授权摄像头')
          wx.showModal({
            title: '温馨提示',
            content: '你尚未授权使用摄像头，前往设置',
            success: res => {
              if (res.confirm) {
                wx.openSetting({})
              }
            }
          })
        }
      }
    })
  },
  onCameraError () {
    console.log('拒绝使用摄像头')
  },
  onCameraInitDone () {
    console.log('摄像头就绪')
    this.setData({
      cameraReady: true
    })
    console.log(this.data.cameraReady)
  },
  onCameraStop () {
    console.log('摄像头停止')
  },
  takePhoto () {
    let context = wx.createCameraContext()
    context.takePhoto({
      success: r => {
        console.log(r)
        this.setData({
          photo: r.tempImagePath,
          cameraShow: false,
          shoot: true
        })
      }
    })
  },
  uploadPhoto () {
    let filePath = this.data.photo
    app.loading('上传中')
    _uploadFile(filePath, r => {
      wx.hideLoading()
      app.toast('上传成功')
      let obj = JSON.parse(r.data)
      let photo = rootUrl + obj.url
      this.data.photo = photo
    })
  },
  floorChange (e) {
    this.data.floor = e.detail.value
  },
  getFloor () {
    app.loading('加载中')
    const uid = app.globalData.uid
    wx.showNavigationBarLoading()
    _floorlist(uid)
      .then(res => {
        wx.hideLoading()
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
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.showModal({
          title: '对不起',
          content: err.toString(),
          showCancel: false
        })
      })
  },
  onSubmit () {
    const { floor } = this.data
    if (!(/upload/ig).test(this.data.photo)) {
      app.toast('请先上传照片')
      return
    }
    if (!floor) {
      app.toast('请选择楼层')
      return
    }
    const uid = app.globalData.uid || wx.getStorageSync('uid')
    app.loading('加载中')
    _submit(uid, this.data.photo, floor)
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
  onReady () {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.camera']) {
          wx.authorize({
            scope: 'scope.camera',
            success() {
              console.log('已授权摄像头')
            },
            fail () {
              console.log('未授权摄像头')
            }
          })
        }
      }
    })
  },
  onShow () {},
  onShareAppMessage() {
    return app.shareInfo
  }
})