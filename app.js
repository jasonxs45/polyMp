import { init, checkUserInfo } from 'common/login'
App({
  onLaunch () {
    init()
    checkUserInfo().then(r => {
      wx.getUserInfo({
        success: res => {
          console.log('主动触发获取用户信息')
        }
      })
    }).catch(e => {
      console.log(e)
    })
  }
})