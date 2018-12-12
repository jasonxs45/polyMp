import { checkUid, login, checkUserInfo } from 'common/login'
import { mc } from 'common/memberCheck'
App({
  globalData: {
    isMember: null,
    s_key: '',
    uid: ''
  },
  memberCheck(uid) {
    return new Promise((resolve, reject) => {
      let isMember = wx.getStorageSync('isMember')
      if (isMember === true) {
        this.globalData.isMember = true
        resolve(true)
      }
      // else if (isMember === false){
      //   wx.showModal({
      //     title: '温馨提示',
      //     content: '您还不是会员，请先注册会员',
      //     success: res => {
      //       if (res.confirm) {
      //         wx.navigateTo({
      //           url: '/pages/regist/regist'
      //         })
      //       }
      //       if (res.cancel) {
      //         wx.switchTab({
      //           url: '/pages/home/index'
      //         })
      //       }
      //     }
      //   })
      // } 
      else {
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        mc(uid).then(r => {
          wx.hideLoading()
          wx.setStorageSync('isMember', r)
          this.globalData.isMember = r
          resolve(true)
        }).catch(e => {
          wx.hideLoading()
          wx.setStorageSync('isMember', false)
          this.globalData.isMember = false
          wx.showModal({
            title: '温馨提示',
            content: '您还不是会员，请先注册会员',
            success: res => {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/regist/regist'
                })
              }
              if (res.cancel) {
                wx.switchTab({
                  url: '/pages/home/index'
                })
              }
            }
          })
          reject(false)
        })
      }
    })
  },
  onLaunch() {
    checkUid().then(r => {
      this.globalData.uid = r.data
    }).catch(e => {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      login().then(r => {
        wx.hideLoading()
        if (r.data.IsSuccess) {
          wx.setStorageSync('s_key', r.data.Data.sessionId)
          console.log(r.data.Data.sessionId)
          this.globalData.s_key = r.data.Data.sessionId
          if (r.data.Data.unionid) {
            // 已授权，返回信息含有uid
            wx.setStorageSync('uid', r.data.Data.unionid)
            this.globalData.uid = r.data.Data.unionid
            wx.navigateTo({
              url: '/pages/login/index'
            })
          } else {
            // 未授权，返回信息没有uid，跳转授权页面
            // wx.navigateTo({
            //   url: '/pages/login/index'
            // })
          }
        }
      }).catch(e => {
        wx.hideLoading()
        console.log(e)
      })
      // wx.navigateTo({
      //   url: '/pages/login/index'
      // })
      // wx.showModal({
      //   title: '友情提示',
      //   content: '请先登录',
      //   showCancel: false,
      //   success (r) {
      //     if (r.confirm) {
      //       wx.navigateTo({
      //         url: '/pages/login/index'
      //       })
      //     }
      //   }
      // })
    })
    // checkUserInfo().then(r => {
    //   wx.getUserInfo({
    //     success: res => {
    //       console.log('主动触发获取用户信息1')
    //     }
    //   })
    // }).catch(e => {
    //   console.log(e)
    // })
  },
  onShow() {
  }
})