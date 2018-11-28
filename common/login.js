import { fetch } from './api'
export function init (cb) {
  console.log('检查session_key是否过期')
  wx.checkSession({
    success: res => {
      console.log('登录状态未过期,自己维护的第三方session_key')
      if (!wx.getStorageSync('third_key')) {
        console.log('本地第三方session_key被清除，重新登录')
        login()
      } else {
        console.log('请使用三方session_key进行后续操作')
        cb && cb()
      }
    },
    fail: err => {
      console.log('登录状态已过期，需要重新登录')
      login()
    }
  })
}
export function login (cb) {
  console.log('调用wx.login')
  wx.login({
    success: res => {
      fetch('login', { code: res.code }).then(r => {
        // 后台获取算出来的第三方的session_key, 此后可以用它来存取用户信息
        let third_key = r.data.third_key
        wx.setStorageSync('third_key', third_key)
        console.log('登陆完成后讲第三方key存在本地：' + wx.getStorageSync('third_key'))
        cb && cb()
      }).catch(e => {
        console.error(e)
      })
    }
  })
}
export function checkUserInfo () {
  return new Promise((resolve, reject) => {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log('已经授权了获取用户信息')
          resolve({scoped: true})
        } else {
          console.log('还未授权获取用户信息')
          reject({scoped: false})
        }
      }
    })
  })
}